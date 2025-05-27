import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";
import {
  openProfile,
  openCreation,
  formElementProfile,
  formElementCreation,
  inputName,
  inputAbout,
  inputTitle,
  inputUrl,
  ownerId,
  profileTitle,
  profileText,
  containerImageProfile,
  openIconImageProfile,
  imageProfile,
  inputLink,
} from "./utils.js";

//API instance
const api = new Api(
  "https://around-api.pt-br.tripleten-services.com/v1",
  "a016777f-b4ef-40ad-b50c-29e69831ab99"
);

//Instance Profile User
const profileUser = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__text",
  avatarSelector: ".profile__image",
});

//GET info User
api
  .getInfoUser()
  .then((response) => {
    if (response.status !== 200) {
      Promise.reject("Deu erro no GET user info");
    }
    return response.json();
  })
  .then((userInfo) => {
    profileUser.setInfo({
      name: userInfo.name,
      about: userInfo.about,
      avatar: userInfo.avatar,
    });
  })
  .catch((error) => {
    console.log(`[GET]- /user-me ${error}`);
  });

const formProfile = new PopupWithForm(".popup-profile", {
  handleFormSubmit: (userInfo) => {
    const submitButton = formProfile.getSubmitButton();
    submitButton.textContent = "Salvando...";
    api
      .setUserInfo({
        name: userInfo.name,
        about: userInfo.about,
        avatar: userInfo.avatar,
      })
      .then((response) => {
        if (response.status !== 200) {
          Promise.reject("Deu erro no SET info");
        }
        return response.json();
      })
      .then((updatedData) => {
        profileUser.setInfo({
          name: updatedData.name,
          about: updatedData.about,
          avatar: updatedData.avatar,
        });
        formProfile.close();
      })
      .catch((err) => {
        console.log(`erro ao atualizar ${err}`);
      })
      .finally(() => {
        submitButton.textContent = "Salvar";
      });
  },
});
formProfile.setEventListeners();

//Get Initial Cards
let section;
api
  .getInitialCards()
  .then((response) => {
    if (!response.ok) {
      return Promise.reject("Deu erro no get cards!");
    }
    return response.json();
  })
  .then((cards) => {
    section = new Section(
      {
        itens: cards,
        renderer: mostraItems,
      },
      ".photos"
    );
    section.renderItens();
  })
  .catch((error) => {
    console.log(`[GET] - /cards - ${error}`);
  });

//Create Card
const formCreation = new PopupWithForm(".popup-creation", {
  handleFormSubmit: () => {
    const submitButton = formCreation.getSubmitButton();
    submitButton.textContent = "Salvando...";
    api
      .createCard({
        isLiked: false,
        name: inputTitle.value,
        link: inputUrl.value,
        owner: ownerId,
        createdAt: new Date(),
      })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject("Deu erro no create card!");
        }
        return response.json();
      })
      .then((newCardApi) => {
        mostraItems(newCardApi, true);
      })
      .catch((error) => {
        console.log(`[Post] - /cards - ${error}`);
      })
      .finally(() => {
        submitButton.textContent = "Salvar";
      });
  },
});

formCreation.setEventListeners();

const formImageProfile = new PopupWithForm(".popup-imageProfile", {
  handleFormSubmit: (dados) => {
    const submitButton = formImageProfile.getSubmitButton();
    submitButton.textContent = "Salvando...";
    api
      .changeProfileImage({ avatar: dados.url })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject("Erro ao mudar avatar");
        }
        return response.json();
      })
      .then((data) => {
        imageProfile.src = data.avatar;
      })
      .catch((err) => {
        console.log(`erro ${err}`);
      })
      .finally(() => {
        submitButton.textContent = "Salvar";
      });
  },
});

formImageProfile.setEventListeners();
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

const form3 = new FormValidator({
  config: configValidation,
  formSelector: "#imageProfile-form",
});
form3.enableValidation();

function mostraItems(card, isPrepend) {
  const newCard = new Card({
    card: card,
    cardSelector: "#card-template",
    openPopupImage: () => {
      popupimage.open(card.link, card.name);
    },
    handleLikeCard: (card) => {
      if (card._isLiked) {
        api
          .removeLike(card._card._id)
          .then((response) => {
            return response.json();
          })
          .then(() => {
            card.updateLikesView();
          });
      } else {
        api
          .updateLike(card._card._id)
          .then((response) => {
            return response.json();
          })
          .then(() => {
            card.updateLikesView();
          });
      }
    },
    handleOpenConfirmation: (card) => {
      confirmationPopup.setHandleDeleteCard(() => {
        const submitButton = confirmationPopup.getSubmitButton();
        submitButton.textContent = "Excluindo...";
        api
          .deleteCard(card._card._id)
          .then((response) => {
            if (!response.ok) {
              return Promise.reject("Deu erro no Delete do Card");
            }
            return response.json();
          })
          .then(() => {
            card.removeCard();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            submitButton.textContent = "Sim";
          });
      });
      confirmationPopup.open();
    },
  }).generateCard();
  section.addItems(newCard, isPrepend);
}

//popup Confirmation(Instance)
const confirmationPopup = new PopupWithConfirmation(".popup-confirmation");
confirmationPopup.setEventListeners();

//popup image (Instance)
const popupimage = new PopupWithImage(".popup-sobreposition");
popupimage.setEventListeners();

//popup profile(Instance)
const popupProfile = new Popup(".popup-profile");
popupProfile.setEventListeners();

//popup Creation(Instance)
const popupCreation = new Popup(".popup-creation");
popupCreation.setEventListeners();

const popupProfileImage = new Popup(".popup-imageProfile");
popupProfileImage.setEventListeners();

//  Profile Popup Structure
openProfile.addEventListener("click", () => {
  form1.resetFormsOnClose();
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileText.textContent;
  containerImageProfile.classList.remove(".popup__forms-opened");
  formElementCreation.classList.remove("popup__forms-opened");
  formElementProfile.classList.add("popup__forms-opened");
  popupProfile.open();
});

// Creation Popup Structure
openCreation.addEventListener("click", () => {
  form2.resetFormsOnClose();
  containerImageProfile.classList.remove(".popup__forms-opened");
  formElementProfile.classList.remove("popup__forms-opened");
  formElementCreation.classList.add("popup__forms-opened");
  popupCreation.open();
});

containerImageProfile.addEventListener("click", () => {
  form3.resetFormsOnClose();
  inputLink.value = imageProfile.src;
  formElementProfile.classList.remove("popup__forms-opened");
  formElementCreation.classList.remove("popup__forms-opened");
  containerImageProfile.classList.add(".popup__forms-opened");
  popupProfileImage.open();
});

containerImageProfile.addEventListener("mouseover", () => {
  openIconImageProfile.classList.add("image-profile-pincel-active");
  imageProfile.classList.add("profile__image-opacity");
});

containerImageProfile.addEventListener("mouseout", () => {
  openIconImageProfile.classList.remove("image-profile-pincel-active");
  imageProfile.classList.remove("profile__image-opacity");
});
