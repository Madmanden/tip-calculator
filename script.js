//// Variables init
let billAmount = null;
let totalAmount = null;
let tipAmount = null;
let tipDecimal = null;
let tipPercent = null;
let numberOfPeople = null;

// Bill input
const bill = document.querySelector(".bill-area__amount-input");

bill.addEventListener("change", () => {
  billAmount = parseInt(bill.value);
  runMath();
});

// Tip amount buttons
const tipButtons = document.querySelectorAll(".tip-amount");

function removeAllActive() {
  tipButtons.forEach((button) => {
    button.classList.remove("active");
  });
}

tipButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (button.classList.contains("active")) {
      button.classList.remove("active");
      tipPercent = null;
    } else {
      removeAllActive();
      button.classList.add("active");
      tipPercent = parseInt(button.dataset.tipvalue);
      runMath();
    }
  });
});

// Custom tip input
const customInput = document.querySelector(".custom-tip");

customInput.addEventListener("change", () => {
  tipPercent = parseInt(customInput.value);
  runMath();
});

// Number of people
const numberOfPeopleEl = document.querySelector(".number-people-area__input");

numberOfPeopleEl.addEventListener("change", (event) => {
  numberOfPeople = parseInt(numberOfPeopleEl.value);
  runMath();
});

// Reset button
const reset = document.querySelector(".btn-reset");
reset.addEventListener("click", () => {
  billAmount = null;
  totalAmount = null;
  tipAmount = null;
  tipDecimal = null;
  tipPercent = null;
  numberOfPeople = null;
  tipPerPerson = null;
  totalPerPerson = null;
  bill.value = "";
  customInput.value = "";
  numberOfPeopleEl.value = "";
  tipPerPersonEl.innerText = "$0.00";
  totalPerPersonEl.innerText = "$0.00";
});

// UI elements to update tip/total amount per person
const tipPerPersonEl = document.querySelector(
  ".tip-wrapper__tip-amount-per-person"
);
const totalPerPersonEl = document.querySelector(
  ".tip-wrapper__total-amount-per-person"
);

//////////// CALC LOGIC ////////////
function runMath() {
  // Check if number of people is 0, if so, make the border red to indicate an error
  if (numberOfPeople === 0) {
    numberOfPeopleEl.classList.add("error");
  } else {
    numberOfPeopleEl.classList.remove("error");
  }

  // If all inputs are filled, run the math
  if (billAmount && tipPercent && numberOfPeople) {
    tipDecimal = tipPercent / 100 + 1;
    totalAmount = billAmount * tipDecimal;
    tipAmount = tipDecimal * billAmount - billAmount;
    let tipPerPerson = tipAmount / numberOfPeople;
    let totalPerPerson = totalAmount / numberOfPeople;

    tipPerPersonEl.innerText = `$${tipPerPerson.toFixed()}`;
    totalPerPersonEl.innerText = `$${totalPerPerson.toFixed()}`;
  }
}
