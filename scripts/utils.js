import Card from "./Card.js";

// Variables store
export const openProfile = document.querySelector(".profile__border-pincel");
export const openCreation = document.querySelector(".profile__border-plus");
export const formElementProfile = document.querySelector(
  ".popup__forms-profile"
);
export const formElementCreation = document.querySelector(
  ".popup__forms-creation"
);
export const popup = document.querySelector(".popup");
export const closePopup = document.querySelector(".popup__close-button");
export const inputName = document.querySelector("#name");
export const inputAbout = document.querySelector("#aboutme");
export const inputTitle = document.querySelector("#title");
export const inputUrl = document.querySelector("#url");
export const profileTitle = document.querySelector(".profile__title");
export const profileText = document.querySelector(".profile__text");

// Store name and link from InitialCards
export const initialCards = [
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

// Submit function Profile Popup
// Submit function Creation Popup
export function handleCreationFormsSubmit(evt) {
  evt.preventDefault();
  togglePopup();
  let imageName = inputTitle.value;
  let urlImage = inputUrl.value;
  const createCard = new Card({
    card: { name: imageName, link: urlImage },
    cardSelector: "#card-template",
  }).generateCard();
  document.querySelector(".photos").prepend(createCard);
  imageName = "";
  urlImage = "";
}
