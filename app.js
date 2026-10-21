"use strict";
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#navigation");
function setMenu(open) {
  navigation.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open ? "Fermer le menu" : "Ouvrir le menu",
  );
  menuButton.querySelector("img").src = `assets/${open ? "x" : "menu"}.svg`;
}
menuButton.addEventListener("click", () =>
  setMenu(menuButton.getAttribute("aria-expanded") !== "true"),
);
navigation
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("open")) {
    setMenu(false);
    menuButton.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".header")) setMenu(false);
});
window.matchMedia("(min-width: 1200px)").addEventListener("change", (event) => {
  if (event.matches) setMenu(false);
});
const products = {
  blade: {
    name: "BLADE",
    description:
      "Un flacon noir et bleu. Une silhouette affirmée, une signature ALMANZOR.",
  },
  yaya: {
    name: "YAYA",
    description:
      "Un flacon noir et ambré. Une présence chaleureuse dans la collection ALMANZOR.",
  },
  "monsieur-rouge": {
    name: "MONSIEUR ROUGE",
    description:
      "Un flacon noir et rouge. Le caractère d’une création ALMANZOR.",
  },
  "black-eden": {
    name: "BLACK EDEN",
    description:
      "Un flacon noir et vert. Une expression singulière de l’univers ALMANZOR.",
  },
};
const dialog = document.querySelector("#detail-dialog");
const dialogContent = document.querySelector("#dialog-content");
let lastFocused;
function showDialog(content) {
  lastFocused = document.activeElement;
  dialogContent.innerHTML = content;
  dialog.showModal();
  document.body.classList.add("modal-open");
  dialog.querySelector(".dialog-close").focus();
}
function closeDialog() {
  dialog.close();
}
dialog.querySelector(".dialog-close").addEventListener("click", closeDialog);
dialog.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  if (lastFocused) lastFocused.focus({ preventScroll: true });
});
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const box = dialog.getBoundingClientRect();
    if (
      event.clientX < box.left ||
      event.clientX > box.right ||
      event.clientY < box.top ||
      event.clientY > box.bottom
    )
      closeDialog();
  }
});
document.querySelectorAll("[data-product]").forEach((button) =>
  button.addEventListener("click", () => {
    const key = button.dataset.product;
    const product = products[key];
    const productImage = button.dataset.productImage || `assets/campaign-${key}.webp`;
    const productDescription = button.dataset.productDescription || product.description;
    showDialog(
      `<div class="product-detail"><img src="${productImage}" alt="Visuel ${product.name}" width="941" height="1672"><div class="dialog-copy"><p class="eyebrow">Les créations ALMANZOR</p><h2 id="dialog-title">${product.name}</h2><p>${productDescription}</p><a class="button button-outline" href="https://almanzor.ma">Découvrir sur almanzor.ma <img class="icon" src="assets/arrow-right.svg" width="16" height="16" alt=""></a></div></div>`,
    );
  }),
);
const stories = {
  matieres: [
    "Des matières nobles et rares.",
    "Nous sélectionnons avec exigence les plus belles matières premières : bois précieux, ambres rares, épices nobles et notes aromatiques d’exception.",
    "Chaque ingrédient est choisi pour sa qualité, son caractère et sa capacité à créer des émotions durables.",
  ],
  maison: [
    "L’art du parfum",
    "ALMANZOR est une maison marocaine de parfums masculins. Elle puise son inspiration dans un héritage marocain et arabo-andalou, qu’elle fait dialoguer avec une vision contemporaine.",
    "Chaque création est une invitation à affirmer une présence, à porter une signature personnelle.",
  ],
  univers: [
    "L’excellence dans chaque détail",
    "Le verre, la face avant en chevron, le capuchon noir texturé et les détails bronze composent l’identité des flacons ALMANZOR.",
    "BLADE, YAYA, MONSIEUR ROUGE et BLACK EDEN : quatre créations réunies par une même exigence de présentation.",
  ],
};
document.querySelectorAll("[data-story]").forEach((button) =>
  button.addEventListener("click", () => {
    const [title, ...paragraphs] = stories[button.dataset.story];
    showDialog(
      `<div class="info-copy"><p class="eyebrow">La Maison ALMANZOR</p><h2 id="dialog-title">${title}</h2>${paragraphs.map((text) => `<p>${text}</p>`).join("")}</div>`,
    );
  }),
);
const info = {
  faq: [
    "Questions fréquentes",
    '<strong>Quels parfums découvrir ?</strong><br>La collection réunit BLADE, YAYA, MONSIEUR ROUGE et BLACK EDEN.<br><br><strong>Où découvrir les créations ?</strong><br>Consultez la page <a href="nos-parfums.html">Nos parfums</a> pour explorer les quatre signatures.<br><br><strong>Comment se renseigner sur la livraison ?</strong><br>Retrouvez les modalités disponibles sur le <a href="https://almanzor.ma">site officiel ALMANZOR</a>.',
  ],
  terms: [
    "Conditions générales",
    'Consultez les conditions générales publiées par la Maison sur le <a href="https://almanzor.ma">site officiel ALMANZOR</a>.',
  ],
  facebook: [
    "ALMANZOR sur Facebook",
    'Le lien Facebook officiel n’est pas encore disponible sur ce site. Retrouvez dès maintenant les actualités de la Maison sur <a href="https://www.instagram.com/almanzor.parfums/" target="_blank" rel="noopener noreferrer">Instagram</a>.',
  ],
  youtube: [
    "ALMANZOR sur YouTube",
    'Le lien YouTube officiel n’est pas encore disponible sur ce site. Retrouvez dès maintenant l’univers de la Maison sur <a href="https://www.instagram.com/almanzor.parfums/" target="_blank" rel="noopener noreferrer">Instagram</a>.',
  ],
  contact: [
    "Nous contacter",
    'Retrouvez la Maison sur <a href="https://almanzor.ma">almanzor.ma</a> pour les informations de contact disponibles.',
  ],
  legal: [
    "Mentions légales",
    'Les mentions légales de cette version sont en cours de préparation. Consultez le <a href="https://almanzor.ma">site officiel ALMANZOR</a> pour les informations publiées par la Maison.',
  ],
  privacy: [
    "Confidentialité",
    "Cette page n’utilise aucun outil de suivi et ne transmet pas votre adresse e-mail. Le formulaire de newsletter n’est pas encore connecté à un service d’inscription.",
  ],
  social: [
    "Les réseaux de la Maison",
    'Retrouvez les liens officiels de la Maison sur <a href="https://almanzor.ma">almanzor.ma</a>.',
  ],
};
document.querySelectorAll("[data-info]").forEach((button) =>
  button.addEventListener("click", () => {
    const [title, copy] = info[button.dataset.info];
    showDialog(
      `<div class="info-copy"><h2 id="dialog-title">${title}</h2><p>${copy}</p></div>`,
    );
  }),
);
document
  .querySelector("#newsletter-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelector("#newsletter-status").textContent =
      "L’inscription à la newsletter sera bientôt disponible. Votre adresse n’a pas été transmise ni enregistrée.";
  });

// Local catalogue search: no account, payment or remote request is simulated.
document.querySelector(".search-button").addEventListener("click", () => {
  showDialog(
    '<div class="search-panel"><h2 id="dialog-title">Rechercher un parfum</h2><label class="sr-only" for="perfume-search">Nom du parfum</label><input id="perfume-search" type="search" placeholder="BLADE, YAYA…" autocomplete="off"><div class="search-results" aria-live="polite"></div></div>',
  );
  const input = dialog.querySelector("#perfume-search");
  const results = dialog.querySelector(".search-results");
  const render = () => {
    const query = input.value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
    const matches = Object.entries(products).filter(([, p]) =>
      p.name.toLowerCase().includes(query),
    );
    results.innerHTML = matches.length
      ? matches
          .map(
            ([id, p]) =>
              `<a href="${document.getElementById(id) ? "" : "nos-parfums.html"}#${id}"><img src="assets/product-${id}.webp" width="32" height="72" alt="">${p.name}</a>`,
          )
          .join("")
      : '<p class="search-empty">Aucun parfum ne correspond à votre recherche.</p>';
  };
  input.addEventListener("input", render);
  results.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeDialog();
  });
  render();
  input.focus();
});

// Rotate the existing four perfume cards; retain their dialog handlers and anchors.
const collectionGrid = document.querySelector('#collection-grid');
const collectionStatus = document.querySelector('.collection-status');
function rotateCollection(direction) {
  if (direction > 0) collectionGrid.append(collectionGrid.firstElementChild);
  else collectionGrid.prepend(collectionGrid.lastElementChild);
  collectionStatus.textContent = `Premier parfum : ${collectionGrid.firstElementChild.querySelector('h3').textContent}.`;
}
document.querySelector('.collection-prev')?.addEventListener('click', () => rotateCollection(-1));
document.querySelector('.collection-next')?.addEventListener('click', () => rotateCollection(1));

// Reveal each element on first view, including visits directly to a section.
// Content remains visible when JavaScript or motion is unavailable.
function initSectionMotion(sectionSelector, itemSelector, revealClass, observeSection = false) {
  const section = document.querySelector(sectionSelector);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!section || reducedMotion.matches || !('IntersectionObserver' in window)) return;

  const items = section.querySelectorAll(itemSelector);
  const pending = new Set(items);
  let sectionVisible = false;
  let frame = 0;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (observeSection) {
        sectionVisible = entry.isIntersecting;
        if (sectionVisible) revealVisibleItems();
        return;
      }
      if (!entry.isIntersecting) return;
      reveal(entry.target);
    });
  }, { threshold: observeSection ? 0 : 0.12 });

  function stopWatching() {
    observer.disconnect();
    window.removeEventListener('scroll', scheduleReveal);
    window.removeEventListener('resize', scheduleReveal);
    cancelAnimationFrame(frame);
  }

  // Clip masks must not become the visibility test. Measure their layout boxes
  // only while the containing section is on screen, at most once per frame.
  function revealVisibleItems() {
    frame = 0;
    pending.forEach((item) => {
      const box = item.getBoundingClientRect();
      const visibleHeight = Math.min(box.bottom, innerHeight) - Math.max(box.top, 0);
      if (box.height > 0 && visibleHeight >= Math.min(box.height * 0.12, 64)) reveal(item);
    });
  }

  function scheduleReveal() {
    if (sectionVisible && !frame && pending.size) frame = requestAnimationFrame(revealVisibleItems);
  }

  function reveal(item) {
    item.classList.remove('is-reveal-pending');
    pending.delete(item);
    observer.unobserve(item);
    if (!pending.size) stopWatching();
  }

  items.forEach((item) => {
    item.classList.add(revealClass, 'is-reveal-pending', 'motion-preparing');
  });
  // Commit the hidden state without an initial fade-out before enabling entrances.
  section.getBoundingClientRect();
  items.forEach((item) => {
    item.classList.remove('motion-preparing');
    if (!observeSection) observer.observe(item);
  });
  // Observe the stable container when its children have a closed reveal mask.
  if (observeSection) {
    observer.observe(section);
    window.addEventListener('scroll', scheduleReveal, { passive: true });
    window.addEventListener('resize', scheduleReveal);
  }

  // Keyboard navigation must never land on an invisible, delayed card.
  section.addEventListener('focusin', (event) => {
    const item = event.target.closest('.' + revealClass);
    if (!item) return;
    item.classList.remove(revealClass);
    reveal(item);
  });
  reducedMotion.addEventListener('change', (event) => {
    if (event.matches) {
      items.forEach(reveal);
      stopWatching();
    }
  });
}
initSectionMotion('.reference-selection', '.section-heading, .product', 'collection-reveal');
initSectionMotion('.heritage-signature', '.signature-copy > *', 'story-reveal', true);
initSectionMotion('.reference-reassurance', '.service-item', 'story-reveal');
initSectionMotion('.reference-instagram', '.section-heading > *, .instagram-grid > a', 'story-reveal');
initSectionMotion('.reference-hero', '.reference-hero-scene, h1 > span, .hero-content > p, .hero-content > .button', 'scroll-reveal', true);
initSectionMotion('.editorial-maison', '.editorial-maison-scene, .maison-content > *', 'scroll-reveal', true);
initSectionMotion('.editorial-univers', '.section-heading > *, .universe-card', 'scroll-reveal', true);
initSectionMotion('.heritage-craft', '.craft-image img, .craft-copy > *', 'scroll-reveal', true);
initSectionMotion('.home-page .newsletter', '.container > h2, .container > p:not([role]), form', 'scroll-reveal', true);
initSectionMotion('.home-page .footer', '.footer-grid > *, .copyright', 'scroll-reveal');
