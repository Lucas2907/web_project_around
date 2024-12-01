let openProfile = document.querySelector(".profile__border-pincel");
let popup = document.querySelector(".popup");
let closePopup = document.querySelector(".popup__close-button");
let inputName = document.querySelector("#name");
let profileTitle = document.querySelector(".profile__title")
let inputAbout = document.querySelector("#aboutme");
let profileText = document.querySelector(".profile__text")
let likeButton = document.querySelectorAll(".photos__like");
let formElement = document.querySelector(".popup__forms");

inputName.value = profileTitle.textContent;
inputAbout.value = profileText.textContent;

function togglePopup() {
  popup.classList.toggle("popup_opened");
}

function removePopup() {
  popup.classList.remove("popup_opened");
}

function toggleLikeButton(evt) {
  let clickedButton = evt.currentTarget;
  if (clickedButton.src.includes("hearth.svg")) {
    clickedButton.src = "./images/Union.svg";
  } else {
    clickedButton.src = "./images/hearth.svg";
  }
  clickedButton.classList.toggle("clicked");
}

function handleProfileFormsSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileText.textContent = inputAbout.value;
  togglePopup();
}

openProfile.addEventListener("click", togglePopup);
closePopup.addEventListener("click", removePopup);
likeButton.forEach((button) => {
  button.addEventListener("click", toggleLikeButton);
});
formElement.addEventListener("submit", handleProfileFormsSubmit);
