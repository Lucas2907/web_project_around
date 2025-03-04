const showInputError = (formElement, formInput, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, formInput, settings) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

const hideAllInputErrors = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  inputList.forEach((formInput) => {
    hideInputError(formElement, formInput, settings);
  });
};

const isValid = (formElement, formInput, settings) => {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage, settings);
  } else {
    hideInputError(formElement, formInput, settings);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  inputList.forEach((formInput) => {
    formInput.addEventListener("input", () => {
      isValid(formElement, formInput, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const resetButtonState = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
};

enableValidation({
  formSelector: ".popup__forms-profile",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button-inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
});

enableValidation({
  formSelector: ".popup__forms-creation",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button-inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
});
