from pathlib import Path
from io import BytesIO
from PIL import Image, ImageCms
import json

root = Path(__file__).resolve().parents[2]
source = Path('/var/folders/0c/xkrqjtv17ss72wnz_qd97zd80000gn/T/TemporaryItems/NSIRD_screencaptureui_f6mkPY/Screenshot 2026-10-21 at 10.40.03.png')
image = Image.open(source)
if image.info.get('icc_profile'):
    image = ImageCms.profileToProfile(image, ImageCms.ImageCmsProfile(BytesIO(image.info['icc_profile'])), ImageCms.createProfile('sRGB'), outputMode='RGB')
image.save(root / 'qa/footer-v2/reference-srgb.png')
manifest = json.loads((root / 'assets/manifest.json').read_text())
for name, box in [('footer-newsletter-left.webp', (0, 0, 650, 458)), ('footer-newsletter-right.webp', (1680, 0, 2332, 458)), ('footer-newsletter-center.webp', (650, 0, 1680, 100))]:
    image.crop(box).save(root / 'assets' / name, lossless=True)
    manifest = [entry for entry in manifest if entry.get('asset') != name]
    manifest.append({'asset': name, 'source': source.name, 'crop': box, 'postprocessing': 'UI-free background region, color-managed from Display to sRGB; no generated artwork.'})
for name, path in [('footer-instagram.svg', 'brands/instagram'), ('footer-facebook.svg', 'brands/facebook-f'), ('footer-video.svg', 'solid/play')]:
    manifest = [entry for entry in manifest if entry.get('asset') != name]
    manifest.append({'asset':name,'source':f'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/{path}.svg','license':'Font Awesome Free, icons CC BY 4.0; source license notice retained.'})
(root / 'assets/manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')

newsletter = '''      <section class="newsletter shared-newsletter" aria-labelledby="newsletter-title">
        <div class="container">
          <h2 id="newsletter-title">Rejoignez notre univers</h2>
          <p>Recevez nos nouveautés et nos inspirations.</p>
          <form id="newsletter-form">
            <label class="sr-only" for="email">Votre adresse e-mail</label>
            <input id="email" name="email" type="email" placeholder="Votre adresse e-mail" autocomplete="email" required maxlength="254" />
            <button class="button button-gold" type="submit">S’inscrire <img src="assets/arrow-right.svg" width="18" height="18" alt="" /></button>
          </form>
          <p id="newsletter-status" role="status" aria-live="polite"></p>
        </div>
      </section>'''
footer = '''    <footer class="footer shared-footer" id="footer">
      <div class="container footer-grid">
        <a class="brand" href="index.html#accueil" aria-label="ALMANZOR — Accueil"><img src="assets/logo-transparent.webp" width="700" height="386" alt="ALMANZOR Parfums" loading="lazy" /></a>
        <div class="footer-column">
          <h2>Navigation</h2>
          <a href="index.html#accueil">Accueil</a>
          <a href="la-maison.html">La Maison</a>
          <a href="nos-parfums.html">Nos parfums</a>
          <a href="index.html#sillage">L’Univers ALMANZOR</a>
          <a href="index.html#points-de-vente">Points de vente</a>
        </div>
        <div class="footer-column">
          <h2>Nos parfums</h2>
          <a href="nos-parfums.html#blade">BLADE</a>
          <a href="nos-parfums.html#yaya">YAYA</a>
          <a href="nos-parfums.html#monsieur-rouge">MONSIEUR ROUGE</a>
          <a href="nos-parfums.html#black-eden">BLACK EDEN</a>
        </div>
        <div class="footer-column">
          <h2>Informations</h2>
          <a href="index.html#points-de-vente">Livraison</a>
          <button type="button" data-info="contact">Contact</button>
          <button type="button" data-info="faq">FAQ</button>
          <button type="button" data-info="legal">Mentions légales</button>
        </div>
        <div class="footer-column footer-follow">
          <h2>Suivez-nous</h2>
          <div class="footer-social-links">
            <a href="https://www.instagram.com/almanzor.parfums/" target="_blank" rel="noopener noreferrer" aria-label="ALMANZOR sur Instagram"><img src="assets/footer-instagram.svg" width="28" height="28" alt="" /></a>
            <button type="button" data-info="facebook" aria-label="Facebook — informations"><img src="assets/footer-facebook.svg" width="18" height="28" alt="" /></button>
            <button type="button" data-info="youtube" aria-label="YouTube — informations"><img src="assets/footer-video.svg" width="28" height="28" alt="" /></button>
          </div>
        </div>
      </div>
      <div class="container copyright">
        <p>© 2026 ALMANZOR PARFUMS. Tous droits réservés.</p>
        <nav class="footer-legal" aria-label="Informations légales">
          <button type="button" data-info="privacy">Confidentialité</button>
          <span aria-hidden="true">·</span>
          <button type="button" data-info="terms">Conditions générales</button>
        </nav>
      </div>
    </footer>'''
for name in ['index.html','nos-parfums.html','la-maison.html']:
    path=root/name
    text=path.read_text()
    start=text.index('      <section class="newsletter')
    end=text.index('      </section>',start)+len('      </section>')
    text=text[:start]+newsletter+text[end:]
    start=text.index('    <footer ')
    end=text.index('    </footer>',start)+len('    </footer>')
    text=text[:start]+footer+text[end:]
    if 'shared-footer.css' not in text:
        text=text.replace('    <script src="app.js" defer></script>','    <link rel="stylesheet" href="shared-footer.css" />\n    <script src="app.js" defer></script>')
    path.write_text(text)
