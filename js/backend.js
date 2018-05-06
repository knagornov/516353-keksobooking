'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';

  var Code = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  };

  window.backend = {
    load: function (onLoad, onError) {
      var errorMessage = 'Не удалось получить информацию о похожих объявлениях.';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case Code.SUCCESS:
            onLoad(xhr.response);
            break;
          case Code.BAD_REQUEST:
            onError(errorMessage + ' Неверный запрос. Статус ответа: '
                + xhr.status + '.');
            break;
          case Code.NOT_FOUND:
            onError(errorMessage + ' Нужный ресурс не найден. Статус ответа: '
                + xhr.status + '.');
            break;
          default:
            onError(errorMessage + ' Cтатус ответа: ' + xhr.status + ' '
                + xhr.statusText + '.');
        }
      });

      xhr.addEventListener('error', function () {
        onError(errorMessage + ' Произошла ошибка соединения.');
      });
      xhr.addEventListener('timeout', function () {
        onError(errorMessage + ' Время ожидания ответа сервера превысило '
            + xhr.timeout + 'мс.');
      });

      xhr.timeout = 10000;

      xhr.open('GET', LOAD_URL);
      xhr.send();
    },

    upload: function (data, onLoad, onError) {
      var errorMessage = 'Не удалось отправить информацию.';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case Code.SUCCESS:
            onLoad(xhr.response);
            break;
          case Code.INTERNAL_SERVER_ERROR:
            onError(errorMessage + ' Внутренняя ошибка сервера. Статус ответа: '
                + xhr.status + '.');
            break;
          default:
            onError(errorMessage + ' Cтатус ответа: ' + xhr.status + ' '
                + xhr.statusText + '.');
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.open('POST', UPLOAD_URL);
      xhr.send(data);
    }
  };
})();
