# Menu et Hero — Nouvelle référence, 20 octobre 2026

final result: passed

Périmètre : uniquement le menu et le Hero de `Timeless Luxury Perfume Hero Banner.png`. Ce contrôle ne vaut pas validation des blocs suivants de la homepage. Le rapport du premier essai est conservé dans `qa/first-homepage-design-qa.md`.

## Source et preuves

- Source visuelle : `/Users/salaheddinemimouni/Downloads/Timeless Luxury Perfume Hero Banner.png`, 1672 × 941 pixels.
- Implémentation : `http://127.0.0.1:4173/`.
- Capture finale : `qa/hero-v2/hero-1672.png`, 1672 × 941 pixels, viewport identique, deviceScaleFactor = 1.
- État : page au repos, menu et dialogue fermés, polices et images chargées, aucun survol imposé.
- Comparaison complète : `qa/hero-v2/comparison-full.jpg`, source et rendu réunis dans la même image, ouverts et examinés après chaque correction finale.
- Comparaisons ciblées : `qa/hero-v2/comparison-type.jpg` et `qa/hero-v2/comparison-menu.jpg`. L'overlay est dans `qa/hero-v2/overlay.png`.
- Captures supplémentaires : `hero-1440.png`, `hero-1920.png`, `hero-768.png`, `hero-390.png`, dans le même dossier.
- Les vues à 1672 px sont comparées à l'échelle 1:1 ; aucune déformation ou normalisation de densité n'est nécessaire. Les autres captures valident la mise à l'échelle desktop et l'adaptation tactile.

## Corrections effectuées

1. [P1 corrigé] Le Hero précédent utilisait une campagne verticale sans le bon décor. Le nouveau fond reprend la photographie de la référence. Seules les zones de l'interface sont restaurées ; le flacon, son emblème et les pierres restent les pixels d'origine. Le menu et les textes sont des éléments HTML indépendants.
2. [P1 corrigé] Proportions du Hero : ratio 1672/941 sur desktop, image sans recadrage. À 1672 px, la hauteur est exactement 941 px.
3. [P2 corrigé] Grille du menu : logo à sa position d'origine, départ des liens à 439, 537, 663, 812 et 1037 px à la taille de référence, bouton Commander à 1223 px, séparateur et trois actions à droite. Libellé « L’Univers ALMANZOR » rétabli.
4. [P2 corrigé] Typographie : comparaison effective de plusieurs familles et tailles ; titre en Georgia ajusté à 74 px et interligne 74 px à la taille de référence, avec réglage de graisse visuelle ; texte et navigation en Arial. Les trois lignes du titre sont du texte HTML sélectionnable.
5. [P2 corrigé] Bouton collection : x = 238 px, y ≈ 636 px, largeur 416 px et hauteur 62 px. Le ton or et sa variation verticale proviennent de la surface du bouton fourni, sans son texte. Le bouton Commander utilise sa propre surface d'origine.
6. [P2 corrigé] Adaptation mobile/tablette : menu compact et cibles tactiles de 44 px, recherche disponible, texte sans débordement. Correction des espaces aux sauts de ligne masqués sur mobile.

## Cinq surfaces de fidélité

- **Polices et hiérarchie :** taille, césures, interligne et largeur du titre confrontés à la capture, sans rasteriser les textes. Copies exactes des libellés. Ajustement des graisses par comparaison rapprochée. La police native exacte du raster n'est pas identifiée ; de petites différences de dessin et d'anticrénelage restent possibles.
- **Disposition :** composition asymétrique, format du Hero, positions du logo, liens et boutons calés sur les coordonnées source. Contrôle du CTA avec les mesures DOM sauvegardées dans `qa/hero-v2/checks.json`.
- **Couleurs :** fond photographique, éclairage et reflets source conservés. Or des deux boutons échantillonné dans la référence, titre ivoire, texte clair et trait actif bronze.
- **Images et identité :** le nouveau logo est extrait du logo présent dans la référence, sans redessin. Le fond n'intègre aucun ancien texte ou bouton. Vérification numérique du flacon dans la région (990,250)–(1320,800) et des pierres (950,805)–(1672,941) : différence RGB moyenne et maximale égale à zéro entre la source et la capture navigateur à 1672 px. Détails dans `qa/hero-v2/pixel-checks.json`.
- **Contenus :** texte du Hero, menu à cinq entrées et deux CTA conformes à cette nouvelle référence. Recherche limitée aux quatre produits existants. Commande et accès client pointent vers le site officiel, sans compte ni panier simulés.

## Vérification fonctionnelle

Script : `qa/hero-v2/capture.cjs` ; résultats : `qa/hero-v2/checks.json` et `capture.log`.

- Largeurs 390, 768, 1440, 1672 et 1920 px : aucun débordement horizontal, aucune erreur JavaScript, console ou ressource HTTP.
- Menu mobile et tablette : ouverture, attribut `aria-expanded`, fermeture par Échap.
- Recherche : ouverture, saisie « yaya », résultat unique correct, fermeture par Échap.
- CTA collection : ancre vers la sélection existante ; liens du menu vers les sections correspondantes.
- Focus restauré après fermeture du dialogue sans provoquer un défilement parasite.

## Réserves mineures

- [P3] La fonte du raster n'est pas fournie sous forme de fichier. Les contours de certains glyphes et l'anticrénelage ne sont pas certifiés identiques au raster.
- [P3] Les trois pictogrammes sont issus de Phosphor Light : style et dimensions proches de la référence, avec quelques différences de contours.
- Les états de compte et commande externes ne sont pas simulés ; seul le site officiel peut les traiter.

Aucun écart de cadrage, de grille, de proportion ou de contenu majeur/modéré ne reste sur le bloc contrôlé.

final result: passed
