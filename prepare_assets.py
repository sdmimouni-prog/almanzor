from PIL import Image
from pathlib import Path
import json
src=Path('/Users/salaheddinemimouni/Downloads'); out=Path(__file__).parent/'assets'
manifest=[]
def save(name,file,box=None,size=None):
 im=Image.open(src/file).convert('RGB')
 if box: im=im.crop(box)
 if size: im.thumbnail(size,Image.Resampling.LANCZOS)
 im.save(out/(name+'.webp'),'WEBP',quality=91)
 manifest.append({'asset':name+'.webp','source':file,'crop':box,'dimensions':im.size})
ref='Almanzor Parfums — L’art du parfum.png'
save('logo','Image ChatGPT 20 oct. 2026, 22_24_19.jpg',(180,150,1360,800),(700,400))
save('texture','Image ChatGPT 20 oct. 2026, 22_24_19.jpg',(0,0,500,150))
save('hero-blade','Almanzor Blade_ A Signature in Gold.png',(0,350,941,1320))
save('maison',ref,(414,361,742,572))
save('signature',ref,(552,1375,742,1566))
save('macro','Almanzor Blade_ A Signature in Gold.png',(345,423,595,625))
for name,file in [('blade','Almanzor Blade_ A Signature in Gold.png'),('yaya','YAYA_ A Luminous Refined Character.png'),('monsieur-rouge','Monsieur Rouge Luxury Perfume Campaign.png'),('black-eden','Black Eden_ A Mysterious Botanical Fragrance.png')]:
 save('campaign-'+name,file,size=(941,1672))
for name,x1,x2 in [('blade',72,359),('yaya',359,641),('monsieur-rouge',642,921),('black-eden',922,1206)]:
 save('product-'+name,'WhatsApp Image 2026-10-20 at 17.42.42.jpeg',(x1,153,x2,821))
save('universe','Almanzor La Maison in Forest Green.png',(0,0,941,1672))
save('inspiration-stone',ref,(13,1730,128,1847))
save('inspiration-flower',ref,(130,1730,249,1847))
save('inspiration-arch',ref,(374,1730,489,1847))
save('newsletter-left',ref,(0,1860,180,1964))
save('newsletter-right',ref,(595,1860,742,1964))
(out/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
