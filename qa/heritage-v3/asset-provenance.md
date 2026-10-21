# Provenance — Savoir-faire et signature, nouvelle référence

Source : `/Users/salaheddinemimouni/Downloads/Luxury Perfume Heritage in Golden Light.png`, 1536 × 1024 px.

Le gros plan du capuchon est extrait directement dans `(0,0,827,517)` et enregistré sans perte. Sa photographie et le monogramme physique du capuchon ne sont pas modifiés.

ImageGen intégré restaure le papier sous le contenu du panneau supérieur droit et le décor sous les surimpressions du bandeau inférieur. Sortie brute : `restored-background.png`, copiée de `/Users/salaheddinemimouni/.codex/generated_images/01a15ba3-892c-73a0-8190-d9fbcfe2e5d4/exec-7718704c-5b3d-4f52-8fbf-77ec62f0cff8.png`. `prepare_assets.py` applique seulement les régions de restauration utiles avec un masque et un raccord doux. Le grand monogramme mural de droite reste une extraction exacte de la source. Le décor caché par les textes est une reconstitution et peut différer d’un fond original sans interface.

Le monogramme doré central est extrait de la référence `(710,560,830,666)` sur fond transparent. Ses couleurs et sa silhouette ne sont pas redessinées ; le minuscule trait détaché à droite est écarté lors de l’extraction. Les titres, textes, filets et boutons sont natifs HTML/CSS. Les flèches réutilisent les icônes Lucide Static 0.468.0 ISC du projet. Aucun screenshot complet n’est affiché comme section.

Les quatre nouveaux WebP sont sans perte. Les assets précédents restent disponibles pour l’historique, mais ces deux sections consomment désormais les assets `heritage-*`. Les services et la galerie Instagram restent ceux déjà validés.

## Prompt ImageGen

Restore this exact 1536x1024 two-section reference for website photographic assets. Remove ONLY WEBSITE UI overlays. Upper half y0..517: keep entire LEFT macro cap photograph x0..827 EXACTLY unchanged, including its physical gold monogram. In RIGHT ivory panel remove UN SAVOIR-FAIRE AUTHENTIQUE, L’excellence dans chaque détail., its rule, paragraph and outline button. Restore the same quiet ivory paper with faint marble behind those areas; keep panel split x827 and y517 exact. Lower photograph y517..1024: REMOVE the central overlaid gold A logo at x710..830,y560..666 (including tiny stray gold mark), both white slogan lines Plus qu’un parfum, une signature at x530..1005,y674..787 and gold CTA rectangle x558..981,y819..886. Restore the same dark stone doorway, shadow, wall and terrace behind those local UI overlays, preserving dark lighting. CRITICAL: KEEP the LARGE GOLD A physically mounted on the far RIGHT wall at x1130..1380,y585..863 completely unchanged. Keep all scenery, palms, mountain, tower, pots, floor, stones, crops, shadows, section heights and framing unchanged. Do not invent or move objects. Keep physical monograms on cap and right wall. No website UI text/logo/buttons/rules remain. Output exact same1536x1024 composition.
