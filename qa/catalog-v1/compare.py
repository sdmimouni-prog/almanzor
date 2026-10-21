from pathlib import Path
from PIL import Image,ImageChops
import json
q=Path(__file__).parent;root=q.parents[1];a=Image.open('/Users/salaheddinemimouni/Downloads/Almanzor Parfums_ Quatre Signatures Élégantes.png').convert('RGB');data=json.loads((q/'checks.json').read_text());d=data[0]
b=Image.open(q/'full-1482.png').convert('RGB').crop((0,round(d['main']['y']),1482,round(d['main']['y'])+3918)).resize((741,1959),Image.Resampling.LANCZOS);b.save(q/'main-normalized.png');b.save(q/'page-preview.jpg',quality=95)
comp=Image.new('RGB',(1482,1959));comp.paste(a.crop((0,0,741,1959)),(0,0));comp.paste(b,(741,0));comp.save(q/'comparison-full.jpg',quality=95)
for name,box in [('hero',(40,88,390,286)),('blade',(433,481,707,746)),('yaya',(52,790,350,1068)),('rouge',(431,1101,738,1366)),('eden',(55,1390,348,1663)),('newsletter',(168,1851,585,1949))]:
 x,y,r,t=box;im=Image.new('RGB',((r-x)*2,t-y));im.paste(a.crop(box),(0,0));im.paste(b.crop(box),(r-x,0));im.save(q/f'comparison-{name}.png')
checks={}
for key,box in [('blade',(0,461,415,764)),('yaya',(369,764,741,1080)),('monsieur-rouge',(0,1080,403,1367)),('black-eden',(362,1367,741,1671))]:checks[key]=max(v[1] for v in ImageChops.difference(Image.open(root/f'assets/catalog-product-{key}.webp').convert('RGB'),a.crop(box)).getextrema())
checks['hero-group']=max(v[1] for v in ImageChops.difference(Image.open(root/'assets/catalog-hero.webp').convert('RGB').crop((379,90,741,344)),a.crop((379,90,741,344))).getextrema())
manifest=json.loads((root/'assets/manifest.json').read_text())
for asset in manifest:
 if asset['asset'].startswith(('catalog-note-','catalog-benefit-')):
  checks[asset['asset']]=max(v[1] for v in ImageChops.difference(Image.open(root/'assets'/asset['asset']).convert('RGB'),a.crop(tuple(asset['crop']))).getextrema())
im=Image.open(q/'home-regression.png').convert('RGB');ref=Image.open(root/'qa/heritage-v3/full-1440.png').convert('RGB');checks['homepage']=max(v[1] for v in ImageChops.difference(im,ref).getextrema()) if im.size==ref.size else {'before':ref.size,'after':im.size}
(q/'pixel-checks.json').write_text(json.dumps(checks,indent=2));print(checks)
