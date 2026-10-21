# La Maison — background restoration

- Source: /Users/salaheddinemimouni/Downloads/La Maison Almanzor Parfums.png (770 × 2042).
- Method: built-in image_gen image edit, one generation, nontransparent.
- Original generated file: /Users/salaheddinemimouni/.codex/generated_images/01a15dfc-b28a-74d2-b3c8-3072928ae5bb/exec-2493b8b3-6ad7-4f06-81f7-46b2e5b34e03.png
- Workspace copy: qa/maison-v1/restored-background.png
- Intended use: composite locally only under website UI masks; preserve native photography outside masks.
- Output dimensions: 770 × 2041 (source is 770 × 2042); normalize to source height before compositing.
- Inspection: all overlay UI removed; physical A monograms and bottle labels retained. Generated marble veining is more pronounced and brighter than source. Photographic areas have small generative changes. Preserve original source photography outside tightly defined UI masks and match restored patch exposure to surrounding pixels.

## Exact prompt

Use case: precise-object-edit.
Asset type: background restoration plate for faithful implementation of the supplied ALMANZOR website, not a new web design.
Input image is the sole edit target: a 770×2042 full page screenshot. Produce exactly one restoration at the same aspect ratio, framing, image scale, composition and layout. Keep every horizontal section boundary fixed (source y coordinates: 397, 687, 817, 1110, 1366, 1614, 1778, 1883). Keep the full original image from top to bottom without padding or cropping.
Primary request: erase every digitally overlaid website UI element and restore only the original background naturally under it. Erase the entire header logo/navigation/order button/search/account/bag UI, all headings and paragraphs, every CTA rectangle and its lettering, small ornamental gold rules, the four benefit icons and labels/dividers in the dark horizontal band y687–817, the three responsibility icons/labels/dividers in the dark band y1614–1778, all newsletter heading/subtitle/input/button UI, and the entire footer logo/links/social icons/legal text/rules.
Restore hidden deep emerald dark marble, warm ivory subtle marble, landscape, and architectural backgrounds so no ghost letters, boxes, icon rings or UI artifacts remain. Retain the subtle background veining, gradients, lighting, shadows and materials rather than making flat solid fills.
Strict invariants: unchanged photography and object placement. The physical gold A monogram on the hero doorway must remain. The giant physical A monogram on the wall at y1110–1366 must remain. Preserve all four perfume bottles and ALL real bottle labels unchanged: YAYA, BLADE, MONSIEUR Rouge, BLACK EDEN. These physical marks are not website overlay text.
Keep hero doorway, right olive tree, sunlight and dark emerald left backdrop; keep courtyard photo on right at y397–687, cream left; keep wood/amber photo on left at y817–1110 and cream right; keep panoramic sunset city/palm/stone-wall image at y1110–1366; keep cream left and four bottles on stone right at y1366–1614. Reconstruct city view behind removed text without shifting the scene.
Do not invent or relocate objects. Do not redesign, recolor, brighten, reframe, sharpen, change camera, alter architectural lines or add typography. Opaque image, no transparency. Return only the restored full background image.

