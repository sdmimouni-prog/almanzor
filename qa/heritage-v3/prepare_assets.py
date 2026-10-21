from pathlib import Path
from PIL import Image,ImageDraw,ImageFilter
from collections import deque
import json
root=Path(__file__).resolve().parents[2];q=Path(__file__).parent;out=root/'assets'
src=Image.open('/Users/salaheddinemimouni/Downloads/Luxury Perfume Heritage in Golden Light.png').convert('RGB');assert src.size==(1536,1024)
rest=Image.open(q/'restored-background.png').convert('RGB').resize(src.size,Image.Resampling.LANCZOS)
mask=Image.new('L',src.size);d=ImageDraw.Draw(mask)
for box in [(929,61,1408,458),(700,552,839,671),(520,667,1019,800),(550,811,987,891)]:d.rectangle(box,fill=255)
mask=mask.filter(ImageFilter.MaxFilter(11)).filter(ImageFilter.GaussianBlur(5));clean=Image.composite(rest,src,mask);mask.save(q/'restoration-mask.png')
assets=[]
def save(im,name,box,note):
 im.save(out/name,lossless=True,method=6);assets.append({'asset':name,'source':'Luxury Perfume Heritage in Golden Light.png','crop':list(box),'dimensions':list(im.size),'postprocessing':note})
save(src.crop((0,0,827,517)),'heritage-craft-macro.webp',(0,0,827,517),'Extraction directe sans modification des pixels photographiques.')
save(clean.crop((827,0,1536,517)),'heritage-craft-ivory.webp',(827,0,1536,517),'Restauration du papier sous les anciennes surimpressions ; voir qa/heritage-v3/prepare_assets.py.')
save(clean.crop((0,517,1536,1024)),'heritage-signature-scene.webp',(0,517,1536,1024),'Restauration locale sous le logo, le titre et le bouton. Scène et grand monogramme mural conservés hors masque.')
# Extract the supplied gold monogram; keep the original colors and silhouette.
# Exclude the tiny detached stray mark, never redraw the brand.
box=(710,560,830,666);logo=src.crop(box).convert('RGBA');pix=logo.load();w,h=logo.size
active=set()
for y in range(h):
 for x in range(w):
  r,g,b,a=pix[x,y]
  if r>145 and g>105 and r-g>18 and g-b>18:active.add((x,y))
keep=set()
while active:
 p=active.pop();region=[p];todo=deque([p])
 while todo:
  x,y=todo.popleft()
  for yy in range(max(0,y-1),min(h,y+2)):
   for xx in range(max(0,x-1),min(w,x+2)):
    if (xx,yy) in active:active.remove((xx,yy));todo.append((xx,yy));region.append((xx,yy))
 if len(region)>=30:keep.update(region)
for y in range(h):
 for x in range(w):
  r,g,b,a=pix[x,y];pix[x,y]=(r,g,b,255 if (x,y) in keep else 0)
save(logo,'heritage-monogram.webp',box,'Monogramme fourni : extraction du doré sur fond transparent, sans redessin. Petit artefact détaché écarté.')
manifest=json.loads((out/'manifest.json').read_text());names={a['asset'] for a in assets};manifest=[a for a in manifest if a['asset'] not in names];(out/'manifest.json').write_text(json.dumps(manifest+assets,ensure_ascii=False,indent=2)+'\n');print('4 lossless assets prepared.')
