# Design QA — nouvelle version du savoir-faire et de la signature

final result: passed

## Cible et normalisation

Source de vérité : `/Users/salaheddinemimouni/Downloads/Luxury Perfume Heritage in Golden Light.png`, 1536 × 1024 px. Implémentation : `http://127.0.0.1:4173/#sillage`. Ces deux sections remplacent leurs versions antérieures, sans duplication.

Capture `qa/heritage-v3/blocks-1536.png`, 1536 × 1024 pixels ; viewport CSS 1536 × 1024, deviceScaleFactor 1. Capture complète Chromium puis recadrage aux limites DOM du savoir-faire (517 px) et de la signature (507 px). L’origine fractionnaire est arrondie, ce qui peut produire un écart d’anticrénelage inférieur à un pixel. Aucune mise à l’échelle dans la comparaison native.

État : aucun dialogue ouvert, textes et CTA au repos. Preuve complète source à gauche / rendu à droite : `qa/heritage-v3/comparison-full.jpg`. Détails vus à taille native : `comparison-craft.png`, `comparison-signature.png`. Prévisualisation inspectée aussi dans le navigateur intégré ; tests des deux CTA et console sans erreur.

## Cinq surfaces de fidélité

- **Typographie** : Georgia pour les titres, Arial/Inter pour les paragraphes et boutons. Titre supérieur ~49,5 px, interligne 56,5 px ; slogan inférieur 58 px, interligne 56 px, seconde ligne ajustée séparément. Position, approche et poids optique repris sur les détails côte à côte. Les fontes exactes du raster ne sont pas fournies ; faible différence de graisse/contour des petits textes et de glyphes classée P3.
- **Espacement et disposition** : macro de 827 × 517 px, panneau de 709 × 517 px, texte à x943, bouton encadré de 397 × 51 px à y394. Bandeau inférieur sur 507 px, monogramme, slogan et bouton centrés ; CTA 412 × 56 px à y824 dans la référence. Grands repères conformes. Responsive vérifié sur six largeurs, sans débordement.
- **Couleurs et tokens** : photographie et doré conservés, papier ivoire, texte sombre et contour bronze du CTA supérieur. Faibles variations locales du papier et de la zone précédemment masquée par l’interface : P3, inhérentes à la restauration d’un fond sans source vierge.
- **Images et assets** : macro extraite sans modification des pixels, grand monogramme mural intact ; monogramme central extrait de la référence sur fond transparent, sans redessin. WebP sans perte. Les textes et boutons sont du HTML natif, les flèches réutilisent les assets Lucide ISC. Le petit trait doré détaché à droite du logo de la référence est écarté lors de l’extraction. Aucun visuel physique ou produit ajouté.
- **Copie et contenu** : titres, description et libellés repris de la référence. Ancien logo complet remplacé par le monogramme seul ; ancien filet du bandeau supprimé comme demandé par la nouvelle image. Les deux actions existantes sont conservées.

## Historique de comparaison

1. Première capture : `comparison-first.jpg`, détails `comparison-craft-first.png` et `comparison-signature-first.png`.
2. **P2 — position du slogan** : première version environ 6 px trop haute et seconde ligne légèrement trop étroite. Descente du titre de 6 px et ajustement de l’approche de sa seconde ligne. Preuve : `comparison-signature.png` et comparaison complète finale.
3. **P2 — traitement du texte supérieur** : léger décalage de titre et densité excessive du paragraphe ; titre/interligne, approche de l’eyebrow et poids optique du paragraphe corrigés. Le CTA utilise Inter pour se rapprocher de la largeur du libellé. Preuve : `comparison-craft.png` après correction.

Aucun P0/P1/P2 restant. P3 : anticrénelage et petites différences de police, bords du monogramme extrait, texture du bouton et détail du décor restauré sous les anciennes surimpressions. Une identité pixel à pixel de ces zones demanderait les polices et fonds originaux sans interface.

## Interactions, responsive et régressions

`qa/heritage-v3/check.cjs`, résultats `checks.json`, journal `check.log`. Largeurs CSS : 319, 390, 768, 1440, 1536, 1920. Les captures `blocks-*.png` ont été inspectées, notamment à 319, 390 et 768 px. Macro au-dessus du texte sur téléphone ; slogan centré, contenu et CTA contenus dans le viewport.

Toutes les images chargées ; aucune erreur JavaScript, console ou réponse HTTP >= 400. Pas de débordement horizontal. Le bouton du savoir-faire ouvre le bon dialogue et Échap le ferme ; le CTA de signature mène à `#maison`, y compris au clavier. Vérifications complémentaires dans le navigateur intégré : ouverture/fermeture du savoir-faire, destination de signature et console.

`pixel-checks.json` : différence maximale 0 pour la macro et la zone du grand monogramme mural. Régressions : menu/Hero (1672 × 941), Maison/Univers (1774 × 887), sélection (1536 × 579), services/Instagram (1536 × 524), différence maximale 0. Les comparaisons des versions antérieures du savoir-faire et de la signature sont intentionnellement remplacées par cette nouvelle référence.

## Checklist

- [x] Source et rendu comparés côte à côte, vue complète et détails.
- [x] Corrections recapturées et revues.
- [x] Deux CTA et six largeurs vérifiés.
- [x] Photographies conservées et autres blocs inchangés.
- [x] Provenance dans `qa/heritage-v3/asset-provenance.md`.
