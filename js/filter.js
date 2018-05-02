'use strict';

(function () {
  window.filter = {
    filtersForm: window.map.mapElement.querySelector('.map__filters'),
    filterAds: function () {
      window.map.ads = window.map.initialAds.slice();
      var typeFilter = window.filter.filtersForm
          .elements['housing-type'].value;
      var roomsFilter = window.filter.filtersForm
          .elements['housing-rooms'].value;
      var priceFilter = window.filter.filtersForm
          .elements['housing-price'].value;
      var guestsFilter = window.filter.filtersForm
          .elements['housing-guests'].value;

      var checkPrice = function (adPrice) {
        return (priceFilter === 'low' && adPrice >= 10000) ||
            (priceFilter === 'high' && adPrice <= 50000) ||
            (priceFilter === 'middle' && (adPrice < 10000 || adPrice > 50000));
      };

      var checkFeatures = function (adFeatures) {
        var isMatches = true;

        for (var i = 0; i < featuresCheckboxes.length; i++) {
          if (featuresCheckboxes[i].checked === true &&
              adFeatures.indexOf(featuresCheckboxes[i].value) === -1) {
            isMatches = false;
          }
        }
        return isMatches;
      };

      for (var i = window.map.ads.length - 1; i >= 0; i--) {
        var ad = window.map.ads[i].offer;

        if (typeFilter !== 'any' && ad.type !== typeFilter ||
            roomsFilter !== 'any' && ad.rooms !== +roomsFilter ||
            guestsFilter !== 'any' && ad.guests !== +guestsFilter ||
            priceFilter !== 'any' && checkPrice(ad.price) ||
            checkFeatures(ad.features) === false) {
          window.map.ads.splice(i, 1);
          continue;
        }
      }

      window.map.unrenderCard();
      window.map.unrenderPins();
      window.map.renderPins(window.map.ads);
    }
  };

  var featuresCheckboxes = window.filter.filtersForm.elements.features;

  for (var i = 0; i < window.filter.filtersForm.elements.length; i++) {
    window.filter.filtersForm.elements[i].disabled = true;
  }

  window.filter.filtersForm.addEventListener('change', function () {
    window.util.debounce(window.filter.filterAds, 500);
  });
})();
