# MONSIEUR ROUGE et BLACK EDEN — pages produit

final result: passed

Contrôle du 21 octobre 2026. Pages : [MONSIEUR ROUGE](http://127.0.0.1:4173/monsieur-rouge.html) et [BLACK EDEN](http://127.0.0.1:4173/black-eden.html).

## Sources et comparaison visuelle

La structure reprend la page YAYA déjà intégrée et la maquette source `/Users/salaheddinemimouni/Downloads/YAYA_ A Moroccan Luxury Fragrance Journey.png` (941 × 1672). Identités produit issues de `Monsieur Rouge Luxury Perfume Campaign.png` et `Black Eden_ A Mysterious Botanical Fragrance.png`, fournies par l’utilisateur. Ces deux campagnes sont des références de flacon, de couleurs, de lettrage et de matières, pas des maquettes web complètes.

`qa/remaining-products/initial-reference-comparison.jpg` réunit dans une même image la maquette YAYA et les deux nouvelles intégrations à la même largeur affichée. Les captures des pages sont réalisées à 1882 × 994 CSS px, DPR 1, mouvements réduits, sans survol. La comparaison complète, les deux heroes à 1440 px et les bandes de lecture mobile à 390 px ont été ouverts et inspectés visuellement. Les captures portent le préfixe `initial` car aucune correction de mise en page n’a été nécessaire après cette capture ; seul le maintien du focus clavier dans les dialogues a été corrigé ensuite. `preview-products.jpg` montre les deux heroes livrés.

## Évaluation de fidélité

- **Composition :** même ordre des blocs et proportions que YAYA : hero statique d’un écran, histoire 30,71 vw, sillage 27,2 vw, détail 27 vw, signature 17,32 vw. Photographie à droite du hero, récit clair à gauche de l’arche, flacon à gauche du Sillage, macro à droite du Détail. Panneaux empilés et cadrages conservant les flacons en portrait mobile.
- **Identités :** MONSIEUR ROUGE en lettres condensées or et calligraphie rouge ; flacon rouge profond, bois, safran et ambre. BLACK EDEN en titre serif sur deux lignes ; flacon émeraude, bois, mousse et feuilles humides. Labels des flacons et couleurs inspectés dans les images et le rendu.
- **Typographie et palette :** Georgia pour les textes éditoriaux, Inter local pour les commandes ; verts profonds, ivoire, or et bronze, boutons rectangulaires et filets fins. Le titre BLACK EDEN est du texte HTML ; le lettrage MONSIEUR ROUGE est transparent avec un vrai nom H1 accessible.
- **Différences volontaires :** textes adaptés aux deux campagnes et noms plus longs pris en compte. Cinq nouveaux assets ImageGen, décors communs HD réutilisés. Header, newsletter, footer et services communs conservés conformément aux demandes précédentes. Aucune pagination du hero ni rappel Instagram supprimé réintroduit. Aucun prix ou avantage de livraison inventé.
- **Limites de fidélité :** photographies recréées, détails des pierres et du décor différents ; métriques typographiques raster non identiques à la campagne. Aucune revendication d’identité pixel par pixel ni de résolution 4K. Aucune maquette mobile fournie : adaptation responsive à partir du layout existant.

Aucun P0/P1/P2 visuel restant dans les vues contrôlées. Variations photographiques et typographiques mineures acceptées comme adaptations produit.

## Fonctionnement et corrections

Les liens de l’accueil (images et boutons), du catalogue, de la recherche et des sept footers ouvrent maintenant les quatre pages produit. L’ancien gestionnaire des dialogues produit, devenu inutilisé, a été retiré. Les dialogues d’information restent disponibles.

Le contrôle mobile a révélé un **P2 corrigé** : avec un seul bouton dans le dialogue de confidentialité, Tab pouvait quitter la fenêtre modale vers l’interface du navigateur. Une boucle clavier explicite conserve le focus sur les commandes du dialogue, avec Tab et Maj+Tab ; Échap et restitution du focus restent opérationnels. La suite mobile a été relancée après correction et passe ses douze parcours.

## Vérifications exécutées

- `node qa/remaining-products/check.cjs initial monsieur-rouge` et `initial black-eden` : **passed**, huit formats chacun : 1882 × 994, 1440 × 900, 1920 × 1080, 1024 × 768, 768 × 1024, 390 × 844, 320 × 568, 667 × 375. Résultats : `initial-monsieur-rouge-checks.json`, `initial-black-eden-checks.json`.
- Absence d’erreurs JavaScript/HTTP, images décodées, textes et boutons contenus, aucune largeur débordante. CTA du hero visible dans le premier écran. Nom accessible des H1 vérifié ; cadre du logotype MONSIEUR ROUGE contrôlé visuellement, exclu du test générique de débordement textuel.
- Parcours Découvrir → Histoire → Sillage, savoir-faire → La Maison, recherche, menu mobile, FAQ et newsletter locale validés. Commande vers le domaine officiel existant ; aucune transaction effectuée.
- Animations de chaque page mesurées à 390 et 1440 px ; transitions Histoire et Détail déclenchées au scroll, plus de contenu masqué après lecture complète. Réduction des mouvements et absence de JavaScript contrôlées.
- `node qa/yaya/check.cjs final` : **passed**, huit formats après mutualisation de `yaya.css` dans `product-landing.css`.
- `node qa/mobile/check.cjs` : **passed**, trois pages générales et quatre formats tactiles, recherche des nouvelles pages et dialogues compris, après la correction du focus.
- `node qa/collection-motion/check.cjs` : **passed**, apparition, survol, clavier, rotation des cartes et ouverture de BLADE/BLACK EDEN depuis l’accueil.
- `node --check app.js` et `git diff --check` : **passed**.
- Tests responsive sous Chromium avec émulation tactile ; aucun téléphone physique utilisé. Pages également inspectées dans le navigateur intégré.

## Assets et provenance

| Asset | Dimensions natives | Export |
| --- | --- | --- |
| `monsieur-rouge-hero.webp` | 1724 × 912 | WebP qualité 94 |
| `monsieur-rouge-sillage.webp` | 2084 × 755 | WebP qualité 94 |
| `monsieur-rouge-wordmark.webp` | 1930 × 815 | WebP sans perte, RGBA |
| `black-eden-hero.webp` | 1724 × 912 | WebP qualité 94 |
| `black-eden-sillage.webp` | 2083 × 755 | WebP qualité 94 |

Outil ImageGen intégré. Masters PNG, prompts exacts et manifestes conservés dans `output/imagegen/remaining-products/`, exports listés dans `assets/manifest.json`. Le moteur a retourné ces dimensions natives malgré les demandes de taille supérieure ; aucune augmentation artificielle. Architecture, macro et panorama HD existants réutilisés.

## Livraison

`monsieur-rouge.html`, `black-eden.html`, `product-variants.css`, et `product-landing.css` partagé avec YAYA. Navigation HTML et recherche `app.js` actualisées. Aucune dépendance ajoutée. Newsletter toujours locale, sans transmission d’adresse. Modifications locales, aucune publication ou poussée Git réalisée dans cette étape.

---

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


---

# BLADE — intégration et contrôle visuel

final result: passed

Page : [blade.html](http://127.0.0.1:4173/blade.html). Contrôle du 21 octobre 2026.

## Référence et preuves

Source : `/Users/salaheddinemimouni/Downloads/Luxe désertique _ la signature BLADE (1).png`, 846 × 1860 pixels. Rendu principal : `qa/blade/final-1692.png`, 1692 × 4065 pixels ; viewport 1692 × 932 CSS px, DPR 1. Réduction à 50 % pour comparaison à la largeur de la maquette. État au repos, mouvements réduits, aucun survol. La composition desktop et ses cinq blocs sont comparés à cette échelle ; l’adaptation mobile est contrôlée séparément, aucune maquette mobile distincte n’ayant été fournie.

Comparaison côte à côte : `qa/blade/comparison-final.jpg`. Détails hero et Sillage : `qa/blade/comparison-focus.jpg`. Captures complémentaires : `qa/blade/final-1440.png`, `qa/blade/final-390.png`, lecture mobile complète par bandes dans `qa/blade/mobile-final.jpg`.

## Évaluation des surfaces

- **Typographie :** Georgia pour les titres, Inter local pour les textes et commandes. Hiérarchie BLADE doré / sous-titre ivoire, tailles, interlignages et retours à la ligne vérifiés. Lissage harmonisé avec les pages internes. La police rasterisée de la maquette n’étant pas identifiée, les métriques ne sont pas certifiées identiques.
- **Disposition :** proportions après le hero de 35,225 vw / 37,59 vw / 32,03 vw / 26,595 vw. Marges, alignements et alternance des photographies comparés. Hero d’un écran unique aux formats testés. Sur mobile, contenu et photos empilés, flacon entier, boutons tactiles et paysage compact.
- **Couleurs :** vert profond, ivoire, or et bronze repris de la référence, boutons sans arrondi. Contraste des services corrigé. Aucun audit WCAG complet revendiqué.
- **Images :** quatre photographies individuelles ImageGen, flacon et inscription BLADE préservés, aucun texte d’interface incrusté, aucun placeholder. Panorama Signature HD déjà validé réutilisé. Les différences fines de pierres, végétation et lumière sont attendues avec les assets générés ; il ne s’agit pas d’une reproduction identique pixel par pixel.
- **Contenu :** textes des cinq blocs transcrits en HTML. Header, newsletter et footer communs approuvés conservés, donc différents du footer ancien visible dans cette maquette. Hero fixe sans pagination décorative 01/02/03, conformément au choix antérieur sans slider. Logos existants et pictogrammes Lucide réutilisés, sans dessin CSS ou SVG artisanal.

## Historique des corrections

Première comparaison : `qa/blade/design-qa-initial.md`, `qa/blade/comparison-initial.jpg`. Résultat initial bloqué, puis nouvelle capture après correction.

1. **P1 corrigé — services trop sombres :** le gris des paragraphes génériques est remplacé par un ivoire explicite ; vérifié dans les captures finales desktop et mobile.
2. **P2 corrigé — titre trop étroit et caractères trop lourds :** échelle du titre/sous-titre et lissage ajustés ; preuve rapprochée dans `comparison-focus.jpg`.
3. **P2 corrigé — flacon Sillage trop petit :** cadrage desktop agrandi sans recouvrir le texte ; cadrage mobile indépendant conservé.

Aucun P0/P1/P2 restant dans les vues et parcours contrôlés. P3 : variations photographiques et légères différences de métriques des caractères.

## Tests et interactions

`node qa/blade/check.cjs final` réussit à 1692 × 932, 1440 × 900, 1920 × 1080, 1024 × 768, 768 × 1024, 390 × 844, 320 × 568 et 667 × 375. Résultats : `qa/blade/final-checks.json`.

- Aucune image manquante, erreur JavaScript/HTTP, largeur débordante ou troncature horizontale détectée ; CTA principal dans la fenêtre.
- Découvrir BLADE → Histoire ; Découvrir son univers → Sillage ; Notre savoir-faire → La Maison ; commande → lien existant `https://almanzor.ma`.
- Image et bouton BLADE de l’accueil, bouton du catalogue, résultat de recherche et liens du footer reliés à la nouvelle page.
- Menu mobile, recherche, FAQ, Échap et formulaire local vérifiés. Les autres parfums conservent leurs dialogues.
- Animations mesurées à 390 et 1440 px : zoom du hero, dévoilement des titres, rideaux des photos, macro, services, newsletter et footer. Tous les éléments visibles après défilement. Réduction des mouvements et accès sans JavaScript vérifiés.
- Régressions réussies : `qa/all-pages-motion/check.cjs`, `qa/collection-motion/check.cjs`, `qa/mobile/check.cjs`. La découverte BLADE teste désormais une navigation réelle.
- Aperçu inspecté et laissé ouvert dans le navigateur intégré. Tests responsive en émulation Chromium, sans essai sur téléphone physique.

## Assets et sources

| Bloc | Asset livré | Dimensions natives | Prompt exact |
| --- | --- | --- | --- |
| Hero | `assets/blade-hero.webp` | 1691 × 930 | `output/imagegen/blade-landing/hero-prompt.txt` |
| Histoire | `assets/blade-history.webp` | 2120 × 742 | `output/imagegen/blade-landing/history-prompt.txt` |
| Sillage | `assets/blade-sillage.webp` | 2048 × 768 | `output/imagegen/blade-landing/sillage-prompt.txt` |
| Détail | `assets/blade-craft.webp` | 1602 × 982 | `output/imagegen/blade-landing/craft-prompt.txt` |

Génération avec ImageGen intégré, sans API CLI. Masters PNG et prompts conservés dans `output/imagegen/blade-landing/`, exports WebP qualité94 sans agrandissement artificiel. Le hero conserve la résolution native retournée par l’outil, inférieure aux 1920 px demandés. Provenance et licences : `assets/manifest.json`.

## Livraison

Implémentation dans `blade.html` et `blade.css`, liens existants actualisés, recherche et animations partagées dans `app.js` et `scroll-motion.css`. Aucune nouvelle dépendance applicative. Newsletter toujours non connectée, commande externe existante, aucun achat ni envoi d’e-mail effectué. Modifications locales, sans publication distante.

---

# Historique des contrôles précédents

# QA — Hero Nos parfums régénéré en IA

final result: passed

Le fond du hero est recréé avec l’outil intégré ImageGen à partir de la composition précédente et des photographies BLADE, YAYA, MONSIEUR ROUGE et BLACK EDEN. Résolution native : 1836 × 857 px, contre 741 × 344 px, soit environ 6,2 fois plus de pixels. La génération conserve les quatre couleurs, l’ordre des flacons sur des roches et la zone sombre pour le texte. Aucun texte d’interface n’est intégré à l’image.

Master PNG dans `output/imagegen/catalog-hero-hd.png`, prompt exact à côté. Asset WebP qualité 95 dans `assets/catalog-hero-hd.webp`, 387 416 octets, sans agrandissement. Préchargement et image HTML pointent vers ce nouveau fichier avec priorité haute et dimensions intrinsèques explicites. L’ancienne image est conservée. Aucun changement des styles, du header, du footer ou du système d’animation pour cette intégration.

Contrôle Playwright à 1512 px (DPR 2), 1920, 768, 390 (DPR 2) et 319 (DPR 2) : nouvelle image chargée, dimensions natives confirmées, aucune erreur JavaScript/HTTP ni débordement horizontal. Inspection visuelle des captures desktop et mobiles : les quatre flacons restent visibles et le texte dispose de sa zone. Animation d’entrée du hero vérifiée à 1512 px. Résultats et captures dans `qa/catalog-hero-hd/`. Aperçu actualisé dans le navigateur intégré.


# QA — Animations au scroll sur toutes les pages

final result: passed

Périmètre : 28 blocs, soit les dix blocs de l’accueil et les neuf blocs de chacune des pages Nos parfums et La Maison, footers et newsletters inclus. Les entrées existantes de l’accueil sont conservées. Le catalogue ajoute un hero photographique et des lignes dévoilées, des médaillons en cascade, des rideaux alternés pour les quatre parfums avec notes olfactives successives, puis une signature animée. La Maison reçoit un hero photographique, un rideau pour l’inspiration, un dévoilement ascendant des matières, un zoom du panorama, une ouverture centrale des créations et une cascade des engagements. Chaque élément attend sa propre entrée dans la fenêtre, y compris à l’intérieur des longs blocs mobiles.

`scroll-motion.css` est partagé par les trois pages. `initSectionMotion` accepte maintenant un élément de section pour traiter les quatre parfums individuellement. Observation des conteneurs stables, contrôle géométrique des enfants masqués, écouteurs de scroll passifs et regroupés par frame, retrait une fois les éléments dévoilés. Aucun défilement forcé ni boucle. La prise de focus supprime immédiatement le masque et le délai. Le réglage de réduction des mouvements est pris en compte au chargement et pendant la visite ; sans JavaScript ou IntersectionObserver, les contenus restent visibles.

## Contrôles

`check.cjs`, résultats `checks.json` : trois pages × quatre fenêtres (1440×900, 768×1024, 390×844, 319×568), soit douze configurations. Transitions réellement enregistrées dans chacun des 28 blocs, 54 éléments animés sur l’accueil, 59 sur le catalogue et 45 sur La Maison. Les éléments hors écran attendent le scroll ; aucun élément ne reste masqué après lecture complète. Aucun rejeu en revenant sur un bloc vu. Aucune erreur JavaScript/HTTP, image manquante ni largeur débordante pendant les transitions. Hauteur de chaque section identique avec et sans mouvement.

Accès direct aux ancres de la sélection, de YAYA et du savoir-faire vérifiés. Boutons de fiches et de récit utilisables, fermeture des dialogues par Échap. Formulaire accessible au clavier même avant son apparition. Réduction des mouvements à chaud, sans JavaScript sur chaque page et absence d’IntersectionObserver contrôlées.

Les six paires de captures intégrales (desktop et mobile pour chaque page) montrent une différence RGB moyenne inférieure à 0,1/255 entre l’état animé terminé et la réduction des mouvements ; dimensions identiques. Mesures dans `rest-comparison.json`. Inspection des captures de BLADE sur desktop, de la sélection sur mobile, de l’inspiration sur desktop et des matières sur mobile.

## Corrections issues des contrôles

- Photos du catalogue contenues pendant le zoom pour supprimer le débordement de 15 px détecté à 768 px.
- Dimensions intrinsèques explicites des quatre sources mobiles de La Maison : l’espace est réservé avant le chargement des images, évitant le changement de hauteur lié à l’ancien ratio desktop.
- Les contrôles attendent la notification du changement de préférence de mouvement et isolent le comptage du retour dans les sections après les captures.

Aperçu enregistré des pages Nos parfums puis La Maison : `all-pages-scroll-preview.webm`, produit par `record.cjs`. Les médias de contrôle restent locaux selon le `.gitignore` existant. Le contenu éditorial, les photographies et les destinations des commandes restent les mêmes.


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


# QA — Toute la page animée au scroll

final result: passed

Périmètre : les dix blocs de l’accueil, du hero au footer. Chaque chapitre reçoit une entrée adaptée : lignes du titre et zoom arrière photographique ; rideau latéral pour la Maison ; ouvertures opposées des cartes Univers ; cascade des flacons et trait doré ; macro dévoilée depuis le bas et texte latéral ; monogramme agrandi et titre Signature dévoilé ; pictogrammes relevés ; volets photographiques alternés ; formulaire qui s’ouvre depuis son centre ; fermeture en cascade des colonnes du footer. Les animations de survol validées précédemment sont conservées.

Implémentation : `scroll-motion.css`, chargé uniquement dans `index.html`, et évolution de `initSectionMotion` dans `app.js`. Les masques sont déclenchés d’après la géométrie de leurs éléments, avec observation d’un conteneur stable. Les vérifications au scroll sont passives, regroupées dans une frame et limitées aux sections à l’écran ; observateurs et écouteurs retirés quand tous les éléments sont apparus. Aucun scroll forcé, boucle ou nouvelle dépendance. Préparation instantanée des états masqués pour éviter un fondu sortant au démarrage. Les éléments accessibles sont dévoilés immédiatement au focus ; mouvement réduit et absence de JavaScript gardent tous les contenus visibles.

Contrôles `qa/scroll-motion/check.cjs`, `checks.json` : 1440×900, 768×1024, 390×844 et 319×568. Transitions effectivement enregistrées dans les dix blocs à chaque format ; aucun élément restant masqué après lecture complète, aucune erreur JS/HTTP ou largeur débordante pendant les mouvements ; dimensions de chaque section identiques avec animations activées ou désactivées ; hero d’une hauteur de fenêtre conservé ; aucun rejeu lors du retour en haut ; accès clavier au formulaire, réglage réduit à chaud et fonctionnement sans JavaScript vérifiés. Suite de régression de la sélection réussie.

Captures inspectées : `maison-desktop.png`, `univers-desktop.png`, `craft-mobile.png`. Autres captures desktop/mobile dans le même dossier. Aperçu enregistré du défilement réel : `qa/scroll-motion/scroll-preview.webm` (script `record.cjs`).

# QA — Animations Signature, services et Instagram

final result: passed

Entrée progressive du logo, titre et bouton du bandeau Signature, des quatre services et des six photos Instagram, à leur première apparition dans la fenêtre. Délais courts adaptés aux rangées responsive. Survol du bandeau : décor agrandi à 1,018 et flèche du bouton déplacée de 4 px. Services : icônes agrandies à 1,06 et relevées de 4 px, texte bronze. Galerie : agrandissement à 1,045 et léger éclaircissement. Aucun mouvement en boucle, contenu ni disposition modifiés.

`signature.css` contient les styles. `app.js` réutilise le même observateur d’entrée pour ces blocs et pour la sélection, avec visibilité immédiate au focus clavier et prise en compte du réglage de réduction des mouvements. Aucun contenu masqué sans JavaScript ou IntersectionObserver. Les services ne deviennent pas des commandes interactives.

Contrôles passés dans `qa/signature-motion/check.cjs` et `checks.json` : desktop 1536×1050, mobile tactile 390×844 et 319×844 ; opacité intermédiaire mesurée confirmant les cascades ; opacité finale 1 ; absence de rejeu ; transformations de survol mesurées ; focus clavier ; réduction des mouvements au chargement et après changement du réglage ; lien Signature vers La Maison ; destinations Instagram conservées ; aucune erreur JS/HTTP ou largeur débordante. La suite `qa/collection-motion/check.cjs` passe après la mutualisation du comportement.

Captures inspectées : `services-gallery-hover.png`, `services-390.png`, `gallery-319.png` dans `qa/signature-motion/`. Captures complémentaires du bandeau, des services et de la galerie au survol, ainsi que mobile 390 et 319 px dans le même dossier.

# QA — Animations de la sélection

final result: passed

Demande : animations au chargement et au survol du bloc des quatre parfums. Entrée déclenchée à la première apparition dans la fenêtre, une fois par visite : fondu/remontée de 750 ms, décalages de 0/100/200/300 ms sur desktop et par rangées sur mobile. Au repos, la composition de la sélection est conservée. Survol avec zoom discret du flacon, titre et bouton dorés, mouvement de la flèche. Aucun changement au hero ni aux autres pages.

Vérification navigateur à 1536×960 et sur mobile tactile 390×844 (`qa/collection-motion/check.cjs`, `checks.json`) : apparition réellement progressive, fin à opacité 1, aucun rejeu au retour dans la section ; survol effectif ; navigation au clavier et affichage immédiat d’une carte encore masquée lors de sa prise de focus ; ouverture des fiches BLADE et BLACK EDEN ; rotation des créations ; aucune largeur débordante ni erreur JavaScript. Contrôle également du chargement des pages Nos parfums et La Maison.

Réduction des mouvements : aucune animation ni transformation du flacon lorsque le réglage est actif ; changement du réglage pendant la visite dévoilant immédiatement les cartes restantes. Sans JavaScript ou IntersectionObserver, aucun contenu n’est masqué. Les mouvements de survol ne s’appliquent qu’aux pointeurs précis ou au focus clavier.

Captures inspectées : `qa/collection-motion/selection-hover.png`, `selection-mobile.png`. Autres preuves : `entering.png`, `selection-rest.png`, `selection-keyboard.png`. Styles et comportement dans `collection.css` et `app.js`, sans nouvelle dépendance.

# QA — Hero dans un seul écran

final result: passed

Demande : conserver un hero fixe, entièrement visible dans une seule fenêtre, menu inclus. La capture Chrome fournie montrait un hero dont la hauteur découlait uniquement de sa largeur et dépassait la zone visible du navigateur.

Modification limitée à `hero.css` : hauteur `100svh` (repli `100vh`), échelle du texte et du bouton liée aux deux dimensions de la fenêtre. En portrait, contenu puis photographie dans une grille tenant dans cette hauteur ; mode paysage compact prévu. Sur les fenêtres très larges et peu hautes, le décor photographique est contenu à droite pour conserver le flacon entier. Aucun slider, pagination ou défilement automatique dans le hero ; une seule image fixe. Le scroll de la page reste disponible pour les sections suivantes.

## Vérifications

- `qa/hero-viewport/check.cjs`, résultats dans `checks.json` et `check.log`.
- Viewports CSS / DPR 1 : 1512×785, 1440×810, 1366×650, 1672×941, 1920×900, 2560×720, 768×1024, 1024×768, 390×844, 375×667, 319×568, 667×375.
- À chaque taille : hauteur du hero égale à la hauteur du viewport ; section suivante commençant juste après ; titre et CTA visibles ; pas de débordement horizontal ; image unique ; aucune erreur console/JS ; lien collection vers Nos parfums ; menu mobile et fermeture Échap fonctionnels.
- Captures inspectées : `hero-1512x785.png`, `hero-390x844.png`, `hero-319x568.png`, `hero-667x375.png`, `hero-768x1024.png`, `hero-2560x720.png`.
- Comparaison à la taille originale 1672×941 : ancienne capture `qa/hero-v2/hero-1672.png`, nouveau rendu `qa/hero-viewport/hero-1672x941.png`, juxtaposition `comparison-reference.jpg`. Même photographie, typo, palette et contenu ; les proportions de référence sont conservées lorsque la fenêtre reprend le ratio original.
- Premier contrôle : largeur intrinsèque du bouton faisant dépasser la grille à 319 px. Correction par colonne `minmax(0,1fr)` et enfant `min-width:0`. Nouvelle capture et suite complète réussies.
- Photo et textes inchangés. Les petites fenêtres adaptent la taille des caractères et la répartition texte/photo pour conserver le contenu accessible en un écran. Aucune restriction du scroll global.

## Livrables

- Feuille de style modifiée : `hero.css`.
- Capture desktop finale : `qa/hero-viewport/hero-final.jpg`.
- Captures mobile et paysage : dans le même dossier.
- Le rapport de La Maison est archivé dans `qa/maison-v1/design-qa.md`.
# QA — Qualité des photographies, 21 octobre 2026

final result: passed

Photos floues ou trop petites corrigées sur Accueil, Nos parfums et La Maison : 21 visuels photographiques et un fond marbre régénérés avec ImageGen, plus les recadrages d’ingrédients et du hero mobile. Les fonds de La Maison ne contiennent plus les traces de texte de l’ancien montage. Les photographies des blocs en deux colonnes sont séparées du texte HTML ; cadrages et contrastes vérifiés.

Rapport : [qa/image-quality/report.md](qa/image-quality/report.md). Captures avant/après et comparaison rapprochée dans le même dossier. Contrôles à 1920, 1512, 768, 390 et 319 px, DPR 2 : chargement complet, absence d’erreurs JS/HTTP et de débordement horizontal. Dialogues produits vérifiés sur desktop/mobile. Suite des animations `qa/all-pages-motion/check.cjs` de nouveau réussie. Originaux, masters et prompts conservés ; aucune publication distante pour cette correction.

# QA — Version mobile des trois pages, 21 octobre 2026

final result: passed

Contrôle et corrections de l’Accueil, Nos parfums et La Maison : menu défilant dans la hauteur disponible, titre d’accueil compact en paysage, cibles du footer d’au moins 44 × 44 px, champ e-mail à 16 px et formulaire empilé, fermeture des dialogues toujours accessible, nouvelle fiche réinitialisée en haut, contrastes de petits libellés renforcés. Styles isolés dans `mobile.css` ; comportement commun ajusté dans `app.js`.

Rapport : [qa/mobile/report.md](qa/mobile/report.md). Dix-huit configurations de mise en page à 320/375/390/430/768/844 px ; douze parcours tactiles incluant les paysages 667 × 375 et 844 × 390 ; suite complète des animations réussie. Aucune image manquante, erreur JS/HTTP ou largeur débordante dans l’inventaire final. Pages complètes et interactions inspectées à partir de captures fraîches. Vérification en émulation Chromium, sans validation Safari sur appareil physique ni revendication de conformité WCAG complète. Newsletter toujours non connectée, aucune publication distante.
