export default class Card {
  constructor({
    card,
    cardSelector,
    openPopupImage,
    handleLikeCard,
    handleOpenConfirmation,
  }) {
    this._card = card;
    this._text = card.name;
    this._link = card.link;
    this._openPopupImage = openPopupImage;
    this._cardSelector = cardSelector;
    this._handleLikeCard = handleLikeCard;
    this._handleOpenConfirmation = handleOpenConfirmation;
    this._isLiked = card.isLiked;
  }

  // Event Listeners
  _setEventListeners() {
    //add click event to card images
    this._cardImage.addEventListener("click", this._openPopupImage);

    // icon delete
    this._deleteIcon = this._cardElement.querySelector(".photos__delete-icon");
    this._deleteIcon.addEventListener("click", () => {
      this._handleOpenConfirmation(this);
      console.log("abri o popup confirmation");
    });

    // icon like
    this._cardLike = this._cardElement.querySelector(".photos__like");
    this._cardLike.addEventListener("click", (evt) => {
      this._handleLikeCard(this);
      this._toggleLikeButtonState(evt);
    });
  }

  updateLikesView() {
    this._isLiked = !this._isLiked;
    this._toggleLikeButtonState();
  }

  removeCard() {
    this._cardElement.remove();
  }

  //change the like button state
  _toggleLikeButtonState() {
    if (this._isLiked) {
      this._likeButton.src = "./assets/images/Union.svg";
    } else {
      this._likeButton.src = "./assets/images/hearth.svg";
    }
    this._likeButton.classList.toggle("clicked");
  }

  _getTemplate() {
    const template = document.querySelector(this._cardSelector).content;
    const card = template.querySelector(".photos__card").cloneNode(true);
    return card;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector(".photos__like");
    this._cardElement.querySelector(".photos__elements-text").textContent =
      this._text;
    this._cardImage = this._cardElement.querySelector(".photos__card-image");
    this._cardImage.setAttribute("src", this._card.link);
    this._cardImage.setAttribute("alt", this._text);
    this._setEventListeners();
    this._toggleLikeButtonState();
    return this._cardElement;
  }
}
