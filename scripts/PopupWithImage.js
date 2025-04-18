import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._selector.querySelector(".popup-image__image");
    this._caption = this._selector.querySelector(".popup-image__text");
    console.log(this._image);
  }
  open(src, title) {
    this._image.src = src;
    this._image.alt = title;
    this._caption.textContent = title;
    super.open();
  }
}
