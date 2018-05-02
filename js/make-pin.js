'use strict';

(function () {
  var PIN_SIZE = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var pinTemplate = document.querySelector('#map-card-template').content
      .querySelector('.map__pin');

  window.makePin = function (adData) {
    var pin = pinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pin.style = 'left: ' + (adData.location.x - PIN_SIZE.WIDTH / 2) + 'px; top: '
        + (adData.location.y - PIN_SIZE.HEIGHT) + 'px;';
    pinImage.src = adData.author.avatar;
    pinImage.alt = adData.offer.title;

    return pin;
  };
})();
