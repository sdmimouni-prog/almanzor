# QA — La Maison ALMANZOR

final result: passed

## Cible et preuves

- Source : `/Users/salaheddinemimouni/Downloads/La Maison Almanzor Parfums.png`, 770 × 2042 px.
- Implémentation : `http://127.0.0.1:4173/la-maison.html`.
- Capture desktop : `qa/maison-v1/full-1540.png`, 1540 × 4059 px, viewport CSS 1540 × 1024, DPR 1. Normalisation par deux en 770 × 2030 : `page-final.jpg`.
- Comparaison : `qa/maison-v1/comparison-full.jpg`, référence à gauche et rendu à droite, chacun normalisé à 770 × 1883 pour la totalité du contenu jusqu’au footer.
- Comparaisons détaillées : `comparison-hero.png`, `comparison-inspiration.png`, `comparison-benefits.png`, `comparison-materials.png`, `comparison-vision.png`, `comparison-art.png`, `comparison-commitment.png`, `comparison-newsletter.png`.
- État de comparaison : page chargée, toutes les images décodées, dialogues et menu fermés, formulaire vierge, scroll initial, mouvement réduit.
- Exception demandée : le header et le footer existants sont conservés. Leur composition diffère donc volontairement du raster de cette page. L’état actif « La Maison » et les destinations des liens sont adaptés. Le corps finit à y1883 dans la référence et y3766 dans le rendu à 1540, exactement à l’échelle 2.
- Contrôle complémentaire dans le navigateur intégré : affichage desktop, lien Notre histoire, ouverture/fermeture du savoir-faire, retour en haut, console sans erreur.

## Surfaces de fidélité

- **Typographie** : Georgia pour les titres, Arial pour le contenu, styles partagés pour le menu/footer. Taille, interligne, graisse optique, capitales, espacement et retours de ligne comparés dans chaque section. H1 ajusté à 38,4 unités source, titre inspiration 30,5, vision 31. Aucun texte tronqué sur les largeurs contrôlées. Les fichiers de fontes du raster sont absents ; de petites différences de glyphes et d’anticrénelage restent P3.
- **Espacement et rythme** : sections mesurées à 397 / 290 / 130 / 293 / 256 / 248 / 164 / 105 unités source. Divisions et cadrages photographiques conservés. Placement des paragraphes, boutons et filets contrôlé à la même échelle. Structure mobile verticale, bénéfices sur deux colonnes et engagements sur trois colonnes ; pas de débordement.
- **Couleurs** : ivoire, vert profond et or prélevés dans la référence. Photos et surfaces des CTA extraites du raster. Les restaurations des zones masquées sont raccordées à la teinte du fond. Aucune décoration ajoutée.
- **Images** : photographies originales conservées en dehors des textes à nettoyer, monogrammes et inscriptions inchangés. Les sept pictogrammes sont des découpes source indépendantes. Les quatre photos mobiles ont une différence maximale de zéro avec les régions originales. Résolution source limitée à 770 px ; pas de prétendue augmentation de détail.
- **Contenu** : tous les titres, paragraphes, engagements et libellés proviennent de la maquette. Seuls les quatre parfums existants apparaissent. Aucun prix ni volume ajouté. Interface entièrement reconstruite en HTML/CSS, images de fond sans interface.

## Historique des corrections

1. Première comparaison (`comparison-first.jpg`) : **P2** raccords rectangulaires visibles autour des zones restaurées ; filet d’inspiration dédoublé ; petit décalage de taille/position des titres ; fonds perforés réutilisés tels quels sur mobile. Corrigés en ciblant les pixels d’interface au lieu des rectangles complets, en étendant les corrections chromatiques à la marge des masques, en corrigeant le filet et les métriques, et en donnant aux rubriques mobiles un fond adapté.
2. Deuxième comparaison : **P2** marge claire visible autour de l’ancien formulaire et motif agrandi inadapté sur mobile. Correction par prélèvement de la teinte autour du formulaire, découpe mobile d’une zone de marbre vierge de la source et ajustement de la taille du titre newsletter. Les captures finales ne présentent plus ces raccords.
3. Dernier contrôle du bandeau vision : masque de l’ancien petit libellé affiné pour préserver le paysage entre les lettres. Capture desktop renouvelée et comparaison détaillée inspectée.

Aucun P0/P1/P2 restant dans les vues comparées.

## Fonctionnement et responsive

`qa/maison-v1/check.cjs`, résultats dans `checks.json`, `shared-layout.json` et `check.log`.

- Largeurs : 319, 390, 768, 1024, 1440, 1540 et 1920 px ; captures complètes conservées.
- Zéro débordement horizontal, zéro image manquante, zéro erreur JavaScript/console ou HTTP ≥ 400.
- Hero → Notre histoire : ancre correcte.
- Notre savoir-faire : dialogue avec le texte fourni, fermeture par Échap.
- Découvrir nos parfums : page catalogue.
- Recherche depuis La Maison : résultats pointant vers les sections de `nos-parfums.html` ; recherche depuis les autres pages conservée.
- Menu mobile : ouverture, état actif, fermeture et Échap.
- Newsletter : validation e-mail et message explicite d’absence de connexion ; aucun envoi, stockage ou succès fictif.
- Liens La Maison de l’accueil et du catalogue reliés à la nouvelle page ; lien d’histoire et bandeau institutionnel reliés.
- Header/footer : contenu et assets communs identiques. Régressions visuelles de l’accueil et du catalogue à 1440 px : **différence maximale de zéro**, voir `pixel-checks.json`.
- Sémantique : H1 unique, régions nommées, H2, vrais liens/boutons, labels, alt descriptifs, focus clavier et mouvement réduit partagés.

## Limites et suivi P3

- Fontes exactes et images originales sans texte non fournies : légères différences typographiques et restauration ponctuelle des fonds.
- Netteté photographique bornée par la résolution de la maquette fournie.
- Pas de backend ajouté : newsletter non connectée ; commandes et espace client renvoient vers le site officiel comme précédemment.

## Livrables

- Page : `la-maison.html`, styles isolés : `maison.css`.
- Liens : `index.html`, `nos-parfums.html`. Recherche et dialogue : `app.js`.
- Assets : `assets/maison-*`, provenance : `qa/maison-v1/asset-provenance.md`.
- Capture desktop finale : `qa/maison-v1/page-final.jpg` ; mobile : `qa/maison-v1/full-390.png`.
- Prévisualisation locale maintenue sur le port 4173, aucune publication distante.
