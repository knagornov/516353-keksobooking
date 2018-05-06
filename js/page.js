'use strict';

(function () {
  window.page = {
    isActivated: false,

    activatePage: function () {
      window.map.mapElement.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
      window.util.disableForm(window.form.adForm, false);
      window.page.isActivated = true;
    },

    resetPage: function () {
      window.map.unrenderCard();
      window.map.unrenderPins();

      window.map.mainPin.style.top = '375px';
      window.map.mainPin.style.left = '570px';

      window.filter.filtersForm.reset();
      window.util.disableForm(window.filter.filtersForm, true);
      window.form.resetPreviews();
      window.form.adForm.reset();
      window.util.disableForm(window.form.adForm, true);
      window.address.setInitialAddress();

      window.map.mapElement.classList.add('map--faded');
      window.form.adForm.classList.add('ad-form--disabled');

      window.page.isActivated = false;
    }
  };
})();
