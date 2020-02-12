'use strict';

// данные для объявления
var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var HOUSE_ROOMS = [1, 2, 3];
var NUMBER_GUESTS = [0, 1, 2, 3];
var HOUSE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_DESCRIPTIONS = ['Уютный домик', 'Просторное жилище', 'Фото места'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var OFFERS_NUMBER = 8;

// размеры пина
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

// координаты
var TOP_BORDER_Y = 130;
var BOTTOM_BORDER_Y = 630;
var MIN_Y = TOP_BORDER_Y - PIN_HEIGHT;
var MAX_Y = BOTTOM_BORDER_Y - PIN_HEIGHT;
var MIN_X = 0 + PIN_WIDTH / 2;

// необходимые селекторы
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// расчет максимальной ширины карты
// функция для получение размера элемента
var getElementWidth = function (element) {
  var width = window.getComputedStyle(element).width;
  return parseInt(width, 10);
};
var mapPinsWidth = getElementWidth(mapPins);

var MAX_X = mapPinsWidth - PIN_WIDTH / 2;

// функция для выбора рандомного элемента массива
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// рандомное число из промежутка
var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
};

// перемешивание массива
var getShuffleArray = function (arr) {
  var j;
  var temp;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

// Новый массив рандомной длины
var getArrayRandomLength = function (arr) {
  return arr.slice(0, getRandomIntInclusive(1, arr.length + 1));
};

// функция для создания пути к аватару
var getAvatar = function (num) {
  return 'img/avatars/user0' + (num + 1) + '.png';
};

// функция для получения случайной координаты У
var getRandomPosition = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// функция для создания объекта для объявления
var createOffer = function (number) {
  return {
    'author': {
      'avatar': getAvatar(number)
    },
    'offer': {
      'title': 'описание',
      'address': '600, 350',
      'price': getRandomIntInclusive(0, 4000),
      'type': getRandomElement(HOUSE_TYPES),
      'rooms': getRandomElement(HOUSE_ROOMS),
      'guests': getRandomElement(NUMBER_GUESTS),
      'checkin': getRandomElement(OFFER_TIMES),
      'checkout': getRandomElement(OFFER_TIMES),
      'features': getArrayRandomLength(getShuffleArray(HOUSE_FEATURES)),
      'description': getRandomElement(OFFER_DESCRIPTIONS),
      'photos': getArrayRandomLength(getShuffleArray(OFFER_PHOTOS)),
    },
    'location': {
      'x': getRandomPosition(MIN_X, MAX_X),
      'y': getRandomPosition(MIN_Y, MAX_Y)
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

// генерируем элемент с предложением
var renderOfferItem = function (offer) {
  var offerElement = mapPinTemplate.cloneNode(true);
  var img = offerElement.querySelector('img');

  offerElement.style.left = offer.location.x + 'px';
  offerElement.style.top = offer.location.y + 'px';
  img.src = offer.author.avatar;
  img.alt = offer.offer.description;

  return offerElement;
};

// временно переводим карту из неактивного состояния в активное
map.classList.remove('map--faded');

// вставляем пины
var renderSimmiliarOffers = function (offers) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderOfferItem(offers[i]));
  }

  mapPins.appendChild(fragment);
};

renderSimmiliarOffers(createSimmiliarOffer(OFFERS_NUMBER));
