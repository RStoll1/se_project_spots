const initialCards = [
    {
        name: "Val Thorens"
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
    },
    {
        name: "Restaurant terrace"
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
    },
    {
        name: "An outdoor cafe"
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
    },
    {
        name: "A very long bridge, over the forest and through the trees"
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
    },
    {
        name: "Tunnel with morning light"
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
    },
    {
        name: "Mountain house"
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


editProfileBtn.addEventListener("click", function () {
    editProfileNameInput.value = profileNameEl.textContent;
    editProfileDescriptionInput.value = profileDescriptionEl.textContent;
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

function openModal(modal) {
    modal.classList.add("modal_is-opened");
};

function closeModal(modal) {
    modal.classList.remove("modal_is-opened");
};

function handleEditProfileSubmit(evt) {
    if (!editProfileNameInput.value.trim() || !editProfileDescriptionInput.value.trim()) {
        alert("Please fill in all fields");
        evt.preventDefault();
        return;
    };
    evt.preventDefault();
    profileNameEl.textContent = editProfileNameInput.value;
    profileDescriptionEl.textContent = editProfileDescriptionInput.value;
    editProfileModal.classList.remove("modal_is-opened");

};

function handleNewPostSubmit(evt) {
    if (!newPostLinkInput.value.trim() || !newPostDescriptionInput.value.trim()) {
        alert("Please fill in all fields");
        evt.preventDefault();
        return;
    }
    evt.preventDefault();
    console.log(newPostLinkInput.value);
    console.log(newPostDescriptionInput.value);
    newPostModal.classList.remove("modal_is-opened");
    newPostForm.reset();

};

initialCards.forEach(function (item) {
    console.log(item.name);
    console.log(item.link);
});