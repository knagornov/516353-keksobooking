'use strict';

(function () {
  var draggedPhoto;
  var draggedPhotoURL;

  window.form.photosContainer.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedPhoto = evt.target;
      draggedPhotoURL = draggedPhoto.src;
    }
  });

  window.form.photosContainer.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  window.form.photosContainer.addEventListener('drop', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img' &&
        evt.target !== draggedPhoto) {
      draggedPhoto.src = evt.target.src;
      evt.target.src = draggedPhotoURL;
    }

    evt.preventDefault();
  });
})();
