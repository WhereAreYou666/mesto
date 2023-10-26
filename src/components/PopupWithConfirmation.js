import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    
    constructor(popupSelector, handleCardDeleteSubmit, { defaultTextValue }) {
        super(popupSelector);
        this._defaultTextValue = defaultTextValue;
        this._handleCardDeleteSubmit = handleCardDeleteSubmit;
        this._form = this._popup.querySelector('.form');
    }

    open(card) {
        this._card = card;
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleCardDeleteSubmit(this._card);
        })
    }
}