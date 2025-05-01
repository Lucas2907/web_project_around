export default class Popup {
  constructor(selector) {
    this._selector = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._isMouseDownInsidePopup = false;

    //variables to name class
    this._openedClass = "popup_opened";
    this._closeButtonClass = "popup__close-button";
  }

  open() {
    document.addEventListener("keydown", this._handleEscClose);
    this._selector.classList.add(this._openedClass);
  }

  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._selector.classList.remove(this._openedClass);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._selector.addEventListener("click", (evt) => {
      if (evt.target.classList.contains(this._closeButtonClass)) {
        this.close();
      }
    });

    this._selector.addEventListener("mousedown", (evt) => {
      if (evt.target === this._selector) {
        this._isMouseDownInsidePopup = true;
      }
    });

    this._selector.addEventListener("mouseup", (evt) => {
      if (this._isMouseDownInsidePopup && evt.target === this._selector) {
        if (this._selector.classList.contains(this._openedClass)) {
          this.close();
        }
      }
      this._isMouseDownInsidePopup = false;
    });
  }
}
