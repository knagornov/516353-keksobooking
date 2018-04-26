'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinTemplate = document.querySelector('#map-card-template').content
      .querySelector('.map__pin');

  window.makePin = function (adData) {
    var pin = pinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pin.style = 'left: ' + (adData.location.x - PIN_WIDTH / 2) + 'px; top: '
        + (adData.location.y - PIN_HEIGHT) + 'px;';
    pinImage.src = adData.author.avatar;
    pinImage.alt = adData.offer.title;

    return pin;
  };
})();
