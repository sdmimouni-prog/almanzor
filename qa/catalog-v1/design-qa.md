# Design QA — page Nos parfums

final result: passed

## Cible, portée et normalisation

Source : `/Users/salaheddinemimouni/Downloads/Almanzor Parfums_ Quatre Signatures Élégantes.png`, 741 × 2123 pixels. Implémentation : `http://127.0.0.1:4173/nos-parfums.html`.

**Exception expressément demandée : le header et le footer restent ceux du site existant.** Leur ordre, composants, icônes, styles et contenu sont conservés ; seuls les liens interpages et l’élément actif changent. Le header/footer différents du raster ne constituent donc pas la cible de reproduction.

La référence étroite est traitée comme un artboard desktop à densité réduite. Capture principale : `qa/catalog-v1/full-1482.png`, viewport CSS 1482 × 1024, deviceScaleFactor 1, largeur deux fois celle du raster. Le contenu jusqu’à la newsletter mesure 3918 pixels, soit exactement 1959 × 2. Il est normalisé à 741 × 1959 avec Lanczos dans `main-normalized.png`. Comparaison `comparison-full.jpg` : source à gauche, rendu normalisé à droite ; footer original de la référence exclu. État : aucun dialogue, recherche ou message de formulaire ouvert.

Aperçu complet comprenant le footer conservé : `page-final.jpg`. Captures focalisées côte à côte : `comparison-hero.png`, `comparison-blade.png`, `comparison-yaya.png`, `comparison-rouge.png`, `comparison-eden.png`, `comparison-newsletter.png`. Prévisualisation également inspectée dans le navigateur intégré.

## Cinq surfaces de fidélité

- **Typographie** : Georgia pour les titres et accroches, Arial pour les paragraphes et légendes. Échelles natives : Hero ~35,7 px, titres produits ~26–30 px, paragraphes 10,5 px, notes 8,5 px. Les tailles réelles sont doublées au viewport de contrôle. Le Hero, les approches, le titre MONSIEUR ROUGE et le poids des CTA ont été ajustés sur les comparaisons focalisées. La source raster comporte du flou/anticrénelage différent du texte HTML, et les fontes originales ne sont pas fournies : faibles différences de contours et graisse classées P3.
- **Disposition et rythme** : Hero 344, engagements 117, BLADE 303, YAYA 316, MONSIEUR ROUGE 287, BLACK EDEN 304, signature 167 et newsletter 121 unités natives. Photos alternées aux séparations x415, x369, x403 et x362. Les coordonnées des notes et des CTA sont reprises de la référence. Sous 1000 px : photos au-dessus des textes, engagements sur deux colonnes, formulaire compact. Aucun débordement aux sept largeurs contrôlées.
- **Couleurs et tokens** : vert profond, ivoire, doré et bronze repris du raster. Quatre textures dorées de CTA distinctes extraites de zones sans texte des boutons fournis. Exposition du fond restauré du Hero raccordée au fond d’origine. Différences locales restantes du marbre et des fonds auparavant masqués : P3.
- **Images et assets** : quatre photographies de produits, douze vignettes olfactives et quatre pictogrammes extraits sans redessin, WebP sans perte. Les pixels de ces assets sont identiques à la source, tout comme le groupe de flacons du Hero dans la région protégée. Les textes/boutons/formulaires sont du HTML natif ; aucune capture complète n’est utilisée à la place de la page. Le monogramme du bandeau et les flèches réutilisent les assets fournis/existants. Limite P3 : la définition photographique initiale est celle du raster de 741 px, perceptible à forte largeur.
- **Copie et contenu** : les quatre noms, accroches, descriptions, douze notes, engagements et newsletter sont transcrits depuis la nouvelle référence. Aucun prix, volume ou parfum ajouté. Les fiches de découverte montrent la photographie et la description de leur présentation. La newsletter reprend le comportement honnête du site existant et indique que l’adresse n’a pas été transmise ni enregistrée.

## Historique des corrections

1. Première vue complète : `comparison-first.jpg`. Le Hero était un peu trop petit/haut, son filet trop court ; MONSIEUR ROUGE légèrement trop large. Correction des tailles, positions, approche et filet. Preuves : `comparison-hero.png`, `comparison-rouge.png` et comparaison complète finale.
2. **P2 — raccords des vignettes** : `comparison-rouge-first.png` montrait des arcs doubles au-dessus de certaines notes, dus aux différences de position des cercles dans le fond restauré. Agrandissement des découpes du fond et marges photographiques d’origine autour des vignettes, sans déformer les cercles. Preuves : `comparison-rouge.png`, `mobile-products.png`.
3. **P2 — doré uniforme des boutons** : les boutons clairs utilisaient la texture plus sombre de BLADE. Extraction d’une texture propre à chaque création et ajout du contour fin. Preuve : détails produits finaux.
4. **P2 — fond du Hero** : veines trop lumineuses et masque trop large près des flacons. Raccord d’exposition par zone, masque affiné et groupe photographique explicitement protégé. Preuve : `comparison-hero.png`, `pixel-checks.json`.
5. **P2 — formulaire mobile et bordures des photos** : contrainte héritée de largeur minimale du bouton et espacement du formulaire ; mince fragment de la section précédente au sommet de certaines photos. Réinitialisation de la largeur minimale/gap/flex et rognage des lignes de raccord uniquement en responsive. Preuves : `mobile-bottom.png`, `mobile-products.png`, `mobile-319-top.png`.

Aucun P0/P1/P2 restant. P3 : petites différences de glyphes/anticrénelage, définition des images source et détail des fonds reconstitués. Les régions cachées par l’ancienne interface ne peuvent pas être identiques à un fond original non fourni.

## Vérifications fonctionnelles et régressions

`qa/catalog-v1/check.cjs`, résultats `checks.json`, journal `check.log`. Largeurs CSS : 319, 390, 768, 1440, 1482, 1536 et 1920. Toutes les images chargées ; aucune erreur JavaScript, console ou HTTP >= 400. Largeur du document égale au viewport. Les vues mobiles ont été inspectées dans `mobile-top.png`, `mobile-products.png`, `mobile-bottom.png`, `mobile-319-top.png`.

- Les quatre CTA ouvrent la bonne photographie et description ; Échap ferme les fiches.
- La recherche ROUGE pointe vers la présentation MONSIEUR ROUGE et ferme le dialogue.
- Le menu mobile s’ouvre/se ferme et indique Nos parfums comme page courante.
- Le formulaire valide une adresse et affiche explicitement l’absence de transmission/enregistrement ; aucun service d’inscription n’est simulé.
- La navigation depuis l’accueil ouvre la nouvelle page ; le bandeau retourne à `index.html#maison`.
- Header et footer : mêmes contenus et assets que l’accueil, attestés dans `shared-layout.json` ; mêmes feuilles de styles partagées.
- `pixel-checks.json` : différence maximale 0 pour les quatre photos, les douze vignettes, les quatre pictogrammes, le groupe de flacons du Hero et la capture complète de l’accueil à 1440 px par rapport à la dernière version validée.
- Navigateur intégré : navigation depuis le menu, découverte BLADE, fermeture, retour en haut et console sans erreur.

## Checklist

- [x] Page distincte reliée depuis l’accueil.
- [x] Header/footer conservés selon la demande.
- [x] Comparaison complète et détails vus ensemble.
- [x] Corrections recapturées et revues.
- [x] Sept largeurs et parcours principaux vérifiés.
- [x] Provenance documentée dans `qa/catalog-v1/asset-provenance.md`.
