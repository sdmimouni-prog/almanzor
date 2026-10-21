from pathlib import Path
from PIL import Image,ImageDraw,ImageFilter,ImageChops
from statistics import median
import json
root=Path(__file__).resolve().parents[2];qa=Path(__file__).parent;out=root/'assets'
src=Image.open('/Users/salaheddinemimouni/Downloads/L’univers Almanzor_ Signature Parfumée.png').convert('RGB');assert src.size==(1536,1024)
rest=Image.open(qa/'restored-background.png').convert('RGB').resize(src.size,Image.Resampling.LANCZOS)
mask=Image.new('L',src.size);d=ImageDraw.Draw(mask)
boxes=[(126,117,286,228),(126,235,612,354),(126,355,214,372),(125,385,510,449)]
# Preserve all pixels outside the original editorial overlay areas.
for box in boxes:
 samples=[];a=src.load();b=rest.load()
 for y in range(box[1],box[3],2):
  for x in range(box[0],box[2],2):
   r,g,bl=a[x,y];r2,g2,b2=b[x,y]
   ui=(r>175 and g>160 and bl>135) or (r>170 and g>120 and bl<160 and r>g*1.15)
   l=.2126*r+.7152*g+.0722*bl;l2=.2126*r2+.7152*g2+.0722*b2
   if not ui and l>10 and l2>10:samples.append(l/l2)
 # The filled CTA area has no photographic samples to use for exposure matching.
 if box[1]<385 and samples:
  gain=max(.75,min(1.2,median(samples)));rest.paste(rest.crop(box).point(lambda v:round(v*gain)),box[:2])
 d.rectangle(box,fill=255)
mask=mask.filter(ImageFilter.MaxFilter(17)).filter(ImageFilter.GaussianBlur(4));clean=Image.composite(rest,src,mask);mask.save(qa/'restoration-mask.png')
assets=[]
def save(im,name,box,note='Extraction directe sans modification des pixels photographiques.'):
 im.save(out/name,lossless=True,method=6);assets.append({'asset':name,'source':'L’univers Almanzor_ Signature Parfumée.png','crop':list(box),'dimensions':list(im.size),'postprocessing':note})
save(clean.crop((0,0,1536,500)),'signature-scene.webp',(0,0,1536,500),'Restauration locale du décor sous les surimpressions uniquement. Grand monogramme du mur et reste de la scène conservés. Voir qa/signature-v2/prepare_assets.py.')
for key,box in [('delivery',(201,533,275,593)),('payment',(562,532,614,592)),('location',(928,532,979,592)),('support',(1278,532,1332,592))]:save(src.crop(box),f'signature-service-{key}.webp',box,'Pictogramme fourni, extrait sur son papier ivoire, sans redessin.')
# Source paper remains outside the original UI. The replacement paper is smoothed
# to suppress any additional marble pattern invented during restoration.
for name,box in [('signature-services-ivory.webp',(0,500,1536,681)),('signature-inspiration-ivory.webp',(0,681,1536,1024))]:
 crop=src.crop(box);replacement=rest.filter(ImageFilter.GaussianBlur(8)).crop(box);m=Image.new('L',crop.size);draw=ImageDraw.Draw(m)
 if 'services' in name:
  for b in [(150,30,325,150),(535,25,645,150),(845,25,1060,150),(1230,25,1380,150),(407,25,415,151),(763,25,772,151),(1135,25,1144,151)]:draw.rectangle(b,fill=255)
 else:
  draw.rectangle((575,16,967,111),fill=255)
  # Clear photo slots in the decorative paper; actual source photos are separate assets.
  draw.rectangle((20,114,1516,320),fill=255)
 m=m.filter(ImageFilter.GaussianBlur(4));im=Image.composite(replacement,crop,m)
 if 'inspiration' in name:
  im=im.convert('RGBA');ImageDraw.Draw(im).rectangle((20,115,1516,320),fill=(247,243,235,0))
 save(im,name,box,'Papier localement restauré ; interface reconstruite en HTML.')
for key,box in [('bottle-rock',(28,798,266,996)),('flower',(272,798,514,996)),('bottle-citrus',(520,798,765,996)),('arch',(771,798,1015,996)),('bottle-gold',(1021,798,1264,996)),('stone',(1270,798,1509,996))]:save(src.crop(box),f'signature-inspiration-{key}.webp',box)
manifest=json.loads((out/'manifest.json').read_text());names={a['asset'] for a in assets};manifest=[a for a in manifest if a['asset'] not in names];(out/'manifest.json').write_text(json.dumps(manifest+assets,ensure_ascii=False,indent=2)+'\n')
print('13 lossless assets prepared.')
