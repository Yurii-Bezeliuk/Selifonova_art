window.addEventListener("load", load);

function load() {
  /* 1. Перевірка мобільного браузера та додавання атрибута */
  const isMobile = {
    Android: () => navigator.userAgent.match(/Android/i),
    BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
    iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
    Opera: () => navigator.userAgent.match(/Opera Mini/i),
    Windows: () => navigator.userAgent.match(/IEMobile/i),
    any: function () {
      return (
        this.Android() ||
        this.BlackBerry() ||
        this.iOS() ||
        this.Opera() ||
        this.Windows()
      );
    },
  };

  if (isMobile.any()) {
    document.documentElement.setAttribute("data-fls-touch", "");
  }

  /* 2. Делегування подій кліку (Меню та FAQ в одному слухачі) */
  document.addEventListener("click", (e) => {
    const targetElement = e.target;

    // Кكمунікація мобільного меню (тільки для мобільних)
    if (isMobile.any()) {
      if (targetElement.closest(".header-btn__mobile")) {
        document.documentElement.toggleAttribute("data-menu-open");
      }
      if (targetElement.closest(".list-nav__link")) {
        document.documentElement.removeAttribute("data-menu-open");
      }
    }

    // Логіка FAQ аккордеона
    const questionBtn = targetElement.closest(".faq_question");
    if (questionBtn) {
      const item = questionBtn.closest(".faq_item");
      if (item) {
        const isActive = item.classList.contains("faq_item--active");

        // Закриваємо інші
        document.querySelectorAll(".faq_item").forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("faq_item--active");
            const btn = otherItem.querySelector(".faq_question");
            if (btn) btn.setAttribute("aria-expanded", "false");
          }
        });

        // Перемикаємо поточний
        item.classList.toggle("faq_item--active");
        questionBtn.setAttribute("aria-expanded", !isActive);
      }
    }
  });

  /* 3. Слайдери порівняння (Comparison) */
  document
    .querySelectorAll(".comparison__slider-wrapper")
    .forEach((wrapper) => {
      const slider = wrapper.querySelector(".comparison__slider");
      const range = wrapper.querySelector(".comparison__range");

      if (!slider || !range) return;

      const updateSlider = () => {
        slider.style.setProperty("--position", `${range.value}%`);
      };

      range.addEventListener("input", updateSlider);
      range.addEventListener("change", updateSlider);
      updateSlider();
    });

  /* 4. Медіа-запит для переміщення блоку медіа */
  const card = document.querySelector(".hero__media");
  const mainContent = document.querySelector(".body-hero__text");
  const originalParent = document.querySelector(".body-hero");

  if (card && mainContent && originalParent) {
    const mediaQuery = window.matchMedia("(max-width: 991.98px)");

    const handleMediaChange = (e) => {
      if (e.matches) {
        mainContent.after(card);
      } else {
        originalParent.after(card);
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    handleMediaChange(mediaQuery);
  }

  /* 5. Ініціалізація Swiper */
  if (typeof Swiper !== "undefined") {
    new Swiper(".mySwiper", {
      loop: true,
      spaceBetween: 10,
      slidesPerView: 5,
      freeMode: true,
      watchSlidesProgress: true,
    });

    new Swiper(".mySwiper2", {
      loop: true,
      spaceBetween: 100,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: document.querySelector(".mySwiper").swiper,
      },
    });

    new Swiper(".mySwiper3", {
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

  document.addEventListener("click", (e) => {
    const button = e.target.closest(".btn");
    const clickedInsideForm = e.target.closest(".form"); // чи клікнули всередину форми
    const linkBtn = e.target.closest(".list-nav__link");
    const formActive = document.querySelector(".form");
    const inputActive = document.querySelector(".form__input");

    if (button || clickedInsideForm) {
      if (button || linkBtn) {
        e.preventDefault(); // зупиняємо стандартний перехід посиланню, якщо це <a>
      }

      if (formActive) {
        formActive.classList.add("form--active");
      }

      if (inputActive) {
        inputActive.classList.add("form__input--active");
        if (button) {
          inputActive.focus();
        }
      }
    } else {
      if (formActive) {
        formActive.classList.remove("form--active");
      }

      if (inputActive) {
        inputActive.classList.remove("form__input--active");
        inputActive.blur();
      }
    }
  });
}
