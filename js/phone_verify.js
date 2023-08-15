const countDownEl = document.getElementById('calc-phone-time');
const calcPhoneText = document.getElementById('calc-phone-link');
const calcPhoneLink = document.querySelector('.phone-link');

function intervalForSms() {
  let time = 299;

  let myTimer = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    countDownEl.innerHTML = `${minutes}:${seconds}`;
    time--;

    if (minutes == '0' & seconds == '00') {
      calcPhoneText.style.display = 'none';
      calcPhoneLink.style.display = 'block';
      clearInterval(myTimer);
    };
  }
};
intervalForSms();

calcPhoneLink.addEventListener('click', () => {
  calcPhoneText.style.display = 'block';
  calcPhoneLink.style.display = 'none';
  setInterval(intervalForSms(), 1000);
});
