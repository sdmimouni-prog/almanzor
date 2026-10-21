from pathlib import Path
from PIL import Image,ImageDraw,ImageFilter,ImageChops
root=Path(__file__).resolve().parents[2]
ref=Image.open('/Users/salaheddinemimouni/Downloads/Almanzor Parfums_ A Luxury Editorial Webpage.png').convert('RGB')
rest=Image.open(Path(__file__).parent/'restoration-source.png').convert('RGB')
if rest.size!=ref.size:rest=rest.resize(ref.size,Image.Resampling.LANCZOS)
mask=Image.new('L',ref.size);pixels=ref.load();m=mask.load()
# Restore only the original interface glyphs, rules and borders, not large rectangles of the photograph.
for box in [(175,10,332,120),(174,133,784,368),(177,381,431,446),(790,476,983,517),(553,517,1221,560)]:
 for y in range(box[1],box[3]):
  for x in range(box[0],box[2]):
   r,g,b=pixels[x,y]
   if r<211:m[x,y]=255
# Match the original dark treatment behind the card captions.
from statistics import median
for box in [(170,625,420,825),(930,625,1185,825)]:
 samples=[]
 rp=rest.load()
 for y in range(box[1],box[3],2):
  for x in range(box[0],box[2],2):
   r,g,b=pixels[x,y];r2,g2,b2=rp[x,y]
   ui=(r>170 and g>150 and b>120) or (r>155 and g>115 and b>35 and r-g>20 and g-b>20)
   if not ui:
    l=.2126*r+.7152*g+.0722*b;l2=.2126*r2+.7152*g2+.0722*b2
    if l>8 and l2>8:samples.append(l/l2)
 gain=max(.6,min(1.2,median(samples)));print('Card restoration exposure',box,gain)
 patch=rest.crop(box).point(lambda value:round(value*gain));rest.paste(patch,box[:2])
main_mask=mask.filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.GaussianBlur(.6))
card_mask=Image.new('L',ref.size);d=ImageDraw.Draw(card_mask)
for box in [(174,630,365,739),(177,738,407,813),(938,630,1120,739),(938,738,1173,814)]:d.rectangle(box,fill=255)
card_mask=card_mask.filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.GaussianBlur(4))
mask=ImageChops.lighter(main_mask,card_mask)
clean=Image.composite(rest.filter(ImageFilter.GaussianBlur(.8)),ref,mask)
mask.save(Path(__file__).parent/'restoration-mask.png')
clean.crop((0,0,1774,460)).save(root/'assets/editorial-maison.webp',lossless=True)
clean.crop((125,581,879,856)).save(root/'assets/editorial-parfums.webp',lossless=True)
clean.crop((895,581,1648,856)).save(root/'assets/editorial-univers.webp',lossless=True)
ivory=clean.crop((0,460,1774,887)).convert('RGBA');d=ImageDraw.Draw(ivory)
d.rectangle((125,121,878,395),fill=(0,0,0,0));d.rectangle((895,121,1647,395),fill=(0,0,0,0));ivory.save(root/'assets/editorial-ivory.webp',lossless=True)
ref.crop((181,17,326,113)).save(root/'assets/editorial-logo.webp',lossless=True)
