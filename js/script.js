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
      if (targetElement.closest(".header-btn__mobile")) {
        // Додаємо атрибут всьому документу
        document.documentElement.toggleAttribute("data-menu-open");
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const element = document.getElementById("image-compare");

  if (element) {
    const viewer = new ImageCompare(element, {
      controlColor: "#FFFFFF",
      controlShadow: true,
      addCircle: true,
      addCircleBlur: false,
      hoverStart: false,
      showLabels: true,
      smoothing: false,
      fluid: true,
      labelOptions: {
        before: "ВИХІДНЕ ФОТО",
        after: "ГОТОВИЙ ПОРТРЕТ (ОЛІВЕЦЬ)",
        onHover: false,
      },

      startingPoint: 50,
      smoothingAmount: 80,
    });

    viewer.mount();
  }
});

// const card = document.querySelector(".hero__media");
// const mainContent = document.querySelector(".body-hero__text");
// const originalParent = document.querySelector(".body-hero");

// function handleResize() {
//   if (window.innerWidth <= 992) {
//     // Якщо екран менше 991px — переміщуємо картку всередину текстового блоку
//     mainContent.after(card);
//   } else {
//     // Повертаємо картку назад на десктопі
//     originalParent.after(card);
//   }
// }

// // Слухаємо зміну розміру екрана
// window.addEventListener("resize", handleResize);
// // Викликаємо одразу при завантаженні
// handleResize();

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
    // initialSlide: 1,
    spaceBetween: 10,
    slidesPerView: "4",
    freeMode: false,
    watchSlidesProgress: true,
    // slideToClickedSlide: true,
    centeredSlides: true,
  });
  const swiper2 = new Swiper(".mySwiper2", {
    loop: true,
    // initialSlide: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
  });
}
InitSwiper();
