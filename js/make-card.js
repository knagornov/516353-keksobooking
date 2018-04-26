'use strict';

(function () {
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
})();
