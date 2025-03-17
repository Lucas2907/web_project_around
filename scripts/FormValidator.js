export default class FormValidator {
  constructor({ config, formSelector }) {
    this._config = config;
    this._formSelector = formSelector;
  }

  //manipuladores de evento de formulário
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
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  //pega template formulário
  _getForm() {
    return document.querySelector(this._formSelector);
  }

  //seleciona elementos a serem validados
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

  //valida os inputs
  _isValid(form, input, config) {
    if (!input.validity.valid) {
      this._showInputError(form, input, input.validationMessage, config);
    } else {
      this._hideInputError(form, input, config);
    }
  }

  //verifica se a algum input inválido
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //mostra erro do input
  _showInputError(form, input, errorMessage, config) {
    this._errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    this._errorElement.textContent = errorMessage;
  }

  //esconde erro do input
  _hideInputError(form, input, config) {
    this._errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    this._errorElement.textContent = "";
  }

  //esconde todos os inputs de erro
  _hideAllInputErrors = (formElement, config) => {
    this._inputList.forEach((formInput) => {
      this._hideInputError(formElement, formInput, config);
    });
  };

  //altera botão submit ativado/desativado
  _toggleButtonState = (inputList, buttonElement, config) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  //reseta estado do botão
  _resetButtonState = (config) => {
    this._toggleButtonState(this._inputList, this._buttonElement, config);
  };

  //reseta formulario
  resetFormsOnClose() {
    this._getForm().reset();
    this._hideAllInputErrors(this._getForm(), this._config);
    this._resetButtonState(this._config);
  }
}
