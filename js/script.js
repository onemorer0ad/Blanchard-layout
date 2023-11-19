(() => {
  function setSearch(params) {
    const openBtn = document.querySelector(`.${params.openBtnClass}`);
    const search = document.querySelector(`.${params.searchClass}`);
    const closeBtn = search.querySelector(`.${params.closeBtnClass}`);
    search.addEventListener("animationend", function (evt) {
      if (this._isOpened) {
        this.classList.remove(params.activeClass);
        this.classList.remove(params.hiddenClass);
        this._isOpened = false;
      } else {
        this._isOpened = true;
      }
    });
    search.addEventListener("click", function (evt) {
      evt._isSearch = true;
    });
    openBtn.addEventListener("click", function (evt) {
      this.disabled = true;
      if (
        !search.classList.contains(params.activeClass) &&
        !search.classList.contains(params.hiddenClass)
      ) {
        search.classList.add(params.activeClass);
      }
    });
    closeBtn.addEventListener("click", function () {
      openBtn.disabled = false;
      search.classList.add(params.hiddenClass);
    });
    document.body.addEventListener("click", function (evt) {
      if (!evt._isSearch && search._isOpened) {
        openBtn.disabled = false;
        search.classList.add(params.hiddenClass);
      }
    });
  }
  setSearch({
    openBtnClass: "js-open-search",
    closeBtnClass: "js-close",
    searchClass: "js-form",
    activeClass: "is-opened",
    hiddenClass: "is-closed",
  });
})();

(() => {
  let form__wrapper = document.getElementsByClassName("form__wrapper")[0];
  let form = document.getElementById("form__message");
  let btn = document.getElementsByClassName("form__submit-btn")[0];

  function validation(form) {
    function removeError(input) {
      const parent = input.parentNode;

      if (parent.classList.contains("error")) {
        parent.querySelector(".error-label").remove();
        parent.classList.remove("error");
        btn.style.removeProperty("height");
        form__wrapper.style.removeProperty("display");
      }
    }

    function createErr(input, text) {
      const parent = input.parentNode;
      const errorLabel = document.createElement("label");

      errorLabel.classList.add("error-label");
      errorLabel.textContent = text;

      parent.classList.add("error");
      parent.append(errorLabel);
    }

    let result = true;

    const allInputs = form__wrapper.querySelectorAll("input");
    const symbolsArray = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "-",
      "+",
      "=",
      "[",
      "]",
      "{",
      "}",
      "|",
      ";",
      ":",
      ",",
      ".",
      "<",
      ">",
      "/",
      "?",
      "`",
      "~",
    ];

    for (const input of allInputs) {
      removeError(input);
      console.log(input.value);
      if (input.dataset.requiredLength) {
        if (input.value.length != 11) {
          removeError(input);
          createErr(
            input,
            `Длина телефона должна быть ${input.dataset.requiredLength} символов`
          );
          result = false;
        }

        if (!input.value.startsWith("7")) {
          removeError(input);
          createErr(input, "Телефон должен начинаться с +7");
          result = false;
        }
      }

      if (input.dataset.requiredName == "true") {
        if (input.value === "") {
          removeError(input);
          createErr(input, "Заполните поле");
          result = false;
        }

        for (let i = 0; i < input.value.length; i++) {
          const element = input.value[i];
          if (symbolsArray.includes(element)) {
            removeError(input);
            createErr(input, "Недопустимый формат");
            result = false;
          }
        }
      }
    }

    return result;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validation(this)) {
      alert("Форма проверена");
    }
  });
})();
