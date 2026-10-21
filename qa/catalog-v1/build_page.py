from pathlib import Path
from html import escape
import re,json
root=Path(__file__).resolve().parents[2];home=(root/'index.html').read_text()
# Keep shared header/footer markup and styling, adapting only navigation URLs and active state.
head=home[:home.index('    <main')]
head=re.sub(r'<title>.*?</title>','<title>Nos parfums — ALMANZOR Parfums</title>',head)
head=head.replace('href="assets/hero-reference-clean.webp"','href="assets/catalog-hero.webp"').replace('<body>','<body class="catalog-page">')
head=re.sub(r'    <link rel="stylesheet" href="(?:editorial|collection|signature|heritage)\.css" />\n','',head)
head=head.replace('    <script src="app.js" defer></script>','    <link rel="stylesheet" href="catalog.css" />\n    <script src="app.js" defer></script>')
head=head.replace('<a class="active" href="#accueil" aria-current="page">Accueil</a>','<a href="index.html">Accueil</a>')
head=head.replace('<a href="nos-parfums.html">Nos parfums</a>','<a class="active" href="nos-parfums.html" aria-current="page">Nos parfums</a>')
head=head.replace('<a href="#parfums">Nos parfums</a>','<a class="active" href="nos-parfums.html" aria-current="page">Nos parfums</a>')
head=re.sub(r'href="#(accueil|maison|sillage|points-de-vente)"',lambda m:f'href="index.html#{m[1]}"',head)
body='''    <main id="main">
      <section class="catalog-hero" aria-labelledby="catalog-title">
        <img class="catalog-hero-scene" src="assets/catalog-hero.webp" width="741" height="344" alt="Les quatre parfums ALMANZOR sur des roches dorées, devant un marbre vert profond" />
        <div class="catalog-hero-copy"><p class="eyebrow">Nos parfums</p><h1 id="catalog-title"><span>Quatre créations,</span><span>une même signature.</span></h1><span class="catalog-rule" aria-hidden="true"></span><p class="catalog-intro"><span>Des parfums aux caractères uniques, inspirés par un</span> <span>héritage riche et portés par une vision contemporaine.</span> <span>Chaque fragrance raconte une facette de l’homme</span> <span>ALMANZOR : moderne, audacieux et authentique.</span></p></div>
      </section>
      <section class="catalog-benefits" aria-label="Les engagements de nos parfums">
'''
benefits=['Des ingrédients<br />sélectionnés avec soin','Des parfums au<br />sillage unique','Une qualité<br />intemporelle','Une élégance<br />pour chaque instant']
for i,text in enumerate(benefits):body+=f'        <div><img src="assets/catalog-benefit-{i+1}.webp" width="45" height="46" alt="" /><p>{text}</p></div>\n'
body+='      </section>\n'
products=[
 {'key':'blade','name':'BLADE','tag':'Une signature affirmée.','lines':['Des notes fraîches et boisées pour un parfum','à la fois puissant et sophistiqué. BLADE incarne','l’élégance moderne et la maîtrise de soi.'],'notes':['Agrumes<br />frais','Bois nobles','Notes<br />aromatiques'],'photo':[415,303],'note':45,'button':148},
 {'key':'yaya','name':'YAYA','tag':'Une chaleur qui vous accompagne.','lines':['Des notes ambrées et épicées pour un parfum','élégant et captivant. YAYA révèle un caractère','lumineux et raffiné, pensé pour l’homme qui','avance avec assurance.'],'notes':['Notes<br />ambrées','Épices<br />raffinées','Accord<br />boisé'],'photo':[372,316],'note':44,'button':152},
 {'key':'monsieur-rouge','name':'MONSIEUR ROUGE','tag':'Une intensité qui marque les esprits.','lines':['Des notes épicées et boisées pour un parfum','audacieux et sophistiqué. MONSIEUR ROUGE','incarne la force de caractère et l’élégance affirmée.'],'notes':['Épices<br />précieuses','Bois nobles','Ambres<br />sensuels'],'photo':[403,287],'note':45,'button':206},
 {'key':'black-eden','name':'BLACK EDEN','tag':'Un mystère qui vous suit.','lines':['Des notes boisées et ambrées pour un parfum','profond et magnétique. BLACK EDEN incarne','l’élégance sombre et le charisme naturel.'],'notes':['Bois<br />élégants','Ambres<br />profonds','Touches<br />végétales'],'photo':[379,304],'note':45,'button':194}
]
for p in products:
 k=p['key'];name=p['name'];description=' '.join(p['lines']);notes=''
 for i,n in enumerate(p['notes']):notes+=f'<figure><img src="assets/catalog-note-{k}-{i+1}.webp" width="{p["note"]}" height="{p["note"]}" alt="" loading="lazy" /><figcaption>{n}</figcaption></figure>'
 lines=' '.join(f'<span>{escape(t)}</span>' for t in p['lines'])
 body+=f'''      <section class="perfume-story story-{k}" id="{k}" aria-labelledby="title-{k}">
        <div class="perfume-photo"><img src="assets/catalog-product-{k}.webp" width="{p['photo'][0]}" height="{p['photo'][1]}" alt="{name}, flacon ALMANZOR dans son univers photographique" loading="lazy" /></div>
        <div class="perfume-copy"><p class="eyebrow">Eau de parfum</p><h2 id="title-{k}">{name}</h2><h3>{p['tag']}</h3><p class="perfume-description">{lines}</p><div class="perfume-notes" aria-label="Les notes de {name}">{notes}</div><button class="button story-button" data-product="{k}" data-product-description="{escape(description,quote=True)}" data-product-image="assets/catalog-product-{k}.webp">Découvrir {name} <img src="assets/arrow-right.svg" width="16" height="16" alt="" /></button></div>
      </section>
'''
body+='''      <section class="catalog-signature" aria-labelledby="catalog-signature-title">
        <img class="catalog-signature-scene" src="assets/catalog-signature.webp" width="741" height="167" alt="Terrasse marocaine dans la lumière dorée, monogramme ALMANZOR fixé au mur" loading="lazy" />
        <div class="catalog-signature-copy"><img class="catalog-monogram" src="assets/heritage-monogram.webp" width="120" height="106" alt="Monogramme ALMANZOR" loading="lazy" /><h2 id="catalog-signature-title">Plus qu’un parfum,<br />une signature.</h2><a class="button" href="la-maison.html">Découvrir l’univers ALMANZOR <img src="assets/arrow-right.svg" width="16" height="16" alt="" /></a></div>
      </section>
'''
newsletter=home[home.index('      <section class="newsletter"'):home.index('    </main>')]
newsletter=newsletter.replace('class="newsletter"','class="newsletter catalog-newsletter"').replace('Recevez nos nouveautés et inspirations.','Recevez nos nouveautés, nos inspirations et nos offres exclusives.')
body+=newsletter+'    </main>\n'
footer=home[home.index('    <footer'):]
footer=re.sub(r'href="#(accueil|maison|sillage|points-de-vente)"',lambda m:f'href="index.html#{m[1]}"',footer).replace('href="#parfums"','href="nos-parfums.html"').replace('href="index.html#accueil"\n          class="back-top"','href="#accueil"\n          class="back-top"')
(root/'nos-parfums.html').write_text(head+body+footer)
(root/'qa/catalog-v1/content.json').write_text(json.dumps(products,ensure_ascii=False,indent=2))
