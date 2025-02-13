
const formElement = document.querySelector(".popup__forms");
const formInput = formElement.querySelector(".popup__input");

const showInputError = (formElement, formInput, errorMessage) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add("popup__forms_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

const hideInputError = (formElement, formInput) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove("popup__forms_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

const isValid = (formElement, formInput) => {
  if (!formInput.validity.valid || formInput.value.trim() === "") {
    showInputError(formElement, formInput, formInput.validationMessage || "Campo obrigatório");
  } else {
    hideInputError(formElement, formInput);
  }
};

const validateFormOnLoad = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  inputList.forEach((formInput) => {
    isValid(formElement, formInput);
  });
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  inputList.forEach((formInput) => {
    formInput.addEventListener("input", () => {
      isValid(formElement, formInput);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__forms"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
    validateFormOnLoad(formElement);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid || inputElement.value.trim() === "";
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button-inactive");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__button-inactive");
    buttonElement.disabled = false;
  }
};

enableValidation();
