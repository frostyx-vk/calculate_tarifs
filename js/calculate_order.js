const calculateMatriculationBtnNext = document.querySelector('.calculate-matriculation__btn-next');
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

// логика расчета калькулятора с Зачислением

const formatter = new Intl.NumberFormat('ru');

const inputsWithEnroll = document.querySelectorAll('input');

const inputRangeWithEnroll = document.querySelector('#id_payment_months');

// элементы вывода информации на страницу калькулятора тарифа
const calcWithEnrollTotalPriceWithDiscount = document.querySelector('.calculate-matriculation__result-price');
const calcWithEnrollTotalPriceWithoutDiscount = document.querySelector('.calculate-matriculation__result-fullprice');
const calcWithEnrollTotalPriceDiscount = document.querySelector('.calculate-matriculation__result-discount');

const calcTotalPriceFormset = document.querySelector('.calc-formset__price-cost');

const calculateTotalPriceBlock = document.querySelector('.calc-formset__price-result');

// базовая цена в зависимости от выбранного калькулятора
let basePrice;
if (window.location.pathname.split('/').pop() === 'calculate_order.html') {
  basePrice = '8000';
  calcWithEnrollTotalPriceWithDiscount.innerText = formatter.format(Math.round(basePrice)) + ' ₽';
  // calcWithEnrollTotalPriceWithoutDiscount.innerText = formatter.format(Math.round(basePrice)) + ' ₽';
  // calculateTotalPriceBlock.innerText = formatter.format(Math.round(basePrice)) + ' ₽';
} else if (window.location.pathname.split('/').pop() === 'without-enroll.html') {
  basePrice = '7000';
  calcWithEnrollTotalPriceWithDiscount.innerText = formatter.format(Math.round(basePrice)) + ' ₽';
  // calcWithEnrollTotalPriceWithoutDiscount.innerText = formatter.format(Math.round(basePrice)) + ' ₽';
  // calculateTotalPriceBlock.innerText = formatter.format(Math.round(basePrice)) + ' ₽';
}

// calcTotalPriceFormset.innerText = formatter.format(Math.round(basePrice)) + ' ₽';

// кнопки смены
const inputsRadioShift = document.querySelectorAll('input[name="shift"]');
const inputRadioShiftOne = document.querySelector('#id_shift_0');
inputRadioShiftOne.dataset.value = 1;

const inputRadioShiftTwo = document.querySelector('#id_shift_1');
inputRadioShiftTwo.dataset.value = 0.9;

// кнопки класса
const inputsRadioGrade = document.querySelectorAll('input[name="grade"]');
const inputRadioGradeOne = document.querySelector('#id_grade_0');
const inputRadioGradeTwo = document.querySelector('#id_grade_1');
inputRadioGradeOne.dataset.value = 1;
inputRadioGradeTwo.dataset.value = 1.1;

// кнопка нивалидности
const inputCheckboxDisability = document.querySelector('#id_disability');
inputCheckboxDisability.dataset.value = 0.9;

let totalPriceTarif;

function calculateWithEnrollWithDiscount() {
  let totalPriceWithDiscount = basePrice * parseInt(inputRangeWithEnroll.value);

  if (inputRangeWithEnroll.value > 3) {
    totalPriceWithDiscount = basePrice * parseInt(inputRangeWithEnroll.value) * 0.95;
  };
  if (inputRangeWithEnroll.value > 6) {
    totalPriceWithDiscount = basePrice * parseInt(inputRangeWithEnroll.value) * 0.93;
  };

  for (const inputRadioShift of inputsRadioShift) {
    if (inputRadioShift.checked) {
      totalPriceWithDiscount = totalPriceWithDiscount * inputRadioShift.dataset.value;
 };
  };

  for (const inputRadioGrade of inputsRadioGrade) {
    if (inputRadioGrade.checked) {
      totalPriceWithDiscount = totalPriceWithDiscount * inputRadioGrade.dataset.value;
    };
  };

  if (inputCheckboxDisability.checked) {
    totalPriceWithDiscount = totalPriceWithDiscount * inputCheckboxDisability.dataset.value;
  }

  totalPriceTarif = totalPriceWithDiscount;
  calcWithEnrollTotalPriceWithDiscount.innerText = formatter.format(Math.round(totalPriceWithDiscount)) + ' ₽';
  // calcTotalPriceFormset.innerText = calcWithEnrollTotalPriceWithDiscount.innerText;
};

// function calculateWithEnrollWithoutDiscount() {
//   let totalPriceWithoutDiscount = basePrice * parseInt(inputRangeWithEnroll.value);

//   for (let i = 1; i < inputsRadioGrade.length; i++) {
//     if (inputsRadioGrade[1].checked) {
//       totalPriceWithoutDiscount = totalPriceWithoutDiscount + (markupForGrade * parseInt(inputRangeWithEnroll.value));
//     };
//   };

//   calcWithEnrollTotalPriceWithoutDiscount.innerText = formatter.format(totalPriceWithoutDiscount) + ' ₽';
// };

// function calculateWithEnrollDiscount() {
//   const totalPriceDiscount = calcWithEnrollTotalPriceWithoutDiscount.innerText.replace(/\D/g, '') - calcWithEnrollTotalPriceWithDiscount.innerText.replace(/\D/g, '');

//   calcWithEnrollTotalPriceDiscount.innerText = 'Скидка: ' + formatter.format(totalPriceDiscount) + ' ₽';
// };

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

      optionTotalPrice = thatOptionPrice * parseInt(inputRangeWithEnroll.value);
      thatCalcOptionsTotalPrice.innerText = formatter.format(optionTotalPrice) + ' ₽';

      const month = parseInt(inputRangeWithEnroll.value);
      if (month === 1) {
        thatCalcOptionsMonth.style.padding = '4px 12px';
        thatCalcOptionsMonth.innerText = parseInt(inputRangeWithEnroll.value) + ' месяц';
      } else if (month === 2 || month === 3 || month === 4) {
        thatCalcOptionsMonth.style.padding = '4px 12px';
        thatCalcOptionsMonth.innerText = parseInt(inputRangeWithEnroll.value) + ' месяца';
      } else if (month === 5 || month === 6 || month === 7 || month === 8 || month === 9) {
        thatCalcOptionsMonth.style.padding = '4px 12px';
        thatCalcOptionsMonth.innerText = parseInt(inputRangeWithEnroll.value) + ' месяцев';
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
  // calcTotalPriceOptioons.innerText = formatter.format(totalResultOptionsPrice) + ' ₽';
};

function calculateTotalPrice() {
  const calculateTotalPrice = totalPriceTarif + totalResultOptionsPrice;

  // calculateTotalPriceBlock.innerText = formatter.format(calculateTotalPrice) + ' ₽';
};

for (const input of inputsWithEnroll) {
  input.addEventListener('input', function() {
    calculateWithEnrollWithDiscount();
    // calculateWithEnrollWithoutDiscount();
    // calculateWithEnrollDiscount();
    calculateWithEnrollOptions();
    calculateTotalPrice();
  });
};
