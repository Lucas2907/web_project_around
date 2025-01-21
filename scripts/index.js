//Armazenamento de variavéis
let openProfile = document.querySelector(".profile__border-pincel");
let openCreation = document.querySelector(".profile__border-plus");
let formElementProfile = document.querySelector(".popup__forms-profile");
let formElementCreation = document.querySelector(".popup__forms-creation");
let openImage = document.querySelector(".photos__card-image")
let popup = document.querySelector(".popup");
let popupSobreposition = document.querySelector(".popup-sobreposition")
let popupImage = document.querySelector(".popup-image");
let popupImageText = document.querySelector(".popup-image__text")
let popupImageSource = document.querySelector(".popup-image__image")
let closePopup = document.querySelector(".popup__close-button");
let closePopupImage = document.querySelector(".popup__close-button_image");
let inputName = document.querySelector("#name");
let inputAbout = document.querySelector("#aboutme");
let inputTitle = document.querySelector("#title");
let inputUrl = document.querySelector("#url");
let profileTitle = document.querySelector(".profile__title");
let profileText = document.querySelector(".profile__text");
let titlePopup = document.querySelector(".popup__title");
let submitButton = document.querySelector(".popup__button");

//Armazena NOME e LINK para cards iniciais
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
];

// Muda estado do Popup(aberto/fechado)
function togglePopup() {
  popup.classList.toggle("popup_opened");
}

function popupSobrepositionImage() {
  popupSobreposition.classList.toggle("popup-sobreposition_opened");
}

//Muda estado do Popup do Image(aberto/fechado)
function toggleImagePopup() {
  popupImage.classList.toggle("popup-image_opened");
}

//Muda estado do botão de curtida(cliked, no cliked)
function toggleLikeButton(evt) {
  let clickedButton = evt.currentTarget;
  if (clickedButton.src.includes("hearth.svg")) {
    clickedButton.src = "./images/Union.svg";
  } else {
    clickedButton.src = "./images/hearth.svg";
  }
  clickedButton.classList.toggle("clicked");
}

//Cria toda estrutura do Card
function createCard(cardValue) {

  const card = document.createElement("div");
  card.classList.add("photos__card");

  const cardImage = document.createElement("img");
  cardImage.classList.add("photos__card-image");
  cardImage.src = cardValue.link;
  cardImage.alt = `Imagem de ${cardValue.name}`;
  card.appendChild(cardImage);
  cardImage.addEventListener("click", () => {
    toggleImagePopup();
    popupSobrepositionImage();
    popupImageText.textContent = cardValue.name;
    popupImageSource.src = cardValue.link;
    popupImageSource.alt = `Imagem de ${cardValue.link} não encontrada`;
  });


  const deleteIcon = document.createElement("img");
  deleteIcon.classList.add('photos__delete-icon');
  deleteIcon.src = './images/Trash.svg';
  card.appendChild(deleteIcon);
  deleteIcon.addEventListener('click', () => {
    card.remove();
  });

  const cardElements = document.createElement("div");
  cardElements.classList.add("photos__elements");

  const cardText = document.createElement('h2');
  cardText.classList.add('photos__elements-text');
  cardText.textContent = cardValue.name;
  cardElements.appendChild(cardText);

  const cardLike = document.createElement('img');
  cardLike.classList.add('photos__like');
  cardLike.src = './images/hearth.svg';
  cardLike.width = 21;
  cardLike.height = 19;
  cardElements.appendChild(cardLike);
  card.appendChild(cardElements);
  cardLike.addEventListener('click', toggleLikeButton);
  return card;
}

//Renderiza os cards criados na página
function renderCards(cardList) {
  const container = document.querySelector('.photos');
  cardList.forEach(cardValue => {
    const card = createCard(cardValue);
    container.appendChild(card);
  });
}

//Função do submit no Popup perfil
function handleProfileFormsSubmit(evt) {
  evt.preventDefault()
  profileTitle.textContent = inputName.value;
  profileText.textContent = inputAbout.value;
  togglePopup();
}

//função do submit no Popup de Criação
function handleCreationFormsSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: inputTitle.value,
    link: inputUrl.value
  };
  const card = createCard(newCard);
  document.querySelector('.photos').prepend(card);
  togglePopup();
}

//Estrutura do Popup do perfil
openProfile.addEventListener("click", () => {
  formElementCreation.classList.remove("popup__forms-opened")
  formElementProfile.classList.add("popup__forms-opened")
  togglePopup();

});

//Estrutura do Popup de Criação
openCreation.addEventListener("click", () => {
  formElementCreation.reset()
  formElementProfile.classList.remove("popup__forms-opened")
  formElementCreation.classList.add("popup__forms-opened")
  togglePopup();
});

renderCards(initialCards);

formElementProfile.addEventListener("submit", handleProfileFormsSubmit);
formElementCreation.addEventListener("submit", handleCreationFormsSubmit);
closePopup.addEventListener("click", togglePopup);
closePopupImage.addEventListener("click", () => {
  toggleImagePopup();
  popupSobrepositionImage();
});