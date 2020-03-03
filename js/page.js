'use strict';

(function () {
  var OFFERS_NUMBER = 5;

  var map = document.querySelector('.map');
  // var adPins = map.querySelectorAll('.map__pin');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');

  var onMapPinMainClick = function (evt) {
    window.util.isLeftBtnEvent(evt, activatePage);
  };

  var onMapPinMainKeydown = function (evt) {
    window.util.isEnterEvent(evt, activatePage);
  };

  var offersArray = window.createSimmiliarOffer(OFFERS_NUMBER);
  window.dataArray = offersArray;

  var activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.pin.renderSimmiliarOffers(offersArray);
    window.pin.addListeners(offersArray);
    window.form.activate();

    mapPinMain.removeEventListener('mouseup', onMapPinMainClick);
    mapPinMain.removeEventListener('keydown', onMapPinMainKeydown);

    window.form.addEvtListeners();
  };

  var resetState = function () {
    window.form.deactivate();

    mapPinMain.addEventListener('mouseup', onMapPinMainClick);
    mapPinMain.addEventListener('keydown', onMapPinMainKeydown);

    window.form.removeEvtListeners();
  };

  resetState();

  // window.showAdDetails = function (num) {
  //   showPopup(getAdDetails(offersArray[num]));
  // };

  // adPins.addEventListener('click', showAdDetails);

})();
