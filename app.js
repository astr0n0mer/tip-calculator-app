const form = document.querySelector(".js-form");
const billInput = document.querySelector(".js-bill");
const tipButtons = document.querySelectorAll(".js-tip-button");
const customTipInput = document.querySelector(".js-custom-tip");
const numberOfPeopleInput = document.querySelector(".js-number-of-people");

const tipPerPersonLabel = document.querySelector(".js-tip-per-person");
const totalPerPersonLabel = document.querySelector(".js-total-per-person");

const validateInput = (element, errorQuery, min) => {
  const value = element.valueAsNumber;

  let error = "";
  if (Number.isNaN(value)) error = "Invalid number";
  if (min >= 0 && value < 0) error = "Can't be negative";
  if (min > 0 && value === 0) error = "Can't be 0";

  const errorElement = document.querySelector(errorQuery);
  if (error) {
    errorElement.innerText = error;
    errorElement.classList.add("js-error--active");
    throw new Error(error);
  } else {
    errorElement.classList.remove("js-error--active");
  }
};

const clearTipButtons = () =>
  tipButtons.forEach((tipButton) => {
    tipButton.checked = false;
  });

const setInnerText = (element, text) => {
  const formatOptions = {
    currency: "USD",
    maximumFractionDigits: "2",
    style: "currency",
  };

  element.innerText = new Intl.NumberFormat("en-US", formatOptions).format(
    text
  );
};

const calculateTotalBillAndTip = () => {
  const bill = billInput.valueAsNumber;
  const tipPercentage =
    parseInt(form.elements.tip.value, 10) || customTipInput.valueAsNumber;
  const numberOfPeople = numberOfPeopleInput.valueAsNumber;

  if (
    Number.isNaN(bill) ||
    Number.isNaN(tipPercentage) ||
    Number.isNaN(numberOfPeople)
  ) {
    return;
  }

  const tipAmount = bill * (tipPercentage / 100);
  const totalAmount = bill + tipAmount;
  const tipPerPerson = tipAmount / numberOfPeople;
  const totalPerPerson = totalAmount / numberOfPeople;

  setInnerText(tipPerPersonLabel, tipPerPerson);
  setInnerText(totalPerPersonLabel, totalPerPerson);
};

billInput.addEventListener("keyup", () => {
  validateInput(billInput, ".js-bill-error", 0);
  calculateTotalBillAndTip();
});

tipButtons.forEach((tipButton) => {
  tipButton.addEventListener("click", () => {
    document
      .querySelector(".js-tip-error")
      .classList.remove("js-error--active");
    calculateTotalBillAndTip();
  });
});

customTipInput.addEventListener("keyup", () => {
  validateInput(customTipInput, ".js-tip-error", 0);
  calculateTotalBillAndTip();
});

customTipInput.addEventListener("focus", () => {
  clearTipButtons();
  customTipInput.dispatchEvent("keyup");
});

numberOfPeopleInput.addEventListener("keyup", () => {
  validateInput(numberOfPeopleInput, ".js-number-of-people-error", 1);
  calculateTotalBillAndTip();
});
