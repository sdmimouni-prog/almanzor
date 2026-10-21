# Contrôle qualité des photographies — ALMANZOR

Date : 21 octobre 2026. Résultat : corrections intégrées et vérifiées sur les trois pages locales.

## Périmètre et méthode

Demande : repérer les photos floues ou pixélisées et les régénérer. Inspection des captures de l’Accueil, de Nos parfums et de La Maison, des fichiers source et de leurs dimensions réelles dans le navigateur. Captures avant/après à 1512 × 982 CSS px, DPR 2, et mobile 390 × 844. Les autres largeurs contrôlées sont 1920, 768 et 319 px. Les flous optiques volontaires d’arrière-plan ont été distingués d’une résolution insuffisante du sujet.

## Parcours contrôlés et corrections

| Page / étape | Défaut observé | Correction | Statut |
| --- | --- | --- | --- |
| Accueil — Notre sélection | Flacons de 319 × 307 px, détails mous sur écran Retina ; fond comportant des traces de découpage et de texte | 4 packshots transparents régénérés, livrés en 960 px ; fond marbre continu de 2042 × 770 px | Vérifié |
| Accueil — Galerie Inspiration | Six photos d’environ 240 × 198 px | 6 photos régénérées, livrées en 960 px de large | Vérifié |
| Nos parfums — BLADE, YAYA, MONSIEUR ROUGE, BLACK EDEN | Photos de 372–415 px de large affichées sur environ 700–850 px ; étiquettes et bouchons flous | 4 photos entre 1360 et 1486 px de large ; références produit fournies utilisées pour les flacons | Vérifié |
| Nos parfums — Notes olfactives | Médaillons photographiques de moins de 60 px très agrandis | 6 photos de 320 × 320 px pour les 12 médaillons ; cercles et bordures en CSS | Vérifié |
| Nos parfums — Signature | Panorama de 741 × 167 px étiré en pleine largeur | Nouveau panorama de 2170 × 725 px, cadrage cover et voile léger pour la lisibilité | Vérifié |
| La Maison — Hero, inspiration, matières, vision, créations | Fonds de 770 px étirés à la largeur de l’écran ; traces d’ancienne suppression de texte | 5 photos de 1437–2170 px ; photos séparées des panneaux de texte ; recadrage mobile du hero | Vérifié |

Le hero du catalogue, déjà régénéré lors de la demande précédente, reste en place. Les grandes images de l’Accueil (hero, Maison, univers, macro et Signature) sont conservées : les sujets restent lisibles à leur taille d’affichage contrôlée ; leurs arrière-plans comportent un flou photographique volontaire. Les logos et pictogrammes existants ne font pas partie de cette correction photographique.

## Production et intégration

22 générations ImageGen au total : 21 visuels photographiques et 1 fond de marbre. Cinq recadrages d’ingrédients supplémentaires proviennent de ces nouveaux masters, ainsi que la variante mobile du hero Maison. Aucun agrandissement artificiel des fichiers. Export WebP qualité 93, miniatures réduites à 960 px, médaillons à 320 px. Les originaux sont conservés.

Les compositions, couleurs et noms des produits ont été repris depuis les références. La régénération reconstruit les détails photographiques : il ne s’agit pas d’une restauration pixel par pixel. Les nouveaux fichiers améliorent nettement la précision, sans prétendre à une résolution 4K native.

- Masters : ../../output/imagegen/photo-quality/
- Prompts exacts et références : ../../output/imagegen/photo-quality-prompts.json
- Résultats ImageGen : ../../output/imagegen/photo-quality-results.json
- Provenance et dimensions de livraison : ../../assets/manifest.json
- Publication des fichiers : process_assets.py puis process_notes.py

## Vérifications

- 15 combinaisons page/format dans check.cjs et checks.json : toutes les images chargées, aucune réponse HTTP en erreur, aucune erreur JavaScript, aucun débordement horizontal.
- Dialogues des quatre parfums ouverts sur desktop et mobile ; photos HD chargées et proportions conservées avec object-fit: contain.
- Suite ../all-pages-motion/check.cjs réussie : animation de chaque section, contenu visible en fin de scroll, focus clavier, accès direct aux ancres, réduction des mouvements et fonctionnement sans JavaScript/IntersectionObserver.
- Fond final de la sélection revérifié après sa dernière substitution ; disparition des anciennes zones rectangulaires et des traces de texte.
- Suppression antérieure de la phrase « Suivez-nous sur Instagram » toujours effective sur les trois pages.
- Aucun déploiement ni push Git effectué pour ce contrôle.

## Preuves visuelles

Comparaison rapprochée, avec les mêmes zones et la même échelle :

![Avant et après : BLADE et architecture Maison](before-after.jpg)

Captures complètes des sections : before/ et after/. Revues mobiles : after/index-mobile-review.jpg, after/nos-parfums-mobile-review.jpg, after/la-maison-mobile-review.jpg. Capture finale de la sélection : after/index-04.png. Les images de QA restent locales et sont exclues de Git.

