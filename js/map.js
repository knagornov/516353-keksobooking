'use strict';

var ADS_NUMBER = 8;
var PIN_WIDTH = 50;
var ESC_KEYCODE = 27;

var OFFERS = [
  {
    TITLE: 'Большая уютная квартира',
    TYPE: 'flat',
  },
  {
    TITLE: 'Маленькая неуютная квартира',
    TYPE: 'flat',
  },
  {
    TITLE: 'Огромный прекрасный дворец',
    TYPE: 'palace',
  },
  {
    TITLE: 'Маленький ужасный дворец',
    TYPE: 'palace',
  },
  {
    TITLE: 'Красивый гостевой домик',
    TYPE: 'house',
  },
  {
    TITLE: 'Некрасивый негостеприимный домик',
    TYPE: 'house',
  },
  {
    TITLE: 'Уютное бунгало далеко от моря',
    TYPE: 'bungalo',
  },
  {
    TITLE: 'Неуютное бунгало по колено в воде',
    TYPE: 'bungalo',
  },
];

var OFFER_CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

var OFFER_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

var OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

var getRandomArray = function (arr) {
  var newLength = Math.floor(Math.random() * arr.length);
  var newArray = arr.concat();

  for (var i = 0; i < arr.length - newLength; i++) {
    newArray.splice(Math.floor(Math.random() * newArray.length), 1);
  }

  return newArray;
};

var getShuffledArray = function (arr) {
  var newArray = arr.concat();

  var randomSort = function () {
    return Math.random() - 0.5;
  };

  return newArray.sort(randomSort);
};

var generateAds = function (adsNumber) {
  var generatedAds = [];

  for (var i = 0; i < adsNumber; i++) {
    generatedAds[i] =
      {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: OFFERS[i].TITLE,
          type: OFFERS[i].TYPE,
          price: Math.floor(Math.random() * 999001) + 1000 + '₽/ночь',
          rooms: Math.floor(Math.random() * 5) + 1,
          guests: Math.floor(Math.random() * 15) + 1,
          checkin: OFFER_CHECKIN[Math.floor(Math.random()
              * OFFER_CHECKIN.length)],
          checkout: OFFER_CHECKOUT[Math.floor(Math.random()
              * OFFER_CHECKOUT.length)],
          features: getRandomArray(OFFER_FEATURES),
          description: '',
          photos: getShuffledArray(OFFER_PHOTOS)
        },
        location: {
          x: (Math.floor(Math.random() * 601) + 300),
          y: (Math.floor(Math.random() * 351) + 150)
        },
      };
    generatedAds[i].offer.address = generatedAds[i].location.x + ', '
        + generatedAds[i].location.y;
  }

  return generatedAds;
};

var adTemplate = document.querySelector('#map-card-template').content;
var cardTemplate = adTemplate.querySelector('.map__card');
var pinTemplate = adTemplate.querySelector('.map__pin');

var map = document.querySelector('.map');
var filtres = map.querySelector('.map__filters-container');

var pinsFragment = document.createDocumentFragment();
var pinsContainer = document.querySelector('.map__pins');
var mainPin = pinsContainer.querySelector('.map__pin--main');
var pins = [];
var currentPin;

var adForm = document.querySelector('.ad-form');
var adFieldsets = adForm.querySelectorAll('.ad-form fieldset');
var addressFormField = adForm.querySelector('#address');

var renderedCard;
var cardClose;
var isActivated = false;
var adsData = generateAds(ADS_NUMBER);

var makePin = function (adData) {
  var pin = pinTemplate.cloneNode(true);
  var pinImage = pin.querySelector('img');

  pin.style = 'left: ' + (adData.location.x - PIN_WIDTH / 2) + 'px; top: '
      + (adData.location.y - PIN_HEIGHT) + 'px;';
  pinImage.src = adData.author.avatar;
  pinImage.alt = adData.offer.title;

  return pin;
};

var makeCard = function (adData) {
  var card = cardTemplate.cloneNode(true);
  var cardImage = card.querySelector('.popup__avatar');
  var cardTitle = card.querySelector('.popup__title');
  var cardAddress = card.querySelector('.popup__text--address');
  var cardPrice = card.querySelector('.popup__text--price');
  var cardType = card.querySelector('.popup__type');
  var cardCapacity = card.querySelector('.popup__text--capacity');
  var cardTime = card.querySelector('.popup__text--time');
  var cardFeatures = card.querySelector('.popup__features');
  var cardDescription = card.querySelector('.popup__description');
  var cardPhotos = card.querySelector('.popup__photos');

  var getOfferType = function (typeValue) {
    switch (typeValue) {
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      default:
        return 'Квартира';
    }
  };

  cardImage.src = adData.author.avatar;
  cardTitle.textContent = adData.offer.title;
  cardAddress.textContent = adData.offer.address;
  cardType.textContent = getOfferType(adData.offer.type);
  cardPrice.textContent = adData.offer.price;
  cardCapacity.textContent = adData.offer.rooms + ' комнаты для '
      + adData.offer.guests + ' гостей';
  cardTime.textContent = 'Заезд после ' + adData.offer.checkin + ', выезд до '
      + adData.offer.checkout;

  if (adData.offer.description === '') {
    card.removeChild(cardDescription);
  } else {
    cardDescription.textContent = adData.offer.description;
  }

  if (adData.offer.features.length === 0) {
    card.removeChild(cardFeatures);
  } else {
    for (var i = cardFeatures.children.length - 1; i >= 0; i--) {
      var isAvailable = false;

      for (var j = 0; j < adData.offer.features.length; j++) {
        if (cardFeatures.children[i].classList
            .contains('popup__feature--' + adData.offer.features[j])) {
          isAvailable = true;
          break;
        }
      }

      if (!isAvailable) {
        cardFeatures.removeChild(cardFeatures.children[i]);
      }
    }
  }

  if (adData.offer.photos.length === 0) {
    card.removeChild(cardPhotos);
  } else {
    for (i = 0; i < adData.offer.photos.length; i++) {
      cardPhotos.children[i].src = adData.offer.photos[i];

      if (adData.offer.photos.length !== cardPhotos.children.length) {
        cardPhotos.appendChild(cardPhotos.children[i].cloneNode());
      }
    }
  }

  return card;
};

var renderPins = function () {
  for (var i = 0; i < adsData.length; i++) {
    pins[i] = makePin(adsData[i]);
    pinsFragment.appendChild(pins[i]);
  }

  pinsContainer.appendChild(pinsFragment);
};

var renderCard = function (pin) {
  for (var i = 0; i < pins.length; i++) {
    if (pins[i] === pin) {
      renderedCard = map.insertBefore(makeCard(adsData[i]), filtres);

      cardClose = renderedCard.querySelector('.popup__close');
      cardClose.addEventListener('click', function () {
        unrenderCard();
      });
      document.addEventListener('keydown', onCardEscPress);

      break;
    }
  }

  currentPin = pin;
};

var unrenderCard = function () {
  map.removeChild(renderedCard);
  document.removeEventListener('keydown', onCardEscPress);

  renderedCard = null;
  cardClose = null;
  currentPin = null;
};

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  for (var i = 0; i < adFieldsets.length; i++) {
    adFieldsets[i].disabled = false;
  }

  pinsContainer.addEventListener('click', onPinsContainerClick);

  isActivated = true;
};

var onCardEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    unrenderCard();
  }
};

var onPinsContainerClick = function (evt) {
  var pin = evt.target.closest('.map__pin');

  if (!pin || pin === currentPin || pin === mainPin) {
    return;
  }

  if (renderedCard) {
    unrenderCard();
  }

  renderCard(pin);
};

for (var i = 0; i < adFieldsets.length; i++) {
  adFieldsets[i].disabled = true;
}

// Работа с формой

var PIN_HEIGHT = 82;
var titleFormField = adForm.querySelector('#title');
var typeFormField = adForm.querySelector('#type');
var priceFormField = adForm.querySelector('#price');
var timeinFormField = adForm.querySelector('#timein');
var timeoutFormField = adForm.querySelector('#timeout');
var roomsFormField = adForm.querySelector('#room_number');
var capacityFormField = adForm.querySelector('#capacity');
var formFields = adForm.querySelectorAll('input');
var formSelects = adForm.querySelectorAll('select');
var submitForm = adForm.querySelector('.ad-form__submit');

var setAddress = function () {
  addressFormField.value = (mainPin.offsetLeft
      + Math.round(mainPin.offsetWidth / 2)) + ', '
      + (mainPin.offsetTop + PIN_HEIGHT);
};

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

window.addEventListener('load', function () {
  adForm.reset();
  addressFormField.value = (mainPin.offsetLeft
    + Math.round(mainPin.offsetWidth / 2)) + ', '
    + (mainPin.offsetTop + Math.round(mainPin.offsetHeight / 2));
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

// Перетаскивание

var VERTICAL_RANGE = {
  MIN: 150 - PIN_HEIGHT,
  MAX: 500 - PIN_HEIGHT
};
var horisontalRange = {
  min: 0,
  max: pinsContainer.offsetWidth - mainPin.offsetWidth
};

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var newTop = mainPin.offsetTop - shift.y;
    var newLeft = mainPin.offsetLeft - shift.x;

    if (newTop < VERTICAL_RANGE.MIN) {
      newTop = VERTICAL_RANGE.MIN;
    }
    if (newTop > VERTICAL_RANGE.MAX) {
      newTop = VERTICAL_RANGE.MAX;
    }
    if (newLeft < horisontalRange.min) {
      newLeft = horisontalRange.min;
    }
    if (newLeft > horisontalRange.max) {
      newLeft = horisontalRange.max;
    }

    mainPin.style.top = newTop + 'px';
    mainPin.style.left = newLeft + 'px';

    setAddress();
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    if (!isActivated) {
      activatePage();
      renderPins();
    }

    setAddress();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
