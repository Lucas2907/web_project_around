export default class FormValidator {
  constructor({ config, formSelector }) {
    this._config = config;
    this._formSelector = formSelector;
  }

  //Form SetEventListeners
  _setEventListeners() {
    this._inputList.forEach((formInput) => {
      formInput.addEventListener("input", () => {
        this._isValid(this._form, formInput, this._config);
        this._toggleButtonState(
          this._inputList,
          this._buttonElement,
          this._config
        );
      });
    });
  }

  _getForm() {
    return document.querySelector(this._formSelector);
  }

  // selects elements to be validated
  enableValidation() {
    this._form = this._getForm();
    this._inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._form.querySelector(
      this._config.submitButtonSelector
    );
    this._setEventListeners();
  }

  //valide the inputs
  _isValid(form, input, config) {
    if (!input.validity.valid) {
      this._showInputError(form, input, input.validationMessage, config);
    } else {
      this._hideInputError(form, input, config);
    }
  }

  // checks for any invalid input
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //show input error
  _showInputError(form, input, errorMessage, config) {
    this._errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    this._errorElement.textContent = errorMessage;
  }

  //hide input error
  _hideInputError(form, input, config) {
    this._errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    this._errorElement.textContent = "";
  }

  //hide all input errors
  _hideAllInputErrors = (formElement, config) => {
    this._inputList.forEach((formInput) => {
      this._hideInputError(formElement, formInput, config);
    });
  };

  //change button state valid/ invalid
  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._config.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  //reset button state
  _resetButtonState = () => {
    this._toggleButtonState(this._inputList, this._buttonElement);
  };

  //reset form
  resetFormsOnClose() {
    this._form.reset();
    this._hideAllInputErrors(this._getForm(), this._config);
    this._resetButtonState();
  }
}
