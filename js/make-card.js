'use strict';

(function () {
  var typeValueToText = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец',
  };

  var cardTemplate = document.querySelector('#map-card-template').content
      .querySelector('.map__card');

  window.makeCard = function (adData) {
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

    cardImage.src = adData.author.avatar;
    cardTitle.textContent = adData.offer.title;
    cardAddress.textContent = adData.offer.address;
    cardType.textContent = typeValueToText[adData.offer.type];
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
        var isAvailable = adData.offer.features.some(function (feature) {
          return cardFeatures.children[i].classList
              .contains('popup__feature--' + feature);
        });

        if (!isAvailable) {
          cardFeatures.removeChild(cardFeatures.children[i]);
        }
      }
    }

    if (adData.offer.photos.length === 0) {
      card.removeChild(cardPhotos);
    } else {
      adData.offer.photos.forEach(function (photoURL, index) {
        cardPhotos.children[index].src = photoURL;

        if (adData.offer.photos.length !== cardPhotos.children.length) {
          cardPhotos.appendChild(cardPhotos.children[index].cloneNode());
        }
      });
    }

    return card;
  };
})();
