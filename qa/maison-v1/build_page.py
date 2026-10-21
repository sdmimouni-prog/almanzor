from pathlib import Path
import re
root=Path(__file__).resolve().parents[2]
base=(root/'nos-parfums.html').read_text()
head=base[:base.index('    <main')]
head=head.replace('Nos parfums — ALMANZOR Parfums','La Maison — ALMANZOR Parfums').replace('assets/catalog-hero.webp','assets/maison-hero.webp').replace('href="catalog.css"','href="maison.css"').replace('class="catalog-page"','class="maison-page"')
head=head.replace('<a class="active" href="nos-parfums.html" aria-current="page">Nos parfums</a>','<a href="nos-parfums.html">Nos parfums</a>')
head=re.sub(r'<a href="(?:index.html#maison|la-maison.html)">La Maison</a>','<a class="active" href="la-maison.html" aria-current="page">La Maison</a>',head)
head=re.sub(r'content="Découvrez ALMANZOR, Maison marocaine de parfums masculins\.[^"]+"','content="La Maison ALMANZOR : un héritage marocain et arabo-andalou, une vision moderne du parfum, des matières nobles et une signature singulière."',head)
arrow='<img src="assets/arrow-right.svg" width="16" height="16" alt="" />'
def lines(a):return ' '.join('<span>'+x+'</span>' for x in a)
body='''    <main id="main">
      <section class="maison-hero maison-section" aria-labelledby="maison-page-title">
        <picture class="maison-scene"><source media="(max-width: 999px)" srcset="assets/maison-hero-mobile.webp" /><img src="assets/maison-hero.webp" width="770" height="397" alt="Entrée de la Maison ALMANZOR, porte marocaine sculptée et olivier baignés de lumière dorée" fetchpriority="high" /></picture>
        <div class="maison-copy"><p class="eyebrow">La Maison</p><h1 id="maison-page-title">Un héritage,<br />une vision moderne.</h1><span class="maison-rule" aria-hidden="true"></span>
          <p class="maison-text">'''+lines(['ALMANZOR Parfums puise son inspiration dans un','patrimoine riche et intemporel pour créer des parfums','d’exception. Chaque fragrance est le fruit d’un savoir-faire','rigoureux et d’une passion pour l’élégance.'])+f'''</p>
          <a class="button maison-button" href="#histoire">Notre histoire {arrow}</a>
        </div>
      </section>
      <section class="maison-inspiration maison-section" id="histoire" aria-labelledby="histoire-title">
        <picture class="maison-scene"><source media="(max-width: 999px)" srcset="assets/maison-inspiration-mobile.webp" /><img src="assets/maison-inspiration.webp" width="770" height="290" alt="Cour et arches sculptées d’un palais marocain, palmiers et montagnes au loin" loading="lazy" /></picture>
        <div class="maison-copy"><p class="eyebrow">Notre inspiration</p><h2 id="histoire-title">Entre héritage<br />et contemporanéité.</h2><span class="maison-rule" aria-hidden="true"></span><p class="maison-text">'''+lines(['ALMANZOR est un hommage à un héritage arabo-andalou','et marocain, réinterprété avec une vision contemporaine.','Nos parfums incarnent la rencontre entre la richesse','de notre culture, la noblesse des matières et l’élégance','moderne de l’homme d’aujourd’hui.'])+'''</p></div>
      </section>
      <section class="maison-benefits" aria-label="La signature de nos parfums">
'''
for i,label in enumerate(['Des ingrédients<br />sélectionnés avec soin','Des parfums au<br />sillage unique','Une qualité<br />intemporelle','Une élégance<br />pour chaque instant']):
 body+=f'        <div><img src="assets/maison-benefit-{i+1}.webp" width="52" height="54" alt="" loading="lazy" /><p>{label}</p></div>\n'
body+='''      </section>
      <section class="maison-materials maison-section" id="savoir-faire" aria-labelledby="materials-title">
        <picture class="maison-scene"><source media="(max-width: 999px)" srcset="assets/maison-materials-mobile.webp" /><img src="assets/maison-materials.webp" width="770" height="293" alt="Bois précieux et ambre dans la lumière dorée sur une pierre noire veinée" loading="lazy" /></picture>
        <div class="maison-copy"><p class="eyebrow">Un savoir-faire authentique</p><h2 id="materials-title">Des matières<br />nobles et rares.</h2><span class="maison-rule" aria-hidden="true"></span><p class="maison-text">'''+lines(['Nous sélectionnons avec exigence les plus belles','matières premières : bois précieux, ambres rares,','épices nobles et notes aromatiques d’exception.','Chaque ingrédient est choisi pour sa qualité, son','caractère et sa capacité à créer des émotions durables.'])+f'''</p><button class="button maison-button" type="button" data-story="matieres">Notre savoir-faire {arrow}</button></div>
      </section>
      <section class="maison-vision maison-section" id="vision" aria-labelledby="vision-title">
        <img class="maison-vision-scene" src="assets/maison-vision.webp" width="770" height="256" alt="Terrasse sur les montagnes et Marrakech au coucher du soleil, monogramme ALMANZOR sur la pierre" loading="lazy" />
        <div class="maison-copy"><p class="eyebrow">Notre vision</p><h2 id="vision-title">Créer des parfums<br />qui traversent le temps.</h2><p class="maison-text">'''+lines(['Plus qu’une maison de parfums, ALMANZOR est une vision :','celle d’une élégance masculine affirmée, inspirée par l’histoire','et tournée vers l’avenir.'])+'''</p></div>
      </section>
      <section class="maison-art maison-section" id="art-du-parfum" aria-labelledby="art-title">
        <picture class="maison-scene"><source media="(max-width: 999px)" srcset="assets/maison-art-mobile.webp" /><img src="assets/maison-art.webp" width="770" height="248" alt="YAYA, BLADE, MONSIEUR ROUGE et BLACK EDEN sur les pierres de la Maison" loading="lazy" /></picture>
        <div class="maison-copy"><p class="eyebrow">Une signature singulière</p><h2 id="art-title">L’art du parfum<br />au quotidien.</h2><p class="maison-text">'''+lines(['Nos créations accompagnent l’homme dans tous les','moments de sa vie. Chaque parfum raconte une facette','de sa personnalité : force, raffinement, audace ou mystère.'])+f'''</p><a class="button maison-button" href="nos-parfums.html">Découvrir nos parfums {arrow}</a></div>
      </section>
      <section class="maison-commitment" id="engagements" aria-labelledby="engagement-title">
        <div class="maison-copy"><p class="eyebrow">Notre engagement</p><h2 id="engagement-title">Une parfumerie<br />responsable et durable.</h2><p class="maison-text">'''+lines(['Nous avançons avec la même exigence pour demain :','en privilégiant des pratiques respectueuses de la qualité,','des personnes et de notre environnement.'])+'''</p></div>
        <div class="commitment-list">
'''
for i,label in enumerate(['Ingrédients<br />responsables','Packaging<br />soigné','Production<br />en conscience']):
 body+=f'          <div><img src="assets/maison-commitment-{i+1}.webp" width="52" height="54" alt="" loading="lazy" /><p>{label}</p></div>\n'
body+='''        </div>
      </section>
'''
newsletter=base[base.index('      <section class="newsletter'):base.index('    </main>')].replace('catalog-newsletter','maison-newsletter')
body+=newsletter+'    </main>\n'
footer=base[base.index('    <footer'):].replace('href="index.html#maison"','href="la-maison.html"')
(root/'la-maison.html').write_text(head+body+footer)
