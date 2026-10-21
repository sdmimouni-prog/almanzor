from PIL import Image,ImageChops
from pathlib import Path
import json
q=Path(__file__).parent;root=q.parents[1];source=Path('/Users/salaheddinemimouni/Downloads/L’univers Almanzor_ Signature Parfumée.png');data=json.loads((q/'checks.json').read_text())
for d in data:
 im=Image.open(q/f"full-{d['width']}.png");y=round(d['signature']['y']);h=round(d['signature']['height']+d['services']['height']+d['instagram']['height']);im.crop((0,y,d['width'],y+h)).save(q/f"blocks-{d['width']}.png")
a=Image.open(source).convert('RGB');b=Image.open(q/'blocks-1536.png').convert('RGB');comp=Image.new('RGB',(3072,1024));comp.paste(a,(0,0));comp.paste(b,(1536,0));comp.save(q/'comparison-full.jpg',quality=95);b.save(q/'blocks-final.jpg',quality=95)
for name,box in [('signature',(120,115,630,450)),('services',(150,525,1385,655)),('instagram',(570,697,980,792))]:
 x,y,r,t=box;im=Image.new('RGB',((r-x)*2,t-y));im.paste(a.crop(box),(0,0));im.paste(b.crop(box),(r-x,0));im.save(q/f'comparison-{name}.png')
checks={}
for name,box in [('bottle-rock',(28,798,266,996)),('flower',(272,798,514,996)),('bottle-citrus',(520,798,765,996)),('arch',(771,798,1015,996)),('bottle-gold',(1021,798,1264,996)),('stone',(1270,798,1509,996))]:
 im=Image.open(root/f'assets/signature-inspiration-{name}.webp').convert('RGB');checks[name]=max(v[1] for v in ImageChops.difference(im,a.crop(box)).getextrema())
scene=Image.open(root/'assets/signature-scene.webp').convert('RGB');checks['wall-monogram']=max(v[1] for v in ImageChops.difference(scene.crop((1000,0,1536,500)),a.crop((1000,0,1536,500))).getextrema())
for name,new,old in [('approved-hero',q/'hero-regression.png',root/'qa/hero-v2/hero-1672.png')]:checks[name]=max(v[1] for v in ImageChops.difference(Image.open(new).convert('RGB'),Image.open(old).convert('RGB')).getextrema())
y=round(json.loads((q/'editorial-origin.json').read_text())['y']);im=Image.open(q/'editorial-regression.png').convert('RGB').crop((0,y,1774,y+887));checks['approved-editorial']=max(v[1] for v in ImageChops.difference(im,Image.open(root/'qa/editorial-v2/blocks-1774.png').convert('RGB')).getextrema())
d=data[0];y=round(d['selection']['y']);im=Image.open(q/'full-1536.png').convert('RGB').crop((0,y,1536,y+1024));checks['approved-collection']=max(v[1] for v in ImageChops.difference(im,Image.open(root/'qa/collection-v2/blocks-1536.png').convert('RGB')).getextrema())
(q/'pixel-checks.json').write_text(json.dumps(checks,indent=2));print(checks)
