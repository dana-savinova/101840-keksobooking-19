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
  var filterSelectList = filterForm.querySelectorAll('.map__filter');
  var filterHouseType = filterForm.querySelector('#housing-type');
  var filterPrice = filterForm.querySelector('#housing-price');
  var filterRoomsNum = filterForm.querySelector('#housing-rooms');
  var filterGuestsNum = filterForm.querySelector('#housing-guests');
  var filterFeatures = filterForm.querySelector('#housing-features');


  // деактивация фильтра
  var deactivateFilter = function () {
    var filterOptions = Array.from(filterSelectList);
    filterOptions.forEach(function (element) {
      element.setAttribute('disabled', 'disabled');
    });

    filterFeatures.setAttribute('disabled', 'disabled');
  };

  // активация фильтра
  var activateFilter = function () {
    var filterOptions = Array.from(filterSelectList);
    filterOptions.forEach(function (element) {
      element.removeAttribute('disabled', 'disabled');
    });

    filterFeatures.removeAttribute('disabled', 'disabled');
  };

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

  // фильтрация по типу жилья
  var filterByType = function (el) {
    if (getSelectOptionValue(filterHouseType).value === FilterValue.ANY) {
      return true;
    } else {
      return el.offer.type === getSelectOptionValue(filterHouseType).value;
    }
  };

  // вспомогательная функция, которая помогает сопоставить зачения цены с значениями в фильтре
  var checkOfferPrice = function (el) {
    var price = parseInt(el.offer.price, 10);
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

  // фильтрация по цене
  var filterByPrice = function (el) {
    if (getSelectOptionValue(filterPrice).value === FilterValue.ANY) {
      return true;
    } else {
      return checkOfferPrice(el) === getSelectOptionValue(filterPrice).value;
    }
  };

  // фильтрация по количеству комнат
  var filterByRoomNum = function (el) {
    if (getSelectOptionValue(filterRoomsNum).value === FilterValue.ANY) {
      return true;
    } else {
      return el.offer.rooms === parseInt(getSelectOptionValue(filterRoomsNum).value, 10);
    }
  };

  // фильтрация по количеству гостей
  var filterByGuestsNum = function (el) {
    if (getSelectOptionValue(filterGuestsNum).value === FilterValue.ANY) {
      return true;
    } else {
      return el.offer.guests === parseInt((getSelectOptionValue(filterGuestsNum).value), 10);
    }
  };

  // фильтрация по доп удобствам
  var filterByFeature = function (el) {
    var featureElements = document.querySelectorAll('.map__checkbox');
    var filterResult = true;
    for (var i = 0; i < featureElements.length; i++) {
      if (featureElements[i].checked) {
        if (el.offer.features.indexOf(featureElements[i].value) === -1) {
          filterResult = false;
          break;
        }
      }
    }
    return filterResult;
  };

  // фильтруем имеющиеся (полученные до этого с сервера) данные
  var getFilteredOffers = function () {
    var filteredOffers = window.dataFiltered.filter(function (el) {
      return filterByType(el) &&
          filterByPrice(el) &&
          filterByRoomNum(el) &&
          filterByGuestsNum(el) &&
          filterByFeature(el);
    });
    return filteredOffers;
  };

  var updatePins = function () {
    window.card.remove();
    window.pin.delete();
    var filteredOffers = getFilteredOffers();
    window.data.insert(filteredOffers);
    console.log(filteredOffers);
  };

  var debouncedPinsUpdate = window.debounce.set(updatePins);

  var onFilterChange = function (evt) {
    if (evt.target && evt.target.matches('select.map__filter') || evt.target.matches('input.map__checkbox')) {
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
    updatePins: updatePins,
    addListener: addFiltersFormListener,
    reset: resetFiltersForm,
    deactivate: deactivateFilter,
    activate: activateFilter
  };
})();
