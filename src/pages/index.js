import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import "../pages/index.css";
import Api from "../utils/Api.js";
import { setButtonText } from "../utils/helpers.js";

// const initialCards = [
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "b36b01ce-d9dd-4fe7-85a7-b2c92af36d9f",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach((item) => {
      const cardEl = getCardElement(item);
      cardsList.append(cardEl);
    });
    if (userInfo) {
      profileNameEl.textContent = userInfo.name;
      profileDescriptionEl.textContent = userInfo.about;
      avatarImage.src = userInfo.avatar;
    } else {
      console.error("User info is undefined or null");
    }
  })
  .catch(console.error);

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileSubmitBtn =
  editProfileModal.querySelector(".modal__submit-btn");
const editProfileForm = document.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostSubmitBtn = newPostModal.querySelector(".modal__submit-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostLinkInput = newPostModal.querySelector("#card-image-input");
const newPostDescriptionInput = newPostModal.querySelector(
  "#card-description-input"
);

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

const avatarBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarProfileInput = avatarModal.querySelector("#profile-avatar-input");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarImage = document.querySelector(".profile__avatar");

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteRemoveBtn = deleteModal.querySelector(".modal__delete-btn");
const deleteCancelBtn = deleteModal.querySelector(".modal__cancel-btn");

let selectedCard, selectedCardId;

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function handleLike(evt, cardId) {
  const isLiked = evt.target.classList.contains("card__like-btn_active");
  api
    .handleLike(cardId, isLiked)
    .then(() => {
      evt.target.classList.toggle("card__like-btn_active");
    })
    .catch(console.error);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  cardLikeBtnEl.addEventListener("click", (evt) => handleLike(evt, data._id));

  if (data.isLiked) {
    cardLikeBtnEl.classList.toggle("card__like-btn_active");
  }

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnEl.addEventListener("click", () => {
    handleDeleteCard(cardElement, data._id);
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescriptionInput],
    settings
  );
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

newPostForm.addEventListener("submit", handleNewPostSubmit);

avatarBtn.addEventListener("click", function () {
  openModal(avatarModal);
});

avatarCloseBtn.addEventListener("click", function () {
  closeModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);

deleteModal.addEventListener("click", function () {
  closeModal(deleteModal);
});

deleteForm.addEventListener("submit", handleDeleteSubmit);

const escPressed = (evt) => {
  if (evt.key === "Escape") {
    const openModalEl = document.querySelector(".modal_is-opened");
    if (openModalEl) {
      closeModal(openModalEl);
    }
  }
};

const clickToClose = (evt) => {
  if (evt.target.classList.contains("modal_is-opened")) {
    closeModal(evt.target);
  }
};

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", escPressed);
  modal.addEventListener("click", clickToClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", escPressed);
  modal.removeEventListener("click", clickToClose);
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "Delete", "Deleting");

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false, "Delete", "Deleting");
    });
}

function handleEditProfileSubmit(evt) {
  if (
    !editProfileNameInput.value.trim() ||
    !editProfileDescriptionInput.value.trim()
  ) {
    alert("Please fill in all fields");
    evt.preventDefault();
    return;
  }
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      disableButton();
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  if (!avatarProfileInput.value.trim()) {
    alert("Please fill in all fields");
    return;
  }

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editAvatarInfo(avatarProfileInput.value)
    .then((data) => {
      avatarImage.src = data.avatar;
      closeModal(avatarModal);
      avatarForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
      disableButton(avatarSubmitBtn, settings);
    });
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();

  const name = newPostDescriptionInput.value.trim();
  const link = newPostLinkInput.value.trim();

  if (!name || !link) {
    alert("Please fill in all fields");
    return;
  }

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .addCard(name, link)
    .then((newCard) => {
      const postCardEl = getCardElement(newCard);
      cardsList.prepend(postCardEl);
      closeModal(newPostModal);
      newPostForm.reset();
      disableButton(newPostSubmitBtn, settings);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

enableValidation(settings);
