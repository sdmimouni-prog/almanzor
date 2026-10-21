# MONSIEUR ROUGE et BLACK EDEN — pages produit

final result: passed

Contrôle du 21 octobre 2026. Pages : [MONSIEUR ROUGE](http://127.0.0.1:4173/monsieur-rouge.html) et [BLACK EDEN](http://127.0.0.1:4173/black-eden.html).

## Sources et comparaison visuelle

La structure reprend la page YAYA déjà intégrée et la maquette source `/Users/salaheddinemimouni/Downloads/YAYA_ A Moroccan Luxury Fragrance Journey.png` (941 × 1672). Identités produit issues de `Monsieur Rouge Luxury Perfume Campaign.png` et `Black Eden_ A Mysterious Botanical Fragrance.png`, fournies par l’utilisateur. Ces deux campagnes sont des références de flacon, de couleurs, de lettrage et de matières, pas des maquettes web complètes.

`qa/remaining-products/initial-reference-comparison.jpg` réunit dans une même image la maquette YAYA et les deux nouvelles intégrations à la même largeur affichée. Les captures des pages sont réalisées à 1882 × 994 CSS px, DPR 1, mouvements réduits, sans survol. La comparaison complète, les deux heroes à 1440 px et les bandes de lecture mobile à 390 px ont été ouverts et inspectés visuellement. Les captures portent le préfixe `initial` car aucune correction de mise en page n’a été nécessaire après cette capture ; seul le maintien du focus clavier dans les dialogues a été corrigé ensuite. `preview-products.jpg` montre les deux heroes livrés.

## Évaluation de fidélité

- **Composition :** même ordre des blocs et proportions que YAYA : hero statique d’un écran, histoire 30,71 vw, sillage 27,2 vw, détail 27 vw, signature 17,32 vw. Photographie à droite du hero, récit clair à gauche de l’arche, flacon à gauche du Sillage, macro à droite du Détail. Panneaux empilés et cadrages conservant les flacons en portrait mobile.
- **Identités :** MONSIEUR ROUGE en lettres condensées or et calligraphie rouge ; flacon rouge profond, bois, safran et ambre. BLACK EDEN en titre serif sur deux lignes ; flacon émeraude, bois, mousse et feuilles humides. Labels des flacons et couleurs inspectés dans les images et le rendu.
- **Typographie et palette :** Georgia pour les textes éditoriaux, Inter local pour les commandes ; verts profonds, ivoire, or et bronze, boutons rectangulaires et filets fins. Le titre BLACK EDEN est du texte HTML ; le lettrage MONSIEUR ROUGE est transparent avec un vrai nom H1 accessible.
- **Différences volontaires :** textes adaptés aux deux campagnes et noms plus longs pris en compte. Cinq nouveaux assets ImageGen, décors communs HD réutilisés. Header, newsletter, footer et services communs conservés conformément aux demandes précédentes. Aucune pagination du hero ni rappel Instagram supprimé réintroduit. Aucun prix ou avantage de livraison inventé.
- **Limites de fidélité :** photographies recréées, détails des pierres et du décor différents ; métriques typographiques raster non identiques à la campagne. Aucune revendication d’identité pixel par pixel ni de résolution 4K. Aucune maquette mobile fournie : adaptation responsive à partir du layout existant.

Aucun P0/P1/P2 visuel restant dans les vues contrôlées. Variations photographiques et typographiques mineures acceptées comme adaptations produit.

## Fonctionnement et corrections

Les liens de l’accueil (images et boutons), du catalogue, de la recherche et des sept footers ouvrent maintenant les quatre pages produit. L’ancien gestionnaire des dialogues produit, devenu inutilisé, a été retiré. Les dialogues d’information restent disponibles.

Le contrôle mobile a révélé un **P2 corrigé** : avec un seul bouton dans le dialogue de confidentialité, Tab pouvait quitter la fenêtre modale vers l’interface du navigateur. Une boucle clavier explicite conserve le focus sur les commandes du dialogue, avec Tab et Maj+Tab ; Échap et restitution du focus restent opérationnels. La suite mobile a été relancée après correction et passe ses douze parcours.

## Vérifications exécutées

- `node qa/remaining-products/check.cjs initial monsieur-rouge` et `initial black-eden` : **passed**, huit formats chacun : 1882 × 994, 1440 × 900, 1920 × 1080, 1024 × 768, 768 × 1024, 390 × 844, 320 × 568, 667 × 375. Résultats : `initial-monsieur-rouge-checks.json`, `initial-black-eden-checks.json`.
- Absence d’erreurs JavaScript/HTTP, images décodées, textes et boutons contenus, aucune largeur débordante. CTA du hero visible dans le premier écran. Nom accessible des H1 vérifié ; cadre du logotype MONSIEUR ROUGE contrôlé visuellement, exclu du test générique de débordement textuel.
- Parcours Découvrir → Histoire → Sillage, savoir-faire → La Maison, recherche, menu mobile, FAQ et newsletter locale validés. Commande vers le domaine officiel existant ; aucune transaction effectuée.
- Animations de chaque page mesurées à 390 et 1440 px ; transitions Histoire et Détail déclenchées au scroll, plus de contenu masqué après lecture complète. Réduction des mouvements et absence de JavaScript contrôlées.
- `node qa/yaya/check.cjs final` : **passed**, huit formats après mutualisation de `yaya.css` dans `product-landing.css`.
- `node qa/mobile/check.cjs` : **passed**, trois pages générales et quatre formats tactiles, recherche des nouvelles pages et dialogues compris, après la correction du focus.
- `node qa/collection-motion/check.cjs` : **passed**, apparition, survol, clavier, rotation des cartes et ouverture de BLADE/BLACK EDEN depuis l’accueil.
- `node --check app.js` et `git diff --check` : **passed**.
- Tests responsive sous Chromium avec émulation tactile ; aucun téléphone physique utilisé. Pages également inspectées dans le navigateur intégré.

## Assets et provenance

| Asset | Dimensions natives | Export |
| --- | --- | --- |
| `monsieur-rouge-hero.webp` | 1724 × 912 | WebP qualité 94 |
| `monsieur-rouge-sillage.webp` | 2084 × 755 | WebP qualité 94 |
| `monsieur-rouge-wordmark.webp` | 1930 × 815 | WebP sans perte, RGBA |
| `black-eden-hero.webp` | 1724 × 912 | WebP qualité 94 |
| `black-eden-sillage.webp` | 2083 × 755 | WebP qualité 94 |

Outil ImageGen intégré. Masters PNG, prompts exacts et manifestes conservés dans `output/imagegen/remaining-products/`, exports listés dans `assets/manifest.json`. Le moteur a retourné ces dimensions natives malgré les demandes de taille supérieure ; aucune augmentation artificielle. Architecture, macro et panorama HD existants réutilisés.

## Livraison

`monsieur-rouge.html`, `black-eden.html`, `product-variants.css`, et `product-landing.css` partagé avec YAYA. Navigation HTML et recherche `app.js` actualisées. Aucune dépendance ajoutée. Newsletter toujours locale, sans transmission d’adresse. Modifications locales, aucune publication ou poussée Git réalisée dans cette étape.
