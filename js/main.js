"use strict";

const localeCode =
  window.__SITE_LOCALE ||
  document.documentElement.lang ||
  "ar";

const localeBundle =
  (window.SITE_LOCALES && window.SITE_LOCALES[localeCode]) ||
  (window.SITE_LOCALES && window.SITE_LOCALES.ar) ||
  { translations: {}, pageData: {} };

const translations = localeBundle.translations || {};
const pageData = localeBundle.pageData || {};
const toRelativeAssetPath = (path) =>
  typeof path === "string" ? path.replace(/^\//, "") : path;

function translatePage() {
  document.documentElement.lang = localeCode;
  document.documentElement.dir = localeCode === "ar" ? "rtl" : "ltr";
  document.body.dir = localeCode === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-key]").forEach((el) => {
    const key = el.getAttribute("data-key");
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });

  document.querySelectorAll(".lang").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === localeCode);
  });

  const brandAlt = pageData.staticAlt?.brand || "Brand";
  document.querySelectorAll(".sidebar-tughra, .topbar-logo, .footer-tughra").forEach((img) => {
    img.alt = brandAlt;
  });

  const heroImage = document.querySelector(".hero-image-frame img");
  if (heroImage) {
    heroImage.alt = pageData.staticAlt?.portrait || heroImage.alt;
  }

  const introVideo = document.getElementById("introVideo");
  if (introVideo) {
    introVideo.title = pageData.staticAlt?.introVideo || introVideo.title;
  }

  const staticText = pageData.staticText || {};
  const heroBioButton = document.querySelector('.hero-cta .btn-gold');
  if (heroBioButton && staticText.heroBioButton) {
    heroBioButton.textContent = staticText.heroBioButton;
  }

  const heroResearchButton = document.querySelector('.hero-cta .btn-outline');
  if (heroResearchButton && staticText.heroResearchButton) {
    heroResearchButton.textContent = staticText.heroResearchButton;
  }

  const scrollHint = document.querySelector(".scroll-hint span");
  if (scrollHint && staticText.scrollHint) {
    scrollHint.textContent = staticText.scrollHint;
  }

  const activityTitle = document.querySelector("#activity .section-title");
  if (activityTitle && staticText.activityTitle) {
    activityTitle.textContent = staticText.activityTitle;
  }

  document.querySelectorAll(".lang-badge").forEach((badge, index) => {
    if (staticText.languageBadges?.[index]) {
      badge.textContent = staticText.languageBadges[index];
    }
  });

  const ottomanParagraph = document.querySelector(".ottoman-text p");
  if (ottomanParagraph && staticText.ottomanIntro) {
    ottomanParagraph.textContent = staticText.ottomanIntro;
  }

  const ottomanButton = document.querySelector(".ottoman-text .btn-gold");
  if (ottomanButton && staticText.ottomanButton) {
    ottomanButton.innerHTML = '<i class="fa-solid fa-file-pen"></i> ' + staticText.ottomanButton;
  }

  const ottomanHeroImage = document.querySelector(".ottoman-hero-img img");
  if (ottomanHeroImage && staticText.ottomanCaption) {
    ottomanHeroImage.alt = staticText.ottomanCaption;
  }

  const ottomanCaption = document.querySelector(".img-caption");
  if (ottomanCaption && staticText.ottomanCaption) {
    ottomanCaption.textContent = staticText.ottomanCaption;
  }

  const ottomanCards = document.querySelectorAll(".ottoman-stack-card h3");
  if (ottomanCards[0] && staticText.ottomanTranslationWorks) {
    ottomanCards[0].textContent = staticText.ottomanTranslationWorks;
  }
  if (ottomanCards[1] && staticText.ottomanWorkshop) {
    ottomanCards[1].textContent = staticText.ottomanWorkshop;
  }
  if (ottomanCards[2] && staticText.ottomanCourses) {
    ottomanCards[2].textContent = staticText.ottomanCourses;
  }

  const galleryLightboxImg = document.getElementById("galleryLightboxImg");
  if (galleryLightboxImg) {
    galleryLightboxImg.alt = pageData.staticAlt?.galleryImage || galleryLightboxImg.alt;
  }

  document.querySelectorAll(".book-card, .shelf-book").forEach((card) => {
    const title = card.querySelector("h3")?.textContent?.trim();
    const image = card.querySelector(".book-cover img, .shelf-cover img");
    if (title && image) {
      image.alt = title;
    }
  });

  document.querySelectorAll(".timeline-card").forEach((card) => {
    const title = card.querySelector("h3")?.textContent?.trim();
    const image = card.querySelector("img");
    if (title && image) {
      image.alt = title;
    }
  });

  document.body.classList.remove("locale-pending");
  document.body.classList.add("locale-ready");
}

// =======================
// SIDEBAR NAVIGATION
// =======================

const sidebar = document.getElementById("sidebar");
const burgerBtn = document.getElementById("burgerBtn");
const sidebarOverlay = document.getElementById("sidebarOverlay");

function setSidebarOpenState(isOpen) {
  if (!sidebar || !sidebarOverlay) {
    return;
  }

  sidebar.classList.toggle("open", isOpen);
  sidebarOverlay.classList.toggle("open", isOpen);
  sidebarOverlay.classList.toggle("active", isOpen);
}

if (burgerBtn && sidebar) {
  burgerBtn.addEventListener("click", () => {
    setSidebarOpenState(!sidebar.classList.contains("open"));
  });
}

if (sidebarOverlay && sidebar) {
  sidebarOverlay.addEventListener("click", () => {
    setSidebarOpenState(false);
  });
}

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    setSidebarOpenState(false);
  });
});


// =======================
// ACTIVE NAV ON SCROLL
// =======================

const navLinks = document.querySelectorAll(".nav-link[data-section]");
const sections = document.querySelectorAll(".page-section[id]");

function updateActiveNav() {
  let current = "";
  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    if (top <= 120) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.section === current);
  });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();


// =======================
// SMOOTH ANCHOR SCROLL
// =======================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) {
      return;
    }

    event.preventDefault();
    const offset = window.innerWidth <= 1024 ? 60 : 0;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});


// =======================
// LANGUAGE NAVIGATION
// =======================

document.querySelectorAll(".lang").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetLang = btn.dataset.lang;
    if (!targetLang || targetLang === localeCode) {
      return;
    }

    const hash = window.location.hash || "";
    const currentPath = window.location.pathname;
    const rootPath = currentPath
      .replace(/\/(?:ar|en|tr)\/index\.html$/i, "/")
      .replace(/\/index\.html$/i, "/");
    const nextPath =
      targetLang === "ar"
        ? `${rootPath}index.html`
        : `${rootPath}${targetLang}/index.html`;
    window.location.href = `${nextPath}${hash}`;
  });
});


// =======================
// TIMELINE SLIDER
// =======================

document.querySelectorAll(".timeline-wrapper").forEach((wrapper) => {
  const track = wrapper.querySelector(".timeline-track");
  const nextBtn = wrapper.querySelector(".next");
  const prevBtn = wrapper.querySelector(".prev");
  const direction = localeCode === "ar" ? 1 : -1;

  if (track && nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: 340 * direction, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -340 * direction, behavior: "smooth" });
    });
  }
});


// =======================
// MEDIA SLIDER
// =======================

const mediaItems = pageData.mediaItems || [];
let mediaIndex = 0;

const mediaImage = document.getElementById("mediaImage");
const mediaDesc = document.getElementById("mediaDesc");

function showMedia(index) {
  if (!mediaImage || !mediaDesc || !mediaItems.length) {
    return;
  }

  mediaImage.style.opacity = 0;
  setTimeout(() => {
    const item = mediaItems[index];
    mediaImage.src = toRelativeAssetPath(item.img);
    mediaImage.alt = item.alt || item.mediaDesc || pageData.staticAlt?.honors || "";
    mediaDesc.textContent = item.mediaDesc;
    mediaImage.style.opacity = 1;
  }, 300);
}

if (mediaImage && mediaDesc && mediaItems.length) {
  showMedia(mediaIndex);
}

if (mediaItems.length > 1) {
  setInterval(() => {
    mediaIndex = (mediaIndex + 1) % mediaItems.length;
    showMedia(mediaIndex);
  }, 3000);
}


// =======================
// YOUTUBE VIDEO CONTROL
// =======================

const introVideoEl = document.getElementById("introVideo");
if (introVideoEl) {
  let player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player("introVideo");
  }
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
}


// =======================
// SCROLL ANIMATION ENGINE
// =======================

const animElements = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right, .reveal-zoom, .stagger"
);

const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        scrollObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

animElements.forEach((el) => scrollObserver.observe(el));

function initSectionRevealForMobileAndMedium() {
  if (!("IntersectionObserver" in window)) {
    return;
  }

  const shouldRevealSections = window.matchMedia("(max-width: 1024px)").matches;
  if (!shouldRevealSections) {
    return;
  }

  const sections = Array.from(document.querySelectorAll(".page-section"));
  if (!sections.length) {
    return;
  }

  sections.forEach((section) => section.classList.add("section-reveal"));
  // Keep hero visible immediately to avoid initial flash on load.
  sections[0].classList.add("active");

  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  sections.slice(1).forEach((section) => sectionObserver.observe(section));
}


// =======================
// ACTIVITY CARDS DATA
// =======================

const confData = pageData.confData || [];
const visitData = pageData.visitData || [];
const socialData = pageData.socialData || [];


// =======================
// ACTIVITY CARD SLIDER
// =======================

function runSlider(data, imgId, titleId, fallbackAlt) {
  let index = 0;
  const img = document.getElementById(imgId);
  const title = document.getElementById(titleId);

  if (!img || !title || !data.length) {
    return;
  }

  img.alt = data[0].alt || data[0].title || fallbackAlt;
  title.textContent = data[0].title;

  setInterval(() => {
    index = (index + 1) % data.length;
    img.style.opacity = 0;
    setTimeout(() => {
      img.src = toRelativeAssetPath(data[index].img);
      img.alt = data[index].alt || data[index].title || fallbackAlt;
      title.textContent = data[index].title;
      img.style.opacity = 1;
    }, 300);
  }, 3500);
}

// Sliders are initialized in DOMContentLoaded once.


// =======================
// GLOBAL GALLERY LIGHTBOX
// =======================

const galleryLightbox = document.getElementById("galleryLightbox");
const lightboxGalleryImg = document.getElementById("galleryLightboxImg");

let currentImages = [];
let currentIndex = 0;

function openGallery(images, index = 0) {
  currentImages = images;
  currentIndex = index;
  lightboxGalleryImg.src = toRelativeAssetPath(currentImages[currentIndex]);
  lightboxGalleryImg.alt = pageData.staticAlt?.galleryImage || "";
  galleryLightbox.style.display = "flex";
}

function showNext() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  lightboxGalleryImg.src = toRelativeAssetPath(currentImages[currentIndex]);
}

function showPrev() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  lightboxGalleryImg.src = toRelativeAssetPath(currentImages[currentIndex]);
}

function closeLightbox() {
  galleryLightbox.style.display = "none";
}

window.showNext = showNext;
window.showPrev = showPrev;
window.closeLightbox = closeLightbox;

if (galleryLightbox) {
  galleryLightbox.addEventListener("click", (event) => {
    if (event.target === galleryLightbox) {
      closeLightbox();
    }
  });
}


// =======================
// ACTIVITY CARD CLICK
// =======================

const confImages = confData.map((item) => toRelativeAssetPath(item.img));
const visitImages = visitData.map((item) => toRelativeAssetPath(item.img));
const socialImages = socialData.map((item) => toRelativeAssetPath(item.img));

const confCardEl = document.getElementById("confCard");
const visitCardEl = document.getElementById("visitCard");
const socialCardEl = document.getElementById("socialCard");

if (confCardEl) {
  confCardEl.onclick = () => openGallery(confImages);
}

if (visitCardEl) {
  visitCardEl.onclick = () => openGallery(visitImages);
}

if (socialCardEl) {
  socialCardEl.onclick = () => openGallery(socialImages);
}

if (mediaImage) {
  mediaImage.addEventListener("click", () => {
    const mediaImgs = mediaItems.map((item) => toRelativeAssetPath(item.img));
    openGallery(mediaImgs, mediaIndex);
  });
}


// =======================
// LIGHTBOX KEYBOARD
// =======================

document.addEventListener("keydown", (event) => {
  const researchPanel = document.querySelector("[data-research-panel]");
  if (researchPanel && researchPanel.classList.contains("is-open") && event.key === "Escape") {
    researchPanel.classList.remove("is-open");
    researchPanel.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    return;
  }

  if (galleryLightbox && galleryLightbox.style.display === "flex") {
    if (event.key === "Escape") {
      closeLightbox();
    }
    if (event.key === "ArrowRight") {
      showNext();
    }
    if (event.key === "ArrowLeft") {
      showPrev();
    }
    return;
  }

  const box = document.getElementById("lightbox");
  if (box && box.style.display === "flex") {
    if (event.key === "Escape") {
      closeBox();
    }
    if (event.key === "ArrowLeft") {
      next();
    }
    if (event.key === "ArrowRight") {
      prev();
    }
  }
});


// =======================
// OTTOMAN / TRANSLATION BOX
// =======================

const data = {
  translation: ["assets/TRJ1.webp", "assets/TRJ2.webp", "assets/TRJ2.webp"],
  courses: ["assets/OT4.webp", "assets/OT5.webp", "assets/OT2.webp", "assets/OT3.webp", "assets/OT1.webp"]
};

let currentType = "";
let index = 0;

function openBox(type, i) {
  currentType = type;
  index = i;
  show();
}

function show() {
  const box = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  const counter = document.getElementById("lbCounter");

  if (!box || !img) {
    return;
  }

  box.style.display = "flex";
  img.src = data[currentType][index];
  img.alt = pageData.staticAlt?.galleryImage || "";
  if (counter) {
    counter.textContent = `${index + 1} / ${data[currentType].length}`;
  }
}

function next() {
  index = (index + 1) % data[currentType].length;
  show();
}

function prev() {
  index = (index - 1 + data[currentType].length) % data[currentType].length;
  show();
}

function closeBox() {
  const box = document.getElementById("lightbox");
  if (box) {
    box.style.display = "none";
  }
}

function handleLbClick(event) {
  if (event.target.id === "lightbox") {
    closeBox();
  }
}

window.openBox = openBox;
window.next = next;
window.prev = prev;
window.closeBox = closeBox;
window.handleLbClick = handleLbClick;

// =======================
// BOOKSHELF INTERACTIONS
// =======================

function initBookshelf() {
  const showcase = document.querySelector("[data-showcase-frame]");
  const showcaseOverlay = document.querySelector("[data-showcase-overlay]");
  const featuredRows = document.querySelector("[data-bookshelf-rows]");
  const books = Array.from(document.querySelectorAll("[data-book]"));

  if (!showcase || !showcaseOverlay || !featuredRows || !books.length) {
    return;
  }

  const showcaseLink = showcase.querySelector("[data-showcase-link]");
  const showcaseImage = showcase.querySelector("[data-showcase-img]");
  const showcaseTitle = showcase.querySelector("[data-showcase-title]");
  const showcasePub = showcase.querySelector("[data-showcase-pub]");
  const showcaseSnippet = showcase.querySelector("[data-showcase-snippet]");
  const showcaseCta = showcase.querySelector("[data-showcase-cta]");
  const overlayTitle = showcase.querySelector("[data-showcase-otitle]");
  const overlayPub = showcase.querySelector("[data-showcase-opub]");
  const overlayDesc = showcase.querySelector("[data-showcase-odesc]");
  const overlayCta = showcase.querySelector("[data-showcase-octa]");

    const isMobile = () => window.matchMedia("(max-width: 768px)").matches;
  const rotationDelay = () => (isMobile() ? 5000 : 3000);

  function extractBookData(book) {
  const coverLink = book.querySelector(".shelf-cover");
  const img = book.querySelector(".shelf-cover img");
  const title =
    book.querySelector(".shelf-title")?.textContent?.trim() ||
    book.querySelector("h4")?.textContent?.trim() ||
    "";
  const metas = Array.from(book.querySelectorAll(".shelf-meta"))
    .map((item) => item.textContent.trim())
    .filter(Boolean);

  return {
    href: coverLink?.href || "#",
    img: img?.src || "",
    alt: img?.alt || title,
    title,
    pub: metas[0] || "",
    // التعديل هنا: لا تضع وصفاً إذا كان هناك عنصر واحد فقط في المصفوفة
    desc: metas.length > 1 ? metas[metas.length - 1] : "", 
  };
}

  let activeIndex = 0;
  let rotationTimer = null;
  let isPaused = false;

  function setShowcase(index) {
    const data = extractBookData(books[index]);
    showcase.classList.add("is-switching");

    window.setTimeout(() => {
      if (showcaseLink) {
        showcaseLink.href = data.href;
      }
      if (showcaseImage) {
        showcaseImage.src = data.img;
        showcaseImage.alt = data.alt;
      }
      if (showcaseTitle) {
        showcaseTitle.textContent = data.title;
      }
      if (showcasePub) {
        showcasePub.textContent = data.pub || " ";
      }
      if (showcaseSnippet) {
        showcaseSnippet.textContent = data.desc;
      }
      if (showcaseCta) {
        showcaseCta.href = data.href;
      }
      if (overlayTitle) {
        overlayTitle.textContent = data.title;
      }
      if (overlayPub) {
        overlayPub.textContent = data.pub || " ";
      }
      if (overlayDesc) {
        overlayDesc.textContent = data.desc;
      }
      if (overlayCta) {
        overlayCta.href = data.href;
      }
      showcase.classList.remove("is-switching");
    }, 170);
  }

  function scheduleRotation() {
    window.clearTimeout(rotationTimer);
    if (isPaused) {
      return;
    }
    rotationTimer = window.setTimeout(() => {
      activeIndex = (activeIndex + 1) % books.length;
      setShowcase(activeIndex);
      scheduleRotation();
    }, rotationDelay());
  }

  function setOverlayState(visible) {
    showcaseOverlay.classList.toggle("is-visible", visible);
    showcase.classList.toggle("is-hovered", visible);
    showcaseOverlay.setAttribute("aria-hidden", visible ? "false" : "true");
  }

  showcase.addEventListener("mouseenter", () => {
    if (isMobile()) {
      return;
    }
    isPaused = true;
    window.clearTimeout(rotationTimer);
    setOverlayState(true);
  });

  showcase.addEventListener("mouseleave", () => {
    if (isMobile()) {
      return;
    }
    setOverlayState(false);
    isPaused = false;
    scheduleRotation();
  });

  showcase.addEventListener("click", () => {
    if (!isMobile()) {
      return;
    }
    const visible = showcaseOverlay.classList.contains("is-visible");
    setOverlayState(!visible);
  });

  books.forEach((book) => {
    const row = book.closest(".bookshelf-row");
    const activate = () => {
      books.forEach((item) => item.classList.remove("is-active"));
      document.querySelectorAll(".bookshelf-row").forEach((itemRow) => itemRow.classList.remove("is-dimmed"));
      book.classList.add("is-active");
      row?.classList.add("is-dimmed");
    };

    if (!isMobile()) {
      book.addEventListener("mouseenter", activate);
      book.addEventListener("mouseleave", () => {
        book.classList.remove("is-active");
        row?.classList.remove("is-dimmed");
      });
    }

    book.addEventListener("click", () => {
      if (!isMobile()) {
        return;
      }
      const alreadyActive = book.classList.contains("is-active");
      books.forEach((item) => item.classList.remove("is-active"));
      if (!alreadyActive) {
        book.classList.add("is-active");
      }
    });
  });

  window.addEventListener("resize", () => {
    books.forEach((book) => book.classList.remove("is-active"));
    document.querySelectorAll(".bookshelf-row").forEach((row) => row.classList.remove("is-dimmed"));
    setOverlayState(false);
    scheduleRotation();
  });

  setShowcase(0);
  scheduleRotation();
}

function initResearchCluster() {
  const section = document.querySelector(".research-section");
  const folio = section?.querySelector("[data-research-folio]");
  const list = section?.querySelector(".research-list");
  const cards = list ? Array.from(list.querySelectorAll(".research-item")) : [];
  const contentFade = section?.querySelector("[data-research-fade]");
  const contentTitle = section?.querySelector("[data-research-content-title]");
  const contentDesc = section?.querySelector("[data-research-content-desc]");
  const contentAuthor = section?.querySelector("[data-research-content-author]");
  const contentLink = section?.querySelector("[data-research-content-link]");

  if (
    !section || !folio || !list || !cards.length ||
    !contentFade || !contentTitle || !contentDesc || !contentAuthor || !contentLink
  ) {
    return;
  }

  section.classList.add("is-folio-ready");
  const isMobileViewport = () => window.matchMedia("(max-width: 900px)").matches;
  const ROTATION_MS = 3000;
  const CLICK_PAUSE_MS = 9000;
  let activeIndex = 0;
  let rotationTimer = null;
  let hoverPaused = false;
  let clickPauseTimer = null;
  let clickPaused = false;
  let contentSwapTimer = null;
  let contentSwapToken = 0;

  const setActiveCard = (card) => {
    const nextIndex = cards.indexOf(card);
    if (nextIndex !== -1) {
      activeIndex = nextIndex;
    }
    cards.forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");

    contentFade.classList.add("is-swapping");
    const currentToken = ++contentSwapToken;
    if (contentSwapTimer) {
      window.clearTimeout(contentSwapTimer);
    }
    contentSwapTimer = window.setTimeout(() => {
      if (currentToken !== contentSwapToken) {
        return;
      }
      contentTitle.textContent = card.querySelector("h3")?.textContent?.trim() || "";
      contentDesc.textContent = card.querySelector("p")?.textContent?.trim() || "";
      contentAuthor.textContent = card.querySelector(".research-source")?.textContent?.trim() || "";
      contentLink.href = card.getAttribute("href") || "#";
      contentFade.classList.remove("is-swapping");
    }, 130);
  };

  const showByIndex = (index) => {
    const normalized = ((index % cards.length) + cards.length) % cards.length;
    setActiveCard(cards[normalized]);
  };

  const clearRotation = () => {
    if (!rotationTimer) {
      return;
    }
    window.clearInterval(rotationTimer);
    rotationTimer = null;
  };

  const startRotation = () => {
    if (isMobileViewport() || hoverPaused || clickPaused || rotationTimer) {
      return;
    }
    rotationTimer = window.setInterval(() => {
      showByIndex(activeIndex + 1);
    }, ROTATION_MS);
  };

  const pauseAfterClick = () => {
    clickPaused = true;
    clearRotation();
    if (clickPauseTimer) {
      window.clearTimeout(clickPauseTimer);
    }
    clickPauseTimer = window.setTimeout(() => {
      clickPaused = false;
      startRotation();
    }, CLICK_PAUSE_MS);
  };

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (isMobileViewport()) {
        return;
      }
      hoverPaused = true;
      clearRotation();
      setActiveCard(card);
    });

    card.addEventListener("mouseleave", () => {
      if (isMobileViewport()) {
        return;
      }
      hoverPaused = false;
      startRotation();
    });

    card.addEventListener("click", (event) => {
      if (isMobileViewport()) {
        return;
      }
      event.preventDefault();
      setActiveCard(card);
      pauseAfterClick();
    });
  });

  list.addEventListener("mouseleave", () => {
    if (isMobileViewport()) {
      return;
    }
    hoverPaused = false;
    startRotation();
  });

  window.addEventListener("resize", () => {
    clearRotation();
    if (isMobileViewport()) {
      hoverPaused = false;
      return;
    }
    startRotation();
  });

  setActiveCard(cards[0]);
  startRotation();
}

function initMobileOnlyEnhancements() {
  if (window.innerWidth > 768) {
    return;
  }

  const touchTargets = document.querySelectorAll(
    "a, button, .book-card, .research-item, .contact-item, .nav-link, .timeline-card"
  );
  touchTargets.forEach((el) => {
    if (!el) {
      return;
    }
    el.addEventListener("touchstart", () => el.classList.add("mobile-pressed"), { passive: true });
    const release = () => el.classList.remove("mobile-pressed");
    el.addEventListener("touchend", release, { passive: true });
    el.addEventListener("touchcancel", release, { passive: true });
  });

  const bookRows = Array.from(document.querySelectorAll(".bookshelf-row"));
  bookRows.forEach((booksGrid) => {
    const cards = Array.from(booksGrid.querySelectorAll(".shelf-book"));
    if (!cards.length) {
      return;
    }
    const updateActive = () => {
      const rect = booksGrid.getBoundingClientRect();
      const viewportCenter = rect.left + (rect.width / 2);
      let nearestCard = null;
      let minDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + (cardRect.width / 2);
        const distance = Math.abs(viewportCenter - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          nearestCard = card;
        }
      });

      cards.forEach((card) => card.classList.remove("is-active"));
      nearestCard?.classList.add("is-active");
    };

    updateActive();
    booksGrid.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive, { passive: true });
  });

  const revealItems = document.querySelectorAll(
    ".shelf-book, .research-item, .contact-item, .activity-card"
  );
  if (revealItems.length && "IntersectionObserver" in window) {
    revealItems.forEach((el, index) => {
      el.classList.add("mobile-reveal");
      el.style.setProperty("--mobile-delay", `${Math.min(index, 8) * 40}ms`);
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("mobile-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach((el) => revealObserver.observe(el));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  translatePage();
  initBookshelf();
  initResearchCluster();
  initSectionRevealForMobileAndMedium();
  initMobileOnlyEnhancements();

  if (mediaItems.length) {
    showMedia(0);
  }

  if (confData.length) {
    runSlider(confData, "confImg", "confTitle", pageData.staticAlt?.conference || "");
  }

  if (visitData.length) {
    runSlider(visitData, "visitImg", "visitTitle", pageData.staticAlt?.visits || "");
  }

  if (socialData.length) {
    runSlider(socialData, "socialImg", "socialTitle", pageData.staticAlt?.social || "");
  }
});


