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
