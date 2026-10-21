# Assets — La Maison ALMANZOR

Source visuelle : `/Users/salaheddinemimouni/Downloads/La Maison Almanzor Parfums.png`, 770 × 2042 px.

23 fichiers WebP sans perte dans `assets/maison-*`. Inventaire exact, dimensions et coordonnées dans `assets.json` et `assets/manifest.json`.

Les photographies, les flacons, leurs inscriptions, les monogrammes physiques et les sept pictogrammes proviennent de la référence. Les quatre recadrages photographiques mobiles ont un écart maximal de zéro par canal avec leurs régions source. Aucun produit, logo ni pictogramme n’a été redessiné. Les trois surfaces de boutons proviennent de lignes vierges de texte des boutons de la référence.

Le seul élément généré est une restauration des fonds masqués par l’interface. Outil intégré ImageGen, mode édition, sans API/CLI de génération. Prompt complet et fichier brut : `restoration-provenance.md` et `restored-background.png` (770 × 2041, normalisé à 770 × 2042). La restitution générée est appliquée seulement sous des masques extraits des textes et contrôles d’origine. Exposition et teintes raccordées aux pixels environnants ; photographies originales gardées en dehors du masque. Script reproductible : `prepare_assets.py`. Masque final : `restoration-mask.png`.

Les titres, textes, boutons, liens, séparateurs et le formulaire sont natifs HTML/CSS. La page complète n’est jamais utilisée comme image de fond. Les fonds de section sont dépourvus d’interface ; les pictogrammes sont placés indépendamment. Les boutons et icônes de navigation réutilisent les assets du header/footer existants.

Limite : résolution photographique originale de 770 px et fontes exactes non fournies. Les zones cachées sous l’ancien texte nécessitent une restauration locale ; leur contenu original exact ne peut pas être récupéré depuis le raster.
