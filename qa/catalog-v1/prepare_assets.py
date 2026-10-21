from pathlib import Path
from PIL import Image,ImageDraw,ImageFilter
import json
from statistics import median
root=Path(__file__).resolve().parents[2];q=Path(__file__).parent;out=root/'assets'
src=Image.open('/Users/salaheddinemimouni/Downloads/Almanzor Parfums_ Quatre Signatures Élégantes.png').convert('RGB');assert src.size==(741,2123)
rest=Image.open(q/'restored-background.png').convert('RGB').resize(src.size,Image.Resampling.LANCZOS)
assets=[]
def save(im,name,box,note):
 im.save(out/name,lossless=True,method=6);assets.append({'asset':name,'source':'Almanzor Parfums_ Quatre Signatures Élégantes.png','crop':list(box),'dimensions':list(im.size),'postprocessing':note})
mask=Image.new('L',src.size);d=ImageDraw.Draw(mask)
hero_boxes=[(0,0,740,75),(48,86,378,187),(50,191,95,205),(49,208,349,281)]
for box in hero_boxes:
 ratios=[];sp=src.load();rp=rest.load()
 for y in range(box[1],box[3],2):
  for x in range(box[0],box[2],2):
   r,g,b=sp[x,y];rr,gg,bb=rp[x,y];l=.2126*r+.7152*g+.0722*b;ll=.2126*rr+.7152*gg+.0722*bb
   if r<65 and g<90 and l>3 and ll>3:ratios.append(l/ll)
 gain=max(.35,min(1.1,median(ratios))) if ratios else 1
 rest.paste(rest.crop(box).point(lambda value:round(value*gain)),box[:2]);print('Hero exposure match',box,round(gain,3));d.rectangle(box,fill=255)
for box in [(261,1679,477,1828),(186,1854,589,1943)]:d.rectangle(box,fill=255)
mask=mask.filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(3));ImageDraw.Draw(mask).rectangle((379,90,740,343),fill=0);clean=Image.composite(rest,src,mask);mask.save(q/'restoration-mask.png')
save(clean.crop((0,0,741,344)),'catalog-hero.webp',(0,0,741,344),'Restauration locale sous le header et les textes. Photographie des quatre flacons conservée hors masque.')
save(rest.crop((0,344,741,461)),'catalog-benefits-paper.webp',(0,344,741,461),'Fond ivoire restauré, légendes et pictogrammes placés séparément.')
for i in range(4):
 box=(92+i*171,361,137+i*171,407);save(src.crop(box),f'catalog-benefit-{i+1}.webp',box,'Pictogramme fourni extrait sans redessin.')
products=[('blade',(0,461,415,764),(415,461,741,764),[(447+86*i,622,492+86*i,667) for i in range(3)]),('yaya',(369,764,741,1080),(0,764,369,1080),[(65+86*i,948,109+86*i,992) for i in range(3)]),('monsieur-rouge',(0,1080,403,1367),(403,1080,741,1367),[(439+94*i,1241,484+94*i,1286) for i in range(3)]),('black-eden',(362,1367,741,1671),(0,1367,362,1671),[(67+87*i,1532,112+87*i,1577) for i in range(3)])]
for key,photo,panel,notes in products:
 save(src.crop(photo),f'catalog-product-{key}.webp',photo,'Photographie fournie extraite directement, pixels et inscriptions inchangés.')
 plate=rest.crop(panel).convert('RGBA');pd=ImageDraw.Draw(plate)
 for i,box in enumerate(notes):
  padded=(box[0]-6,box[1]-6,box[2]+6,box[3]+4)
  save(src.crop(padded),f'catalog-note-{key}-{i+1}.webp',padded,'Vignette olfactive fournie avec une marge de raccord, pixels source conservés.')
  pd.rectangle((padded[0]-panel[0],padded[1]-panel[1],padded[2]-panel[0]-1,padded[3]-panel[1]-1),fill=(0,0,0,0))
 save(plate,f'catalog-panel-{key}.webp',panel,'Fond restauré sans interface. Vignettes photographiques découpées du fond et placées en HTML.')
save(clean.crop((0,1671,741,1838)),'catalog-signature.webp',(0,1671,741,1838),'Restauration locale sous les surimpressions. Grand A mural conservé hors masque.')
save(clean.crop((0,1838,741,1959)),'catalog-newsletter.webp',(0,1838,741,1959),'Fond restauré localement sous le texte et le formulaire.')
for key,box in [('blade',(448,715,593,717)),('yaya',(65,1034,215,1036)),('monsieur-rouge',(439,1334,642,1336)),('black-eden',(68,1628,260,1630))]:save(src.crop(box),f'catalog-button-{key}.webp',box,'Texture dorée extraite dans une zone vierge de texte du bouton fourni.')
manifest=json.loads((out/'manifest.json').read_text());names={a['asset'] for a in assets};manifest=[a for a in manifest if a['asset'] not in names];(out/'manifest.json').write_text(json.dumps(manifest+assets,ensure_ascii=False,indent=2)+'\n');print(len(assets),'assets prepared')
