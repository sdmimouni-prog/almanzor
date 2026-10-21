# Contrôle visuel ALMANZOR — 20 octobre 2026

final result: blocked

La version intégrée est fonctionnelle et responsive. La validation photographique stricte reste bloquée par l’absence des sources panoramiques et macro de la maquette. Ce résultat ne constitue pas une certification Pixel Perfect.

## Éléments comparés

- Source : `/Users/salaheddinemimouni/Downloads/Almanzor Parfums — L’art du parfum.png`.
- Source : 742 × 2120 pixels, représentation réduite d’une page desktop ; ce n’est pas un viewport de 742 CSS px.
- Rendu : `/Users/salaheddinemimouni/Documents/New project/almanzor-parfums/qa/desktop-1440.png`.
- Viewport de référence : 1440 × 1000 CSS px ; capture entière 1440 × 4040 pixels, deviceScaleFactor = 1.
- État : page au repos, menu et dialogues fermés, toutes les images chargées, aucun survol imposé, police locale chargée.
- Normalisation : réduction du rendu à 742 px de large, facteur 742/1440, pour comparaison à côté de la source sans étirer verticalement les sections.
- Comparaison entière ouverte et examinée : `qa/comparison-desktop.jpg`.
- Comparaisons ciblées ouvertes et examinées : `qa/comparison-hero.jpg` et `qa/comparison-products.jpg` ; `qa/comparison-craft.jpg` documente aussi l’angle macro différent. La comparaison globale seule ne suffit pas à examiner les produits et la typographie.
- Captures mobiles : `qa/mobile-390.png`, 390 × 5796 pixels, et détails `qa/mobile-first-view.png`, `qa/mobile-menu.png`, `qa/mobile-product.png`.
- Autres viewports : 768 × 1000 et 1920 × 1000 CSS px, captures `qa/desktop-768.png`, 768 × 3889, et `qa/desktop-1920.png`, 1920 × 4181. Densité 1 dans tous les cas.
- La maquette ne fournit pas de version mobile : la vue 390 px est contrôlée pour son adaptation et son fonctionnement, sans prétendre à une correspondance visuelle avec une référence mobile inexistante.

## Écarts encore présents

- **[P1] Composition photographique du Hero.** Le concept montre une scène panoramique avec pierre au premier plan et profondeur végétale à gauche. Le rendu utilise la campagne verticale du véritable BLADE, avec un fond vert continu à gauche. Le cadrage du flacon est complet après correction, mais le raccord photographique reste perceptible. Sources : comparaison Hero, gauche et droite. Correctif définitif : fournir la scène panoramique originale sans texte/interface, avec le véritable produit, ou sa photographie de campagne horizontale validée. Ne pas revenir au flacon fictif du concept.
- **[P1] Panorama institutionnel absent.** Le concept comprend palmiers, perspective extérieure et mur marqué. La version emploie la photographie d’arche disponible. Les dimensions, la hiérarchie du slogan et le CTA sont reconstruits, mais la scène diffère nettement. Correctif : fournir le panorama original sans éléments d’interface.
- **[P2] Angle macro différent.** Le concept montre le dessus d’un capuchon incliné. Le visuel réel disponible montre la face texturée du capuchon BLADE ; il est utilisé sans inventer un autre capuchon. Correctif : photographie macro réelle à l’angle de la référence.
- **[P2] Définition des photographies décoratives.** L’arche vient d’un recadrage de seulement 328 × 211 px ; fleur, perspective et feuillage viennent aussi de la petite maquette. Leur définition est insuffisante pour une livraison finale en grand format. Correctif : remplacer les fichiers par les photographies natives HD en gardant leurs zones et proportions CSS.

Ces écarts restent visibles et empêchent `final result: passed`. Ils ne sont pas masqués par une image de la page entière ou par un produit générique.

## Surfaces de fidélité vérifiées

- **Typographie.** Cormorant Garamond 400 pour les titres et Inter 400/600 pour l’interface, fichiers locaux. Titres avec césures contrôlées, capitales et interlettrage pour les petits intitulés. La famille précise du concept n’est pas disponible : proximité visuelle, pas identité certifiée. Les intitulés produits exacts restent lisibles ; le slogan et le Hero sont de vrais textes HTML.
- **Espacements et grille.** Conteneur principal maximum 1256 px ; neuf sections de contenu plus footer. À 1440 px : Hero 700, Maison 410, Univers environ 494, Sélection environ 557, Macro 440, Bandeau 370, Réassurance 180, Instagram environ 385, Newsletter 210 px. La hauteur totale plus courte que le concept résulte aussi de la suppression demandée des prix/concentrations/panier. Mobile : cartes empilées, produits sur deux colonnes, réassurance empilée, galerie sur trois colonnes et footer réorganisé. Pas de débordement aux quatre largeurs.
- **Couleurs.** Variables pour #0F2A24, #9B7A46, #F3EFE8 et #151515, ivoire clair et bronze chaud complémentaires. Les boutons or reprennent la luminosité de la référence. Les scènes issues des campagnes officielles introduisent leur éclairage réel.
- **Images et identité.** Quatre vrais flacons tirés de la photo de groupe ; détails du verre, chevrons, noms et capuchons conservés. Logo provenant du JPG fourni, sans reconstruction typographique ou vectorielle. Extraction du fond et export WebP. Aucun flacon généré. Écarts photographiques et limites de définition détaillés ci-dessus.
- **Contenu.** BLADE, YAYA, MONSIEUR ROUGE, BLACK EDEN uniquement ; catégories « Nos parfums » et « Notre univers ». Pas de prix, volume, avis, notes ou promesse technique inventés. Trois messages de réassurance demandés. Les quatre campagnes sont des images fournies, pas des témoignages ou données commerciales créés pour l’interface.

## Historique des corrections et preuves

1. **Premier rendu : `qa/desktop-initial.png`.** [P1] Logo étiré à cause de la hauteur HTML, [P2] fonds rectangulaires autour des flacons, [P2] texture de fond trop agrandie. Correction : proportion intrinsèque du logo, extraction des fonds, fond vert uni puis feuillage réel discret dans la newsletter. Le rendu final et la comparaison complète montrent la correction.
2. **Deuxième comparaison : Hero et produits côte à côte.** [P2] Capuchon partiellement hors cadre avec `object-fit: cover`, [P2] contraste insuffisant du bouton « Notre univers ». Correction : `object-fit: contain` dans le Hero desktop, maintien du cadrage mobile dédié, bouton clair et texte bronze plus sombre. Preuve : `qa/comparison-hero.jpg`, capture finale et `qa/mobile-first-view.png`.
3. **Adaptation tablette et tactile.** Largeur du logo tablette ramenée à 140 px ; titre et paragraphe du Hero ajustés à 768–999 px ; cibles tactiles du menu et de la commande de 44 px minimum. Preuve : capture finale à 768 px, capture mobile et résultats Playwright.
4. **Captures complètes finales.** Défilement et décodage préalable de toutes les images en lazy loading pour éviter les régions blanches observées lors de la première capture avec le navigateur intégré. Captures 390/768/1440/1920 régénérées et utilisées dans les comparaisons finales.

## Contrôles fonctionnels

`qa/checks.json` et `qa/check.cjs` enregistrent les résultats Playwright :

- 390, 768, 1440, 1920 CSS px : largeur du document égale au viewport, aucune image manquante, aucune réponse HTTP >= 400, aucune erreur JavaScript ou console.
- Menu mobile : ouverture, fermeture par bouton/Échap et fermeture après navigation ; `aria-expanded` cohérent.
- Quatre fiches produits : ouverture, titre exact, fermeture par Échap et restauration du défilement. Contrôle du focus et de la fermeture par bouton effectué sur le dialogue Histoire.
- Histoire : contenu ouvert et bouton de fermeture vérifiés.
- E-mail invalide : rejet par la validation HTML. E-mail valide de test : message honnête d’indisponibilité, zéro requête POST, aucun enregistrement simulé.
- Le navigateur intégré a également ouvert l’aperçu, vérifié le titre, l’absence de débordement et la console sans erreur ; l’onglet local reste accessible.
- Liens externes : leur cible est le domaine officiel fourni, pas des URL de fiches supposées. Disponibilité du domaine non vérifiable : DNS indisponible depuis cet environnement. Pas de test de paiement ni de transmission e-mail puisqu’aucune infrastructure n’est fournie.

## À terminer pour la validation finale

1. Remplacer le Hero, le panorama institutionnel, la macro et les recadrages décoratifs par les sources photographiques natives validées.
2. Reprendre les captures aux mêmes dimensions, examiner la nouvelle comparaison et corriger tout écart de cadrage restant.
3. Fournir les contenus légaux, liens sociaux et coordonnées officiels avant publication.
4. Connecter la newsletter uniquement après fourniture du service et des exigences de consentement.

## Suivi mineur

- [P3] Fichier natif du logo transparent/vectoriel pour améliorer sa netteté à haute densité.
- [P3] Confirmer la famille typographique d’origine et sa licence si une identité typographique exacte est exigée.

final result: blocked
