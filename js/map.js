'use strict';

(function () {
  window.map = {
    mainPin: document.querySelector('.map__pin--main'),
    MAINPIN_HEIGHT: 82
  };

  var ESC_KEYCODE = 27;
  var ADS_NUMBER = 8;

  var VERTICAL_RANGE = {
    MIN: 150 - window.map.MAINPIN_HEIGHT,
    MAX: 500 - window.map.MAINPIN_HEIGHT
  };

  var mapElem = document.querySelector('.map');
  var filtresElem = mapElem.querySelector('.map__filters-container');
  var pinsContainer = mapElem.querySelector('.map__pins');
  var pinsFragment = document.createDocumentFragment();
  var pins = [];
  var currentPin;

  var horisontalRange = {
    min: 0,
    max: pinsContainer.offsetWidth - window.map.mainPin.offsetWidth
  };

  var renderedCard;
  var cardClose;
  var isActivated = false;
  var adsData = window.generateAdData(ADS_NUMBER);

  var renderPins = function () {
    for (var i = 0; i < adsData.length; i++) {
      pins[i] = window.makePin(adsData[i]);
      pinsFragment.appendChild(pins[i]);
    }

    pinsContainer.appendChild(pinsFragment);
  };

  var renderCard = function (pin) {
    for (var i = 0; i < pins.length; i++) {
      if (pins[i] === pin) {
        renderedCard = mapElem.insertBefore(window.makeCard(adsData[i]),
            filtresElem);

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
    mapElem.removeChild(renderedCard);
    document.removeEventListener('keydown', onCardEscPress);

    renderedCard = null;
    cardClose = null;
    currentPin = null;
  };

  var activatePage = function () {
    mapElem.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');

    for (var i = 0; i < window.form.adFieldsets.length; i++) {
      window.form.adFieldsets[i].disabled = false;
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

    if (!pin || pin === currentPin || pin === window.map.mainPin) {
      return;
    }

    if (renderedCard) {
      unrenderCard();
    }

    renderCard(pin);
  };

  window.map.mainPin.addEventListener('mousedown', function (evt) {
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

      var newTop = window.map.mainPin.offsetTop - shift.y;
      var newLeft = window.map.mainPin.offsetLeft - shift.x;

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

      window.map.mainPin.style.top = newTop + 'px';
      window.map.mainPin.style.left = newLeft + 'px';

      window.address.setNewAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (!isActivated) {
        activatePage();
        renderPins();
      }

      window.address.setNewAddress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
