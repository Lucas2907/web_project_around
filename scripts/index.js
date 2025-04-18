import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import {
  openProfile,
  openCreation,
  formElementProfile,
  formElementCreation,
  inputName,
  inputAbout,
  profileTitle,
  profileText,
  initialCards,
  handleProfileFormsSubmit,
  handleCreationFormsSubmit,
} from "./utils.js";


//form1 (Instance)
const form1 = new FormValidator({
  config: {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button-profile",
    inactiveButtonClass: "popup__button-inactive",
    inputErrorClass: ".popup__input_type_error",
  },
  formSelector: "#profile-form",
});

//form2 (Instance)
const form2 = new FormValidator({
  config: {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button-creation",
    inactiveButtonClass: "popup__button-inactive",
    inputErrorClass: ".popup__input_type_error",
  },
  formSelector: "#creation-form",
});

form1.enableValidation();
form2.enableValidation();

// reset all instances of FormValidator
function resetForms() {
  form1.resetFormsOnClose();
  form2.resetFormsOnClose();
}

function mostraItems(card) {
  const newCard = new Card({
    card,
    cardSelector: "#card-template",
    openPopupImage: () => {
      popupimage.open(card.link, card.name);
    },
  }).generateCard();
  section.addItems(newCard);
}

//card (Instance)
const section = new Section(
  {
    itens: initialCards,
    renderer: mostraItems,
  },
  ".photos"
);
section.renderItens();

//popup image (Instance)
const popupimage = new PopupWithImage(".popup-sobreposition");
popupimage.SetEventListeners();

//popup profile(Instance)
const popupProfile = new Popup(".popup");
popupProfile.SetEventListeners();

//popup Creation(Instance)
const popupCreation = new Popup(".popup");
popupCreation.SetEventListeners();

//  Profile Popup Structure
openProfile.addEventListener("click", () => {
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileText.textContent;
  formElementCreation.classList.remove("popup__forms-opened");
  formElementProfile.classList.add("popup__forms-opened");
  popupProfile.open();
});

// Creation Popup Structure
openCreation.addEventListener("click", () => {
  formElementCreation.reset();
  formElementProfile.classList.remove("popup__forms-opened");
  formElementCreation.classList.add("popup__forms-opened");
  popupCreation.open();
  resetForms();
});

formElementProfile.addEventListener("submit", handleProfileFormsSubmit);
formElementCreation.addEventListener("submit", handleCreationFormsSubmit);
