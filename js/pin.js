'use strict';

(function () {
  // генерируем элемент с предложением
  var mapPins = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderOfferItem = function (offer) {
    var offerElement = mapPinTemplate.cloneNode(true);
    var img = offerElement.querySelector('img');

    offerElement.style.left = offer.location.x + 'px';
    offerElement.style.top = offer.location.y + 'px';
    img.src = offer.author.avatar;
    img.alt = offer.offer.description;

    return offerElement;
  };

  // вставляем пины - в функцию "скармливаем" массив с объявлениями
  var renderSimmiliarOffers = function (offers) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(renderOfferItem(offers[i]));
    }

    mapPins.appendChild(fragment);
  };

  window.renderSimmiliarOffers = renderSimmiliarOffers;
})();
