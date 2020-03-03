'use strict';
(function () {
  var OFFERS_TYPE_TRANSLATION = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var map = document.querySelector('.map');
  var adCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var setAdFieldRequiredValue = function (element, offer) {
    element.querySelector('.popup__avatar').src = offer.author.avatar;
    element.querySelector('.popup__title').textContent = offer.offer.title;
    element.querySelector('.popup__text--address').textContent = offer.offer.address;
    element.querySelector('.popup__text--price').textContent = offer.offer.price;
    element.querySelector('.popup__type').textContent = OFFERS_TYPE_TRANSLATION[offer.offer.type];
    element.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    element.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ' , выезд до ' + offer.offer.checkout;
  };

  var setAdFieldFeaturesValue = function (element, offer) {
    if (offer.offer.features.length === 0) {
      element.querySelector('.popup__features').classList.add('hidden');
    } else {
      element.querySelector('.popup__features').innerHTML = '';

      for (var i = 0; i < offer.offer.features.length; i++) {
        var newElement = document.createElement('li');
        newElement.className = 'popup__feature popup__feature--' + offer.offer.features[i];
        element.querySelector('.popup__features').appendChild(newElement);
      }
    }
  };

  var setAdPhoto = function (element, offer) {
    if (offer.offer.features.length === 0) {
      element.querySelector('.popup__photos').classList.add('hidden');
    } else {
      // ищем блок для фото, чтобы очистить его содержимое
      element.querySelector('.popup__photos').innerHTML = ''; // тут чистим его содержимое, теперь он пустой

      for (var i = 0; i < offer.offer.photos.length; i++) {
        var similarPhotoTemplate = document.querySelector('#card').content.querySelector('.popup__photo');
        var newPhoto = similarPhotoTemplate.cloneNode(true);
        newPhoto.src = offer.offer.photos[i];
        element.appendChild(newPhoto);
      }
    }
  };

  var renderCard = function (offer) {
    var adCardElement = adCardTemplate.cloneNode(true);
    // вставляем значения в обязательные поля
    setAdFieldRequiredValue(adCardElement, offer);
    // доп фишки вроде wi-fi
    setAdFieldFeaturesValue(adCardElement, offer);
    // разбираемся с фотографиями
    setAdPhoto(adCardElement, offer);

    return adCardElement;
  };

  var insertCard = function (offer) {
    if (map.querySelector('.popup')) {
      removeCard();
    }

    var card = renderCard(offer);
    var referenceElement = map.querySelector('.map__filters-container'); map.insertBefore(card, referenceElement);
    var cardPopup = map.querySelector('.popup'); // После того как вставили находим этот карточку
    cardPopup.querySelector('.popup__close').addEventListener('click', removeCard);
  };

  var removeCard = function () {
    var cardPopup = map.querySelector('.popup');
    cardPopup.querySelector('.popup__close').removeEventListener('click', removeCard);
    cardPopup.remove();
  };

  window.card = {
    show: insertCard,
    remove: removeCard
  };
})();
