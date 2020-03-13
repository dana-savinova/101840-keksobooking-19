'use strict';
(function () {
  var Url = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking'
  };
  var responseToCode = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVICE_UNAVAILABLE: 503,
  };

  var DataExchangeFormat = {
    JSON: 'json'
  };

  var TIMEOUT = 10000; // 10 cекунд

  var dataDownload = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = DataExchangeFormat.JSON;

    addXhrListener(xhr, onSuccess, onError);
    xhr.open('GET', Url.GET);
    xhr.send();
  };

  var dataUpload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = DataExchangeFormat.JSON;

    addXhrListener(xhr, onSuccess, onError);
    xhr.open('POST', Url.POST);
    xhr.send(data);
  };

  var addXhrListener = function (xhr, action, errorAction) {
    xhr.addEventListener('load', function () {
      var errorMessage;
      switch (xhr.status) {
        case responseToCode.SUCCESS:
          action(xhr.response);
          break;
        case responseToCode.BAD_REQUEST:
          errorMessage = 'Неверный запрос на сервер. Пожалуйста, проверьте данные и повторите попытку снова';
          break;
        case responseToCode.UNAUTHORIZED:
          errorMessage = 'Вы не авторизованы. Пожалуйста, войдите в свой профиль и повторите попытку снова';
          break;
        case responseToCode.NOT_FOUND:
          errorMessage = 'Запрашиваемый ресурс не найден';
          break;
        case responseToCode.SERVICE_UNAVAILABLE:
          errorMessage = 'Сервис временно недоступен. Пожалуйста, зайдите позже';
          break;

        default:
          errorMessage = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (errorMessage) {
        errorAction(errorMessage);
        throw new Error('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorAction('Произошла ошибка соединения. Пожалуйста, проверьте свое подключение к Интернету и повторите попытку снова.');
    });

    xhr.addEventListener('timeout', function () {
      errorAction('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
  };

  window.server = {
    download: dataDownload,
    upload: dataUpload
  };
})();
