import Card from "./Card.js";

// Armazenamento de variáveis
let openProfile = document.querySelector(".profile__border-pincel");
let openCreation = document.querySelector(".profile__border-plus");
let formElementProfile = document.querySelector(".popup__forms-profile");
let formElementCreation = document.querySelector(".popup__forms-creation");
let popup = document.querySelector(".popup");
let popupSobrepositionImage = document.querySelector(".popup-sobreposition");
let popupImage = document.querySelector(".popup-image");
let closePopup = document.querySelector(".popup__close-button");
let inputName = document.querySelector("#name");
let inputAbout = document.querySelector("#aboutme");
let inputTitle = document.querySelector("#title");
let inputUrl = document.querySelector("#url");
let profileTitle = document.querySelector(".profile__title");
let profileText = document.querySelector(".profile__text");
let titlePopup = document.querySelector(".popup__title");
let submitButton = document.querySelector(".popup__button");

// Armazena NOME e LINK para cards iniciais
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// Muda estado do Popup (aberto/fechado)
function togglePopup() {
  popup.classList.toggle("popup_opened");
}

// Função para resetar formulários ao fechar o popup
function resetFormsOnClose() {
  formElementCreation.reset();
  const config = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };
  hideAllInputErrors(formElementProfile, config);
  hideAllInputErrors(formElementCreation, config);
  resetButtonState(formElementProfile, config);
  resetButtonState(formElementCreation, config);
}

// Renderiza os cards criados na página
function renderCards(cardList) {
  const container = document.querySelector(".photos");
  cardList.forEach((cardValue) => {
    const newCard = new Card({
      card: cardValue,
      cardSelector: "#card-template",
    }).generateCard();
    container.appendChild(newCard);
  });
}

renderCards(initialCards);

// Função do submit no Popup perfil
function handleProfileFormsSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileText.textContent = inputAbout.value;
  togglePopup();
}

// Função do submit no Popup de Criação
function handleCreationFormsSubmit(evt) {
  evt.preventDefault();
  togglePopup();
  const imageName = inputTitle.value;
  const urlImage = inputUrl.value;
  const createCard = new Card({
    card: { name: imageName, link: urlImage },
    cardSelector: "#card-template",
  }).generateCard();
  document.querySelector(".photos").prepend(createCard);
  imageName = "";
  urlImage = "";
}

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
});

formElementProfile.addEventListener("submit", handleProfileFormsSubmit);
formElementCreation.addEventListener("submit", handleCreationFormsSubmit);
closePopup.addEventListener("click", () => {
  togglePopup();
  resetFormsOnClose();
});

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
      resetFormsOnClose();
    }
  }
  isMouseDownInsidePopup = false;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (popup.classList.contains("popup_opened")) {
      togglePopup();
      resetFormsOnClose();
    }
    if (popupImage.classList.contains("popup-image_opened")) {
      toggleImagePopup();
    }
  }
});
