'use strict';

(function () {
  window.form = {
    adForm: document.querySelector('.ad-form'),
    adFieldsets: document.querySelectorAll('.ad-form fieldset')
  };

  var titleFormField = window.form.adForm.querySelector('#title');
  var typeFormField = window.form.adForm.querySelector('#type');
  var priceFormField = window.form.adForm.querySelector('#price');
  var timeinFormField = window.form.adForm.querySelector('#timein');
  var timeoutFormField = window.form.adForm.querySelector('#timeout');
  var roomsFormField = window.form.adForm.querySelector('#room_number');
  var capacityFormField = window.form.adForm.querySelector('#capacity');
  var formFields = window.form.adForm.querySelectorAll('input');
  var formSelects = window.form.adForm.querySelectorAll('select');
  var submitForm = window.form.adForm.querySelector('.ad-form__submit');

  var markFields = function (fields) {
    for (i = 0; i < fields.length; i++) {
      if (fields[i].validity.valid === false) {
        fields[i].style.outline = '2px solid red';
      }
    }
  };

  var unmarkField = function (field) {
    field.style.outline = 'initial';
  };

  var getPriceByType = function () {
    switch (typeFormField.value) {
      case 'flat':
        priceFormField.min = '1000';
        priceFormField.placeholder = '1000';
        return;
      case 'house':
        priceFormField.min = '5000';
        priceFormField.placeholder = '5000';
        return;
      case 'palace':
        priceFormField.min = '10000';
        priceFormField.placeholder = '10000';
        return;
      default:
        priceFormField.min = '0';
        priceFormField.placeholder = '0';
        return;
    }
  };

  var checkTitleMinLength = function () {
    titleFormField.setCustomValidity('');

    if (titleFormField.value.length < 30) {
      titleFormField.setCustomValidity('Минимальное количество символов: 30');
    } else {
      unmarkField(titleFormField);
    }
  };

  var checkRoomsCapacity = function () {
    var roomsNumber = roomsFormField.value;
    var capacity = capacityFormField.value;
    var roomsInvalidMessage = '';
    var capacityInvalidMessage = '';

    roomsFormField.setCustomValidity('');
    capacityFormField.setCustomValidity('');

    if (roomsNumber !== '100' && capacity === '0') {
      roomsInvalidMessage = 'Без гостей доступно: 100 комнат.';
    }
    if (roomsNumber === '100' && capacity !== '0') {
      capacityInvalidMessage = '100 комнат: не для гостей.';
    }
    if (+roomsNumber < +capacity) {
      capacityInvalidMessage = 'Максимум гостей для ' + roomsNumber
          + ' комнат(ы): ' + roomsNumber + '.';
    }

    if (roomsInvalidMessage) {
      roomsFormField.setCustomValidity(roomsInvalidMessage);
    } else {
      unmarkField(roomsFormField);
    }
    if (capacityInvalidMessage) {
      capacityFormField.setCustomValidity(capacityInvalidMessage);
    } else {
      unmarkField(capacityFormField);
    }
  };

  for (var i = 0; i < window.form.adFieldsets.length; i++) {
    window.form.adFieldsets[i].disabled = true;
  }

  window.addEventListener('load', function () {
    window.form.adForm.reset();
    window.address.setInitialAddress();
  });
  titleFormField.addEventListener('input', function () {
    checkTitleMinLength();
  });
  typeFormField.addEventListener('change', function () {
    getPriceByType();
  });
  priceFormField.addEventListener('input', function () {
    if (priceFormField.checkValidity() === true) {
      unmarkField(priceFormField);
    }
  });
  timeinFormField.addEventListener('change', function () {
    timeoutFormField.value = timeinFormField.value;
  });
  timeoutFormField.addEventListener('change', function () {
    timeinFormField.value = timeoutFormField.value;
  });
  roomsFormField.addEventListener('change', function () {
    checkRoomsCapacity();
  });
  capacityFormField.addEventListener('change', function () {
    checkRoomsCapacity();
  });
  submitForm.addEventListener('click', function () {
    markFields(formFields);
    markFields(formSelects);
  });
})();
