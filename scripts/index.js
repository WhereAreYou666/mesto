const editProfile = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_edit-profile');
const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close-button');
const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
const descriptionInput = editProfilePopup.querySelector('.popup__input_type_description');
const editProfilePopupSubmit = editProfilePopup.querySelector('.popup__submit-button');
const editProfilePopupForm = editProfilePopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

editProfile.addEventListener('click', () => {
    editProfilePopup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
});

editProfilePopupCloseButton.addEventListener('click',() => {
    editProfilePopup.classList.remove('popup_opened');
});

editProfilePopupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const description = descriptionInput.value;
    profileName.textContent = name;
    profileDescription.textContent = description;
    editProfilePopup.classList.remove('popup_opened');
});