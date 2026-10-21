from pathlib import Path
from PIL import Image,ImageChops,ImageStat
import json
q=Path(__file__).parent
src=Image.open('/Users/salaheddinemimouni/Downloads/La Maison Almanzor Parfums.png').convert('RGB')
shot=Image.open(q/'full-1540.png').convert('RGB')
render=shot.resize((770,round(shot.height/2)),Image.Resampling.LANCZOS)
render.save(q/'page-final.jpg',quality=94)
a=src.crop((0,0,770,1883));b=render.crop((0,0,770,1883));full=Image.new('RGB',(1540,1883));full.paste(a,(0,0));full.paste(b,(770,0));full.save(q/'comparison-full.jpg',quality=95)
for key,y0,y1 in [('hero',0,397),('inspiration',397,687),('benefits',687,817),('materials',817,1110),('vision',1110,1366),('art',1366,1614),('commitment',1614,1778),('newsletter',1778,1883)]:
 im=Image.new('RGB',(1540,y1-y0));im.paste(a.crop((0,y0,770,y1)),(0,0));im.paste(b.crop((0,y0,770,y1)),(770,0));im.save(q/f'comparison-{key}.png')
for width in [390,319]:
 m=Image.open(q/f'full-{width}.png');m.crop((0,0,width,min(m.height,1600))).save(q/f'mobile-top-{width}.png');m.crop((0,m.height-1500,width,m.height)).save(q/f'mobile-bottom-{width}.png')
checks=[]
for kind,baseline in [('home','../catalog-v1/home-regression.png'),('catalog','../catalog-v1/full-1440.png')]:
 current=Image.open(q/f'{kind}-regression.png').convert('RGB');before=Image.open(q/baseline).convert('RGB');d=ImageChops.difference(current,before);checks.append({'page':kind,'same_size':current.size==before.size,'max_pixel_difference':max(mx for mn,mx in d.getextrema())})
for key,box in {'hero':(397,66,770,397),'inspiration':(385,397,770,687),'materials':(0,817,385,1110),'art':(351,1366,770,1614)}.items():
 im=Image.open(q.parents[1]/f'assets/maison-{key}-mobile.webp').convert('RGB');d=ImageChops.difference(src.crop(box),im);checks.append({'asset':key,'max_pixel_difference':max(mx for mn,mx in d.getextrema())})
(q/'pixel-checks.json').write_text(json.dumps(checks,indent=2));print(checks)
