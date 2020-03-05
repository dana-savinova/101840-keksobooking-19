'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');

  var activatePage = function () {
    window.isPageActive = true;
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.activate();
    window.form.setAddress(window.util.getMapPinCoordinates(mapPinMain));
    window.form.addEvtListeners();
  };

  var resetState = function () {
    window.isPageActive = false;
    window.data = null;
    window.form.deactivate();
    window.form.removeEvtListeners();

    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
  };

  resetState();

  window.page = {
    activate: activatePage,
    deactivate: resetState
  };
})();
