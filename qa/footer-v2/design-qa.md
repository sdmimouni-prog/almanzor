# QA — Newsletter et footer communs

final result: passed

Référence : `Screenshot 2026-10-21 at 10.40.03.png`, 2332 × 964 px. Périmètre : `index.html`, `nos-parfums.html`, `la-maison.html`.

La newsletter et le footer sont composés de vrais titres, liens, boutons, formulaire et colonnes HTML. Même balisage sur les trois pages, styles isolés dans `shared-footer.css`. La newsletter mesure 458 px et le footer 506 px à la largeur de référence. Logo et quatre colonnes, séparateur, copyright et liens légaux reprennent la nouvelle disposition. Mise en page à quatre colonnes sous le logo sur tablette, puis deux colonnes sur mobile. Les animations de l’accueil et les effets de focus restent actifs.

## Comparaison visuelle

`comparison-full.jpg` juxtapose la référence convertie de son profil Display vers sRGB et le rendu, tous deux à 2332 × 964 px. Inspection des captures desktop et mobile 390/319 px. Ajustements après comparaison : largeur et espacement du titre, taille et position du logo, espacement du copyright et raccords du fond de la newsletter. Aucun écart bloquant de disposition, de contenu, de recouvrement ou de navigation restant. Les petites différences de rasterisation des polices et de dessin des icônes de bibliothèque restent distinctes d’une égalité pixel à pixel.

## Contrôles navigateur

Script `check.cjs`, résultats `checks.json` : trois routes, six largeurs (2332, 1440, 1000, 768, 390 et 319 px), soit 18 configurations. Aucun débordement horizontal ni erreur JavaScript/HTTP. Un seul footer et une seule newsletter par page. Destinations internes et ancres des quatre parfums vérifiées. Dialogues Contact, FAQ, mentions légales, confidentialité, conditions générales et réseaux sociaux ouverts puis fermés avec Échap sur chaque route. Validation native de l’adresse et réponse du formulaire vérifiées : aucune requête, transmission ou sauvegarde d’adresse.

L’entrée au scroll de la newsletter et du nouveau footer sur l’accueil est vérifiée avec mouvement actif, y compris la visibilité du formulaire au focus. Les captures de comparaison sont prises avec réduction des mouvements. Aperçu final confirmé dans le navigateur intégré sur `la-maison.html#footer`.

## Assets et limites fonctionnelles

Le logo existant est réutilisé. Trois zones sans interface de la référence fournissent le fond : côtés natifs et bande centrale vierge étirée verticalement. Aucun texte ni commande rasterisée. Origine et cadrages dans `prepare.py` et `assets/manifest.json`. Icônes Instagram, Facebook et lecture : Font Awesome Free, CC BY 4.0, notices conservées.

Instagram pointe vers le compte déjà présent sur le site. Faute d’adresses Facebook et YouTube fournies ou vérifiées, leurs icônes ouvrent un message explicite au lieu d’inventer des destinations. La newsletter conserve son état existant, non relié à un service. Les panneaux légaux ne créent pas de conditions contractuelles et renvoient vers le site officiel existant.
