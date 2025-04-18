export default class Card {
  constructor({ card, cardSelector, openPopupImage }) {
    this._card = card;
    this._text = card.name;
    this._link = card.link;
    this._openPopupImage = openPopupImage;
    this._cardSelector = cardSelector;
    console.log(openPopupImage);

    //general selectors
    this._popupImage = document.querySelector(".popup-image");
    this._popupImageText = document.querySelector(".popup-image__text");
    this._popImageSource = document.querySelector(".popup-image__image");
    this._popupSobrepositionImage = document.querySelector(
      ".popup-sobreposition"
    );
    this._closePopupImage = document.querySelector(
      ".popup__close-button_image"
    );
  }

  // Event Listeners
  _setEventListeners() {
    //add click event to card images
    this._cardImage.addEventListener("click", this._openPopupImage);


    // icon delete
    this._deleteIcon = this._cardElement.querySelector(".photos__delete-icon");
    this._deleteIcon.addEventListener("click", () => {
      this._cardElement.remove();
    });

    // icon like
    this._cardLike = this._cardElement.querySelector(".photos__like");
    this._cardLike.addEventListener("click", (evt) => {
      this._toggleLikeButtonState(evt);
    });
  }

  //open popup image
  _addImagePopup() {
    this._popupImage.classList.add("popup_opened");
    this._popupSobrepositionImage.classList.add("popup-sobreposition_opened");
  }

  //close popup image
  _removeImagePopup(image) {
    if (image) {
      this._popupImage.classList.remove("popup_opened");
      this._popupSobrepositionImage.classList.remove(
        "popup-sobreposition_opened"
      );
    }
    this._popupOpened = null;
  }

  //change the like button state
  _toggleLikeButtonState(evt) {
    let button = evt.currentTarget;
    if (button.src.includes("hearth.svg")) {
      button.src = "./images/Union.svg";
    } else {
      button.src = "./images/hearth.svg";
    }
    button.classList.toggle("clicked");
  }

  _getTemplate() {
    const template = document.querySelector(this._cardSelector).content;
    const card = template.querySelector(".photos__card").cloneNode(true);
    return card;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".photos__elements-text").textContent =
      this._text;
    this._cardImage = this._cardElement.querySelector(".photos__card-image");
    this._cardImage.setAttribute("src", this._card.link);
    this._cardImage.setAttribute("alt", this._text);
    this._setEventListeners();
    return this._cardElement;
  }
}
