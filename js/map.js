'use strict';

var offerTitles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var offerTypes = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var offerCheckin = [
  '12:00',
  '13:00',
  '14:00'
];

var offerCheckout = [
  '12:00',
  '13:00',
  '14:00'
];

var offerFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var offerPhotos = [
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

var adsGeneration = function (number) {
  var ads = [];

  for (var i = 0; i < number; i++) {
    ads[i] = [
      {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png',
        },
        offer: {
          title: offerTitles[i],
          address: (Math.floor(Math.random() * 601) + 300) + ', ' + (Math.floor(Math.random() * 351) + 150),
          price: Math.floor(Math.random() * 999001) + 1000,
          type: offerTypes[Math.floor(Math.random() * offerTypes.length)],
          rooms: Math.floor(Math.random() * 5) + 1,
          guests: Math.floor(Math.random() * 10) + 1,
          checkin: offerCheckin[Math.floor(Math.random() * offerCheckin.length)],
          checkout: offerCheckout[Math.floor(Math.random() * offerCheckout.length)],
          features: getRandomArray(offerFeatures),
          description: '',
          photos: getShuffledArray(offerPhotos)
        },
        location: {
          x: (Math.floor(Math.random() * 601) + 300),
          y: (Math.floor(Math.random() * 351) + 150)
        }
      }
    ];
  }

  return ads;
};
