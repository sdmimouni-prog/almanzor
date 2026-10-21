# Provenance — La Maison et Notre univers

Source de vérité : `Almanzor Parfums_ A Luxury Editorial Webpage.png`, 1774 × 887 px.

Outil : ImageGen intégré, utilisé pour restaurer les zones couvertes par l'ancienne interface. Sa sortie est conservée dans `restoration-source.png`. Le composite final réutilise le fichier d'origine partout hors des zones d'interface. Le script `prepare_assets.py` construit un masque local, raccorde les petites zones restaurées et recale leur exposition sur la photographie d'origine.

## Assets finaux

- `assets/editorial-maison.webp` : 1774 × 460, partie supérieure sans interface.
- `assets/editorial-parfums.webp` : 754 × 275, carte gauche sans titre ni bouton.
- `assets/editorial-univers.webp` : 753 × 275, carte droite sans titre ni bouton.
- `assets/editorial-ivory.webp` : texture ivoire du bloc inférieur ; photographies des cartes retirées de ce fond et placées séparément en HTML.
- `assets/editorial-logo.webp` : logo de la référence, recadré sans redessin, 145 × 96.
- `assets/editorial-logo-transparent.webp` : même logo avec extraction du fond pour le responsive.
- `assets/editorial-arrow-bronze.svg` et `editorial-arrow-gold.svg` : variantes de couleur/épaisseur de l'icône Arrow Right de Lucide 0.468.0, licence ISC déjà incluse.

Tous les fichiers WebP sont sans perte. Les textes, boutons et filets sont reconstruits en HTML/CSS ; aucune capture entière n'est affichée comme page.

## Prompt ImageGen

Edit target: attached 1774 x 887 pixel screenshot, consisting of an upper architecture editorial section and lower two image cards. Produce the same image, same pixel dimensions and all EXACT framing, but with ONLY editable webpage interface overlays removed. REMOVE: the small logo at top left (A plus ALMANZOR PARFUMS); the left text 'LA MAISON', 'L’art du parfum', its gold rule and paragraph; the upper 'NOTRE HISTOIRE' button with its frame and arrow. Restore the warm ivory textured wall and soft foliage shadows underneath those UI elements. REMOVE: the centered lower section text 'NOTRE UNIVERS', its gold rule, and 'Des parfums pour chaque personnalité', restoring the plain warm ivory background. REMOVE from the lower LEFT photo card ONLY its 'Nos parfums' white title and 'DÉCOUVRIR' button including frame and arrow; seamlessly restore the dark forest-green photographic background behind them. REMOVE from the lower RIGHT photo card ONLY its 'Notre univers' white title and 'DÉCOUVRIR' button frame and arrow; restore the architectural scene under these small overlay areas. CRITICAL: EVERYTHING else stays unchanged. Preserve the upper right architectural door, including the gold A emblem ON THE DOOR, and the entire olive tree, pot, stone carving, lighting and shadow positions EXACTLY. Preserve the lower-left perfume bottle including its gold A emblem, its cap, glass, highlights, all stones, position and proportions EXACTLY. Preserve the lower-right arch, palms, plants, mountains and tiled floor EXACTLY. Do not erase the A emblem on the door or bottle. Do not move, replace, add, redesign or invent any product, architecture or scene. This is precise UI/text-overlay removal with local background restoration only, NOT a redesign. No text or UI boxes should remain, but photographic brand emblems on physical objects must remain. Keep the thin ivory gutters and exact image-card boundaries and full composition. Output a single image at original 1774 x 887 if possible.

Le composite final conserve les pixels photographiques d'origine même lorsque la génération semble similaire. `pixel-checks.json` distingue ces vérifications des différences d'anticrénelage lors du rendu de la page.
