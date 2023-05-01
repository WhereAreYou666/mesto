//editProfile
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const descriptionInput = popupEditProfile.querySelector('.popup__input_type_description');
 const submitEditProfilePopup = popupEditProfile.querySelector('.popup__submit-button');
const formEditProfilePopup = popupEditProfile.querySelector('.popup__form_type_edit-profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
//card
const cardTemplate = document.getElementById('element-template');
const cardContainer = document.querySelector('.elements');
//add
const popupAddCard = document.querySelector('.popup_add-card');
const buttonAddCard = document.querySelector('.profile__add-button');
//submit
const formAddCard = document.querySelector('.popup__form_type_add-card');
//close
const popupEditProfilCloseButton = popupEditProfile.querySelector('.popup__close-button');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close-button');
//popupZoom
const popupZoom = document.querySelector('.popup_zoom-img');
const popupZoomImage = popupZoom.querySelector('.zoom__image');
const popupZoomFigcaption = popupZoom.querySelector('.zoom__figcaption');
const popupZoomCloseButton = popupZoom.querySelector('.popup__close-button');

//buttonEditProfile
buttonEditProfile.addEventListener('click', () => {
    openPopup(popupEditProfile);
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
});

formEditProfilePopup.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const description = descriptionInput.value;
    profileName.textContent = name;
    profileDescription.textContent = description;
    closePopup(popupEditProfile);
});

//addCard
const createCardElement = (cardData) => {
    const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);

    const cardTitle = cardElement.querySelector('.element__title');
    const cardImage = cardElement.querySelector('.element__image');

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    //popupZoom
    cardImage.addEventListener('click', () => {
        popupZoomImage.src = cardData.link;
        popupZoomImage.alt = cardData.name;
        popupZoomFigcaption.textContent = cardData.name;
        openPopup(popupZoom);
    });

    const deleteButton = cardElement.querySelector('.element__delete-button');
    const likeButton = cardElement.querySelector('.element__like-button');

    const handleDelete = () => {
        cardElement.remove();
    };

    const handlelike = () => {
        likeButton.classList.toggle('element__like-button_active');
    };

    deleteButton.addEventListener('click', handleDelete);
    likeButton.addEventListener('click', handlelike);

    return cardElement;
};

const renderCardElement = (cardElement) => {
    cardContainer.prepend(cardElement);
};

initialCards.forEach((card) => {
    const element = createCardElement(card);
    cardContainer.append(element);
});


//openClosePopups
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
};

buttonAddCard.addEventListener('click', () => {
    openPopup(popupAddCard);
});

buttonEditProfile.addEventListener('click', () => {
    openPopup(popupEditProfile);
});

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
};

popupEditProfilCloseButton.addEventListener('click', () => {
    closePopup(popupEditProfile);
});

popupAddCardCloseButton.addEventListener('click', () => {
    closePopup(popupAddCard);
});

document.querySelectorAll('.popup__close-button').forEach(button => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(buttonsPopup));
}); 

//closePopupByEsc
const closePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
};

//closePopupByOverlay
const closePopupByOverlay = (evt) => {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
     }
    
};

//disableSubmit
const disableSubmit = () => {
    const button = document.querySelector('.popup__submit-button_add');
    button.classList.add('popup__submit-button_disabled');
    button.setAttribute("disabled", true);
};

//submit
const handleCardSubmit = (event) => {
    event.preventDefault();

    const titleInput = formAddCard.querySelector('.popup__input_type_title');
    const linkInput = formAddCard.querySelector('.popup__input_type_link');

    const name = titleInput.value;
    const link = linkInput.value;

    const initialCardsData = {
        name,
        link
    };

    renderCardElement(createCardElement(initialCardsData));
    closePopup(popupAddCard);
    disableSubmit(popupAddCard);
    formAddCard.reset();
};

formAddCard.addEventListener('submit', handleCardSubmit);

popupEditProfile.addEventListener('mousedown', closePopupByOverlay);
popupAddCard.addEventListener('mousedown', closePopupByOverlay);
popupZoom.addEventListener('mousedown', closePopupByOverlay);