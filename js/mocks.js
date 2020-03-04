'use strict';

(function () {
  // данные для мока
  var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var HOUSE_ROOMS = [1, 2, 3];
  var NUMBER_GUESTS = [0, 1, 2, 3];
  var HOUSE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_DESCRIPTIONS = ['Уютный домик', 'Просторное жилище', 'Фото места', 0];
  var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var OFFER_TIMES = ['12:00', '13:00', '14:00'];

  // размеры пина
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  // координаты
  var TOP_BORDER_Y = 130;
  var BOTTOM_BORDER_Y = 630;
  var MIN_Y = TOP_BORDER_Y - PIN_HEIGHT;
  var MAX_Y = BOTTOM_BORDER_Y - PIN_HEIGHT;
  var MIN_X = 0 + PIN_WIDTH / 2;

  var mapPins = document.querySelector('.map__pins');
  var MAX_X = window.util.getElementWidth(mapPins) - PIN_WIDTH / 2;

  // функция для создания пути к аватару
  var getAvatar = function (num) {
    return 'img/avatars/user0' + (num + 1) + '.png';
  };

  var createOffer = function (number) {
    return {
      'author': {
        'avatar': getAvatar(number)
      },
      'offer': {
        'title': 'описание',
        'address': '600, 350',
        'price': window.util.getRandomIntInclusive(0, 4000),
        'type': window.util.getRandomElement(HOUSE_TYPES),
        'rooms': window.util.getRandomElement(HOUSE_ROOMS),
        'guests': window.util.getRandomElement(NUMBER_GUESTS),
        'checkin': window.util.getRandomElement(OFFER_TIMES),
        'checkout': window.util.getRandomElement(OFFER_TIMES),
        'features': window.util.getArrayRandomLength(window.util.getShuffleArray(HOUSE_FEATURES)),
        'description': window.util.getRandomElement(OFFER_DESCRIPTIONS),
        'photos': window.util.getArrayRandomLength(window.util.getShuffleArray(OFFER_PHOTOS)),
      },
      'location': {
        'x': window.util.getRandomPosition(MIN_X, MAX_X),
        'y': window.util.getRandomPosition(MIN_Y, MAX_Y)
      }
    };
  };

  // создает массив с похожими объявлениями
  var createSimmiliarOffer = function (number) {
    var offers = [];
    for (var i = 0; i < number; i++) {
      offers[i] = createOffer(i);
    }
    return offers;
  };

  window.createSimmiliarOffer = createSimmiliarOffer;
})();
