import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);
    this._form = this._selector.querySelector(".popup__forms");
    this._handleDeleteCard = null;
  }

  setHandleDeleteCard(callback) {
    this._handleDeleteCard = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      if (this._handleDeleteCard) {
        evt.preventDefault();
        this._handleDeleteCard();
      }

      this.close();
    });
  }
}
