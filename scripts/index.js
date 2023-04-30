//editProfile
const editProfile = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_edit-profile');
const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
const descriptionInput = editProfilePopup.querySelector('.popup__input_type_description');
const editProfilePopupSubmit = editProfilePopup.querySelector('.popup__submit-button');
const editProfilePopupForm = editProfilePopup.querySelector('.popup__form_type_edit-profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
//card
const cardTemplate = document.getElementById('element-template');
const cardContainer = document.querySelector('.elements');
//add
const addCardPopup = document.querySelector('.popup_add-card');
const addCardButton = document.querySelector('.profile__add-button');
//submit
const addCardForm = document.querySelector('.popup__form_type_add-card');
//close
const popupEditProfilCloseButton = editProfilePopup.querySelector('.popup__close-button');
const popupAddCardCloseButton = addCardPopup.querySelector('.popup__close-button');
//zoomPopup
const zoomPopup = document.querySelector('.popup_zoom-img');
const zoomPopupImage = zoomPopup.querySelector('.zoom__image');
const zoomPopupFigcaption = zoomPopup.querySelector('.zoom__figcaption');
const popupZoomCloseButton = zoomPopup.querySelector('.popup__close-button');

//editProfile
editProfile.addEventListener('click', () => {
    openPopup(editProfilePopup);
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
});

editProfilePopupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const description = descriptionInput.value;
    profileName.textContent = name;
    profileDescription.textContent = description;
    closePopup(editProfilePopup);
});

//addCard
const createCardElement = (cardData) => {
    const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);

    const cardTitle = cardElement.querySelector('.element__title');
    const cardImage = cardElement.querySelector('.element__image');

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    //zoomPopup
    cardImage.addEventListener('click', () => {
        zoomPopupImage.src = cardData.link;
        zoomPopupImage.alt = cardData.name;
        zoomPopupFigcaption.textContent = cardData.name;
        openPopup(zoomPopup);
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
    popupArray.forEach((popupArray) => {
        popupArray.addEventListener('click', closePopupByOverlay)
    });
};

addCardButton.addEventListener('click', () => {
    openPopup(addCardPopup);
});

editProfile.addEventListener('click', () => {
    openPopup(editProfilePopup);
});

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
    popupArray.forEach((popupArray) => {
        popupArray.removeEventListener('click', closePopupByOverlay)
    });
};

popupEditProfilCloseButton.addEventListener('click', () => {
    closePopup(editProfilePopup);
});

popupAddCardCloseButton.addEventListener('click', () => {
    closePopup(addCardPopup);
});

popupZoomCloseButton.addEventListener('click', () => {
    closePopup(zoomPopup);
});

//closePopupByEsc
const closePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
};

//closePopupByOverlay
const popupArray = Array.from(document.querySelectorAll('.popup'));
const closePopupByOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
    
};


//submit
const handleCardSubmit = (event) => {
    event.preventDefault();

    const titleInput = addCardForm.querySelector('.popup__input_type_title');
    const linkInput = addCardForm.querySelector('.popup__input_type_link');

    const name = titleInput.value;
    const link = linkInput.value;

    const initialCardsData = {
        name,
        link
    };

    renderCardElement(createCardElement(initialCardsData));
    closePopup(addCardPopup);
    addCardForm.reset();
};
addCardForm.addEventListener('submit', handleCardSubmit);

