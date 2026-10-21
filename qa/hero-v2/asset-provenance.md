# Sources du menu et du Hero

- Source de vérité : `Timeless Luxury Perfume Hero Banner.png`, 1672 × 941.
- Outil d'édition : outil intégré ImageGen, utilisé uniquement pour restaurer le décor sous les textes et commandes.
- Sortie de restauration conservée : `qa/hero-v2/restoration-source.png`.
- Fond final de production : `assets/hero-reference-clean.webp`, WebP sans perte. Composite conservant l'image source hors des seules zones de l'interface, restaurées depuis la sortie ImageGen avec raccord de bord progressif. Le flacon et les pierres ne sont pas pris dans la génération : ils restent ceux du fichier fourni.
- Logo : `assets/logo-hero-reference.webp`, extraction du marquage présent dans la référence, sans redessin.
- Surfaces or sans texte : `assets/hero-cta-fill.webp` et `assets/header-order-fill.webp`, bandes de couleur prélevées dans les boutons d'origine et étendues sur les surfaces HTML.
- Icônes : Phosphor Icons Core 2.1.1, Light : magnifying-glass, user, handbag. Licence dans `assets/licenses/phosphor-LICENSE.txt`.

## Prompt ImageGen utilisé

Edit target: the attached 1672 × 941 pixel website hero image. Produce ONLY its clean photographic background with precisely the same 16:9 composition and camera. Remove all website interface overlay from the image: remove the small ALMANZOR PARFUMS logo at top left; remove every navigation label, top Commander button, separator and the three icons; remove the large headline at left, its paragraph, and the gold lower-left call-to-action button. Seamlessly restore ONLY the green wall / foliage behind those removed overlays. CRITICAL invariants: keep the exact entire perfume bottle on the right, including its large gold A emblem, black textured cylindrical cap and blue-black glass, UNCHANGED in shape, size, perspective, lettering, reflections and position. Keep ALL stone platform, rocks, architectural column at far right, warm diagonal light, blurred plants in lower left, green wall texture and cinematic lighting unchanged. No crop, no reposition, no invented extra bottle, no extra scene, no new logo or text. This is a background-extraction / UI removal edit, NOT a redesign. Match original pixel positions, color and exposure as closely as possible. Output a single clean full-bleed photograph at the same aspect ratio as the input, preferably its original 1672 × 941 resolution.

Le composite final privilégie ensuite les pixels d'origine hors des zones d'interface, même lorsque la sortie ImageGen paraît similaire. La comparaison numérique vérifie leur conservation dans le flacon et les pierres.
