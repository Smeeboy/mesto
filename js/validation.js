
const showError = (errorElement, inputElement, inputErrorClass) => {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(inputErrorClass);
}

const hideError = (errorElement, inputElement, inputErrorClass) => {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.remove(inputErrorClass);
}


const checkInputValidity = (formElement, inputElement, config) => {
    inputElement.setCustomValidity("");
    const isInputNotValid = !inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (isInputNotValid) {
        showError(errorElement, inputElement, config.inputErrorClass);
    } else {
        hideError(errorElement, inputElement, config.inputErrorClass);
    };
};

const toggleButtonState = (button, isActive, inactiveButtonClass) => {
    if (isActive) {
        button.classList.remove(inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(inactiveButtonClass);
        button.disabled = 'disabled';
    }
}

const setEventListeners = (formElement, config) => {
    const inputsList = formElement.querySelectorAll(config.inputSelector);
    const submitButton = formElement.querySelector(config.submitButtonSelector);

    Array.from(inputsList).forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            const isFormValid = formElement.checkValidity();
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(submitButton, isFormValid, config.inactiveButtonClass)
        });
    });

    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault()
        toggleButtonState(submitButton, false, config.inactiveButtonClass);
    })
};

const enableValidation = (config) => {
    const forms = document.querySelectorAll(config.formSelector);
    Array.from(forms).forEach(formElement => {
        setEventListeners(formElement, config);
    });
};

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_invalid',
    inputErrorClass: 'popup__input_state_invalid',
    errorClass: 'error'
};

enableValidation(validationConfig)


