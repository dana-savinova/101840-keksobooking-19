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


  // слушаем нажатие на пины с объявлениями
  var adPinsAllClickListener = function (arr) {
    var allAdPins = mapPins.querySelectorAll('.map__pin'); // массив всех меток, включая главную

    var addPinClickListener = function (pin, i) {
      var onPinClickCard = function () {
        var numberOffer = i - 1;
        window.card.show(arr[numberOffer]);
        pin.classList.add('map__pin--active');
      };
      pin.addEventListener('click', onPinClickCard);
    };

    // теперь слушаем клик на _каждом_ пине, кроме первой
    for (var i = 1; i < allAdPins.length; i++) {
      var pinArray = allAdPins[i];
      addPinClickListener(pinArray, i);
    }
  };

  window.pin = {
    renderSimmiliarOffers: renderSimmiliarOffers,
    addListeners: adPinsAllClickListener
  };
})();
