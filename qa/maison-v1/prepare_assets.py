from pathlib import Path
from PIL import Image,ImageDraw,ImageFilter
import json
from statistics import median
root=Path(__file__).resolve().parents[2];q=Path(__file__).parent;out=root/'assets'
src=Image.open('/Users/salaheddinemimouni/Downloads/La Maison Almanzor Parfums.png').convert('RGB');assert src.size==(770,2042)
rest=Image.open(q/'restored-background.png').convert('RGB').resize(src.size,Image.Resampling.LANCZOS)
mask=Image.new('L',src.size);d=ImageDraw.Draw(mask)
# Restore only the editable text/control regions; keep all supplied photography outside these masks.
regions=[
 ('dark',(29,5,749,66)),('dark',(53,99,143,117)),('dark',(53,122,393,204)),('dark',(52,215,99,226)),('dark',(53,238,373,311)),('dark',(53,323,205,365)),
 ('light',(51,440,223,460)),('light',(50,465,330,534)),('light',(50,541,100,560)),('light',(50,561,351,646)),
 ('dark',(45,760,705,798)),
 ('light',(429,846,713,864)),('light',(428,871,665,939)),('light',(429,940,469,955)),('light',(428,956,726,1040)),('light',(429,1048,599,1086)),
 ('scene',(53,1175,156,1194)),('scene',(52,1201,374,1268)),('scene',(52,1280,386,1333)),
 ('light',(52,1397,279,1416)),('light',(52,1420,283,1489)),('light',(51,1496,341,1544)),('light',(53,1551,239,1589)),
 ('dark',(52,1633,232,1649)),('dark',(52,1653,307,1704)),('dark',(52,1713,333,1762)),('dark',(384,1715,734,1747)),
 ('light',(237,1790,527,1832)),('light',(202,1835,552,1872))]
source_pixels=src.load();restored=rest.copy()
for kind,box in regions:
 s=list(src.crop(box).getdata());r=list(restored.crop(box).getdata())
 if kind=='light':
  ambient=[]
  for yy in range(max(0,box[1]-9),min(src.height,box[3]+9)):
   for xx in range(max(0,box[0]-9),min(src.width,box[2]+9)):
    if not (box[0]<=xx<box[2] and box[1]<=yy<box[3]):
     px=source_pixels[xx,yy]
     if sum(px)/3>215:ambient.append(px)
  good=ambient or [px for px in s if sum(px)/3>215];sm=[median(px[c] for px in good) for c in range(3)];rm=[median(px[c] for px in r) for c in range(3)]
  result=[tuple(max(0,min(255,round(sm[c]+(px[c]-rm[c])*.20))) for c in range(3)) for px in r]
 else:
  ratios=[sum(sp)/sum(rp) for sp,rp in zip(s,r) if 2<sum(sp)/3<(80 if kind=='scene' else 65) and sum(rp)/3>2]
  gain=max(.28,min(1.05,median(ratios))) if ratios else .75
  result=[tuple(max(0,min(255,round(v*gain))) for v in px) for px in r]
 patch=Image.new('RGB',(box[2]-box[0],box[3]-box[1]));patch.putdata(result)
 # Correct the full feather margin, avoiding an uncorrected rectangular fringe.
 padded=(max(0,box[0]-5),max(0,box[1]-5),min(src.width,box[2]+5),min(src.height,box[3]+5))
 rest.paste(patch.resize((padded[2]-padded[0],padded[3]-padded[1]),Image.Resampling.BILINEAR),padded[:2])
 local=Image.new('L',src.size);lp=local.load()
 # Target original UI pixels instead of replacing whole rectangles of photography.
 controls=box in [(53,323,205,365),(429,1048,599,1086),(53,1551,239,1589),(202,1835,552,1872)]
 if controls:ImageDraw.Draw(local).rectangle(box,fill=255)
 else:
  for y in range(box[1],box[3]):
   for x in range(box[0],box[2]):
    rr,gg,bb=source_pixels[x,y]
    hit=(min(rr,gg,bb)>110 and rr-gg<25 and gg-bb<40) if box==(53,1175,156,1194) else (min(rr,gg,bb)<210) if kind=='light' else (min(rr,gg,bb)>140 and rr-gg<70 if kind=='scene' else max(rr,gg,bb)>75)
    if hit:lp[x,y]=255
 local=local.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(.6))
 from PIL import ImageChops
 mask=ImageChops.lighter(mask,local)
clean=Image.composite(rest,src,mask);mask.save(q/'restoration-mask.png')
assets=[]
def save(im,name,box,note):
 im.save(out/name,lossless=True,method=6);assets.append({'asset':name,'source':'La Maison Almanzor Parfums.png','crop':list(box),'dimensions':list(im.size),'postprocessing':note})
sections={'hero':(0,0,770,397),'inspiration':(0,397,770,687),'benefits':(0,687,770,817),'materials':(0,817,770,1110),'vision':(0,1110,770,1366),'art':(0,1366,770,1614),'commitment':(0,1614,770,1778),'newsletter':(0,1778,770,1883)}
# Icons remain native image elements; punch exact matching holes in their original background.
for key,coords in [('benefits',[(92,705,144,759),(272,705,324,759),(450,705,502,759),(626,705,678,759)]),('commitment',[(404,1657,456,1711),(532,1657,584,1711),(659,1657,711,1711)])]:
 box=sections[key];plate=clean.crop(box).convert('RGBA');pd=ImageDraw.Draw(plate)
 for i,b in enumerate(coords):
  save(src.crop(b),f'maison-{("benefit" if key=="benefits" else "commitment")}-{i+1}.webp',b,'Pictogramme de référence extrait directement, pixels source conservés.')
  pd.rectangle((b[0]-box[0],b[1]-box[1],b[2]-box[0]-1,b[3]-box[1]-1),fill=(0,0,0,0))
 # Clear only the raster dividers, then rebuild as CSS separators.
 for x in ([207,385,563] if key=='benefits' else [494,621]):
  linebox=(x-2,box[1]+(25 if key=='benefits' else 46),x+2,box[1]+(106 if key=='benefits' else 127))
  strip=src.crop((x+4,linebox[1],x+5,linebox[3])).resize((4,linebox[3]-linebox[1]));plate.paste(strip,(x-2,linebox[1]-box[1]))
 save(plate,f'maison-{key}.webp',box,'Fond original, textes restaurés localement. Pictogrammes extraits et séparateurs reconstruits en CSS.')
for key,box in sections.items():
 if key not in ('benefits','commitment'):save(clean.crop(box),f'maison-{key}.webp',box,'Restauration ImageGen localisée sous les textes et contrôles, exposition raccordée. Photos et monogrammes originaux conservés hors masque.')
for key,box in {'newsletter':(0,1778,195,1883),'hero':(397,66,770,397),'inspiration':(385,397,770,687),'materials':(0,817,385,1110),'art':(351,1366,770,1614)}.items():
 save(src.crop(box),f'maison-{key}-mobile.webp',box,'Recadrage photographique direct de la référence pour la disposition mobile, pixels source conservés.')
for key,box in {'hero':(59,330,201,332),'craft':(436,1054,594,1056),'art':(59,1558,234,1560)}.items():save(src.crop(box),f'maison-button-{key}.webp',box,'Surface dorée extraite dans une ligne sans texte du bouton de référence.')
manifest=json.loads((out/'manifest.json').read_text());names={a['asset'] for a in assets};manifest=[a for a in manifest if a['asset'] not in names];(out/'manifest.json').write_text(json.dumps(manifest+assets,ensure_ascii=False,indent=2)+'\n');(q/'assets.json').write_text(json.dumps(assets,ensure_ascii=False,indent=2)+'\n');print(len(assets),'assets prepared')
