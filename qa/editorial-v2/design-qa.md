# La Maison et Notre univers — contrôle de la nouvelle référence

final result: passed

Périmètre : les deux blocs suivant le Hero. Le contrôle précédent du menu et du Hero est conservé dans `qa/hero-v2/design-qa.md`.

## Source, état et preuves

- Source : `/Users/salaheddinemimouni/Downloads/Almanzor Parfums_ A Luxury Editorial Webpage.png`, 1774 × 887 pixels.
- Implémentation : `http://127.0.0.1:4173/#maison`.
- Capture finale des deux blocs : `qa/editorial-v2/blocks-1774.png`, 1774 × 887 pixels. Viewport navigateur 1774 × 1000 CSS px, densité 1.
- Capture originale de la page : `qa/editorial-v2/full-1774.png`. Les deux sections consécutives sont extraites à partir des coordonnées DOM enregistrées dans `checks.json`, avec arrondi de l'origine verticale à un pixel. Le Hero précédent a une hauteur fractionnaire à cette largeur : un déphasage de rendu inférieur à un pixel peut donc subsister face au raster source.
- État : textes, images et polices chargés, dialogue Histoire fermé, aucun état de survol imposé.
- Comparaison complète source/rendu, ouverte dans une même image : `qa/editorial-v2/comparison-full.jpg`.
- Comparaisons ciblées : `comparison-maison-copy.jpg`, `comparison-heading.jpg`, `comparison-cards.jpg`, dans le même dossier. L'overlay se trouve dans `overlay.png`.
- Comparaison à l'échelle 1:1, sans déformation ni changement de densité. Les aperçus peuvent être réduits par l'interface de consultation ; les fichiers conservent leur résolution native.

## Géométrie vérifiée à 1774 px

- La Maison : hauteur 460 px.
- Notre univers : hauteur 427 px ; total 887 px.
- Carte gauche : x = 125 px, y relatif à l'ensemble = 581 px, 754 × 275 px.
- Carte droite : x = 895 px, même y, 753 × 275 px ; intervalle 16 px.
- Bouton Notre histoire : x = 184 px, y ≈ 389 px dans la section, 239 × 50 px.
- Les petits titres, filets et titres principaux sont placés indépendamment des photographies. Les retours de ligne de la présentation et des cartes reprennent la référence.

## Cinq surfaces de fidélité

- **Typographie :** Georgia pour les titres, Arial pour les textes et les boutons. Taille, interligne, largeur, alignement et graisse visuelle confrontés aux captures rapprochées ; ajustement des approches et du centrage à partir des limites visibles des glyphes. Les textes restent sélectionnables et accessibles en HTML.
- **Grille et respiration :** hauteurs des deux sections, marges latérales, espace entre cartes et positions des CTA alignés sur l'artboard. Carte entière cliquable, bouton Histoire distinct.
- **Couleurs :** ivoire, noir doux et bronze reproduits ; décor et ombres issus de la source. Sur tablette, voile ivoire local pour conserver la lisibilité du texte devant les ombres ; il n'est pas appliqué à la composition desktop.
- **Images et identité :** logo extrait de la référence, sans redessin ; architecture, olivier, flacon, monogrammes physiques et paysage conservés depuis le fichier d'origine. La restauration générée est limitée aux anciennes zones d'interface. Les pixels des grandes régions photographiques sont identiques dans les assets sans perte : architecture/olivier (1000,0)–(1774,460), flacon (575,590)–(735,842), arche/paysage (1200,581)–(1648,856). Écart RGB moyen et maximal nul : `pixel-checks.json`.
- **Contenus :** « La Maison », « L’art du parfum », présentation en quatre lignes, « Notre univers », « Des parfums pour chaque personnalité », « Nos parfums », « Notre univers », « Notre histoire » et « Découvrir » conformes à la nouvelle référence. Aucun produit ou prix ajouté.

## Historique des corrections

1. **Premier rendu :** [P2] coutures autour des anciennes lettres dans les cartes, bordures trop fines et flèches peu lisibles. Correction : restauration locale des zones de texte des cartes avec raccord progressif ; bordures portées à 2 px à la taille source ; flèches Lucide avec couleur bronze/or explicite et opacité entière. Nouvelle capture examinée.
2. **Alignements :** [P2] petits écarts sur le titre Maison et le titre de section. Correction : approche du petit titre Maison, déplacement/taille du grand titre, centrage optique du petit titre Univers et ajustement vertical du grand titre. Comparaisons rapprochées et capture finale.
3. **Débordement :** [P2] translation d'un titre sur une boîte de pleine largeur créant 6 px de débordement. Correction : centrage optique par padding intérieur, sans translation de la boîte. Largeur du document égale au viewport dans tous les tests finaux.
4. **Responsive :** [P2] texture de fond à trous incohérente sous les cartes tablette et contraste insuffisant devant les ombres. Correction : fond ivoire uni sur tablette, voile local devant la zone éditoriale, logo transparent en responsive et adaptation supplémentaire à 319 px. Les vues 768, 390 et 319 px ont été rouvertes et examinées après correction.

## Vérifications fonctionnelles et responsive

Script : `qa/editorial-v2/check.cjs` ; résultats : `checks.json` et `check.log`.

- Largeurs 319, 390, 768, 1440, 1774 et 1920 CSS px, deviceScaleFactor = 1.
- Aucune erreur JavaScript/console, réponse HTTP manquante ou image non chargée.
- Aucun débordement horizontal.
- « Notre histoire » ouvre le dialogue attendu ; fermeture par Échap et rétablissement du défilement.
- « Nos parfums » mène à `#parfums` ; « Notre univers » mène à `#sillage`.
- Mobile : texte réorganisé, photographie de la Maison sous le contenu, deux cartes empilées, zones tactiles conservées.
- Captures : `blocks-319.png`, `blocks-390.png`, `blocks-768.png`, `blocks-1440.png`, `blocks-1774.png`, `blocks-1920.png`.
- Régression du bloc approuvé : comparaison de `approved-hero-regression.png` avec la capture finale précédente `qa/hero-v2/hero-1672.png`. Aucun pixel différent à 1672 × 941 px.

## Fichiers de la reprise

`index.html`, nouveau `editorial.css`, assets `editorial-*.webp` et deux variantes de couleur de la flèche Lucide. Les opérations d'extraction/restauration sont documentées et reproductibles via `qa/editorial-v2/prepare_assets.py`. Provenance et prompt ImageGen : `qa/editorial-v2/asset-provenance.md`.

## Suivi mineur

- [P3] La famille native exacte du raster n'est pas fournie : de légères différences de contours de lettres et d'anticrénelage restent possibles.
- [P3] La restauration locale sous les anciennes interfaces est une reconstitution. Les photographies natives sans textes permettraient de supprimer ce dernier écart dans ces seules zones.

Aucun écart majeur/modéré de disposition, de contenu ou de fonctionnement ne reste dans les deux blocs contrôlés.

final result: passed
