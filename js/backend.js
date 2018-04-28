'use strict';

(function () {
  var loadURL = 'https://js.dump.academy/keksobooking/data';
  var uploadURL = 'https://js.dump.academy/keksobooking';

  window.backend = {
    load: function (onLoad, onError) {
      var errorMessage = 'Не удалось получить информацию о похожих объявлениях.';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          case 400:
            onError(errorMessage + ' Неверный запрос. Статус ответа: '
                + xhr.status + '.');
            break;
          case 404:
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

      xhr.open('GET', loadURL);
      xhr.send();
    },

    upload: function (data, onLoad, onError) {
      var errorMessage = 'Не удалось отправить информацию.';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          case 500:
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

      xhr.open('POST', uploadURL);
      xhr.send(data);
    }
  };
})();
