import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import {
  openProfile,
  openCreation,
  formElementProfile,
  formElementCreation,
  inputName,
  inputAbout,
  initialCards,
} from "./utils.js";

const profileUser = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__text",
});

const formProfile = new PopupWithForm(".popup-profile", {
  handleFormSubmit: (formValues) => {
    profileUser.setUserInfo(formValues);
    formProfile.close();
  },
});
formProfile.setEventListeners();

const formCreation = new PopupWithForm(".popup-creation", {
  handleFormSubmit: (formValues) => {
    const cardData = {
      name: formValues.title,
      link: formValues.url,
    };
    mostraItems(cardData);
  },
});

formCreation.setEventListeners();

//config forms
const configValidation = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button-inactive",
  inputErrorClass: ".popup__input_type_error",
};

//form1 (Instance)
const form1 = new FormValidator({
  config: configValidation,
  formSelector: "#profile-form",
});
form1.enableValidation();

//form2 (Instance)
const form2 = new FormValidator({
  config: configValidation,
  formSelector: "#creation-form",
});
form2.enableValidation();

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
popupimage.setEventListeners();

//popup profile(Instance)
const popupProfile = new Popup(".popup-profile");
popupProfile.setEventListeners();

//popup Creation(Instance)
const popupCreation = new Popup(".popup-creation");
popupCreation.setEventListeners();

//  Profile Popup Structure
openProfile.addEventListener("click", () => {
  form1.resetFormsOnClose();
  const data = profileUser.getUserInfo();
  inputName.value = data.name;
  inputAbout.value = data.about;
  formElementCreation.classList.remove("popup__forms-opened");
  formElementProfile.classList.add("popup__forms-opened");
  popupProfile.open();
});

// Creation Popup Structure
openCreation.addEventListener("click", () => {
  form2.resetFormsOnClose();
  formElementProfile.classList.remove("popup__forms-opened");
  formElementCreation.classList.add("popup__forms-opened");
  popupCreation.open();
});
