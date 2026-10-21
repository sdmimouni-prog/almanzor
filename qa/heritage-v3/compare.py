from PIL import Image,ImageChops
from pathlib import Path
import json
q=Path(__file__).parent;root=q.parents[1];source=Path('/Users/salaheddinemimouni/Downloads/Luxury Perfume Heritage in Golden Light.png');data=json.loads((q/'checks.json').read_text())
for d in data:
 im=Image.open(q/f"full-{d['width']}.png");y=round(d['craft']['y']);h=round(d['craft']['height']+d['signature']['height']);im.crop((0,y,d['width'],y+h)).save(q/f"blocks-{d['width']}.png")
a=Image.open(source).convert('RGB');b=Image.open(q/'blocks-1536.png').convert('RGB');comp=Image.new('RGB',(3072,1024));comp.paste(a,(0,0));comp.paste(b,(1536,0));comp.save(q/'comparison-full.jpg',quality=95);b.save(q/'blocks-final.jpg',quality=95)
for name,box in [('craft',(930,63,1415,452)),('signature',(520,552,1020,893))]:
 x,y,r,t=box;im=Image.new('RGB',((r-x)*2,t-y));im.paste(a.crop(box),(0,0));im.paste(b.crop(box),(r-x,0));im.save(q/f'comparison-{name}.png')

checks={}
def compare(name,a,b):checks[name]=max(v[1] for v in ImageChops.difference(a.convert('RGB'),b.convert('RGB')).getextrema())
compare('macro',Image.open(root/'assets/heritage-craft-macro.webp'),a.crop((0,0,827,517)))
im=Image.open(root/'assets/heritage-signature-scene.webp');compare('wall-monogram',im.crop((1085,0,1536,507)),a.crop((1085,517,1536,1024)))
compare('approved-hero',Image.open(q/'hero-regression.png'),Image.open(root/'qa/hero-v2/hero-1672.png'))
y=round(json.loads((q/'editorial-origin.json').read_text())['y']);im=Image.open(q/'editorial-regression.png').crop((0,y,1774,y+887));compare('approved-editorial',im,Image.open(root/'qa/editorial-v2/blocks-1774.png'))
d=data[0];im=Image.open(q/'full-1536.png');y=round(d['selection']['y']);compare('approved-selection',im.crop((0,y,1536,y+579)),Image.open(root/'qa/collection-v2/blocks-1536.png').crop((0,0,1536,579)))
y=round(d['services']['y']);compare('approved-services-instagram',im.crop((0,y,1536,y+524)),Image.open(root/'qa/signature-v2/blocks-1536.png').crop((0,500,1536,1024)))
(q/'pixel-checks.json').write_text(json.dumps(checks,indent=2));print(checks)
