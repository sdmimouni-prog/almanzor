from PIL import Image, ImageDraw, ImageFilter
from pathlib import Path
import json
root=Path(__file__).resolve().parents[2]; out=root/'assets'; qa=Path(__file__).parent
src=Image.open('/Users/salaheddinemimouni/Downloads/Luxury Perfume Collection and Craftsmanship.png').convert('RGB')
assert src.size==(1536,1024),src.size
restored=Image.open(qa/'restored-background.png').convert('RGB').resize(src.size,Image.Resampling.LANCZOS)
# Suppress the generated marble veins: the reference paper behind the editorial copy is quiet.
restored=restored.filter(ImageFilter.GaussianBlur(8))
mask=Image.new('L',src.size);pixels=src.load();m=mask.load()
for box in [(602,26,940,127),(83,298,108,337),(1428,298,1452,337),(173,438,1365,490),(176,497,1360,548),(896,625,1250,650),(896,660,1330,777),(896,783,970,796),(896,807,1335,887)]:
 for y in range(box[1],box[3]):
  for x in range(box[0],box[2]):
   if pixels[x,y][0]<225:m[x,y]=255
ImageDraw.Draw(mask).rectangle((901,911,1276,960),fill=255)
mask=mask.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(.65))
# Restore the editorial copy as one continuous paper patch: glyph-only masks
# become visible when the copy reflows on mobile. Keep the native outer palm shadows.
craft_mask=Image.new('L',src.size);ImageDraw.Draw(craft_mask).rectangle((890,618,1345,975),fill=255)
craft_mask=craft_mask.filter(ImageFilter.GaussianBlur(12))
from PIL import ImageChops
mask=ImageChops.lighter(mask,craft_mask)
clean=Image.composite(restored,src,mask);mask.save(qa/'restoration-mask.png')
assets=[]
def save(im,name,box):
 im.save(out/name,lossless=True,method=6)
 assets.append({'asset':name,'source':'Luxury Perfume Collection and Craftsmanship.png','crop':box,'dimensions':list(im.size),'postprocessing':'Extraction sans redessin des flacons et du capuchon. Fond restauré localement derrière le texte uniquement ; voir qa/collection-v2/prepare_assets.py.'})
background=clean.crop((0,0,1536,579)).convert('RGBA');draw=ImageDraw.Draw(background)
for i,key in enumerate(['blade','yaya','monsieur-rouge','black-eden']):
 x=130+319*i;box=(x,130,x+319,437)
 save(src.crop(box),f'collection-{key}.webp',list(box));draw.rectangle((x,130,x+318,436),fill=(247,243,235,0))
save(background,'collection-ivory.webp',[0,0,1536,579])
save(src.crop((0,579,819,1024)),'collection-craft-macro.webp',[0,579,819,1024])
save(clean.crop((819,579,1536,1024)),'collection-craft-ivory.webp',[819,579,1536,1024])
manifest=json.loads((out/'manifest.json').read_text());names={a['asset'] for a in assets};manifest=[a for a in manifest if a['asset'] not in names];(out/'manifest.json').write_text(json.dumps(manifest+assets,ensure_ascii=False,indent=2)+'\n')
print('7 assets prepared. All bottle/cap photographs are unchanged source pixels.')
