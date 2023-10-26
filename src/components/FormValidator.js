export default class FormValidator { 
 
    constructor(config, formElement) { 
        this._formElement = formElement; 
        this._config = config;
        this._inputSelector = config.inputSelector; 
        this._submitButtonSelector = config.submitButtonSelector; 
        this._inactiveButtonClass = config.inactiveButtonClass; 
        this._inputErrorClass = config.inputErrorClass; 
        this._errorClass = config.errorClass; 
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector); 
    };

    _removeInputError = (input) => { 
        input.classList.remove(this._inputErrorClass); 
        this._errorElement.classList.remove(this._errorClass); 
        this._errorElement.textContent = ''; 
    }; 

    _showInputError = (input) => { 
        input.classList.add(this._inputErrorClass); 
        this._errorElement.classList.add(this._errorClass); 
        this._errorElement.textContent = this._input.validationMessage; 
    };             

    _checkInputValidity = (input) => { 
        this._input = input; 
        this._errorElement = document.querySelector(`#error-${input.id}`); 
        if (!this._input.validity.valid){ 
            this._showInputError(input); 
        } else { 
            this._removeInputError(input); 
        } 
    };

    _setEventListeners = () => { 
        this._inputsArray = Array.from(this._formElement.querySelectorAll(this._inputSelector)); 
        this._toggleButtonValidity(); 
        this._inputsArray.forEach((input) => { 
            input.addEventListener('input', () => { 
                this._checkInputValidity(input); 
                this._toggleButtonValidity(); 
        }); 
    }); 
    };
 
    _hasInvalidInput = () => { 
        return this._inputsArray.some((input) => { 
            return !input.validity.valid; 
    }); 
    }; 
 
    _toggleButtonValidity = () => { 
        if (this._hasInvalidInput()){ 
            this.disableButton();
        } else { 
            this.enableButton();
        } 
    };

    enableValidation = () => { 
        this._setEventListeners(); 
    };

    resetValidation = () => {
        this._inputsArray.forEach((input) => {
        this._removeInputError(input)
        })
        this._toggleButtonValidity()
    }

    enableButton = () => { 
        this._buttonElement.classList.remove(this._inactiveButtonClass); 
        this._buttonElement.removeAttribute('disabled'); 
    }; 

    disableButton = () => { 
        this._buttonElement.classList.add(this._inactiveButtonClass); 
        this._buttonElement.setAttribute('disabled', true); 
    }; 
};