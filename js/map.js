'use strict';

var OFFERS = [
  {
    TITLE: 'Большая уютная квартира',
    TYPE: 'flat'
  },
  {
    TITLE: 'Маленькая неуютная квартира',
    TYPE: 'flat'
  },
  {
    TITLE: 'Огромный прекрасный дворец',
    TYPE: 'palace'
  },
  {
    TITLE: 'Маленький ужасный дворец',
    TYPE: 'palace'
  },
  {
    TITLE: 'Красивый гостевой домик',
    TYPE: 'house'
  },
  {
    TITLE: 'Некрасивый негостеприимный домик',
    TYPE: 'house'
  },
  {
    TITLE: 'Уютное бунгало далеко от моря',
    TYPE: 'bungalo'
  },
  {
    TITLE: 'Неуютное бунгало по колено в воде',
    TYPE: 'bungalo'
  }
];

var OFFER_CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];

var OFFER_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];

var OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
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
  newArray.sort(randomSort);

  function randomSort() {
    return Math.random() - 0.5;
  }

  return newArray;
};

var adsGeneration = function (adsNumber) {
  var ads = [];

  for (var i = 0; i < adsNumber; i++) {
    ads[i] =
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
          checkin: OFFER_CHECKIN[Math.floor(Math.random() * OFFER_CHECKIN.length)],
          checkout: OFFER_CHECKOUT[Math.floor(Math.random() * OFFER_CHECKOUT.length)],
          features: getRandomArray(OFFER_FEATURES),
          description: '',
          photos: getShuffledArray(OFFER_PHOTOS)
        },
        location: {
          x: (Math.floor(Math.random() * 601) + 300),
          y: (Math.floor(Math.random() * 351) + 150)
        },
      };
    ads[i].offer.address = ads[i].location.x + ', ' + ads[i].location.y;
  }

  return ads;
};

var CARDS_NUMBER = 8;
var cardsData = adsGeneration(CARDS_NUMBER);
var pins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#map-card-template').content.querySelector('.map__pin');
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var fragment = document.createDocumentFragment();
var map = document.querySelector('.map');
var filtres = document.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#map-card-template').content.querySelector('.map__card');

var makePin = function (cardData) {
  var pin = pinTemplate.cloneNode(true);
  var pinImage = pin.querySelector('img');

  pin.style = 'left: ' + (cardData.location.x - PIN_WIDTH / 2) + 'px; top: ' + (cardData.location.y - PIN_HEIGHT) + 'px;';
  pinImage.src = cardData.author.avatar;
  pinImage.alt = cardData.offer.title;

  return pin;
};

var makeCard = function (cardData) {
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

  cardImage.src = cardData.author.avatar;
  cardTitle.textContent = cardData.offer.title;
  cardAddress.textContent = cardData.offer.address;
  cardPrice.textContent = cardData.offer.price;
  cardCapacity.textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
  cardTime.textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
  cardDescription.textContent = cardData.offer.description;

  switch (cardData.offer.type) {
    case 'bungalo':
      cardType.textContent = 'Бунгало';
      break;
    case 'flat':
      cardType.textContent = 'Квартира';
      break;
    case 'house':
      cardType.textContent = 'Дом';
      break;
    case 'palace':
      cardType.textContent = 'Дворец';
  }

  for (var i = cardFeatures.children.length - 1; i >= 0; i--) {
    var isAvailable = false;

    for (var j = 0; j < cardData.offer.features.length; j++) {
      if (cardFeatures.children[i].classList.contains('popup__feature--' + cardData.offer.features[j])) {
        isAvailable = true;
      }
    }

    if (!isAvailable) {
      cardFeatures.removeChild(cardFeatures.children[i]);
    }
  }

  for (i = 0; i < cardData.offer.photos.length; i++) {
    cardPhotos.children[i].src = cardData.offer.photos[i];

    if (cardData.offer.photos.length !== cardPhotos.children.length) {
      cardPhotos.appendChild(cardPhotos.children[i].cloneNode());
    }
  }

  return card;
};

var renderPins = function () {
  for (var i = 0; i < cardsData.length; i++) {
    fragment.appendChild(makePin(cardsData[i]));
  }

  pins.appendChild(fragment);
};

var renderCard = function () {
  map.insertBefore(makeCard(cardsData[0]), filtres);
};

renderPins();
renderCard();
