'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var errorTemplate = document.querySelector('#error-popup-template').content
      .querySelector('.error__popup');
  var lastTimeout;

  window.addEventListener('load', function () {
    window.filter.filtersForm.reset();
    window.form.adForm.reset();
    window.address.setInitialAddress();
  });

  window.util = {
    isEnterEvent: function (evt, fun) {
      if (evt.keyCode === ENTER_KEYCODE) {
        fun();
      }
    },

    isEscEvent: function (evt, fun) {
      if (evt.keyCode === ESC_KEYCODE) {
        fun();
      }
    },

    debounce: function (fun, interval) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fun, interval);
    },

    disableForm: function (form, status) {
      for (var i = 0; i < form.elements.length; i++) {
        form.elements[i].disabled = status;
      }
    },

    errorHandler: function (errorMessage) {
      var errorPopup = errorTemplate.cloneNode(true);
      var errorDescription = errorPopup
          .querySelector('.error-popup__description');
      var errorClose = errorPopup.querySelector('.error-popup__close');

      var closeErrorPopup = function () {
        document.body.removeChild(errorPopup);
        document.removeEventListener('keydown', onErrorPopupEscPress);
      };

      var onErrorPopupEscPress = function (evt) {
        window.util.isEscEvent(evt, closeErrorPopup);
      };

      errorDescription.textContent = errorMessage;

      document.body.insertAdjacentElement('afterbegin', errorPopup);

      errorClose.addEventListener('click', function () {
        closeErrorPopup();
      });
      document.addEventListener('keydown', onErrorPopupEscPress);
      setTimeout(function () {
        closeErrorPopup();
      }, 8000);
    }
  };
})();
