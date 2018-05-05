'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  window.uploadImage = function (fileChooser, preview) {
    var file = fileChooser.files[0];

    if (!file) {
      return;
    }

    if (!preview) {
      preview = window.form.createPreview();
    }

    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };
})();
