import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import { validationConfig } from '../utils/constants.js';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';

const template = document.getElementById('template').content;

const buttonAddCard = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonEditAvatar = document.querySelector('.profile__avatar-button');

const formProfile = document.querySelector('.form_type_profile');
const formCards = document.querySelector('.form_type_cards');
const formAvatarChange = document.querySelector('.form_type_update-avatar');

const nameInput = formProfile.querySelector('.form__input_type_name');
const jobInput = formProfile.querySelector('.form__input_type_job');

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-77',
  headers: {
    authorization: '2164bb6c-9763-4201-b1b8-719ccaf6ad3c',
    'Content-Type': 'application/json'
  }
});

const userId = null;

api.getAppInfo() 
  .then(([userInformation, cardList]) => {
    userInfo.setUserInfo(userInformation);
    cardSection.renderer(cardList);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  });

const userInfo = new UserInfo(
  {
    name: '.profile__title',
    job: '.profile__subtitle',
    avatar: '.profile__avatar'
  });

const cardSection = new Section({
  renderer: (item) => {
    cardSection.appendItem(createCardElement(item));
  },
}, '.card-items');

const validatorAddForm = new FormValidator(validationConfig, formProfile);
validatorAddForm.enableValidation();
const validatorEditForm = new FormValidator(validationConfig, formCards);
validatorEditForm.enableValidation();
const avatarChangeValidator = new FormValidator(validationConfig, formAvatarChange)
avatarChangeValidator.enableValidation();

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const popupWithCard = new PopupWithForm('.popup_type_cards', handleCardFormSubmit, { defaultTextValue: 'Создать' });
popupWithCard.setEventListeners();

const popupWithProfile = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit, { defaultTextValue: 'Сохранить' });
popupWithProfile.setEventListeners();

const popupWithCardDelete = new PopupWithConfirmation('.popup_type_delete-card', handleCardDeleteSubmit, { defaultTextValue: 'Да' });
popupWithCardDelete.setEventListeners();

const popupWithAvatarChange = new PopupWithForm('.popup_type_update-avatar', handleAvatarCgangeFormSubmit, { defaultTextValue: 'Сохранить' })
popupWithAvatarChange.setEventListeners();

function handleAvatarCgangeFormSubmit (data) {
  popupWithAvatarChange.loadButtonText('Сохранение');
  api.changeAvatar(data.AvatarLink)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupWithAvatarChange.close();
    })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })
  .finally(() => {
    popupWithAvatarChange.returnDefaultButtonText();
  });
}

function handleProfileFormSubmit (data) {
  popupWithProfile.loadButtonText('Сохранение');
  api.editProfile({ name: data.profileName, about: data.profileJob })
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupWithProfile.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      popupWithProfile.returnDefaultButtonText();
    });
}; 

function handleCardFormSubmit(data) {
  popupWithCard.loadButtonText('Сохранение');
  api.editCard({ name: data.profileTitle, link: data.profileLink })
    .then((card) => {
      cardSection.prependItem(createCardElement(card))
      popupWithCard.close()
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      popupWithCard.returnDefaultButtonText();
    });
};

buttonAddCard.addEventListener('click', openCardPopup); 
buttonEditProfile.addEventListener('click', openProfilePopup);
buttonEditAvatar.addEventListener('click', openEditAvatarPopup);

function openEditAvatarPopup() {
  avatarChangeValidator.disableButton(); 
  popupWithAvatarChange.open();
}

function openCardPopup() {
  validatorEditForm.disableButton(); 
  popupWithCard.open();
};

function openProfilePopup() {
  validatorAddForm.enableButton();
  const {name, job} = userInfo.getUserInfo();
  nameInput.value = name; 
  jobInput.value = job; 
  popupWithProfile.open();
};

function createCardElement(card) {

  const cardElement = new Card(
    card, 
    template, 
    handleCardClick, 
    handleCardDeleteSubmit, 
    userInfo.userId, 
    handleOpenPopup,
    handleLike,
    );
  return cardElement.generateCard();
};

function handleCardClick(name, link) {
  popupWithImage.open(name, link); 
};

function handleCardDeleteSubmit(card) {
  api.deleteCard(card.getIdCard())
    .then((res) => {
      card.deleteCard();
      console.log(res);
      popupWithCardDelete.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
};

function handleOpenPopup(card) {
  popupWithCardDelete.open(card);
}

function handleLike(cardId, likeButton) {
  if(likeButton.classList.contains('card-item__like_type_active')){ //
    api.removeLike(cardId)
      .then((res) => {
        this.renderLikes(res.likes);

      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  } else {
    api.like(cardId)
      .then((res) => {
        this.renderLikes(res.likes);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
}