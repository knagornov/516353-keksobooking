'use strict';

(function () {
  window.page = {
    isActivated: false,

    activatePage: function () {
      window.map.mapElement.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');

      for (var i = 0; i < window.form.adForm.elements.length; i++) {
        window.form.adForm.elements[i].disabled = false;
      }

      window.page.isActivated = true;
    },

    resetPage: function () {
      window.map.unrenderCard();
      window.map.unrenderPins();

      window.map.mainPin.style.top = '375px';
      window.map.mainPin.style.left = '570px';

      window.filter.filtersForm.reset();
      window.form.adForm.reset();
      window.address.setInitialAddress();

      window.page.isActivated = false;
    }
  };
})();
