'use strict';

(function () {
  window.page = {
    isActivated: false,
    activatePage: function () {
      window.map.mapElem.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');

      for (var i = 0; i < window.form.adFieldsets.length; i++) {
        window.form.adFieldsets[i].disabled = false;
      }

      window.page.isActivated = true;
    },
    resetPage: function () {
      window.map.unrenderCard();
      window.map.unrenderPins();
      window.map.mainPin.style.top = '375px';
      window.map.mainPin.style.left = '570px';
      window.form.adForm.reset();
      window.address.setInitialAddress();
      window.page.isActivated = false;
    }
  };
})();
