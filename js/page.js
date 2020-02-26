'use strict';

(function () {
  var OFFERS_NUMBER = 8;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');

  var onMapPinMainClick = function (evt) {
    window.util.isLeftBtnEvent(evt, activatePage);
  };

  var onMapPinMainKeydown = function (evt) {
    window.util.isEnterEvent(evt, activatePage);
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.renderSimmiliarOffers(window.createSimmiliarOffer(OFFERS_NUMBER));
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
})();
