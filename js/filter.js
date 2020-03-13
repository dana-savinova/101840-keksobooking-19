'use strict';
(function () {
  var PriceStep = {
    LOW: 10000,
    HIGH: 50000
  };
  var FilterValue = {
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

  // вспомогательная функция для получения выбранного элемента option
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

  // ФИЛЬТРАЦИЯ ПО ТИПУ ЖИЛЬЯ
  var filterByType = function (offer) {
    if (getSelectOptionValue(filterHouseType).value === FilterValue.ANY) {
      return true;
    } else {
      return offer.offer.type === getSelectOptionValue(filterHouseType).value;
    }
  };
  // ФИЛЬТРАЦИЯ ПО ЦЕНЕ
  // вспомогательная функция, которая помогает сопоставить зачения цены с значениями в фильтре
  var checkOfferPrice = function (offer) {
    var price = parseInt(offer.offer.price, 10);
    if (price < PriceStep.LOW) {
      return FilterValue.LOW;
    } else if (price >= PriceStep.LOW && price <= PriceStep.HIGH) {
      return FilterValue.MIDDLE;
    } else if (price > PriceStep.HIGH) {
      return FilterValue.HIGH;
    } else {
      return FilterValue.ANY;
    }
  };

  var filterByPrice = function (offer) {
    if (getSelectOptionValue(filterPrice).value === FilterValue.ANY) {
      return true;
    } else {
      return checkOfferPrice(offer) === getSelectOptionValue(filterPrice).value;
    }
  };

  // ФИЛЬТРАЦИЯ ПО КОЛИЧЕСТВУ КОМНАТ
  var filterByRoomNum = function (offer) {
    if (getSelectOptionValue(filterRoomsNum).value === FilterValue.ANY) {
      return true;
    } else {
      return offer.offer.rooms === parseInt(getSelectOptionValue(filterRoomsNum).value, 10);
    }
  };

  // ФИЛЬТРАЦИЯ ПО ЧИСЛУ ГОСТЕЙ
  var filterByGuestsNum = function (offer) {
    if (getSelectOptionValue(filterGuestsNum).value === FilterValue.ANY) {
      return true;
    } else {
      return offer.offer.guests === parseInt((getSelectOptionValue(filterGuestsNum).value), 10);
    }
  };

  // фильтруем имеющиеся у нас данные
  var getFilteredOffers = function () {
    var filteredOffers = window.dataFiltered
    .filter(filterByType)
    .filter(filterByPrice)
    .filter(filterByRoomNum)
    .filter(filterByGuestsNum);

    return filteredOffers;
  };

  var updatePins = function () {
    window.card.remove();
    window.pin.delete();
    window.filteredOffers = getFilteredOffers();
    console.log(window.filteredOffers);
    window.data.insert(window.filteredOffers);
  };

  var onFilterChange = function (evt) {
    if (evt.target && evt.target.matches('select.map__filter')) {
      var debouncedPinsUpdate = window.debounce.set(updatePins);
      debouncedPinsUpdate();
    }
  };

  var addFiltersFormListener = function () {
    filterForm.addEventListener('change', onFilterChange);
  };

  var resetFiltersForm = function () {
    filterForm.removeEventListener('change', onFilterChange);
    filterForm.reset();
  };

  window.filter = {
    element: filterForm,
    updatePins: updatePins,
    addListener: addFiltersFormListener,
    reset: resetFiltersForm
  };
})();
