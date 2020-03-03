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

  var setAdFieldFeaturesValue = function (element, offer) {
    if (offer.offer.features.length === 0) {
      element.querySelector('.popup__features').hidden = true;
    } else {
      element.querySelector('.popup__features').innerHTML = '';

      for (var i = 0; i < offer.offer.features.length; i++) {
        var newElement = document.createElement('li');
        newElement.className = 'popup__feature popup__feature--' + offer.offer.features[i];
        element.querySelector('.popup__features').appendChild(newElement);
      }
    }
  };

  var setAdFieldPhoto = function (element, offer) {
    if (offer.offer.features.length === 0) {
      element.querySelector('.popup__photos').classList.add('hidden');
    } else {
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
    adCardElement.querySelector('.popup__avatar').src = offer.author.avatar;
    adCardElement.querySelector('.popup__title').textContent = offer.offer.title;
    adCardElement.querySelector('.popup__text--address').textContent = offer.offer.address;
    adCardElement.querySelector('.popup__text--price').textContent = offer.offer.price;
    adCardElement.querySelector('.popup__type').textContent = OFFERS_TYPE_TRANSLATION[offer.offer.type];
    adCardElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    adCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ' , выезд до ' + offer.offer.checkout;


    // доп фишки вроде wi-fi
    setAdFieldFeaturesValue(adCardElement, offer);

    // разбираемся с фотографиями
    var photos = adCardElement.querySelector('.popup__photos'); // ищем блок для фото, чтобы очистить его содержимое
    photos.innerHTML = ''; // тут чистим его содержимое, теперь он пустой
    setAdFieldPhoto(adCardElement, offer);

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
