# Design QA — Signature, services et Instagram

final result: passed

## Cible et preuves

Source : `/Users/salaheddinemimouni/Downloads/L’univers Almanzor_ Signature Parfumée.png`, 1536 × 1024 pixels. Implémentation : `http://127.0.0.1:4173/#signature`. État : bandeau, quatre services et six photos dans leur ordre initial ; aucun dialogue ouvert.

Viewport CSS de référence 1536 × 1024, deviceScaleFactor 1. Capture `qa/signature-v2/blocks-1536.png`, 1536 × 1024 pixels : capture complète du navigateur Chromium puis recadrage aux limites DOM des trois zones (500 + 181 + 343 px). L’origine verticale fractionnaire est arrondie ; l’écart de rasterisation peut être inférieur à un pixel. Aucune mise à l’échelle pour la comparaison.

Comparaison complète source à gauche / implémentation à droite : `qa/signature-v2/comparison-full.jpg`. Détails lisibles à taille native : `comparison-signature.png`, `comparison-services.png`, `comparison-instagram.png`. Prévisualisation inspectée aussi dans le navigateur intégré ; capture `browser-desktop.png`, avec contexte de la section précédente. Viewport temporaire réinitialisé après contrôle.

## Surfaces de fidélité

- **Polices et typographie** : Georgia pour le slogan (55,5 px, interligne 54 px) et le titre Instagram (35 px), Arial/Inter pour les services, légendes et CTA. Approches, alignements, graisse et retours à la ligne corrigés sur les détails côte à côte. Les fontes exactes du raster ne sont pas fournies ; différences mineures de contours et d’anticrénelage classées P3.
- **Espacement et composition** : bandeau de 500 px, rangée de services de 181 px et inspiration de 343 px ; marges des photos de 28 px, gouttières de 6 px, images de 198 px de haut. Les quatre services et trois séparateurs reprennent les positions de la source. Adaptations : galerie sur trois colonnes à 768 px et deux colonnes sur téléphone ; services sur deux colonnes sur téléphone. Aucun débordement aux six largeurs vérifiées.
- **Couleurs** : photographie, encre, doré du CTA et bronze des services conservés ; papier ivoire restauré seulement sous l’ancienne interface. Le grain et le décor auparavant masqué par le texte ne peuvent pas être reproduits à l’identique sans les fonds originaux. Ces faibles écarts locaux sont P3.
- **Images et assets** : six photos natives et quatre pictogrammes extraits de la source, fichiers WebP sans perte. Aucun dessin approximatif. Grand monogramme du mur conservé sans changement des pixels. Logo transparent déjà validé réutilisé ; flèche Lucide ISC existante. Interface éditoriale en HTML/CSS, pas une capture entière en guise de section.
- **Copie et contenu** : slogan, services et compte Instagram transcrits depuis la référence. Les photos ne reçoivent pas de noms de produits inventés. Les six liens vont au compte fourni, aucune publication spécifique fabriquée.

## Historique de comparaison et corrections

1. **P2 — détails typographiques** : `comparison-first.jpg` et `comparison-signature-first.png` montraient le slogan légèrement trop haut, les légendes de services trop étroites et le titre Instagram trop large/bas. Correction du slogan, famille Inter des services, taille/position du titre et proportions de la flèche. Preuves : détails finaux et `comparison-full.jpg`.
2. **P2 — lisibilité mobile** : le premier recadrage central plaçait le logo et le slogan sur le ciel clair. Correction du point focal vers les palmes sombres sous 1200 px. Preuves : `blocks-319.png`, `blocks-390.png`, `blocks-768.png`.
3. **P2 — fragment d’ancienne lettre dans le fond** : le contrôle tablette montrait une petite courbe sous le slogan, issue de la limite du masque. Extension du masque sous le jambage et marge supplémentaire avant raccord. Preuves après correction : `blocks-768.png` et comparaison complète finale.

Aucun P0/P1/P2 restant. P3 : faible variation des glyphes/anticrénelage, logo réutilisé à quelques pixels près, détail photographique reconstitué derrière les anciennes surimpressions et texture du bouton doré légèrement différente.

## Vérifications fonctionnelles et régressions

`qa/signature-v2/check.cjs`, résultats `checks.json`, journal `check.log`. Largeurs CSS : 319, 390, 768, 1440, 1536 et 1920. Toutes les images sont chargées. Aucune erreur JavaScript, console ou HTTP >= 400. La largeur du document reste égale au viewport.

Le CTA du bandeau est activé au clavier et mène à `#maison`. Les sept liens Instagram ont le compte demandé, un nouvel onglet et `noopener noreferrer` ; aucune navigation externe n’est nécessaire au contrôle de mise en page. Le CTA a aussi été testé dans le navigateur intégré, console sans erreur.

`pixel-checks.json` : différence maximale 0 pour les six photographies extraites, la zone du grand monogramme mural et les captures des blocs déjà validés : Hero/menu (1672 × 941), Maison/Univers (1774 × 887), Sélection/Savoir-faire (1536 × 1024). Ces mesures distinguent les pixels photographiques conservés de la reconstruction HTML de la nouvelle référence.

## Checklist

- [x] Source et rendu examinés côte à côte, vue complète et détails.
- [x] Corrections recapturées et revues.
- [x] Six largeurs vérifiées, CTA et liens contrôlés.
- [x] Régressions des blocs déjà approuvés égales à zéro.
- [x] Provenance documentée dans `qa/signature-v2/asset-provenance.md`.
