"""Crop note thumbnails from the regenerated photographs, without upscaling."""
import json
import re
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
MASTER = ROOT / 'output/imagegen/photo-quality'
ASSETS = ROOT / 'assets'
CROPS = {
    'amber': ('maison-materials-photo-hd', (220, 525, 640, 945)),
    'wood': ('maison-materials-photo-hd', (650, 430, 1090, 870)),
    'leaves': ('catalog-product-black-eden-hd', (0, 420, 430, 850)),
    'saffron': ('catalog-product-monsieur-rouge-hd', (155, 630, 515, 990)),
    'citrus': ('signature-inspiration-bottle-citrus-hd', (90, 260, 510, 680)),
    'star-anise': ('note-star-anise-hd', None),
}
NOTES = {
    'blade': ['citrus', 'wood', 'leaves'],
    'yaya': ['amber', 'star-anise', 'wood'],
    'monsieur-rouge': ['saffron', 'wood', 'amber'],
    'black-eden': ['wood', 'amber', 'leaves'],
}
entries = []
for note, (source, box) in CROPS.items():
    master = MASTER / (source + '.png')
    if not master.exists():
        continue
    photo = Image.open(master).convert('RGB')
    if box:
        photo = photo.crop(box)
    else:
        size = min(photo.size)
        x, y = (photo.width-size)//2, (photo.height-size)//2
        photo = photo.crop((x, y, x+size, y+size))
    photo.thumbnail((320, 320), Image.Resampling.LANCZOS)
    asset = f'note-{note}-hd.webp'
    photo.save(ASSETS / asset, 'WEBP', quality=93, method=6)
    entries.append({'asset': asset, 'source': 'Crop from built-in ImageGen photograph, 2026-10-21',
        'master': str(master.relative_to(ROOT)), 'crop': box, 'dimensions': list(photo.size),
        'postprocessing': 'Square crop, downscaled to 320px, WebP quality 93; no upscaling.'})

file = ROOT / 'nos-parfums.html'
html = file.read_text()
for product, notes in NOTES.items():
    for n, note in enumerate(notes, 1):
        asset = f'note-{note}-hd.webp'
        if not (ASSETS / asset).exists():
            continue
        html = html.replace(f'assets/catalog-note-{product}-{n}.webp', 'assets/' + asset)
def intrinsic(match):
    tag = match.group(0)
    tag = re.sub(r'width="\d+"', 'width="320"', tag)
    tag = re.sub(r'height="\d+"', 'height="320"', tag)
    if 'class="note-photo"' not in tag:
        tag = tag.replace('<img ', '<img class="note-photo" ', 1)
    return tag
html = re.sub(r'<img\b[^>]*src="assets/note-[^"]+-hd.webp"[^>]*>', intrinsic, html)
file.write_text(html)

file = ASSETS / 'manifest.json'
manifest = json.loads(file.read_text())
names = {entry['asset'] for entry in entries}
manifest = [entry for entry in manifest if entry['asset'] not in names] + entries
file.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
print('Published', len(entries), 'note thumbnails')
