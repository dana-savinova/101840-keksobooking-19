'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');

  // отрисовка пина с аватаркой на карте
  var renderOfferItem = function (offer) {
    var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var offerElement = mapPinTemplate.cloneNode(true);
    var img = offerElement.querySelector('img');

    offerElement.style.left = offer.location.x + 'px';
    offerElement.style.top = offer.location.y + 'px';
    img.src = offer.author.avatar;
    img.alt = offer.offer.description;

    return offerElement;
  };

  // слушаем нажатие на пины с объявлениями
  var adPinsAllClickListener = function (arr) {
    var allAdPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main'); // массив всех меток, исключая главную

    var addPinClickListener = function (pin, i) {
      var onPinClickCard = function () {
        var numberOffer = i;

        window.card.show(arr[numberOffer]);
        pin.classList.add('map__pin--active');
      };
      pin.addEventListener('click', onPinClickCard);
    };

    // теперь слушаем клик на _каждом_ пине, кроме первой
    allAdPins.forEach(function (element, i) {
      addPinClickListener(element, i);
    });

  };

  // удаление пинов
  var removePins = function () {
    var allAdPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main');
    allAdPins.forEach(function (element) {
      element.remove();
    });
  };

  window.pin = {
    create: renderOfferItem,
    delete: removePins,
    addListeners: adPinsAllClickListener
  };
})();
