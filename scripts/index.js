const editProfile = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_edit-profile');
const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close-button');
const nameInput = editProfilePopup.querySelector('.popup__input-name');
const descriptionInput = editProfilePopup.querySelector('.popup__input-description');
const editProfilePopupSubmit = editProfilePopup.querySelector('.popup__submit-button');
const editProfilePopupForm = editProfilePopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

editProfile.addEventListener('click', () => {
    editProfilePopup.classList.add('popup__opened');
    nameInput.value = profileName.innerHTML;
    descriptionInput.value = profileDescription.innerHTML;
});

editProfilePopupCloseButton.addEventListener('click',() => {
    editProfilePopup.classList.remove('popup__opened');
});

editProfilePopupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const description = descriptionInput.value;
    profileName.innerHTML = name;
    profileDescription.innerHTML = description;
    editProfilePopup.classList.remove('popup__opened');
});