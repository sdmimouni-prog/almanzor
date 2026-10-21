"""Publish accepted ImageGen outputs; retain originals and update only asset references."""
import json
import re
import shutil
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
ASSETS = ROOT / "assets"
MASTER = ROOT / "output/imagegen/photo-quality"
MASTER.mkdir(parents=True, exist_ok=True)
jobs = json.loads((ROOT / "output/imagegen/photo-quality-prompts.json").read_text())
records = json.loads((ROOT / "output/imagegen/photo-quality-results.json").read_text())
job_map = {j["id"]: j for j in jobs}
dimensions = {}
for record in records:
    name = record["id"]
    master = MASTER / (name + ".png")
    if not master.exists():
        shutil.copy2(record["path"], master)
    image = Image.open(master)
    asset = ASSETS / (name + ".webp")
    if not asset.exists():
        # Delivery thumbnails are only downscaled, never enlarged.
        if name.startswith(("collection-", "signature-inspiration-")) and name != "collection-ivory-hd":
            image.thumbnail((960, 960), Image.Resampling.LANCZOS)
        image.save(asset, "WEBP", quality=93, method=6)
    dimensions[name] = Image.open(asset).size

mapping = {}
for name in dimensions:
    if name.startswith(("catalog-product-", "catalog-signature-", "collection-", "signature-inspiration-")):
        mapping[name.removesuffix("-hd") + ".webp"] = name + ".webp"
for key in ["hero", "vision"]:
    name = "maison-" + key + "-hd"
    if name in dimensions:
        mapping["maison-" + key + ".webp"] = name + ".webp"
for key in ["inspiration", "materials", "art"]:
    name = "maison-" + key + "-photo-hd"
    if name in dimensions:
        mapping["maison-" + key + ".webp"] = name + ".webp"
        mapping["maison-" + key + "-mobile.webp"] = name + ".webp"

# Keep the original mobile hero crop proportions, using only the new photograph.
if "maison-hero-hd" in dimensions:
    source = Image.open(MASTER / "maison-hero-hd.png")
    width, height = source.size
    box = tuple(round(v) for v in (width*397/770, height*66/397, width, height))
    mobile = source.crop(box)
    mobile.save(ASSETS / "maison-hero-mobile-hd.webp", "WEBP", quality=93, method=6)
    dimensions["maison-hero-mobile-hd"] = mobile.size
    mapping["maison-hero-mobile.webp"] = "maison-hero-mobile-hd.webp"

for filename in ["index.html", "nos-parfums.html", "la-maison.html"]:
    file = ROOT / filename
    html = file.read_text()
    for before, after in mapping.items():
        html = html.replace("assets/" + before, "assets/" + after)
    def intrinsic(match):
        tag = match.group(0)
        source = re.search(r'(?:src|srcset)="assets/([^"]+)"', tag)
        if source:
            stem = Path(source.group(1)).stem
            if stem in dimensions:
                w, h = dimensions[stem]
                tag = re.sub(r'width="\d+"', f'width="{w}"', tag)
                tag = re.sub(r'height="\d+"', f'height="{h}"', tag)
        return tag
    html = re.sub(r'<(?:img|source)\b[^>]*>', intrinsic, html)
    file.write_text(html)

if "collection-ivory-hd" in dimensions:
    css_file = ROOT / "collection.css"
    css_file.write_text(css_file.read_text().replace("assets/collection-ivory.webp", "assets/collection-ivory-hd.webp"))

manifest_file = ASSETS / "manifest.json"
manifest = json.loads(manifest_file.read_text())
names = set(name + ".webp" for name in dimensions)
manifest = [entry for entry in manifest if entry["asset"] not in names]
for name, size in dimensions.items():
    original_name = "maison-hero-hd" if name == "maison-hero-mobile-hd" else name
    entry = {
        "asset": name + ".webp",
        "source": "Built-in ImageGen, 2026-10-21",
        "dimensions": list(size),
        "references": job_map[original_name]["refs"],
        "master": "output/imagegen/photo-quality/" + original_name + ".png",
        "prompt": "output/imagegen/photo-quality-prompts.json#" + original_name,
        "postprocessing": "WebP quality 93; no upscaling. Mobile hero: proportional crop; card thumbnails: downscaled to at most 960px."
    }
    manifest.append(entry)
manifest_file.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
print(json.dumps(dimensions, indent=2))

