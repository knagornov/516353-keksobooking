'use strict';

(function () {
  window.map = {
    MAINPIN_HEIGHT: 82,
    mapElem: document.querySelector('.map'),
    mainPin: document.querySelector('.map__pin--main'),
    currentPin: null,
    unrenderPins: function () {
      for (var i = pinsContainer.children.length - 1; i >= 0; i--) {
        if (pinsContainer.children[i].className === 'map__pin') {
          pinsContainer.removeChild(pinsContainer.children[i]);
        }
      }
    },
    unrenderCard: function () {
      if (renderedCard) {
        window.map.mapElem.removeChild(renderedCard);
      }
      document.removeEventListener('keydown', onCardEscPress);

      renderedCard = null;
      cardClose = null;
      window.map.currentPin = null;
    }
  };

  var VERTICAL_RANGE = {
    MIN: 150 - window.map.MAINPIN_HEIGHT,
    MAX: 500 - window.map.MAINPIN_HEIGHT
  };

  var filtresElem = window.map.mapElem.querySelector('.map__filters-container');
  var pinsContainer = window.map.mapElem.querySelector('.map__pins');
  var pinsFragment = document.createDocumentFragment();
  var pins = [];

  var horisontalRange = {
    min: 0,
    max: pinsContainer.offsetWidth - window.map.mainPin.offsetWidth
  };

  var renderedCard;
  var cardClose;

  var renderPins = function (adsData) {
    for (var i = 0; i < adsData.length; i++) {
      pins[i] = window.makePin(adsData[i]);
      pinsFragment.appendChild(pins[i]);
    }

    pinsContainer.appendChild(pinsFragment);
  };

  var renderCard = function (adsData) {
    for (var i = 0; i < pins.length; i++) {
      if (pins[i] === window.map.currentPin) {
        renderedCard = window.map.mapElem
            .insertBefore(window.makeCard(adsData[i]), filtresElem);

        cardClose = renderedCard.querySelector('.popup__close');
        cardClose.addEventListener('click', function () {
          window.map.unrenderCard();
        });
        document.addEventListener('keydown', onCardEscPress);

        break;
      }
    }
  };

  var onPinsContainerClick = function (evt) {
    var newPin = evt.target.closest('.map__pin');

    if (!newPin || newPin === window.map.currentPin
        || newPin === window.map.mainPin) {
      return;
    }

    if (renderedCard) {
      window.map.unrenderCard();
    }

    window.map.currentPin = newPin;
    window.backend.load(renderCard, window.util.errorHandler);
  };

  var onCardEscPress = function (evt) {
    window.util.isEscEvent(evt, window.map.unrenderCard);
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

      if (!window.page.isActivated) {
        window.page.activatePage();
        window.backend.load(renderPins, window.util.errorHandler);
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
