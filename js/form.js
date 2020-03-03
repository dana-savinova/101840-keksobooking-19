'use strict';

(function () {
  var HOUSE_MIN_PRICES = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var mapPinMain = document.querySelector('.map__pin--main');

  var filtersForm = document.querySelector('.map__filters');
  var filtersFormFields = filtersForm.querySelectorAll('fieldset');

  var addForm = document.querySelector('.ad-form');
  var addFormFields = addForm.querySelectorAll('fieldset');
  var addFormAddress = addForm.querySelector('#address');
  var addFormPrice = addForm.querySelector('#price');
  var addFormType = addForm.querySelector('#type');
  var addFormTimeGroup = addForm.querySelector('.ad-form__element--time');
  var addFormTimeIn = addForm.querySelector('#timein');
  var addFormTimeOut = addForm.querySelector('#timeout');
  var addFormRooms = addForm.querySelector('#room_number');
  var addFormGuests = addForm.querySelector('#capacity');

  // валидация формы
  // Вспомогательная функция для изменения минимального значение поля цены
  var changeMinPrice = function (value) {
    addFormPrice.setAttribute('min', value);
    addFormPrice.setAttribute('placeholder', value);
  };

  // Изменение минимальной цены при выборе типа жилья
  var onPriceChange = function (evt) {
    var value = evt.target.value;
    switch (value) {
      case 'bungalo':
        changeMinPrice(HOUSE_MIN_PRICES.bungalo);
        break;
      case 'flat':
        changeMinPrice(HOUSE_MIN_PRICES.flat);
        break;
      case 'house':
        changeMinPrice(HOUSE_MIN_PRICES.house);
        break;
      case 'palace':
        changeMinPrice(HOUSE_MIN_PRICES.palace);
        break;
    }
  };

  // Время въезда и выезда
  var onTimeChange = function (evt) {
    var target = evt.target;
    if (target === addFormTimeIn) {
      addFormTimeOut.value = target.value;
    } else {
      addFormTimeIn.value = target.value;
    }
  };

  // Проверка на соответствие количества комнат и гостей
  var onRoomNumChange = function () {
    var guests = parseInt(addFormGuests.value, 10);
    var rooms = parseInt(addFormRooms.value, 10);

    if (rooms === 1 && guests !== 1) {
      addFormRooms.setCustomValidity('Только для одного гостя');
    } else if (rooms === 2 && (guests < 1 || guests > 2)) {
      addFormRooms.setCustomValidity('Не больше двух гостей');
    } else if (rooms === 3 && (guests < 1 || guests > 3)) {
      addFormRooms.setCustomValidity('Не больше трех гостей');
    } else if (rooms === 100 && guests !== 0) {
      addFormRooms.setCustomValidity('Не для гостей');
    } else {
      addFormRooms.setCustomValidity('');
    }
  };

  var deactivateFields = function (formFields) {
    for (var i = 0; i < formFields.length; i++) {
      formFields[i].setAttribute('disabled', '');
    }
  };

  var activateFields = function (formFields) {
    for (var i = 0; i < formFields.length; i++) {
      formFields[i].removeAttribute('disabled');
    }
  };

  var deactivateForm = function () {
    deactivateFields(addFormFields);
    deactivateFields(filtersFormFields);
  };

  var activateForm = function () {
    activateFields(addFormFields);
    activateFields(filtersFormFields);
  };

  var addFormEvtListeners = function () {
    addFormType.addEventListener('change', onPriceChange);
    addFormTimeGroup.addEventListener('change', onTimeChange);
    addFormRooms.addEventListener('change', onRoomNumChange);
    addFormGuests.addEventListener('change', onRoomNumChange);
  };

  var removeFormEvtListeners = function () {
    addFormType.removeEventListener('change', onPriceChange);
    addFormTimeGroup.removeEventListener('change', onTimeChange);
    addFormRooms.removeEventListener('change', onRoomNumChange);
    addFormGuests.removeEventListener('change', onRoomNumChange);
  };

  var getMapPinMainCoordinates = function () {
    return {
      x: mapPinMain.offsetLeft,
      y: mapPinMain.offsetTop
    };
  };

  var setAddFormAddress = function (coordinates) {
    addFormAddress.value = coordinates.x + ', ' + coordinates.y;
  };

  window.form = {
    deactivate: deactivateForm,
    activate: activateForm,
    addEvtListeners: addFormEvtListeners,
    removeEvtListeners: removeFormEvtListeners,
    setAddress: setAddFormAddress(getMapPinMainCoordinates())
  };
})();