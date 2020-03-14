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

  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var filterForm = document.querySelector('.map__filters');
  var filterSelectList = filterForm.querySelectorAll('.map__filter');
  var filterHouseType = filterForm.querySelector('#housing-type');
  var filterPrice = filterForm.querySelector('#housing-price');
  var filterRoomsNum = filterForm.querySelector('#housing-rooms');
  var filterGuestsNum = filterForm.querySelector('#housing-guests');
  var filterFeatures = filterForm.querySelector('#housing-features');


  // деактивация фильтра
  window.deactivateFilter = function () {
    var filterOptions = Array.from(filterSelectList);
    filterOptions.forEach(function (element) {
      element.setAttribute('disabled', 'disabled');
    });

    filterFeatures.setAttribute('disabled', 'disabled');
  };

  // активация фильтра
  window.activateFilter = function () {
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
  var filterByType = function (offer) {
    if (getSelectOptionValue(filterHouseType).value === FilterValue.ANY) {
      return true;
    } else {
      return offer.offer.type === getSelectOptionValue(filterHouseType).value;
    }
  };

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

  // фильтрация по цене
  var filterByPrice = function (offer) {
    if (getSelectOptionValue(filterPrice).value === FilterValue.ANY) {
      return true;
    } else {
      return checkOfferPrice(offer) === getSelectOptionValue(filterPrice).value;
    }
  };

  // фильтрация по количеству комнат
  var filterByRoomNum = function (offer) {
    if (getSelectOptionValue(filterRoomsNum).value === FilterValue.ANY) {
      return true;
    } else {
      return offer.offer.rooms === parseInt(getSelectOptionValue(filterRoomsNum).value, 10);
    }
  };

  // фильтрация по количеству гостей
  var filterByGuestsNum = function (offer) {
    if (getSelectOptionValue(filterGuestsNum).value === FilterValue.ANY) {
      return true;
    } else {
      return offer.offer.guests === parseInt((getSelectOptionValue(filterGuestsNum).value), 10);
    }
  };

  // фильтрация по доп удобствам
  var filterByFeature = function (feature) {
    return function (offer) {
      var element = filterForm.querySelector('#filter-' + feature);
      if (!element.checked) {
        return true;
      } else {
        return offer.offer.features.includes(feature);
      }
    };
  };

  // фильтруем имеющиеся (полученные до этого с сервера) данные
  var getFilteredOffers = function () {
    var filteredOffers = window.dataFiltered
    .filter(filterByType)
    .filter(filterByPrice)
    .filter(filterByRoomNum)
    .filter(filterByGuestsNum);

    for (var featureIndex = 0; featureIndex < OFFER_FEATURES.length; featureIndex++) {
      filteredOffers = filteredOffers.filter(filterByFeature(OFFER_FEATURES[featureIndex]));
    }

    return filteredOffers;
  };

  var updatePins = function () {
    window.card.remove();
    window.pin.delete();
    window.filteredOffers = getFilteredOffers();
    window.data.insert(window.filteredOffers);
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
    reset: resetFiltersForm
  };
})();
