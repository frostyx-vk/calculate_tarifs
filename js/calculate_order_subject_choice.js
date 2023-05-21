const inputSubjectOne = document.getElementById('id_subject1');
const inputSubjectTwo = document.getElementById('id_subject2');
const inputSubjectThree = document.getElementById('id_subject3');

function addSubjectToCalculate() {
  const calcaluteSubdectTwo = document.getElementById('subjects__two');
  const calcaluteSubdectTree = document.getElementById('subjects__three');
  const calcaluteAddSubdectBanner = document.querySelector('.calculate-subjects__banner');
  const calcaluteAddSubdectBtn = document.querySelector('.calculate-subjects__add-subject');

  const removeSubjectTwo = document.getElementById('remove-subjects__two');
  const removeSubjectThree = document.getElementById('remove-subjects__three');

  calcaluteAddSubdectBtn.addEventListener('click', function(event) {
    event.preventDefault();

    if (inputSubjectOne.value !== '') {
      calcaluteSubdectTwo.style.display = 'block';
    };
    if (inputSubjectTwo.value !== '') {
      calcaluteSubdectTree.style.display = 'block';
      removeSubjectTwo.style.display = 'none';
    };
    if (inputSubjectThree.value !== '') {
      calcaluteAddSubdectBanner.style.display = 'block';
      calcaluteAddSubdectBtn.style.display = 'none';
    };
  });

  removeSubjectTwo.addEventListener('click', function() {
    calcaluteSubdectTwo.style.display = 'none';
    inputSubjectTwoMaterial.value = '';
  });

  removeSubjectThree.addEventListener('click', function() {
    calcaluteSubdectTree.style.display = 'none';
    removeSubjectTwo.style.display = 'block';
    calcaluteAddSubdectBanner.style.display = 'none';
    calcaluteAddSubdectBtn.style.display = 'flex';
    inputSubjectThreeMaterial.value = '';
  });
}
addSubjectToCalculate();

function twoPageCalcModal() {
  const calculateMatriculationBtnNext = document.querySelector('#subject__btn-hidden');
  const calculateMatriculationBtnBack = document.querySelector('.calculate-matriculation__btn-back');

  const calculateMatriculationDopOption = document.querySelector('.calculate-matriculation__dop-option');
  const calculateMatriculationBox = document.querySelector('.calculate-matriculation__form');
  const calculateMatriculationTitle = document.querySelector('.calculate-matriculation__title');

  calculateMatriculationBtnNext.addEventListener('click', function(event) {
    event.preventDefault();
    calculateMatriculationTitle.style.display = 'none';
    calculateMatriculationBox.classList.add('proba');
    calculateMatriculationDopOption.style.display = 'block';
  });

  calculateMatriculationBtnBack.addEventListener('click', function(event) {
    event.preventDefault();
    calculateMatriculationTitle.style.display = 'block';
    calculateMatriculationBox.classList.remove('proba');
    calculateMatriculationDopOption.style.display = 'none';
  });
}
twoPageCalcModal();

const subjectBtnHidden = document.getElementById('subject__btn-hidden');

const inputSubjectOneMaterial = new mdc.select.MDCSelect(document.querySelector('#subjects__one .mdc-select'));
const inputSubjectTwoMaterial = new mdc.select.MDCSelect(document.querySelector('#subjects__two .mdc-select'));
const inputSubjectThreeMaterial = new mdc.select.MDCSelect(document.querySelector('#subjects__three .mdc-select'));

inputSubjectOneMaterial.listen('MDCSelect:change', () => {
  if (inputSubjectOneMaterial.value !== '') {
    subjectBtnHidden.classList.add('calculate-matriculation__btn-next');
    subjectBtnHidden.removeAttribute('disabled');
  } else if (inputSubjectOneMaterial.value === '') {
    subjectBtnHidden.classList.remove('calculate-matriculation__btn-next');
    subjectBtnHidden.disabled = true;
  };
});

// логика расчета калькулятора Предметный
const formatter = new Intl.NumberFormat('ru');

const inputsSubjectCalc = document.querySelectorAll('input');

const inputRangeSubject = document.querySelector('#id_payment_months');

// элементы вывода информации на страницу
const calcSubjectTotalPriceWithDiscount = document.querySelector('.calculate-matriculation__result-price');
const calcSubjectTotalPriceWithoutDiscount = document.querySelector('.calculate-matriculation__result-fullprice');
const calcSubjectTotalPriceDiscount = document.querySelector('.calculate-matriculation__result-discount');

const calcTotalPriceFormset = document.querySelector('.calc-formset__price-cost');

const calculateTotalPriceBlock = document.querySelector('.calc-formset__price-result');

// получение скидки в переменную из JSON формата
const discountsElement = document.getElementById('prices-discounts');
const discounts = JSON.parse(discountsElement.getAttribute('data-discounts'));

// получение базовой цены данных с бэка и назначение её на атрибуты
const basePriceFromBackendData = document.getElementById('prices-discounts');
const basePriceFromBackend = basePriceFromBackendData.dataset.price;
console.log(parseInt(basePriceFromBackend));

inputSubjectOne.dataset.value = basePriceFromBackend;
inputSubjectTwo.dataset.value = basePriceFromBackend;
inputSubjectThree.dataset.value = basePriceFromBackend;

// скидка от 4 до 6 месяцев
let fourSixMonthsDiscount;
for (const discount of discounts) {
  if (discount.fields.tag === 'four-six-months') {
    fourSixMonthsDiscount = discount.fields.percentage_value ? discount.fields.percentage_value : discount.fields.fixed_value;
  }
};

// скидка от 7 до 9 месяцев
let sevenNineMonthsDiscount;
for (const discount of discounts) {
  if (discount.fields.tag === 'seven-nine-months') {
    sevenNineMonthsDiscount = discount.fields.percentage_value ? discount.fields.percentage_value : discount.fields.fixed_value;
  }
};

// скидка 10% на инвалидность
let tenDisabilityDiscount;
for (const discount of discounts) {
  if (discount.fields.tag === 'disability') {
    tenDisabilityDiscount = discount.fields.percentage_value ? discount.fields.percentage_value : discount.fields.fixed_value;
  }
};

// кнопка нивалидности
const inputCheckboxDisability = document.querySelector('#id_disability');
inputCheckboxDisability.dataset.value = 0.9;

let basePrice = 0;
calcSubjectTotalPriceWithDiscount.innerText = basePrice;

let totalPriceTarif;

// Расчет предметного калькулятора со скидкой
function calculateWithEnrollWithDiscount() {
  let totalPriceWithDiscount = basePrice * parseInt(inputRangeSubject.value);

  inputSubjectOneMaterial.listen('MDCSelect:change', () => {
    if (inputSubjectOneMaterial.value !== '') {
      basePrice = parseInt(inputSubjectOne.dataset.value);
      checkDiscount();
      calcSubjectTotalPriceWithDiscount.innerText = formatter.format(Math.round(totalPriceWithDiscount)) + ' ₽';
      calcTotalPriceFormset.innerText = formatter.format(Math.round(totalPriceWithDiscount)) + ' ₽';
      calculateTotalPriceBlock.innerText = formatter.format(Math.round(totalPriceWithDiscount)) + ' ₽';
    };
    if (inputSubjectOneMaterial.value === '') {
      basePrice = 0;
      checkDiscount();
      calcSubjectTotalPriceWithDiscount.innerText = formatter.format(Math.round(totalPriceWithDiscount)) + ' ₽';
      calcTotalPriceFormset.innerText = formatter.format(Math.round(totalPriceWithDiscount)) + ' ₽';
      calculateTotalPriceBlock.innerText = formatter.format(Math.round(totalPriceWithDiscount)) + ' ₽';
    };
  });

  inputSubjectTwoMaterial.listen('MDCSelect:change', () => {
    if (inputSubjectTwoMaterial.value !== '') {
      basePrice = parseInt(inputSubjectOne.dataset.value) + parseInt(inputSubjectTwo.dataset.value);
      checkDiscount();
      calcSubjectTotalPriceWithDiscount.innerText = formatter.format(Math.round(totalPriceWithDiscount)) + ' ₽';
      calcTotalPriceFormset.innerText = formatter.format(Math.round(totalPriceWithDiscount)) + ' ₽';
      calculateTotalPriceBlock.innerText = formatter.format(Math.round(totalPriceWithDiscount)) + ' ₽';
    };
    if (inputSubjectTwoMaterial.value === '') {
      basePrice = parseInt(inputSubjectOne.dataset.value);
      checkDiscount();
      calcSubjectTotalPriceWithDiscount.innerText = formatter.format(Math.round(totalPriceWithDiscount)) + ' ₽';
      calcTotalPriceFormset.innerText = formatter.format(Math.round(totalPriceWithDiscount)) + ' ₽';
      calculateTotalPriceBlock.innerText = formatter.format(Math.round(totalPriceWithDiscount)) + ' ₽';
    };
  });

  inputSubjectThreeMaterial.listen('MDCSelect:change', () => {
    if (inputSubjectThreeMaterial.value !== '') {
      basePrice = parseInt(inputSubjectOne.dataset.value) + parseInt(inputSubjectTwo.dataset.value) + parseInt(inputSubjectThree.dataset.value);
      checkDiscount();
      calcSubjectTotalPriceWithDiscount.innerText = formatter.format(Math.round(totalPriceWithDiscount)) + ' ₽';
      calcTotalPriceFormset.innerText = formatter.format(Math.round(totalPriceWithDiscount)) + ' ₽';
      calculateTotalPriceBlock.innerText = formatter.format(Math.round(totalPriceWithDiscount)) + ' ₽';
    };
    if (inputSubjectThreeMaterial.value === '') {
      basePrice = parseInt(inputSubjectOne.dataset.value) + parseInt(inputSubjectTwo.dataset.value);
      checkDiscount();
      calcSubjectTotalPriceWithDiscount.innerText = formatter.format(Math.round(totalPriceWithDiscount)) + ' ₽';
      calcTotalPriceFormset.innerText = formatter.format(Math.round(totalPriceWithDiscount)) + ' ₽';
      calculateTotalPriceBlock.innerText = formatter.format(Math.round(totalPriceWithDiscount)) + ' ₽';
    };
  });

  function checkDiscount() {
    if (inputRangeSubject.value < 4) {
      totalPriceWithDiscount = basePrice * parseInt(inputRangeSubject.value);
    };
    if (inputRangeSubject.value > 3) {
      totalPriceWithDiscount = basePrice * parseInt(inputRangeSubject.value) * (1 - fourSixMonthsDiscount / 100);
    };
    if (inputRangeSubject.value > 6) {
      totalPriceWithDiscount = basePrice * parseInt(inputRangeSubject.value) * (1 - sevenNineMonthsDiscount / 100);
    };
    if (inputCheckboxDisability.checked) {
      totalPriceWithDiscount = totalPriceWithDiscount * (1 - tenDisabilityDiscount / 100);
    }
  };
  checkDiscount();

  totalPriceTarif = totalPriceWithDiscount;

  calcSubjectTotalPriceWithDiscount.innerText = formatter.format(Math.round(totalPriceWithDiscount)) + ' ₽';
  calcTotalPriceFormset.innerText = formatter.format(Math.round(totalPriceWithDiscount)) + ' ₽';
};
calculateWithEnrollWithDiscount();

// Расчет предметного калькулятора без скидки
function calculateWithEnrollWithoutDiscount() {
  let totalPriceWithoutDiscount = basePrice * parseInt(inputRangeSubject.value);

  inputSubjectOneMaterial.listen('MDCSelect:change', () => {
    if (inputSubjectOneMaterial.value !== '') {
      basePrice = parseInt(inputSubjectOne.dataset.value);
      recalculation();
      calcSubjectTotalPriceWithoutDiscount.innerText = formatter.format(Math.round(totalPriceWithoutDiscount)) + ' ₽';
    };
    if (inputSubjectOneMaterial.value === '') {
      basePrice = 0;
      recalculation();
      calcSubjectTotalPriceWithoutDiscount.innerText = formatter.format(Math.round(totalPriceWithoutDiscount)) + ' ₽';
    };
  });

  inputSubjectTwoMaterial.listen('MDCSelect:change', () => {
    if (inputSubjectTwoMaterial.value !== '') {
      basePrice = parseInt(inputSubjectOne.dataset.value) + parseInt(inputSubjectTwo.dataset.value);
      recalculation();
      calcSubjectTotalPriceWithoutDiscount.innerText = formatter.format(Math.round(totalPriceWithoutDiscount)) + ' ₽';
    };
    if (inputSubjectTwoMaterial.value === '') {
      basePrice = parseInt(inputSubjectOne.dataset.value);
      recalculation();
      calcSubjectTotalPriceWithoutDiscount.innerText = formatter.format(Math.round(totalPriceWithoutDiscount)) + ' ₽';
    };
  });

  inputSubjectThreeMaterial.listen('MDCSelect:change', () => {
    if (inputSubjectThreeMaterial.value !== '') {
      basePrice = parseInt(inputSubjectOne.dataset.value) + parseInt(inputSubjectTwo.dataset.value) + parseInt(inputSubjectThree.dataset.value);
      recalculation();
      calcSubjectTotalPriceWithoutDiscount.innerText = formatter.format(Math.round(totalPriceWithoutDiscount)) + ' ₽';
    };
    if (inputSubjectThreeMaterial.value === '') {
      basePrice = parseInt(inputSubjectOne.dataset.value) + parseInt(inputSubjectTwo.dataset.value);
      recalculation();
      calcSubjectTotalPriceWithoutDiscount.innerText = formatter.format(Math.round(totalPriceWithoutDiscount)) + ' ₽';
    };
  });

  function recalculation() {
    totalPriceWithoutDiscount = basePrice * parseInt(inputRangeSubject.value);
  };

  calcSubjectTotalPriceWithoutDiscount.innerText = formatter.format(Math.round(totalPriceWithoutDiscount)) + ' ₽';
}
calculateWithEnrollWithoutDiscount();

// Расчет скидки
function calculateWithEnrollDiscount() {
  let totalPriceDiscount = calcSubjectTotalPriceWithoutDiscount.innerText.replace(/\D/g, '') - calcSubjectTotalPriceWithDiscount.innerText.replace(/\D/g, '');

  calcSubjectTotalPriceDiscount.innerText = 'Скидка: ' + formatter.format(totalPriceDiscount) + ' ₽';
};

calculateWithEnrollDiscount();

// расчет услуг
const formsetOptionsContainers = document.querySelectorAll('.payment_months-wrapper input');

let optionTotalPrice = 0;
let totalResultOptionsPrice;

function calculateWithEnrollOptions() {
  for (const formsetOptionContainer of formsetOptionsContainers) {
    if (formsetOptionContainer.checked) {
      const container = formsetOptionContainer.closest('.calc-formset__form-container-wrapper');
      const calcPrice = container?.querySelector('#calc__price');
      const thatCalcOptionsTotalPrice = container?.querySelector('.calc-formset__result-total');
      const thatCalcOptionsMonth = container?.querySelector('.calc-formset__result-month');
      const thatOptionPrice = parseInt(calcPrice.innerText.replace(/\s+/g, ''));

      optionTotalPrice = thatOptionPrice * parseInt(inputRangeSubject.value);
      thatCalcOptionsTotalPrice.innerText = formatter.format(optionTotalPrice) + ' ₽';

      const month = parseInt(inputRangeSubject.value);
      if (month === 1) {
        thatCalcOptionsMonth.style.padding = '4px 12px';
        thatCalcOptionsMonth.innerText = parseInt(inputRangeSubject.value) + ' месяц';
      } else if (month === 2 || month === 3 || month === 4) {
        thatCalcOptionsMonth.style.padding = '4px 12px';
        thatCalcOptionsMonth.innerText = parseInt(inputRangeSubject.value) + ' месяца';
      } else if (month === 5 || month === 6 || month === 7 || month === 8 || month === 9) {
        thatCalcOptionsMonth.style.padding = '4px 12px';
        thatCalcOptionsMonth.innerText = parseInt(inputRangeSubject.value) + ' месяцев';
      };
    };
    if (formsetOptionContainer.checked === false) {
      const container = formsetOptionContainer.closest('.calc-formset__form-container-wrapper');
      const thatCalcOptionsTotalPrice = container?.querySelector('.calc-formset__result-total');
      const thatCalcOptionsMonth = container?.querySelector('.calc-formset__result-month');

      optionTotalPrice = 0;
      thatCalcOptionsTotalPrice.innerText = `${optionTotalPrice} ₽`;
      thatCalcOptionsMonth.innerText = '';
      thatCalcOptionsMonth.style.padding = '0';
    }
  };

  // вывод общей цены за услуги
  const allCalcOptionsTotalPrice = [...document.querySelectorAll('.calc-formset__result-total')];
  totalResultOptionsPrice = allCalcOptionsTotalPrice.reduce((partialSum, a) => partialSum + parseInt(a.innerText.replace(/\s+/g, '')), 0);

  const calcTotalPriceOptioons = document.querySelector('.calc-formset__price-options');
  calcTotalPriceOptioons.innerText = formatter.format(totalResultOptionsPrice) + ' ₽';
};

function calculateTotalPrice() {
  const calculateTotalPrice = totalPriceTarif + totalResultOptionsPrice;

  calculateTotalPriceBlock.innerText = formatter.format(calculateTotalPrice) + ' ₽';
};

for (const input of inputsSubjectCalc) {
  input.addEventListener('input', function() {
    calculateWithEnrollWithDiscount();
    calculateWithEnrollWithoutDiscount();
    calculateWithEnrollDiscount();
    calculateWithEnrollOptions();
    calculateTotalPrice();
  });
}
