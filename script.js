const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  const slides = Array.from(card.querySelectorAll(".slide"));
  const prev = card.querySelector("[data-prev]");
  const next = card.querySelector("[data-next]");
  const toggle = card.querySelector("[data-toggle]");
  const description = card.querySelector(".description");
  let index = 0;

  const showSlide = (i) => {
    slides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === i);
    });
  };

  prev.addEventListener("click", (event) => {
    event.stopPropagation();
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  });

  next.addEventListener("click", (event) => {
    event.stopPropagation();
    index = (index + 1) % slides.length;
    showSlide(index);
  });

  toggle.addEventListener("click", () => {
    description.classList.toggle("is-open");
    toggle.textContent = description.classList.contains("is-open")
      ? "Скрыть описание"
      : "Показать описание";
  });

  showSlide(index);
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentSlides = [];
let currentIndex = 0;

const openLightbox = (slides, index) => {
  currentSlides = slides;
  currentIndex = index;
  lightboxImg.src = currentSlides[currentIndex].src;
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
};

const closeLightbox = () => {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
};

const showLightboxSlide = (direction) => {
  if (!currentSlides.length) return;
  currentIndex = (currentIndex + direction + currentSlides.length) % currentSlides.length;
  lightboxImg.src = currentSlides[currentIndex].src;
};

cards.forEach((card) => {
  const slides = Array.from(card.querySelectorAll(".slide"));
  slides.forEach((slide, idx) => {
    slide.addEventListener("click", (event) => {
      event.stopPropagation();
      openLightbox(slides, idx);
    });
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => showLightboxSlide(-1));
lightboxNext.addEventListener("click", () => showLightboxSlide(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (lightbox.classList.contains("active")) {
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showLightboxSlide(-1);
    if (event.key === "ArrowRight") showLightboxSlide(1);
  }
});
