"use strict";

const inputBill = document.querySelector("#bill");
const tipPercentage = document.querySelectorAll(".tip--amount");
const tipCustom = document.querySelector("#tip-custom");
const numOfPeople = document.querySelector("#number-people");
const errText = document.querySelector(".error-message");
const displayTip = document.querySelector("#display-tip");
const displayTotal = document.querySelector("#display-total");
const resetButton = document.querySelector(".reset-btn");

let tipValue = "";
let billValue = "";
let current;
let peopleValue = "";

inputBill.addEventListener("input", () => {
  activate();
  billValue = +inputBill.value;
  calculation();
});

numOfPeople.addEventListener("input", () => {
  peopleValue = +numOfPeople.value;
  calculation();
});

tipPercentage.forEach((perc) => {
  perc.addEventListener("click", (e) => {
    // current = e.target;
    // console.log(current);
    // current.parentElement.style.backgroundColor = "blue";
    tipValue = +e.target.value / 100;

    calculation();
  });
});

tipCustom.addEventListener("input", () => {
  tipValue = +tipCustom.value / 100;

  calculation();
});

const calculation = function () {
  if (peopleValue !== "" && tipValue !== "" && billValue !== "") {
    const tipPerPerson = (tipValue * billValue) / peopleValue;
    const totalPerPerson = billValue / peopleValue + tipPerPerson;

    displayTip.textContent = `$${tipPerPerson.toFixed(2)}`;
    displayTotal.textContent = `$${totalPerPerson.toFixed(2)}`;
  }

  if (numOfPeople.value < 1 && inputBill.value !== "") {
    showError();
  } else {
    removeError();
  }
};

// DISABLE BUTTON
function disable() {
  resetButton.disabled = true;
  resetButton.classList.remove("active");
  resetButton.classList.add("disabled");
}

// ACTIVATE BUTTON
function activate() {
  resetButton.disabled = false;
  resetButton.classList.remove("disabled");
  resetButton.classList.add("active");
}

function showError() {
  numOfPeople.classList.add("error");
  errText.style.opacity = 100;
}

function removeError() {
  numOfPeople.classList.remove("error");
  errText.style.opacity = 0;
}

// RESET BUTTON //
resetButton.addEventListener("click", () => {
  tipValue = "";
  billValue = "";
  peopleValue = "";
  inputBill.value = "";
  tipCustom.value = "";
  numOfPeople.value = "";
  displayTip.textContent = "$0.00";
  displayTotal.textContent = "$0.00";
  disable();

  tipPercentage.forEach((amount) => {
    amount.checked = false;
  });
});
