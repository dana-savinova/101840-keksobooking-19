'use strict';
(function () {
  var PriceStep = {
    LOW: 10000,
    HIGH: 50000
  };
  var PriceValue = {
    LOW: 'low',
    HIGH: 'high',
    MIDDLE: 'middle',
    ANY: 'any'
  };

var filterForm = document.querySelector('.map__filters');
var filterHouseType = filterForm.querySelector('#housing-type');
var filterPrice = filterForm.querySelector('#housing-price');
var filterRoomsNum = filterForm.querySelector('#housing-rooms');
var filterGuestsNum = filterForm.querySelector('#housing-guests');

// вспомогательная функция для получения значения выбранного значения элемента option
var getSelectOptionValue = function (selectList) {
    var option;
    for (var i = 0; i < selectList.options.length; i++) {
      if (selectList.options[i].selected) {
        option = selectList.options[i];
        break;
      }
    }
    return option;
};
})();
