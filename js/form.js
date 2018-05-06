'use strict';

(function () {
  window.form = {
    adForm: document.querySelector('.ad-form'),
    photosContainer: document.querySelector('.ad-form__photo-container'),
    photoElements: [],
    resetPreviews: function () {
      avatarPreview.src = 'img/muffin-grey.svg';

      if (window.form.photoElements.length === 0) {
        return;
      }

      for (var i = window.form.photoElements.length - 1; i >= 0; i--) {
        window.form.photosContainer.removeChild(window.form.photoElements[i]);
      }

      window.form.photoElements = [];
    }
  };

  var typeToPrice = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000',
  };

  var avatarField = window.form.adForm.elements.avatar;
  var avatarPreview = window.form.adForm
      .querySelector('.ad-form-header__preview img');
  var titleFormField = window.form.adForm.elements.title;
  var typeFormField = window.form.adForm.elements.type;
  var priceFormField = window.form.adForm.elements.price;
  var timeinFormField = window.form.adForm.elements.timein;
  var timeoutFormField = window.form.adForm.elements.timeout;
  var roomsFormField = window.form.adForm.elements.rooms;
  var capacityFormField = window.form.adForm.elements.capacity;
  var photoTemplate = document.querySelector('#photo-template').content
      .querySelector('.ad-form__photo');
  var photosField = window.form.adForm.elements.images;
  var uploadElement = window.form.adForm.querySelector('.ad-form__upload');
  var submitForm = window.form.adForm.querySelector('.ad-form__submit');
  var resetForm = window.form.adForm.querySelector('.ad-form__reset');
  var successMessage = document.querySelector('.success');

  var markInvalidFields = function (formFields) {
    for (var i = 0; i < formFields.length; i++) {
      if (formFields[i].validity.valid === false) {
        formFields[i].style.outline = '2px solid red';
      }
    }
  };

  var unmarkField = function (formField) {
    formField.style.outline = 'initial';
  };

  var checkTitleMinLength = function () {
    titleFormField.setCustomValidity('');

    if (titleFormField.value.length < 30) {
      titleFormField.setCustomValidity('Минимальное количество символов: 30');
      return;
    }

    unmarkField(titleFormField);
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

  var submitSuccessHandler = function () {
    window.page.resetPage();
    successMessage.classList.remove('hidden');
    window.util.disableForm(window.form.adForm, true);
    setTimeout(function () {
      successMessage.classList.add('hidden');
    }, 2500);
  };

  window.util.disableForm(window.form.adForm, true);
  avatarField.addEventListener('change', function () {
    window.uploadImage(avatarField, avatarPreview);
  });
  titleFormField.addEventListener('input', function () {
    checkTitleMinLength();
  });
  typeFormField.addEventListener('change', function () {
    priceFormField.min = typeToPrice[typeFormField.value];
    priceFormField.placeholder = typeToPrice[typeFormField.value];
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
  photosField.addEventListener('change', function () {
    window.uploadImage(photosField);
  });
  submitForm.addEventListener('click', function (evt) {
    if (window.form.adForm.checkValidity() === false) {
      markInvalidFields(window.form.adForm.elements);
      return;
    }
    window.backend.upload(new FormData(window.form.adForm),
        submitSuccessHandler, window.util.errorHandler);
    evt.preventDefault();
  });
  resetForm.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.page.resetPage();
    window.form.resetPreviews();
  });

  window.form.createPreview = function () {
    var previewElement = photoTemplate.cloneNode(true);

    window.form.photoElements.unshift(window.form.photosContainer
        .insertBefore(previewElement, uploadElement.nextSibling));

    return window.form.photoElements[0].children[0];
  };
})();
