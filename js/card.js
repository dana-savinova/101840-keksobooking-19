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
    // Выведите заголовок объявления offer.title в заголовок .popup__title
    element.querySelector('.popup__title').textContent = offer.offer.title;
    // Выведите адрес offer.address в блок .popup__text--address
    element.querySelector('.popup__text--address').textContent = offer.offer.address;
    // Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}}₽/ночь. Например, 5200₽/ночь
    element.querySelector('.popup__text--price').textContent = offer.offer.price;
    // В блок .popup__type выведите тип жилья offer.type: Квартира для flat, Бунгало для bungalo, Дом для house, Дворец для palace.
    element.querySelector('.popup__type').textContent = OFFERS_TYPE_TRANSLATION[offer.offer.type];
    // Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, 2 комнаты для 3 гостей.
    element.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    // Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, заезд после 14:00, выезд до 12:00
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

  var setAdFieldDescValue = function (element, offer) {
    if (offer.offer.description === 0) {
      element.querySelector('.popup__description').classList.add('hidden');
    } else {
      element.querySelector('.popup__description').textContent = offer.offer.description;
    }
  };

  var setAdPhoto = function (element, offer) {
    if (offer.offer.features.length === 0) {
      element.querySelector('.popup__photos').style.cssText = 'display: none';
    } else {
      // ищем блок для фото, чтобы очистить его содержимое
      element.querySelector('.popup__photos').innerHTML = ''; // тут чистим его содержимое, теперь он пустой
      var block = element.querySelector('.popup__photos');

      for (var i = 0; i < offer.offer.photos.length; i++) {
        var similarPhotoTemplate = document.querySelector('#card').content.querySelector('.popup__photo');
        var newPhoto = similarPhotoTemplate.cloneNode(true);
        newPhoto.src = offer.offer.photos[i];
        block.appendChild(newPhoto);
      }
    }
  };

  var checkAvatar = function (element, offer) {
    if (offer.author.avatar) {
      element.querySelector('.popup__avatar').src = offer.author.avatar;
    } else {
      element.querySelector('.popup__avatar').classList.add('hidden');
    }
  };

  var renderCard = function (offer) {
    var adCardElement = adCardTemplate.cloneNode(true);
    // вставляем значения в обязательные поля
    setAdFieldRequiredValue(adCardElement, offer);
    // В список .popup__features выведите все доступные удобства в объявлении.
    setAdFieldFeaturesValue(adCardElement, offer);
    // В блок .popup__description выведите описание объекта недвижимости offer.description.
    setAdFieldDescValue(adCardElement, offer);
    // В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
    setAdPhoto(adCardElement, offer);
    // Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.
    checkAvatar(adCardElement, offer);

    return adCardElement;
  };

  var insertCard = function (offer) {
    // тк попап показывается только один, а пользователь может кликнуть на метку в момент, когда текущий открыт, то сперва проверяем открыта ли карточка, если да закрываем
    if (map.querySelector('.popup')) {
      removeCard();
    }

    var card = renderCard(offer);
    var referenceElement = map.querySelector('.map__filters-container'); map.insertBefore(card, referenceElement);
    var cardPopup = map.querySelector('.popup'); // После того как вставили находим этот карточку
    var cardCloseBtn = cardPopup.querySelector('.popup__close');
    cardCloseBtn.focus();

    cardCloseBtn.addEventListener('click', removeCard); // слушаем клик на крестике для закрытия
    document.addEventListener('keydown', onMapKeydown);
  };

  var onMapKeydown = function (evt) {
    window.util.actionIfEscEvent(evt, function () {
      removeCard();
    });
  };

  var removeCard = function () {
    var cardPopup = map.querySelector('.popup');
    var currentPin = map.querySelector('.map__pin--active');
    cardPopup.querySelector('.popup__close').removeEventListener('click', removeCard);
    document.removeEventListener('keydown', onMapKeydown);

    cardPopup.remove();
    currentPin.classList.remove('map__pin--active');
  };

  window.card = {
    show: insertCard,
    remove: removeCard
  };
})();
