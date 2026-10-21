# QA — Newsletter et footer communs

final result: passed

Référence : `Screenshot 2026-10-21 at 10.40.03.png`, 2332 × 964 px. Périmètre : `index.html`, `nos-parfums.html`, `la-maison.html`.

La newsletter et le footer sont composés de vrais titres, liens, boutons, formulaire et colonnes HTML. Même balisage sur les trois pages, styles isolés dans `shared-footer.css`. La newsletter mesure 458 px et le footer 506 px à la largeur de référence. Logo et quatre colonnes, séparateur, copyright et liens légaux reprennent la nouvelle disposition. Mise en page à quatre colonnes sous le logo sur tablette, puis deux colonnes sur mobile. Les animations de l’accueil et les effets de focus restent actifs.

## Comparaison visuelle

`comparison-full.jpg` juxtapose la référence convertie de son profil Display vers sRGB et le rendu, tous deux à 2332 × 964 px. Inspection des captures desktop et mobile 390/319 px. Ajustements après comparaison : largeur et espacement du titre, taille et position du logo, espacement du copyright et raccords du fond de la newsletter. Aucun écart bloquant de disposition, de contenu, de recouvrement ou de navigation restant. Les petites différences de rasterisation des polices et de dessin des icônes de bibliothèque restent distinctes d’une égalité pixel à pixel.

## Contrôles navigateur

Script `check.cjs`, résultats `checks.json` : trois routes, six largeurs (2332, 1440, 1000, 768, 390 et 319 px), soit 18 configurations. Aucun débordement horizontal ni erreur JavaScript/HTTP. Un seul footer et une seule newsletter par page. Destinations internes et ancres des quatre parfums vérifiées. Dialogues Contact, FAQ, mentions légales, confidentialité, conditions générales et réseaux sociaux ouverts puis fermés avec Échap sur chaque route. Validation native de l’adresse et réponse du formulaire vérifiées : aucune requête, transmission ou sauvegarde d’adresse.

L’entrée au scroll de la newsletter et du nouveau footer sur l’accueil est vérifiée avec mouvement actif, y compris la visibilité du formulaire au focus. Les captures de comparaison sont prises avec réduction des mouvements. Aperçu final confirmé dans le navigateur intégré sur `la-maison.html#footer`.

## Assets et limites fonctionnelles

Le logo existant est réutilisé. Trois zones sans interface de la référence fournissent le fond : côtés natifs et bande centrale vierge étirée verticalement. Aucun texte ni commande rasterisée. Origine et cadrages dans `prepare.py` et `assets/manifest.json`. Icônes Instagram, Facebook et lecture : Font Awesome Free, CC BY 4.0, notices conservées.

Instagram pointe vers le compte déjà présent sur le site. Faute d’adresses Facebook et YouTube fournies ou vérifiées, leurs icônes ouvrent un message explicite au lieu d’inventer des destinations. La newsletter conserve son état existant, non relié à un service. Les panneaux légaux ne créent pas de conditions contractuelles et renvoient vers le site officiel existant.


# QA — Toute la page animée au scroll

final result: passed

Périmètre : les dix blocs de l’accueil, du hero au footer. Chaque chapitre reçoit une entrée adaptée : lignes du titre et zoom arrière photographique ; rideau latéral pour la Maison ; ouvertures opposées des cartes Univers ; cascade des flacons et trait doré ; macro dévoilée depuis le bas et texte latéral ; monogramme agrandi et titre Signature dévoilé ; pictogrammes relevés ; volets photographiques alternés ; formulaire qui s’ouvre depuis son centre ; fermeture en cascade des colonnes du footer. Les animations de survol validées précédemment sont conservées.

Implémentation : `scroll-motion.css`, chargé uniquement dans `index.html`, et évolution de `initSectionMotion` dans `app.js`. Les masques sont déclenchés d’après la géométrie de leurs éléments, avec observation d’un conteneur stable. Les vérifications au scroll sont passives, regroupées dans une frame et limitées aux sections à l’écran ; observateurs et écouteurs retirés quand tous les éléments sont apparus. Aucun scroll forcé, boucle ou nouvelle dépendance. Préparation instantanée des états masqués pour éviter un fondu sortant au démarrage. Les éléments accessibles sont dévoilés immédiatement au focus ; mouvement réduit et absence de JavaScript gardent tous les contenus visibles.

Contrôles `qa/scroll-motion/check.cjs`, `checks.json` : 1440×900, 768×1024, 390×844 et 319×568. Transitions effectivement enregistrées dans les dix blocs à chaque format ; aucun élément restant masqué après lecture complète, aucune erreur JS/HTTP ou largeur débordante pendant les mouvements ; dimensions de chaque section identiques avec animations activées ou désactivées ; hero d’une hauteur de fenêtre conservé ; aucun rejeu lors du retour en haut ; accès clavier au formulaire, réglage réduit à chaud et fonctionnement sans JavaScript vérifiés. Suite de régression de la sélection réussie.

Captures inspectées : `maison-desktop.png`, `univers-desktop.png`, `craft-mobile.png`. Autres captures desktop/mobile dans le même dossier. Aperçu enregistré du défilement réel : `qa/scroll-motion/scroll-preview.webm` (script `record.cjs`).

# QA — Animations Signature, services et Instagram

final result: passed

Entrée progressive du logo, titre et bouton du bandeau Signature, des quatre services et des six photos Instagram, à leur première apparition dans la fenêtre. Délais courts adaptés aux rangées responsive. Survol du bandeau : décor agrandi à 1,018 et flèche du bouton déplacée de 4 px. Services : icônes agrandies à 1,06 et relevées de 4 px, texte bronze. Galerie : agrandissement à 1,045 et léger éclaircissement. Aucun mouvement en boucle, contenu ni disposition modifiés.

`signature.css` contient les styles. `app.js` réutilise le même observateur d’entrée pour ces blocs et pour la sélection, avec visibilité immédiate au focus clavier et prise en compte du réglage de réduction des mouvements. Aucun contenu masqué sans JavaScript ou IntersectionObserver. Les services ne deviennent pas des commandes interactives.

Contrôles passés dans `qa/signature-motion/check.cjs` et `checks.json` : desktop 1536×1050, mobile tactile 390×844 et 319×844 ; opacité intermédiaire mesurée confirmant les cascades ; opacité finale 1 ; absence de rejeu ; transformations de survol mesurées ; focus clavier ; réduction des mouvements au chargement et après changement du réglage ; lien Signature vers La Maison ; destinations Instagram conservées ; aucune erreur JS/HTTP ou largeur débordante. La suite `qa/collection-motion/check.cjs` passe après la mutualisation du comportement.

Captures inspectées : `services-gallery-hover.png`, `services-390.png`, `gallery-319.png` dans `qa/signature-motion/`. Captures complémentaires du bandeau, des services et de la galerie au survol, ainsi que mobile 390 et 319 px dans le même dossier.

# QA — Animations de la sélection

final result: passed

Demande : animations au chargement et au survol du bloc des quatre parfums. Entrée déclenchée à la première apparition dans la fenêtre, une fois par visite : fondu/remontée de 750 ms, décalages de 0/100/200/300 ms sur desktop et par rangées sur mobile. Au repos, la composition de la sélection est conservée. Survol avec zoom discret du flacon, titre et bouton dorés, mouvement de la flèche. Aucun changement au hero ni aux autres pages.

Vérification navigateur à 1536×960 et sur mobile tactile 390×844 (`qa/collection-motion/check.cjs`, `checks.json`) : apparition réellement progressive, fin à opacité 1, aucun rejeu au retour dans la section ; survol effectif ; navigation au clavier et affichage immédiat d’une carte encore masquée lors de sa prise de focus ; ouverture des fiches BLADE et BLACK EDEN ; rotation des créations ; aucune largeur débordante ni erreur JavaScript. Contrôle également du chargement des pages Nos parfums et La Maison.

Réduction des mouvements : aucune animation ni transformation du flacon lorsque le réglage est actif ; changement du réglage pendant la visite dévoilant immédiatement les cartes restantes. Sans JavaScript ou IntersectionObserver, aucun contenu n’est masqué. Les mouvements de survol ne s’appliquent qu’aux pointeurs précis ou au focus clavier.

Captures inspectées : `qa/collection-motion/selection-hover.png`, `selection-mobile.png`. Autres preuves : `entering.png`, `selection-rest.png`, `selection-keyboard.png`. Styles et comportement dans `collection.css` et `app.js`, sans nouvelle dépendance.

# QA — Hero dans un seul écran

final result: passed

Demande : conserver un hero fixe, entièrement visible dans une seule fenêtre, menu inclus. La capture Chrome fournie montrait un hero dont la hauteur découlait uniquement de sa largeur et dépassait la zone visible du navigateur.

Modification limitée à `hero.css` : hauteur `100svh` (repli `100vh`), échelle du texte et du bouton liée aux deux dimensions de la fenêtre. En portrait, contenu puis photographie dans une grille tenant dans cette hauteur ; mode paysage compact prévu. Sur les fenêtres très larges et peu hautes, le décor photographique est contenu à droite pour conserver le flacon entier. Aucun slider, pagination ou défilement automatique dans le hero ; une seule image fixe. Le scroll de la page reste disponible pour les sections suivantes.

## Vérifications

- `qa/hero-viewport/check.cjs`, résultats dans `checks.json` et `check.log`.
- Viewports CSS / DPR 1 : 1512×785, 1440×810, 1366×650, 1672×941, 1920×900, 2560×720, 768×1024, 1024×768, 390×844, 375×667, 319×568, 667×375.
- À chaque taille : hauteur du hero égale à la hauteur du viewport ; section suivante commençant juste après ; titre et CTA visibles ; pas de débordement horizontal ; image unique ; aucune erreur console/JS ; lien collection vers Nos parfums ; menu mobile et fermeture Échap fonctionnels.
- Captures inspectées : `hero-1512x785.png`, `hero-390x844.png`, `hero-319x568.png`, `hero-667x375.png`, `hero-768x1024.png`, `hero-2560x720.png`.
- Comparaison à la taille originale 1672×941 : ancienne capture `qa/hero-v2/hero-1672.png`, nouveau rendu `qa/hero-viewport/hero-1672x941.png`, juxtaposition `comparison-reference.jpg`. Même photographie, typo, palette et contenu ; les proportions de référence sont conservées lorsque la fenêtre reprend le ratio original.
- Premier contrôle : largeur intrinsèque du bouton faisant dépasser la grille à 319 px. Correction par colonne `minmax(0,1fr)` et enfant `min-width:0`. Nouvelle capture et suite complète réussies.
- Photo et textes inchangés. Les petites fenêtres adaptent la taille des caractères et la répartition texte/photo pour conserver le contenu accessible en un écran. Aucune restriction du scroll global.

## Livrables

- Feuille de style modifiée : `hero.css`.
- Capture desktop finale : `qa/hero-viewport/hero-final.jpg`.
- Captures mobile et paysage : dans le même dossier.
- Le rapport de La Maison est archivé dans `qa/maison-v1/design-qa.md`.
