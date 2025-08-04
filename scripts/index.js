const initialCards = [
    {
        name: "Golden Gate Bridge",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"
    },
    {
        name: "Val Thorens",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
    },
    {
        name: "Restaurant terrace",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
    },
    {
        name: "An outdoor cafe",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
    },
    {
        name: "A very long bridge, over the forest and through the trees",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
    },
    {
        name: "Tunnel with morning light",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
    },
    {
        name: "Mountain house",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
    },
];

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileSubmitBtn = editProfileModal.querySelector(".modal__submit-btn");
const editProfileForm = document.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");

const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostSubmitBtn = newPostModal.querySelector(".modal__submit-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostLinkInput = newPostModal.querySelector("#card-image-input");
const newPostDescriptionInput = newPostModal.querySelector("#card-description-input");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");


const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");


function getCardElement(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardTitleEl = cardElement.querySelector(".card__title");
    const cardImageEl = cardElement.querySelector(".card__image");

    cardImageEl.src = data.link;
    cardImageEl.alt = data.name;
    cardTitleEl.textContent = data.name;

    const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
    cardLikeBtnEl.addEventListener("click", () => {
        cardLikeBtnEl.classList.toggle("card__like-btn_active");
    });

    const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
    cardDeleteBtnEl.addEventListener("click", () => {
        cardElement.remove();
    });

    cardImageEl.addEventListener("click", () => {
        previewImageEl.src = data.link;
        previewCaptionEl.alt = data.name;
        previewCaptionEl.textContent = data.name;
        openModal(previewModal);
    });

    previewModalCloseBtn.addEventListener("click", () => {
        closeModal(previewModal);
    });

    return cardElement;
};

editProfileBtn.addEventListener("click", function () {
    editProfileNameInput.value = profileNameEl.textContent;
    editProfileDescriptionInput.value = profileDescriptionEl.textContent;
    resetValidation(editProfileForm, [editProfileNameInput, editProfileDescriptionInput], settings);
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

function handleEditProfileSubmit(evt) {
    if (!editProfileNameInput.value.trim() || !editProfileDescriptionInput.value.trim()) {
        alert("Please fill in all fields");
        evt.preventDefault();
        return;
    };
    evt.preventDefault();
    profileNameEl.textContent = editProfileNameInput.value;
    profileDescriptionEl.textContent = editProfileDescriptionInput.value;
    closeModal(editProfileModal);

};

function handleNewPostSubmit(evt) {
    if (!newPostLinkInput.value.trim() || !newPostDescriptionInput.value.trim()) {
        alert("Please fill in all fields");
        evt.preventDefault();
        return;
    }
    evt.preventDefault();
    const inputValues = {
        name: newPostDescriptionInput.value,
        link: newPostLinkInput.value
    };
    const postCardEl = getCardElement(inputValues);
    cardsList.prepend(postCardEl);
    closeModal(newPostModal);
    newPostForm.reset();
    disableButton(newPostSubmitBtn, settings);

};

initialCards.forEach(function (item) {
    const postCardEl = getCardElement(item);
    cardsList.append(postCardEl);
});