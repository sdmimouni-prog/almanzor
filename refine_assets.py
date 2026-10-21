from PIL import Image
from pathlib import Path
from collections import deque
p=Path(__file__).parent/'assets'
# Extraction du fond seulement : les pixels de la marque et des flacons sont conservés.
im=Image.open(p/'logo.webp').convert('RGBA')
pixels=im.load()
for y in range(im.height):
 for x in range(im.width):
  r,g,b,a=pixels[x,y]
  # Le fond est vert, le marquage est bronze. Aucun dessin ou remplacement.
  strength=max(0,min(1,(r-g-1)/16))
  pixels[x,y]=(r,g,b,round(255*strength))
im.save(p/'logo-transparent.webp',quality=100,lossless=True)
for name in ['blade','yaya','monsieur-rouge','black-eden']:
 im=Image.open(p/f'product-{name}.webp').convert('RGBA'); pix=im.load(); w,h=im.size
 seen=set();q=deque()
 def background(x,y):
  r,g,b,_=pix[x,y]
  return min(r,g,b)>95 and max(r,g,b)-min(r,g,b)<76 and r<g*1.4
 for x in range(w):
  if background(x,0): q.append((x,0))
  if background(x,h-1):q.append((x,h-1))
 for y in range(h):
  if background(0,y):q.append((0,y))
  if background(w-1,y):q.append((w-1,y))
 while q:
  x,y=q.popleft()
  if (x,y) in seen:continue
  seen.add((x,y))
  if not background(x,y):continue
  r,g,b,_=pix[x,y];pix[x,y]=(r,g,b,0)
  for a,b in [(x-1,y),(x+1,y),(x,y-1),(x,y+1)]:
   if 0<=a<w and 0<=b<h and (a,b) not in seen:q.append((a,b))
 im.save(p/f'product-{name}.webp',lossless=True)
# Macro du vrai capuchon avec la totalité de son cercle bronze.
Image.open('/Users/salaheddinemimouni/Downloads/Almanzor Blade_ A Signature in Gold.png').crop((150,355,780,800)).save(p/'macro.webp',quality=94)
