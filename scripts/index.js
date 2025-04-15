import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import {
  openProfile,
  openCreation,
  formElementProfile,
  formElementCreation,
  popup,
  closePopup,
  inputName,
  inputAbout,
  profileTitle,
  profileText,
  initialCards,
  togglePopup,
  handleProfileFormsSubmit,
  handleCreationFormsSubmit,
} from "./utils.js";

const form1 = new FormValidator({
  config: {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button-profile",
    inactiveButtonClass: "popup__button-inactive",
    inputErrorClass: ".popup__input_type_error",
  },
  formSelector: "#profile-form",
});

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

// reseta todas as instancias de FormValidator
function resetForms() {
  form1.resetFormsOnClose();
  form2.resetFormsOnClose();
}

function mostraItems(card) {
  const newCard = new Card({
    card,
    cardSelector: "#card-template",
  }).generateCard();
  section.addItems(newCard);
}

const section = new Section(
  {
    itens: initialCards,
    renderer: mostraItems,
  },
  ".photos"
);
section.renderItens();

//adiciona eventos ao fechar popup
closePopup.addEventListener("click", () => {
  togglePopup();
  resetForms();
});

// Estrutura do Popup do perfil
openProfile.addEventListener("click", () => {
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileText.textContent;
  formElementCreation.classList.remove("popup__forms-opened");
  formElementProfile.classList.add("popup__forms-opened");
  togglePopup();
});

// Estrutura do Popup de Criação
openCreation.addEventListener("click", () => {
  formElementCreation.reset();
  formElementProfile.classList.remove("popup__forms-opened");
  formElementCreation.classList.add("popup__forms-opened");
  togglePopup();
  resetForms();
});

formElementProfile.addEventListener("submit", handleProfileFormsSubmit);
formElementCreation.addEventListener("submit", handleCreationFormsSubmit);

let isMouseDownInsidePopup = false;

popup.addEventListener("mousedown", (evt) => {
  if (evt.target === popup) {
    isMouseDownInsidePopup = true;
  }
});

popup.addEventListener("mouseup", (evt) => {
  if (isMouseDownInsidePopup && evt.target === popup) {
    if (popup.classList.contains("popup_opened")) {
      togglePopup();
      resetForms();
    }
  }
  isMouseDownInsidePopup = false;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (popup.classList.contains("popup_opened")) {
      togglePopup();
      resetForms();
    }
  }
});
