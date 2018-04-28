'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    errorHandler: function (errorMessage) {
      var errorPopup = document.createElement('p');
      var errorPopupPadding = 40;
      var errorPopupClose = document.createElement('button');

      var closeErrorPopup = function () {
        document.body.removeChild(errorPopup);
        document.removeEventListener('keydown', onErrorPopupEscPress);
      };

      var onErrorPopupEscPress = function (evt) {
        window.util.isEscEvent(evt, closeErrorPopup);
      };

      errorPopup.style.position = 'fixed';
      errorPopup.style.top = '20%';
      errorPopup.style.left = '50%';
      errorPopup.style.zIndex = '100';
      errorPopup.style.display = 'flex';
      errorPopup.style.maxWidth = '540px';
      errorPopup.style.margin = '0 0 0 -270px';
      errorPopup.style.padding = errorPopupPadding + 'px';
      errorPopup.style.justifyContent = 'center';
      errorPopup.style.alignItems = 'center';
      errorPopup.style.font = '16px "Roboto", "Arial", sans-serif';
      errorPopup.style.color = '#353535';
      errorPopup.style.backgroundColor = '#fff';
      errorPopup.style.borderRadius = '5px';
      errorPopup.style.boxShadow = '0 0 2px 2px #ff6547';
      errorPopup.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', errorPopup);

      errorPopupClose.classList.add('popup__close');
      errorPopup.insertAdjacentElement('beforeend', errorPopupClose);

      errorPopupClose.addEventListener('click', function () {
        closeErrorPopup();
      });
      document.addEventListener('keydown', onErrorPopupEscPress);
      setTimeout(function () {
        closeErrorPopup();
      }, 8000);
    }
  };
})();
