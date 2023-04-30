const openInputError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
    const elementError = formElement.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.add(inputErrorClass);
    elementError.textContent = errorMessage;
    elementError.classList.add(errorClass);
};

const closeInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
    const elementError = formElement.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.remove(inputErrorClass);
    elementError.classList.remove(errorClass);
    elementError.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputError) => {
    if (!inputElement.validity.valid) {
        openInputError(formElement, inputElement, inputElement.validationMessage, inputError);
    } else {
        closeInputError(formElement, inputElement, inputError);
    }
};

const hasInvalidInput = (inputsArray) => {
    return inputsArray.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputsArray, buttonElement, { inactiveButtonClass }) => {
    if (hasInvalidInput(inputsArray)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute("disabled", true);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute("disabled", true);
    }
};

const setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...rest }) => {
    const inputsArray = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputsArray, buttonElement, rest);
    inputsArray.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, rest);
            toggleButtonState(inputsArray, buttonElement, rest);
        });
    });
};

const enableValidation = ({ formSelector, ...rest }) => {
    const formsArray = Array.from(document.querySelectorAll(formSelector));
    formsArray.forEach((formElement) => {
        setEventListeners(formElement, rest);
    });
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_visible'
});