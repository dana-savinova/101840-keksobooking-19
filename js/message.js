'use strict';
(function () {

  var createErrorMessage = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorButton = errorElement.querySelector('.error__button');

    errorButton.focus();
    errorElement.style.zIndex = 100;
    errorElement.querySelector('.error__message').textContent = errorMessage;

    // вставляем блок с ошибкой на страницу
    document.body.insertAdjacentElement('afterbegin', errorElement);

    errorButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      errorElement.remove();
    });

    var onDocumentKeydown = function (evt) {
      window.util.isEscEvent(evt, function () {
        removeErrorMessage();
      });
    };

    var removeErrorMessage = function () {
      errorElement.remove();
      document.removeEventListener('click', removeErrorMessage);
      document.removeEventListener('keydown', onDocumentKeydown);
    };

    document.addEventListener('click', removeErrorMessage);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  var createSuccessMessage = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', successElement);

    var onDocumentKeydown = function (evt) {
      window.util.actionIfEscEvent(evt, function () {
        removeSuccessMessage();
      });
    };

    var removeSuccessMessage = function () {
      successElement.remove();
      window.form.reset();
      document.removeEventListener('click', removeSuccessMessage);
      document.removeEventListener('keydown', onDocumentKeydown);
    };

    document.addEventListener('click', removeSuccessMessage);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  window.message = {
    error: createErrorMessage,
    success: createSuccessMessage
  };
})();
