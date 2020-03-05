'use strict';
(function () {
  var OFFERS_NUMBER = 5;
  // перемещение маркера
  var MAIN_PIN_WIDTH = 65;
  var HALF_MAIN_PIN_WIDTH = Math.round(MAIN_PIN_WIDTH / 2);


  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var mapPinsWidth = window.util.getElementWidth(mapPins);

  var offersArray = window.createSimmiliarOffer(OFFERS_NUMBER);
  window.dataArray = offersArray;


  var activatePage = function () {
    window.page.activate();
    window.pin.renderSimmiliarOffers(offersArray);
  };


  // обработчики событий
  var onMapPinMainClick = function (evt) {
    window.util.actionIfLeftBtnEvent(evt, activatePage);
  };

  var onMapPinMainKeydown = function (evt) {
    window.util.actionIfEnterEvent(evt, activatePage);
  };


  var onMainPinMove = function (evt) {
    evt.preventDefault();

    // диапазон, в котором метка может перемещаться

    var moveRange = {
      top: 130,
      right: mapPinsWidth - HALF_MAIN_PIN_WIDTH,
      bottom: 630, // Для удобства пользователей значение Y-координаты адреса должно быть ограничено интервалом от 130 до 630.
      left: 0 - HALF_MAIN_PIN_WIDTH
    };

    // записываем начальные координаты
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      // расчет смещения
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      // переназначаем координаты на текущие
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // вычисляем новые координаты для метки
      // var newMainPinCoords = {
      //   x: mapPinMain.offsetLeft - shift.x,
      //   y: mapPinMain.offsetTop - shift.y
      // };

      var shiftX = mapPinMain.offsetLeft - shift.x;
      var shiftY = mapPinMain.offsetTop - shift.y;

      // проверка по оси X
      if (shiftX > moveRange.right) {
        shiftX = moveRange.right;
      } else if (shiftX < moveRange.left) {
        shiftX = moveRange.left;
      }

      // проверка по оси Y
      if (shiftY < moveRange.top) {
        shiftY = moveRange.top;
      } else if (shiftY >= moveRange.bottom) {
        shiftY = moveRange.bottom;
      }

      // фиксируем положение в стилях
      mapPinMain.style.top = shiftY + 'px';
      mapPinMain.style.left = shiftX + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.setAddress(window.util.getMapPinCoordinates(mapPinMain), HALF_MAIN_PIN_WIDTH);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    // слушаем события мыши
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mapPinMain.addEventListener('mouseup', onMapPinMainClick);
  mapPinMain.addEventListener('keydown', onMapPinMainKeydown);
  mapPinMain.addEventListener('mousedown', onMainPinMove);

})();
