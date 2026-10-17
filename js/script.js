"use strict";

window.addEventListener("load", load);

function load() {
  /* Перевірка мобільного браузера */
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };
  /* Додавання класу touch для HTML, якщо браузер мобільний */
  function addTouchAttr() {
    // Додавання data-fls-touch для HTML, якщо браузер мобільний
    if (isMobile.any())
      document.documentElement.setAttribute("data-fls-touch", "");
  }

  addTouchAttr();
  document.addEventListener("click", documentActions);

  function documentActions(e) {
    const targetElement = e.target;

    if (isMobile.any()) {
      // 1. Клік на кнопку відкриття/закриття меню
      if (targetElement.closest(".header-btn__mobile")) {
        document.documentElement.toggleAttribute("data-menu-open");
      }

      // 2. Клік на будь-яке посилання-якір ВСЕРЕДИНІ мобільного меню
      // Замініть ".menu" на реальний клас вашого блоку навігації/меню
      if (targetElement.closest(".menu") && targetElement.closest("a")) {
        document.documentElement.removeAttribute("data-menu-open");
      }
    }
  }
}

document.querySelectorAll(".comparison__slider-wrapper").forEach((wrapper) => {
  const slider = wrapper.querySelector(".comparison__slider");
  const range = wrapper.querySelector(".comparison__range");

  if (!slider || !range) return;

  function updateSlider() {
    slider.style.setProperty("--position", `${range.value}%`);
  }

  range.addEventListener("input", updateSlider);
  range.addEventListener("change", updateSlider);

  updateSlider();
});

const card = document.querySelector(".hero__media");
const mainContent = document.querySelector(".body-hero__text");
const originalParent = document.querySelector(".body-hero");

const avtorCard = document.querySelector(".avtor__picture");
const avtorContent = document.querySelector(".info-avtor__title");
const avtorParent = document.querySelector(".avtor__info");
// Створюємо медіа-запит для екранів <= 991.98px
const mediaQuery = window.matchMedia("(max-width: 991.98px)");

function handleMediaChange(e) {
  // Перевірка на існування елементів у DOM
  if (!card || !mainContent || !originalParent) return;

  if (e.matches) {
    // Екран <= 991.98px: переміщуємо картку після текстового блоку
    mainContent.after(card);
  } else {
    // Десктоп: повертаємо картку назад
    originalParent.after(card);
  }
}

// Запускаємо слухач події перетину брейкпоінту
mediaQuery.addEventListener("change", handleMediaChange);

// Первинний виклик при завантаженні сторінки
handleMediaChange(mediaQuery);

function InitSwiper() {
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesProgress: true,
  });
  const swiper2 = new Swiper(".mySwiper2", {
    loop: true,
    spaceBetween: 100,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
  });

  const swiperResponse = new Swiper(".mySwiper3", {
    autoHeight: true,
    loop: true,
    slidesPerView: 1,
    spaceBetween: 101,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
InitSwiper();

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq__item");

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq__question");

    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("faq__item--active");

      // Якщо потрібно, щоб при відкритті одного інші закривалися:
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("faq__item--active");
          const btn = otherItem.querySelector(".faq__question");
          btn.setAttribute("aria-expanded", "false");
        }
      });

      // Перемикаємо поточний пункт
      item.classList.toggle("faq__item--active");
      questionBtn.setAttribute("aria-expanded", !isActive);
    });
  });
});
