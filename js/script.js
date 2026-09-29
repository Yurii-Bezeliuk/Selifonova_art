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

const card = document.querySelector(".hero__media");
const mainContent = document.querySelector(".body-hero__text");
const originalParent = document.querySelector(".body-hero");

function handleResize() {
  if (window.innerWidth <= 992) {
    // Якщо екран менше 991px — переміщуємо картку всередину текстового блоку
    mainContent.after(card);
  } else {
    // Повертаємо картку назад на десктопі
    originalParent.after(card);
  }
}

// Слухаємо зміну розміру екрана
window.addEventListener("resize", handleResize);
// Викликаємо одразу при завантаженні
handleResize();
