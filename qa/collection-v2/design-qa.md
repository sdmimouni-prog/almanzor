# Design QA — sélection et savoir-faire

final result: passed

## Cible et normalisation

Source de vérité : `/Users/salaheddinemimouni/Downloads/Luxury Perfume Collection and Craftsmanship.png`, 1536 × 1024 pixels. État : quatre créations dans l’ordre BLADE, YAYA, MONSIEUR ROUGE, BLACK EDEN ; aucun dialogue ouvert. Implémentation : `http://127.0.0.1:4173/#parfums`.

Capture Chromium : `qa/collection-v2/blocks-1536.png`, 1536 × 1024 pixels, viewport CSS 1536 × 1024, deviceScaleFactor 1. Capture complète puis recadrage aux limites DOM des deux sections ; origine verticale arrondie, écart de rasterisation possible inférieur à un pixel. Aucune mise à l’échelle pour la comparaison de référence.

Comparaison complète : `qa/collection-v2/comparison-full.jpg` (source à gauche, implémentation à droite). Détails : `comparison-titles-final.png`, `comparison-product-final.png`, `comparison-craft-final.png`. Prévisualisation également inspectée dans le navigateur intégré ; capture `browser-desktop.png`, avec contexte de la section précédente. Les contrôles automatiques utilisent la même page locale.

## Surfaces de fidélité

- **Typographie** : Georgia 44 px pour Notre sélection et 51 px pour le savoir-faire, Times New Roman gras pour les noms, Arial/Inter pour le texte et les légendes. Retours à la ligne, approche et poids optique ajustés sur les comparaisons focalisées. Les polices exactes du raster ne sont pas fournies ; petites différences de glyphes et d’anticrénelage restantes classées P3.
- **Disposition** : sélection 579 px, savoir-faire 445 px ; séparation macro/texte à x819 ; grille de 319 px par création, boutons 218 × 43 px, CTA 374 × 48 px. Les photographies et alignements reprennent le repère 1536 × 1024. Sur mobile, grille de deux colonnes et macro au-dessus du texte ; tablette quatre colonnes. Aucun débordement aux six largeurs vérifiées.
- **Couleurs** : ivoire, encre bleu/noir, bronze des filets et boutons. Restauration locale du papier masqué par le texte, puis atténuation des veines ajoutées par la génération. Les variations locales de grain et la texture du bouton rempli sont P3 ; aucune recoloration des flacons.
- **Images** : quatre flacons et macro extraits de la référence sans modification des pixels, vérification dans `pixel-checks.json` (différence maximale 0). WebP sans perte. Logos et inscriptions physiques conservés dans les photographies. Fonds indépendants, interface HTML native, pictogrammes Lucide ISC.
- **Contenu** : quatre noms, « Eau de parfum », titre, description et CTA du savoir-faire transcrits depuis la nouvelle référence. Aucun prix, volume ou parfum supplémentaire. Boutons de découverte reliés aux dialogues existants.

## Historique des corrections

1. **P2 — poids/largeurs des textes** : la première comparaison `comparison-first.jpg` et les premiers détails montraient les noms trop gras, Notre sélection trop large et le paragraphe trop dense. Correction des familles, tailles, poids optiques et des flèches. Preuve : les trois comparaisons focalisées finales.
2. **P2 — fond après reflow** : la restauration limitée aux glyphes laissait des traces lorsque le texte mobile se déplaçait ; le fond desktop à découpes ne convenait pas au format tablette. Correction par restauration continue du papier du savoir-faire et base ivoire pour la sélection sous 1200 px. Preuves : `blocks-319.png`, `blocks-390.png`, `blocks-768.png`.
3. **P2 — marbrures trop présentes dans la restauration** : après nettoyage, le panneau droit avait des veines absentes du rendu visé. Atténuation de ce détail sur le seul fond restauré ; photographies intactes. Preuve : `comparison-craft-final.png` et `comparison-full.jpg`.

Aucun P0/P1/P2 restant. P3 : différences minimes de glyphes/anticrénelage, grain du papier restauré et texture du bouton bronze. La fidélité absolue de ces zones nécessiterait les polices et fonds sans interface du fichier de conception original.

## Vérifications

`qa/collection-v2/check.cjs`, résultats `checks.json`, console `check.log`. Largeurs CSS : 319, 390, 768, 1440, 1536, 1920. Toutes les images chargées ; aucune erreur JavaScript, console ou HTTP >= 400 ; largeur du document égale au viewport.

Interactions : les quatre CTA produits ouvrent la bonne fiche ; Échap ferme le dialogue ; flèches précédente/suivante font tourner les créations, retour après quatre pas ; CTA savoir-faire ouvre le bon dialogue. Dans le navigateur intégré : BLADE, flèche suivante et précédente vérifiées, console sans erreur, viewport temporaire réinitialisé.

Régressions : menu/Hero à 1672 × 941 et Maison/Univers à 1774 × 887 identiques aux captures déjà validées (différence maximale 0 dans `pixel-checks.json`). Une première capture de régression montrait le lien d’évitement fixe à cause du scroll pendant la capture ; normalisation du scroll avant la nouvelle capture, sans changement du site.

## Checklist

- [x] Photos et copies de la référence intégrées.
- [x] Comparaison complète et détails vus ensemble.
- [x] Corrections visuelles recapturées.
- [x] Responsive et interactions vérifiés.
- [x] Blocs déjà approuvés préservés.
- [x] Provenance et limites documentées dans `qa/collection-v2/asset-provenance.md`.
