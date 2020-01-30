'use strict';

var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var HOUSE_ROOMS = [1, 2, 3];
var NUMBER_GUESTS = [0, 1, 2, 3];
var HOUSE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


var offersNumber = 8;
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var offerDescription = ['Уютный домик', 'Просторное жилище', 'Фото места'];
var offerPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var offerTime = ['12:00', '13:00', '14:00'];

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var MIN_Y = 130 - PIN_HEIGHT;
var MAX_Y = 630 - PIN_HEIGHT;
var MIN_X = 0 + PIN_WIDTH / 2;

// функция для получение размера элемента
var getElementWidth = function (element) {
  var width = window.getComputedStyle(element).width;
  return parseInt(width, 10);
};

var mapPinsWidth = getElementWidth(mapPins);

var MAX_X = mapPinsWidth - PIN_WIDTH / 2;

map.classList.remove('map--faded');

// функция для выбора рандомного элемента массива
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
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
  return {'author': {
    'avatar': getAvatar(number)
  },
  'offer': {
    'title': 'описание',
    'address': '100',
    'price': 4000,
    'type': getRandomElement(HOUSE_TYPES),
    'rooms': getRandomElement(HOUSE_ROOMS),
    'guests': getRandomElement(NUMBER_GUESTS),
    'checkin': getRandomElement(offerTime),
    'checkout': getRandomElement(offerTime),
    'features': getRandomElement(HOUSE_FEATURES),
    'description': getRandomElement(offerDescription),
    'photos': getRandomElement(offerPhotos),
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

// вставляем пины
var renderSimmiliarOffers = function (offers) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderOfferItem(offers[i]));
  }

  mapPins.appendChild(fragment);
};

renderSimmiliarOffers(createSimmiliarOffer(offersNumber));
