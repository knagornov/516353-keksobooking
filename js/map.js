'use strict';

(function () {
  window.map = {
    MAINPIN_HEIGHT: 82,
    mapElement: document.querySelector('.map'),
    mainPin: document.querySelector('.map__pin--main'),
    currentPin: null,
    initialAds: [],
    ads: [],

    renderPins: function (adsData) {
      pins = [];

      for (var i = 0; i < adsData.length; i++) {
        if (i === MAX_PINS_NUMBER) {
          break;
        }

        pins[i] = window.makePin(adsData[i]);
        pinsFragment.appendChild(pins[i]);
      }

      pinsContainer.appendChild(pinsFragment);
    },

    unrenderPins: function () {
      if (pins.length === 0) {
        return;
      }

      for (var i = pins.length - 1; i >= 0; i--) {
        pinsContainer.removeChild(pins[i]);
      }

      pins = [];
    },

    unrenderCard: function () {
      if (!renderedCard) {
        return;
      }

      window.map.mapElement.removeChild(renderedCard);

      document.removeEventListener('keydown', onCardEscPress);

      renderedCard = null;
      cardClose = null;
      window.map.currentPin = null;
    }
  };

  var MAX_PINS_NUMBER = 5;

  var filtres = window.map.mapElement.querySelector('.map__filters-container');
  var pinsContainer = window.map.mapElement.querySelector('.map__pins');
  var pinsFragment = document.createDocumentFragment();
  var pins = [];

  var MainPinMoveRange = {
    TOP: 150 - window.map.MAINPIN_HEIGHT,
    BOTTOM: 500 - window.map.MAINPIN_HEIGHT,
    LEFT: 0,
    right: pinsContainer.offsetWidth - window.map.mainPin.offsetWidth
  };

  var renderedCard;
  var cardClose;

  var renderCard = function () {
    var pinIndex = pins.indexOf(window.map.currentPin);

    renderedCard = window.map.mapElement.insertBefore(
        window.makeCard(window.map.ads[pinIndex]), filtres);

    cardClose = renderedCard.querySelector('.popup__close');

    cardClose.addEventListener('click', function () {
      window.map.unrenderCard();
    });
    document.addEventListener('keydown', onCardEscPress);
  };

  var onPinsContainerClick = function (evt) {
    var newPin = evt.target.closest('.map__pin');

    if (!newPin || newPin === window.map.currentPin
        || newPin === window.map.mainPin) {
      return;
    }

    window.map.unrenderCard();

    window.map.currentPin = newPin;
    renderCard();
  };

  var onCardEscPress = function (evt) {
    window.util.isEscEvent(evt, window.map.unrenderCard);
  };

  var adsLoadSusccesHandler = function (adsData) {
    window.map.initialAds = adsData;
    window.map.ads = adsData;
    window.map.renderPins(adsData);
    window.util.disableForm(window.filter.filtersForm, false);
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

      if (newTop < MainPinMoveRange.TOP) {
        newTop = MainPinMoveRange.TOP;
      }
      if (newTop > MainPinMoveRange.BOTTOM) {
        newTop = MainPinMoveRange.BOTTOM;
      }
      if (newLeft < MainPinMoveRange.LEFT) {
        newLeft = MainPinMoveRange.LEFT;
      }
      if (newLeft > MainPinMoveRange.right) {
        newLeft = MainPinMoveRange.right;
      }

      window.map.mainPin.style.top = newTop + 'px';
      window.map.mainPin.style.left = newLeft + 'px';

      window.address.setNewAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (!window.page.isActivated) {
        window.page.activatePage();
        window.backend.load(adsLoadSusccesHandler, window.util.errorHandler);
      }

      window.address.setNewAddress();

      pinsContainer.addEventListener('click', onPinsContainerClick);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
