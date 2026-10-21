# Contrôle qualité mobile — 21 octobre 2026

Résultat : corrections appliquées et contrôles réussis sur les trois pages en émulation mobile Chromium. Aucun défaut bloquant restant dans les parcours testés. Ce résultat ne remplace pas un essai sur téléphone physique, notamment Safari iOS.

![Les trois pages à 375 px](mobile-final.jpg)

## Parcours vérifiés

1. **Accueil — validé.** Hero dans une seule fenêtre, flacon et bouton visibles ; titre corrigé en paysage. Lecture des blocs, sélection des quatre parfums, rotation de la sélection, galerie, newsletter et footer vérifiés.
2. **Nos parfums — validé.** Les quatre flacons restent visibles dans le hero mobile. Alternance des photographies et textes, notes olfactives, liens de découverte et dialogues produits vérifiés. Les libellés dorés sur fond clair et les boutons bronze sont plus lisibles.
3. **La Maison — validé.** Cadrages, ordre de lecture, titres, bandeau Vision, engagements et footer contrôlés. Les boutons et petites légendes sur fond clair ont été renforcés.
4. **Commandes communes — validé.** Menu tactile, navigation entre pages, recherche avec et sans résultat, fermeture des dialogues, retour du focus, newsletter et liens du footer contrôlés en portrait et paysage.

## Défauts corrigés

| Défaut observé | Effet | Correction et preuve |
| --- | --- | --- |
| Menu descendant à 422 px dans une fenêtre de 390 px de haut | Le dernier lien dépasse l’écran en paysage | Hauteur limitée à l’espace disponible et défilement interne. Dernier lien atteint dans les tests tactiles ; [paysage après correction](landscape-final.jpg). |
| Titre d’accueil trop serré en paysage ; largeur interne de 404 px pour 397 px disponibles | Dernière ligne proche du bord et débordement du texte | Typographie compacte et retrait de la déformation horizontale héritée. Aucun titre détecté comme tronqué dans les 18 configurations finales. |
| Plusieurs liens du footer hauts de 20 à 32 px | Cibles difficiles à toucher | Cibles du footer d’au moins 44 × 44 px, labels agrandis et colonne sociale sur une ligne distincte à 320 px. |
| Champ e-mail et bouton serrés côte à côte sur petit écran | Saisie peu confortable | Champ à 16 px, formulaire empilé sous 640 px ; [formulaire final](after/index-320-newsletter.png). |
| Défilement du dialogue emportant sa fermeture ; photo trop haute | Fermeture difficile à retrouver | Contenu défilant indépendamment du bouton de fermeture de 44 px, image ajustée. Fermeture testée après défilement jusqu’au bas. |
| Position de défilement conservée à l’ouverture du produit suivant | Nouvelle fiche ouverte au milieu de son contenu | Remise en haut après ouverture du dialogue ; vérification YAYA puis BLADE réussie. |
| Petites légendes pâles et texte blanc sur boutons bronze | Lecture moins nette sur mobile | Bronze assombri sur ivoire, libellés des boutons en vert sombre, traitement limité aux formats mobiles/tablettes. |

Les photographies HD existantes ont été inspectées dans leur cadrage mobile. Aucune nouvelle régénération nécessaire pour cette passe.

## Preuves et vérification

- **18 configurations de mise en page** : les trois routes à 320 × 568, 375 × 812, 390 × 844, 430 × 932, 768 × 1024 et 844 × 390 px CSS, DPR 2. Aucune image manquante, erreur JS/HTTP, largeur de page débordante ou troncature horizontale détectée sur les éléments textuels contrôlés. [Inventaire avant](before/inventory.json), [inventaire après](after/inventory.json).
- **12 parcours tactiles** : départ depuis chacune des trois pages à 320 × 568, 390 × 844, 667 × 375 et 844 × 390 px. Menu et dernier lien accessibles, Échap et retour du focus, navigation vers La Maison et Nos parfums, recherche et ouverture des produits, fermeture après défilement, réinitialisation du dialogue, validation du formulaire, footer et sélection d’accueil. [Résultats](checks.json), [script](check.cjs).
- **12 configurations de régression des animations** : les trois pages à 1440, 768, 390 et 319 px. Entrées réellement déclenchées, tous les blocs dévoilés après défilement, dimensions stables, réduction des mouvements, focus et fonctionnement sans JavaScript vérifiés par la suite existante. [Résultats](../all-pages-motion/checks.json).
- Captures actuelles dans `before/` et `after/`, générées par [capture.cjs](capture.cjs). Les trois pages complètes à 375 px ont été inspectées, ainsi que les petits formats et les états menu, recherche, dialogue et formulaire. [Accueil complet](after/index-375-page.png), [Nos parfums complet](after/nos-parfums-375-page.png), [La Maison complète](after/la-maison-375-page.png).

## Mise en œuvre et limites

Les ajustements sont regroupés dans `mobile.css`, chargé en dernier sur les trois pages. `app.js` remet le contenu des dialogues en haut à chaque ouverture. La composition desktop reste régie par ses styles existants.

Les tests utilisent Chromium avec écran et tactile émulés ; clavier virtuel, barres système et comportement Safari sur appareil réel non vérifiés. Aucun audit de conformité WCAG complet n’est revendiqué. Les liens de commande externes n’ont pas fait l’objet d’un achat test.

La newsletter reste volontairement non connectée : validation native et message explicite d’indisponibilité vérifiés, aucune adresse transmise ni enregistrée. Les informations légales et destinations sociales encore à compléter conservent leur statut existant. Modifications locales, sans publication distante pour ce contrôle.
