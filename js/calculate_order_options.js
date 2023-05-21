// Перебор контейнеров с услугами, применение к ним расстановки для стилистики
const formsetContainers = document.querySelectorAll('.calc-formset__form-container');

formsetContainers.forEach((item) => {
  const formsetTitle = item.querySelector('.calc-formset__option-title');
  const formsetOptions = item.querySelector('.payment_months-wrapper');
  const formsetOptionsPrice = item.querySelector('.calc__total');
  const formsetDescriptions = item.querySelector('#calc__description');

  formsetOptionsPrice.before(formsetTitle);
  formsetDescriptions.before(formsetOptions);
});
