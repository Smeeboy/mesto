export default class FormValidator {
    constructor(settings, formElement, successCallback) {
        this._form = formElement;
        this._submit = this._form.querySelector(settings.submitSelector);
        this._inputs = this._form.querySelectorAll(settings.inputSelector);
        this._settings = settings;
        this._successCallback = successCallback;
    }

    _showError(errorElement, inputElement, inputErrorClass) {
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(inputErrorClass);
    }

    _hideError(errorElement, inputElement, inputErrorClass) {
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.remove(inputErrorClass);
    }

    _toggleButtonState(button, isActive, inactiveButtonClass) {
        if (isActive) {
            button.classList.remove(inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(inactiveButtonClass);
            button.disabled = 'disabled';
        }
    }

    _submitHandler(evt) {
        evt.preventDefault()
        this._toggleButtonState(this._submit, false, this._settings.inactiveButtonClass);
        const isFormValid = this._form.checkValidity();
        if (isFormValid && this._successCallback) {
            this._successCallback(this._form)
        }
    }

    _checkInputValidity(formElement, inputElement, inputErrorClass) {
        inputElement.setCustomValidity("");
        const isInputNotValid = !inputElement.validity.valid;
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        if (isInputNotValid) {
            this._showError(errorElement, inputElement, inputErrorClass);
        } else {
            this._hideError(errorElement, inputElement, inputErrorClass);
        };
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            this._submitHandler(evt)
        });
        Array.from(this._inputs).forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                const isFormValid = this._form.checkValidity();
                this._checkInputValidity(this._form, inputElement, this._settings.inputErrorClass);
                this._toggleButtonState(this._submit, isFormValid, this._settings.inactiveButtonClass)
            });
        });
    }

}


// const toggleButtonState = (button, isActive, inactiveButtonClass) => {
//     if (isActive) {
//         button.classList.remove(inactiveButtonClass);
//         button.disabled = false;
//     } else {
//         button.classList.add(inactiveButtonClass);
//         button.disabled = 'disabled';
//     }
// }

// const setEventListeners = (formElement, config) => {
//     const inputsList = formElement.querySelectorAll(config.inputSelector);
//     const submitButton = formElement.querySelector(config.submitButtonSelector);

//     Array.from(inputsList).forEach(inputElement => {
//         inputElement.addEventListener('input', () => {
//             const isFormValid = formElement.checkValidity();
//             checkInputValidity(formElement, inputElement, config);
//             toggleButtonState(submitButton, isFormValid, config.inactiveButtonClass)
//         });
//     });

//     formElement.addEventListener('submit', (evt) => {
//         evt.preventDefault()
//         toggleButtonState(submitButton, false, config.inactiveButtonClass);
//     })
// };



// const validationConfig = {
//     formSelector: '.popup__form',
//     inputSelector: '.form__input',
//     submitButtonSelector: '.form__button',
//     inactiveButtonClass: 'form__button_invalid',
//     inputErrorClass: 'popup__input_state_invalid',
//     errorClass: 'error'
// };


