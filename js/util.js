'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var errorTemplate = document.querySelector('#error-popup-template').content
      .querySelector('.error__popup');
  var lastTimeout;

  window.util = {
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
