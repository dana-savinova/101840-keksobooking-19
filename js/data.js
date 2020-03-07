'use strict';

(function () {
  var OFFERS_NUMBER = 8;

  var mapPins = document.querySelector('.map__pins');

  var onSuccessData = function (data) {
    getOffersData(data);
  };

  var getOffersData = function (data) {
    var offersArray = data.filter(function (obj) {
      return (obj.offer !== undefined);
    });
    window.dataFiltered = offersArray;
    renderSimmiliarOffers(window.dataFiltered);
    window.pin.addListeners(window.dataFiltered);
  };

  // вставляем пины
  var renderSimmiliarOffers = function (arr) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < OFFERS_NUMBER; i++) {
      fragment.appendChild(window.pin.create(arr[i]));
    }

    mapPins.appendChild(fragment);
  };

  window.data = {
    onSuccess: onSuccessData
  };
})();
