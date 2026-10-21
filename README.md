# ALMANZOR Parfums

Site vitrine statique en HTML, CSS et JavaScript : Accueil, Nos parfums et La Maison. Les images et les polices sont incluses dans `assets/` ; aucune compilation ni installation de dépendances n’est nécessaire.

## Lancer le site

Avec Python 3 installé :

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Ouvrir http://127.0.0.1:4173/ dans le navigateur. `npm run dev` exécute la même commande.

Le site peut être servi par un hébergement statique en publiant ce dossier à la racine. Les scripts et rapports de contrôle sont conservés dans `qa/` ; les captures et vidéos volumineuses restent locales. Les anciens scripts de préparation d’images et les contrôles Playwright utilisent les chemins du poste d’origine et ne sont pas nécessaires au fonctionnement du site.

La newsletter n’est pas reliée à un service d’inscription. Les adresses officielles Facebook et YouTube restent à renseigner.

## Historique de l’intégration

## Newsletter et footer communs — nouvelle référence

Les trois pages (`index.html`, `nos-parfums.html`, `la-maison.html`) partagent désormais la newsletter et le footer de la capture du 21 octobre : fond vert, grand logo, colonnes Navigation / Nos parfums / Informations / Suivez-nous, puis copyright et liens légaux. Styles communs dans `shared-footer.css`, responsive en quatre puis deux colonnes. Les animations de l’accueil sont conservées.

Aperçu : http://127.0.0.1:4173/la-maison.html#footer. Comparaison de même taille, captures et contrôles des trois routes de 319 à 2332 px dans `qa/footer-v2/`. Le script `prepare.py` réapplique le balisage commun aux trois pages et prépare les fonds à partir de zones sans interface de la référence ; provenance dans le manifeste des assets.

Instagram conserve son lien existant. Les URL Facebook et YouTube restent à renseigner ; leurs boutons affichent actuellement une information explicite. La newsletter n’est toujours pas connectée à un service et ne transmet pas les adresses saisies. Les descriptions historiques des newsletters et footers ci-dessous sont remplacées par cette version.

## Animations originales de toute la page au scroll

Les dix blocs de l’accueil, hero et footer inclus, ont chacun une mise en scène à leur première apparition : titre du hero dévoilé ligne par ligne et recul photographique, rideau latéral de la Maison, ouverture opposée des deux univers, cascade des flacons, dévoilement vertical de la macro, apparition du monogramme Signature, légère impulsion des pictogrammes, volets alternés sur les photos, formulaire ouvert depuis son centre, puis colonnes du footer en séquence courte. Les survols précédents restent actifs.

`scroll-motion.css` est chargé seulement sur l’accueil. `initSectionMotion` dans `app.js` observe les sections stables et vérifie la position de leurs éléments masqués au maximum une fois par frame, uniquement lorsqu’elles sont visibles. Les éléments situés plus bas sur mobile attendent leur entrée réelle à l’écran. Chaque animation joue une fois ; les observateurs et écouteurs de scroll sont retirés une fois le bloc révélé. Focus clavier immédiat, réduction des mouvements et contenu visible sans JavaScript.

Contrôles à 1440, 768, 390 et 319 px dans `qa/scroll-motion/` : chaque bloc déclenché, aucune modification des dimensions ni largeur débordante, aucun contenu restant masqué en fin de lecture. Aperçu vidéo : `qa/scroll-motion/scroll-preview.webm`. Les précédentes suites de contrôle des animations et survols restent disponibles dans `qa/collection-motion/` et `qa/signature-motion/`.

## Animations du bandeau, des services et de la galerie

Le bandeau Signature, les quatre services et la galerie Instagram apparaissent progressivement à leur première entrée à l’écran. Survol : léger zoom du décor, mouvement de la flèche du bouton, élévation des pictogrammes, texte bronze et zoom des photos. Les liens gardent un effet au focus clavier ; les services restent de simples informations. Les décalages s’adaptent aux rangées sur mobile et les mouvements respectent `prefers-reduced-motion`.

Styles dans `signature.css`. `app.js` mutualise le déclenchement avec la sélection déjà animée via `initSectionMotion`. Contrôles et captures dans `qa/signature-motion/` ; vérification de la sélection précédente réussie après la mutualisation. Aucun changement de contenu, de navigation ou de dimensions.

## Animations de la sélection

La section « Notre sélection » apparaît en fondu et remontée légère lors de sa première entrée à l’écran, y compris à l’ouverture directe de `#parfums`. Les quatre créations sont décalées de 100 ms sur desktop ; sur mobile, chaque rangée conserve un décalage court. Au survol : zoom du flacon de 2,5 %, déplacement de 2 px, titre et bouton dorés, flèche décalée de 4 px. Les effets sont aussi accessibles au clavier et désactivent leurs mouvements selon `prefers-reduced-motion`. Aucune animation en boucle ni dépendance ajoutée.

Modifications limitées à `collection.css` et à l’initialisation de cette section dans `app.js`. Contrôles d’apparition, survol, clavier, mobile, dialogues et rotation dans `qa/collection-motion/` ; captures `selection-rest.png`, `selection-hover.png` et `selection-mobile.png`.

## Hero limité à une fenêtre

Le hero d’accueil occupe désormais `100svh` : menu, titre, texte, bouton et flacon visibles ensemble. Un seul visuel fixe, aucun slider. Mise à l’échelle selon largeur et hauteur ; grille adaptée en portrait, variante paysage compact. Modification dans `hero.css`, contrôles sur 12 formats de 319×568 à 2560×720 dans `qa/hero-viewport/`. Le défilement de la page continue normalement vers les sections suivantes.

## Page La Maison — intégration de la référence

Page `la-maison.html`, reliée aux menus et aux liens La Maison de l’accueil et du catalogue. Header et footer communs conservés ; styles de contenu isolés dans `maison.css`. Huit sections fidèles à `La Maison Almanzor Parfums.png` : Hero, inspiration, quatre bénéfices, matières, vision, quatre parfums, engagements et newsletter claire. Les textes et commandes sont natifs HTML, les photographies et pictogrammes proviennent de la référence.

Assets optimisés : 23 fichiers `assets/maison-*`, inventoriés dans `assets/manifest.json`. Seuls les fonds cachés par l’interface ont été restaurés avec ImageGen ; provenance, prompt et scripts dans `qa/maison-v1/`. Les photos restent originales hors masque. `app.js` ajoute le dialogue des matières et dirige la recherche vers le catalogue quand le produit n’est pas présent sur la page courante.

QA : contrôles de 319 à 1920 px, comparaisons visuelles à 1540 px normalisées à la référence 770 px, aucune ressource manquante, erreur JS ou largeur débordante. Accueil et catalogue inchangés visuellement (différence pixel maximale zéro à 1440 px). `qa/maison-v1/page-final.jpg`, `full-390.png`, `comparison-full.jpg`, `checks.json` et rapport `design-qa.md`. Le rapport précédent est archivé dans `qa/catalog-v1/design-qa.md`.

Le formulaire de newsletter indique toujours son absence de connexion à un service. Le site reste local, sans publication ni backend ajouté.

# ALMANZOR PARFUMS — Intégration de la homepage
## Page Nos parfums

Nouvelle page locale : `nos-parfums.html`, accessible depuis le menu, le Hero et la carte Nos parfums de l’accueil. Header et footer partagés visuellement avec l’accueil ; seul l’état actif et les destinations des liens changent. Intégration de `Almanzor Parfums_ Quatre Signatures Élégantes.png` : Hero, quatre engagements, présentations alternées de BLADE/YAYA/MONSIEUR ROUGE/BLACK EDEN, douze vignettes olfactives, signature et newsletter. Styles isolés dans `catalog.css`.

Les quatre boutons ouvrent la photo et la description correspondantes ; recherche, menu mobile et retour vers les sections de l’accueil sont reliés. La newsletter garde le comportement existant et annonce explicitement son absence de connexion, sans transmettre l’adresse. `app.js` accepte les données des fiches et protège les événements du carrousel absent de cette nouvelle page.

QA : `qa/catalog-v1/check.cjs`, `checks.json`, `comparison-full.jpg`, captures desktop/mobile et `pixel-checks.json`. Référence 741 × 2123 ; rendu desktop de contrôle à 1482 px normalisé par deux. Header/footer du raster exclus de l’objectif de copie puisqu’ils sont conservés depuis le site existant. Documentation des assets dans `qa/catalog-v1/asset-provenance.md`, rapport actuel dans `design-qa.md`. Générateur statique `qa/catalog-v1/build_page.py` pour reprendre le header/footer depuis l’accueil ; aucun générateur ni dépendance requis pour servir le site.

## Nouvelle référence — savoir-faire et signature

`Luxury Perfume Heritage in Golden Light.png` remplace les deux versions précédentes du savoir-faire et du bandeau signature. À 1536 px : panneau supérieur de 517 px, photographie macro native de 827 × 517, bouton encadré ; bandeau inférieur de 507 px avec monogramme et contenu centrés. Styles isolés dans `heritage.css`, assets sans perte `assets/heritage-*`.

Captures et comparaisons : `qa/heritage-v3/`. Provenance et prompt dans `asset-provenance.md`, contrôles dans `check.cjs`, rapport actuel dans `design-qa.md`. Régressions vérifiées pour le menu/Hero, la Maison, les univers, la sélection, les services et Instagram. La newsletter et le footer restent à reprendre.

## Reprise actuelle — signature, services et Instagram

Intégration de `L’univers Almanzor_ Signature Parfumée.png` dans `signature.css` : bandeau de 500 px, services sur 181 px et inspiration sur 343 px à 1536 px de large. Les six photographies et les quatre pictogrammes de la référence sont extraits sans redessin. Le grand monogramme du mur est conservé. Le bouton mène à la Maison ; le compte et les six images de la galerie pointent vers Instagram `@almanzor.parfums`.

Captures, comparaisons et contrôles : `qa/signature-v2/`. Provenance dans `asset-provenance.md`, tests dans `check.cjs`, rapport courant dans `design-qa.md`. Contrôles responsive aux largeurs 319, 390, 768, 1440, 1536 et 1920 px ; régressions des six blocs précédemment validés. Les mentions de bandeau institutionnel manquant ci-dessous décrivent l’ancienne version et sont remplacées pour ces sections. La newsletter et le footer restent à reprendre.

## Reprise actuelle — sélection et savoir-faire

Les deux blocs de `Luxury Perfume Collection and Craftsmanship.png` sont intégrés dans `collection.css` : sélection sur 579 px puis savoir-faire sur 445 px à 1536 px de large. Les flacons et le capuchon sont extraits sans redessin. Les textes et boutons sont en HTML ; les flèches font tourner les quatre créations existantes. Les boutons ouvrent leurs fiches ou le dialogue du savoir-faire.

Contrôles : `qa/collection-v2/check.cjs`, captures aux largeurs 319, 390, 768, 1440, 1536 et 1920 ; comparaison 1536 × 1024 et régressions des blocs déjà validés. Provenance dans `qa/collection-v2/asset-provenance.md`, contrôle courant dans `design-qa.md`. Les anciennes mentions de macro manquante et les premiers visuels de sélection ci-dessous sont remplacés pour ces deux sections. Les autres blocs restent à reprendre selon les prochaines références.


Version autonome en HTML5, CSS et JavaScript, sans dépendance d’exécution. Créée dans un dossier séparé pour préserver les autres projets de l’espace de travail.

## Mise à jour — La Maison et Notre univers

Les deux blocs sont reconstruits depuis `Almanzor Parfums_ A Luxury Editorial Webpage.png` avec un CSS isolé dans `editorial.css`. Composition de référence : 1774 × 887 px, soit 460 px pour la Maison puis 427 px pour l’Univers. Textes et commandes sont de vrais éléments HTML.

- Aperçu : http://127.0.0.1:4173/#maison.
- Capture finale : `qa/editorial-v2/blocks-1774.png`.
- Comparaison : `qa/editorial-v2/comparison-full.jpg`.
- Responsive et contrôles : même dossier, largeurs 319/390/768/1440/1774/1920 px.
- Rapport courant : `design-qa.md` ; provenance : `qa/editorial-v2/asset-provenance.md`.
- La capture du menu/Hero approuvés est inchangée pixel pour pixel lors du test de régression à 1672 × 941 px.

## Mise à jour — Menu et Hero, nouvelle référence

Le bloc initial est remplacé par une reconstruction de `Timeless Luxury Perfume Hero Banner.png`. Le CSS de cette reprise est isolé dans `hero.css`. Le logo, le titre, les liens et les boutons sont de vrais éléments HTML ; le décor photographique est débarrassé de l’interface d’origine. Le flacon et les pierres de la nouvelle référence sont conservés sans modification de pixels dans les régions vérifiées.

- Capture de référence desktop : `qa/hero-v2/hero-1672.png`.
- Comparaison source/rendu : `qa/hero-v2/comparison-full.jpg`.
- Captures à 1440, 1920, 768 et 390 px : même dossier.
- Rapport courant : `design-qa.md`, limité au menu et au Hero.
- Provenance et prompt d’édition du décor : `qa/hero-v2/asset-provenance.md`.

Les remarques ci-dessous sur le premier Hero et ses assets manquants décrivent l’intégration initiale. Elles sont remplacées, pour ce bloc uniquement, par le rapport courant. Les autres blocs restent en attente de reprise section par section.

## Aperçu local

Depuis ce dossier : `npm run dev`, puis ouvrir http://127.0.0.1:4173. Un serveur statique suffit pour l’hébergement. Aucun build requis.

## Fichiers livrés

- `index.html` : neuf sections de contenu et footer, contenu français, navigation, dialogue produit et formulaire.
- `styles.css` : palette, polices locales, grilles, points de rupture desktop/tablette/mobile, focus, réduction des mouvements.
- `app.js` : menu mobile, dialogues des quatre produits, histoire et informations, validation et état explicite du formulaire non connecté.
- `assets/` : fichiers WebP optimisés, polices locales Cormorant Garamond et Inter, pictogrammes Lucide.
- `assets/manifest.json` : provenance des images et recadrages initiaux.
- `prepare_assets.py`, `refine_assets.py` : préparation locale des images depuis les téléchargements. Nécessitent Pillow ; sans effet sur l’exécution du site. L’extraction du fond des photos conserve les pixels des flacons ; le logo n’est pas redessiné.
- `qa/desktop-1440.png` et `qa/mobile-390.png` : captures complètes.
- `qa/desktop-768.png`, `qa/desktop-1920.png` : captures complémentaires.
- `qa/check.cjs`, `qa/checks.json` : contrôles Playwright et résultats. Le script utilise le navigateur déjà installé sur cette machine ; adapter ses chemins sur un autre poste.
- `qa/comparison-desktop.jpg`, `qa/comparison-hero.jpg`, `qa/comparison-products.jpg`, `qa/comparison-craft.jpg` : comparaisons avec la maquette.
- `design-qa.md` : contrôle visuel et limites de fidélité.

## Sources retrouvées et utilisées

- Maquette : `Almanzor Parfums — L’art du parfum.png`, 742 × 2120 px.
- Logo fourni : `Image ChatGPT 20 oct. 2026, 22_24_19.jpg`, 1536 × 1024 px.
- Photo officielle des quatre produits : `WhatsApp Image 2026-10-20 at 17.42.42.jpeg`, 1280 × 955 px.
- Campagnes : `Almanzor Blade_ A Signature in Gold.png`, `YAYA_ A Luminous Refined Character.png`, `Monsieur Rouge Luxury Perfume Campaign.png`, `Black Eden_ A Mysterious Botanical Fragrance.png`, 941 × 1672 px chacune.

Seuls BLADE, YAYA, MONSIEUR ROUGE et BLACK EDEN sont présentés. La photo de groupe définit les visuels des cartes. Le Hero et la macro utilisent la campagne BLADE. Aucun nouveau flacon, prix, volume, avis, promotion ou note olfactive n’a été créé.

## Éléments manquants pour une fidélité photographique stricte

1. Fond panoramique original du Hero, en haute définition et sans texte/interface. Le visuel disponible est une campagne verticale : sa composition diffère de la maquette. Le véritable flacon BLADE remplace celui du concept, comme demandé.
2. Photographie originale de l’arche de la section Maison. Le recadrage de la maquette mesure seulement 328 × 211 px ; cette faible définition reste perceptible sur desktop. Le même asset sert actuellement à la carte « Notre univers ».
3. Photographie macro originale du capuchon vue de dessus, avec l’angle de la maquette. La version livrée montre une autre vue du vrai capuchon BLADE, recadrée dans sa campagne.
4. Photographie panoramique originale du bandeau institutionnel, sans slogan ni interface. La version utilise provisoirement l’arche disponible ; elle ne reproduit pas le panorama de palmiers de la maquette.
5. Photos individuelles de la galerie Instagram en haute définition. Deux détails décoratifs proviennent de la petite maquette ; les quatre autres cases utilisent les campagnes réelles fournies. Ce n’est pas un flux Instagram connecté.
6. Logo officiel transparent ou vectoriel natif. Le marquage fourni est conservé après extraction du fond vert ; le fichier natif permettrait une meilleure netteté.

Ces différences sont explicites et empêchent de certifier une correspondance « Pixel Perfect ». Aucun visuel de produit générique ni image générée ne les masque. La capture entière n’est jamais affichée comme fond du site.

## Connexions et contenus à compléter

- Newsletter : aucun service ni endpoint fourni. La validation e-mail est native ; après validation, un message précise qu’aucune transmission ni inscription n’a eu lieu. L’adresse n’est stockée ni dans le navigateur ni sur un serveur.
- Commande : liens vers `https://almanzor.ma/`, sans panier, paiement ou commande simulée. Le domaine n’a pas pu être résolu depuis l’environnement de travail lors de la vérification du 20 octobre 2026 ; aucune URL de fiche produit n’est supposée.
- Mentions légales, coordonnées de contact et politique de confidentialité complètes : à fournir par la Maison avant mise en production. Les fenêtres d’information actuelles indiquent leur statut, sans inventer de données légales.
- Liens sociaux exacts et inventaire des points de vente : à confirmer. Aucun compte ou magasin n’est inventé.

## Vérification

Tests aux largeurs 390, 768, 1440 et 1920 px : pas de débordement horizontal, images chargées, zéro erreur JavaScript/HTTP, menu ouvrable/fermable par bouton, lien et Échap, quatre fiches produits accessibles, dialogues fermables, retour du focus, validation e-mail et absence de POST newsletter. Les captures montrent la page au repos, avec les images chargées et sans état de survol imposé.

Les écarts de contenu expressément demandés (catégories masculines, BLACK EDEN, suppression des prix et panier, trois messages de réassurance) priment sur la capture. Le rapport distingue ces changements des écarts photographiques restants.

## Crédits techniques

Polices : Cormorant Garamond et Inter, Google Fonts, licences OFL. Icônes : Lucide 0.468.0, licence ISC, trait aminci à 1.25 pour correspondre à la référence. Aucun script, police ou tracker tiers n’est chargé à l’exécution.
