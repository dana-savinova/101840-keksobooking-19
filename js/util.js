'use strict';

(function () {
  // кнопки
  var LEFT_BTN_CODE = 0;
  var ENTER_KEYCODE = 13;

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

  // функция для получение размера элемента
  var getElementWidth = function (element) {
    var width = window.getComputedStyle(element).width;
    return parseInt(width, 10);
  };

  // функция для нажатия на enter
  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  // функция для нажатия на левую кнопку мыши
  var isLeftBtnEvent = function (evt, action) {
    if (typeof evt === 'object') {
      switch (evt.button) {
        case LEFT_BTN_CODE:
          action();
          break;
      }
    }
  };

  // функция для получения случайной координаты У
  var getRandomPosition = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  window.util = {
    getRandomElement: getRandomElement, // выбора рандомного элемента массива
    getRandomIntInclusive: getRandomIntInclusive,
    getRandomPosition: getRandomPosition, // рандомное число из промежутка
    getShuffleArray: getShuffleArray, // перемешивание массива
    getArrayRandomLength: getArrayRandomLength, // новый массив рандомной длины
    getElementWidth: getElementWidth, // получение размера элемента
    isEnterEvent: isEnterEvent, // нажатие на enter
    isLeftBtnEvent: isLeftBtnEvent // нажатие на левую кнопку мыши
  };
})();