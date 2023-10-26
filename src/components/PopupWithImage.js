import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
        this._popupImageCard = this._popup.querySelector('.popup__image-card');
        this._popupImageTitle = this._popup.querySelector('.popup__image-title');
    }

    open(name, title) {
        super.open();
        this._popupImageCard.src = title; 
        this._popupImageTitle.textContent = name; 
        this._popupImageCard.alt = name;
    }
}