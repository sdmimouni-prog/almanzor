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
