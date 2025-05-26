import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, { handleFormSubmit }) {
    super(selector);
    this._form = this._selector.querySelector(".popup__forms");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
  }
}
