import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

    constructor(popupSelector, handleFormSubmit, { defaultTextValue }) {
        super(popupSelector);
        this._defaultTextValue = defaultTextValue;
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.form');
        this._inputsArray = this._form.querySelectorAll('.form__input');
        this._buttonSubmit = this._form.querySelector('.form__submit');
        this._buttonSubmitText = this._buttonSubmit.textContent;
    }

    loadButtonText(text) {
        this._buttonSubmit.textContent = text;
        console.log(this._buttonSubmitText);

    }

    returnDefaultButtonText() {
        this._buttonSubmit.textContent = this._defaultTextValue;
        console.log(this._buttonSubmitText);
    }

    _getInputValues() {
        const formValues = {};
        this._inputsArray.forEach((input) => {
            formValues[input.name] = input.value;
        })
        return formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    }

    close() {
        super.close();
        this._form.reset();
    }
}