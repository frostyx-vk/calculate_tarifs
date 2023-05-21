const inputDragAndDrop = document.querySelector('.dragable-uploader-widget__file');
const disabilityNextBtn = document.querySelector('#disability-next-btn');

inputDragAndDrop.required = true;

const dragableWidget = document.querySelector('.dragable-uploader-widget__file-info');
dragableWidget.onclick = function() {
  const target = event.target;
  if (target.tagName === 'path' || target.tagName === 'svg') {
    disabilityNextBtn.classList.remove('calculate__phone__btn-next');
  }
};

inputDragAndDrop.addEventListener('input', function() {
  if (inputDragAndDrop.value !== '') {
    disabilityNextBtn.classList.add('calculate__phone__btn-next');
  }
});
