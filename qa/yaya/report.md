# YAYA — intégration de la deuxième page produit

final result: passed

Page : [yaya.html](http://127.0.0.1:4173/yaya.html). Contrôle du 21 octobre 2026.

## Référence et comparaison

Source exacte : `/Users/salaheddinemimouni/Downloads/YAYA_ A Moroccan Luxury Fragrance Journey.png`, 941 × 1672 pixels. Rendu desktop : `qa/yaya/final-1882.png`, 1882 × 3853 pixels, viewport 1882 × 994 CSS px, DPR 1. Rendu réduit à 50 % pour comparer les blocs à la largeur de la référence ; état au repos, mouvements réduits, aucun survol. Les sections avant newsletter sont alignées à la même échelle. Le bas de page est volontairement plus long car il conserve les composants communs précédemment approuvés.

Preuves : `comparison-final.jpg` (source et rendu côte à côte), `comparison-focus.jpg` (Sillage et Détail), `mobile-final.jpg` (lecture de toute la page à 390 px), `hero-final.jpg`. Captures supplémentaires à 1440, 1920, 1024, 768, 320 et 667 px. La référence et les captures finales ont été ouvertes et comparées visuellement. Aucune maquette mobile n’étant fournie, le mobile est une adaptation responsive.

## Évaluation

- **Structure et dimensions :** hero statique d’un écran, histoire 30,71 vw, sillage 27,2 vw, détail 27 vw, signature 17,32 vw. Position des textes, alternance des visuels, marges et retours à la ligne repris de la source. Photographies et textes empilés sur petit écran ; cadrages distincts pour conserver le flacon.
- **Typographie :** titres et descriptions Georgia, boutons/repères Inter local. Logotype YAYA géométrique doré avec A sans barres restitué en image transparente, accompagné d’un vrai H1 accessible. Les métriques des caractères rasterisés de la source ne sont pas certifiées identiques.
- **Palette et style :** verts profonds, textes ivoire, panneaux clairs, or et bronze, boutons rectangulaires, filets fins. Logos et pictogrammes communs existants réutilisés.
- **Images :** deux scènes YAYA produites avec ImageGen intégré à partir de la maquette et de la campagne produit fournie. Flacon, couleur ambrée, label, bois, résine et fleur blanche inspectés. Photos Histoire, Détail et Signature HD existantes réutilisées. Aucune image de maquette entière utilisée comme page ni texte d’interface aplati.
- **Contenu et différences volontaires :** les textes YAYA sont intégrés en HTML. Header, newsletter et footer communs conservés. Pagination 01/02/03 omise conformément à la demande antérieure de hero sans slider. Service livraison conservé sous sa formulation commune « partout au Maroc » ; pas d’ajout d’une promesse de gratuité. L’encart Instagram précédemment supprimé n’est pas réintroduit.

## Historique des corrections

La première passe, conservée dans `comparison-initial.jpg` et `initial-checks.json`, était incomplète pendant la génération du Sillage. Aucun handoff à ce stade.

1. **P1 corrigé — image Sillage non encore disponible :** asset exporté dans le projet, dimensions HTML mises à jour ; chargement et décodage validés sur huit formats.
2. **P2 corrigé — rangée Détail plus haute que le bloc :** dimension intrinsèque de l’image neutralisée par une rangée de grille bornée et ajustement du padding. Le contenu et le bouton restent dans le bloc.
3. **P2 corrigé — cadrage Sillage :** agrandissement CSS limité au desktop, suppression de la limite générique de largeur qui le neutralisait, positionnement mobile indépendant. Flacon entier et label visibles dans les captures finales.
4. Le contrôle générique de débordement textuel exclut le H1 composé d’un logotype recadré dans son cadre ; son nom accessible et son apparence ont été contrôlés séparément.

Aucun P0/P1/P2 restant dans les vues et parcours contrôlés. Écarts P3 conservés : décor Sillage plus lumineux et flacon légèrement plus à gauche que sur la maquette ; détails photographiques de l’arche, du capuchon et des montagnes différents ; légère variation des espacements et des métriques typographiques. La page suit la maquette, sans revendiquer une identité pixel par pixel des photos générées.

## Vérifications fonctionnelles

`node qa/yaya/check.cjs final` : **passed** pour 1882 × 994, 1440 × 900, 1920 × 1080, 1024 × 768, 768 × 1024, 390 × 844, 320 × 568 et 667 × 375. Résultats complets : `final-checks.json`.

- Aucune erreur JavaScript/HTTP, image manquante, troncature textuelle ou largeur débordante détectée. CTA du hero dans le premier écran aux huit formats.
- Découvrir YAYA → Histoire → Sillage ; savoir-faire → La Maison ; commander → lien officiel existant `https://almanzor.ma`.
- Image et bouton YAYA de l’accueil, bouton du catalogue, recherche et liens de tous les footers reliés à `yaya.html`.
- Menu mobile, recherche, Échap, FAQ et validation de la newsletter locale vérifiés. Les dialogues des deux produits suivants restent accessibles.
- Animations au scroll mesurées à 390 et 1440 px : dévoilement des titres, photos, détails, services et composants communs ; aucun élément laissé caché après défilement. Mode de réduction des mouvements et consultation sans JavaScript vérifiés.
- Régressions réussies : `qa/blade/check.cjs final`, `qa/mobile/check.cjs` (trois pages, quatre formats tactiles), `qa/collection-motion/check.cjs` (apparition, survol, clavier, carrousel de sélection et dialogues).
- Page inspectée dans le navigateur intégré et laissée ouverte. Tests responsive sous Chromium, en émulation ; pas de téléphone physique utilisé.

## Visuels livrés et provenance

| Asset | Dimensions natives | Prompt exact |
| --- | --- | --- |
| `assets/yaya-hero.webp` | 1725 × 912 | `output/imagegen/yaya-landing/hero-prompt.txt` |
| `assets/yaya-sillage.webp` | 2083 × 755 | `output/imagegen/yaya-landing/sillage-prompt.txt` et `sillage-refine-prompt.txt` |
| `assets/yaya-wordmark.webp` | 2151 × 731, transparent | `output/imagegen/yaya-landing/wordmark-prompt.txt` |

Outil **ImageGen intégré**, sans CLI/API de repli. Masters PNG et prompts exacts enregistrés dans `output/imagegen/yaya-landing/`. Exports photos WebP qualité94 et logotype WebP sans perte avec alpha ; aucune augmentation artificielle de résolution. Le moteur a retourné un ratio différent pour le Sillage malgré deux passes : le recadrage est géré par CSS. Le hero conserve ses 1725 px natifs plutôt qu’une fausse version agrandie. Manifeste : `assets/manifest.json`.

## Livraison

Implémentation : `yaya.html`, `yaya.css`, structure et animation partagées avec BLADE, navigation/recherche existantes actualisées. Pas de dépendance ajoutée. Newsletter toujours non reliée à un service distant ; pas d’envoi d’adresse, d’achat ou de publication effectués. Modifications locales prêtes à poursuivre.
