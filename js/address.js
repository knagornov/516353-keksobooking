
'use strict';

(function () {
  var addressFormField = window.form.adForm.elements.address;

  window.address = {
    setInitialAddress: function () {
      addressFormField.value = (window.map.mainPin.offsetLeft
          + Math.round(window.map.mainPin.offsetWidth / 2)) + ', '
          + (window.map.mainPin.offsetTop
          + Math.round(window.map.mainPin.offsetHeight / 2));
    },
    setNewAddress: function () {
      addressFormField.value = (window.map.mainPin.offsetLeft
          + Math.round(window.map.mainPin.offsetWidth / 2)) + ', '
          + (window.map.mainPin.offsetTop + window.map.MAINPIN_HEIGHT);
    }
  };
})();
