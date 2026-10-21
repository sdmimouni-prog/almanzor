# Provenance — Notre sélection et Savoir-faire

Source : `/Users/salaheddinemimouni/Downloads/Luxury Perfume Collection and Craftsmanship.png`, 1536 × 1024 px.

Les quatre photographies de flacons sont extraites aux coordonnées x = 130 + 319n, y = 130, taille 319 × 307. La macro est le rectangle (0, 579, 819, 1024). Les fichiers WebP sont sans perte ; les pixels de ces cinq photographies sont identiques à la source. Aucun produit n’est redessiné.

ImageGen intégré a restauré le papier derrière les anciennes surimpressions. La sortie brute est `restored-background.png`, copiée de `/Users/salaheddinemimouni/.codex/generated_images/01a15ba3-892c-73a0-8190-d9fbcfe2e5d4/exec-6b2117b7-973c-4d7f-8505-3834b3e1ad24.png`. `prepare_assets.py` applique uniquement les régions utiles de cette restauration à la source. Les ombres de palmes extérieures sont conservées. Le fond derrière le texte du savoir-faire est restauré comme une surface continue pour éviter les traces en cas de retour à la ligne sur mobile. Un lissage de 8 px réduit les veines artificielles de la restauration. Son grain/marbrure peut différer localement du fond masqué par le texte d’origine.

Les fonds `collection-ivory.webp` et `collection-craft-ivory.webp` sont indépendants des photographies. Tous les titres, légendes, boutons, prix absents et interactions sont du HTML natif : aucune capture complète ne remplace la section. « Eau de parfum » et le texte du savoir-faire viennent de la nouvelle référence, sans ajout de notes, prix ou volumes.

Pictogrammes : Lucide Static 0.468.0 (ISC), chevron-left / chevron-right et arrow-right. Les chevrons utilisent une épaisseur ajustée de 1.2 ; l’icône de flèche bronze existe déjà dans le projet. Les tracés ne sont pas redessinés.

## Prompt ImageGen

Precisely restore this 1536x1024 website reference as photographic assets. Remove ONLY all overlaid website UI: top heading LES INCONTOURNABLES, Notre sélection and underline; the four standalone product captions beneath the bottles, Eau de parfum captions and outline DÉCOUVRIR buttons; left and right navigation chevrons. In the bottom RIGHT ivory panel remove all text, underline and gold button. Reconstruct the same warm ivory delicate marble/paper and palm shadows behind the removed UI seamlessly. Keep ALL four actual bottles, their physical gold BLADE/YAYA/MONSIEUR Rouge/BLACK EDEN inscriptions, cap textures, reflection, shadows, positions, sizes exactly unchanged. Keep entire bottom LEFT cap photograph exactly unchanged. Keep composition, dimensions, colors, section boundary y579, macro split x819 unchanged. No new objects, text or design. Output clean photographic background without website UI.
