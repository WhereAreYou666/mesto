export default class Card {

  constructor(data, templateSelector, handleCardClick, handleDeleteButtonCard, userId, handleOpenPopup, handleLike) {
    this._name = data.name;
    this._title = data.link;
    this._template = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonCard = handleDeleteButtonCard;
    this._userId = userId;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._likes = data.likes;
    this._handleOpenPopup = handleOpenPopup;
    this._handleLike = handleLike;
  }

  getIdCard() {
    return this._cardId;
  }

  _getTemplate = () => {
    this._imageElement = this._template.cloneNode(true).children[0];
    return this._imageElement;
  }

  deleteCard = () => {
      this._imageElement.remove();
  }

  renderLikes (likes) {
    this._numberOfLikes.textContent = likes.length;
    if (likes.some(user => user._id === this._userId)) {
      this._buttonCardItemLike.classList.add('card-item__like_type_active')
      this._islikedCard = true;
    } else {
      this._buttonCardItemLike.classList.remove('card-item__like_type_active')
      this._islikedCard = false;
    }
  }

  _deleteButtonTrush = () => {
    if(this._userId !== this._cardOwnerId){
      this._buttonDeleteTrash.remove();
    }
  }

  _islikedCard = () => {
    const isLiked = this._likes.some((user) => {
      return this._userId === user._id;
    });
    if(isLiked) { this._buttonCardItemLike.classList.add('card-item__like_type_active') }
  }

  _like = () => {
    this._handleLike(this._cardId, this._buttonCardItemLike, this._numberOfLikes);
  }

  _setEventListeners = () => {
    this._buttonDeleteTrash.addEventListener('click', () => this._handleOpenPopup(this));
    this._buttonCardItemLike.addEventListener('click', () => {
      this._like();
    });
    this._cardImage.addEventListener('click', () => { 
      this._handleCardClick(this._name, this._title);
    })
  };

  generateCard = () => {
    this._cardElement = this._getTemplate();
    this._buttonDeleteTrash = this._imageElement.querySelector('.card-item__trash'); 
    this._buttonCardItemLike = this._imageElement.querySelector('.card-item__like_type_button');
    this._numberOfLikes = this._imageElement.querySelector('.card-item__like_type_number');
    this._cardName = this._imageElement.querySelector('.card-item__title'); 
    this._cardImage = this._imageElement.querySelector('.card-item__img');
    this._deleteButtonTrush();
    this._islikedCard();
    this._numberOfLikes.textContent = this._likes.length;
    this._cardName.textContent = this._name; 
    this._cardImage.src = this._title; 
    this._cardImage.alt = this._name; 
    this._setEventListeners();
    this.renderLikes(this._likes);
    return this._cardElement;
  }
}