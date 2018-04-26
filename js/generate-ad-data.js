'use strict';

(function () {
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

  window.generateAdData = function (adsNumber) {
    var generatedAdData = [];

    for (var i = 0; i < adsNumber; i++) {
      generatedAdData[i] =
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
      generatedAdData[i].offer.address = generatedAdData[i].location.x + ', '
          + generatedAdData[i].location.y;
    }

    return generatedAdData;
  };
})();
