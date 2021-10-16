
const showError = (errorElement, inputElement, inputErrorClass) => {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(inputErrorClass);
}

const hideError = (errorElement, inputElement, inputErrorClass) => {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.remove(inputErrorClass);
}


const checkLengthValidity = inputElement => {
    const min = inputElement.minLength;
    const max = inputElement.maxLength;
    if (min > 0 && !max) {
        inputElement.setCustomValidity(`Вы пропустили это поле. Минимальная длина ${min} символов`)
    } else if (!min && max > 0) {
        inputElement.setCustomValidity(`Вы пропустили это поле. Максимальная длина ${max} символов`)
    } else if (min > 0 && max > 0) {
        inputElement.setCustomValidity(`Вы пропустили это поле. Длина текста от ${min} до ${max} символов `)
    }
};

const checkUrlValidity = inputElement => {
    if (inputElement.type === 'url') {
        inputElement.setCustomValidity(`Введите адрес сайта.`);
    }
};

const checkInputValidity = (formElement, inputElement, config) => {
    inputElement.setCustomValidity("");
    const isInputNotValid = !inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (isInputNotValid) {
        checkLengthValidity(inputElement);
        checkUrlValidity(inputElement);
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


function handleClosePopupClick(evt) {
    const target = evt.target;
    if (target.classList.contains('popup__close-button') || target.classList.contains('popup')) {
        closePopup();
    }
}

function openPopup(popUp) {
    popUp.classList.add('popup_active');
    page.addEventListener('click', handlerClosePopupClick);
    document.addEventListener('keydown', closePopupKey)
}

function closePopup() {
    const activePopup = document.querySelector('.popup_active');
    if (activePopup) {
        activePopup.classList.remove('popup_active');
        page.removeEventListener('click', handlerClosePopupClick);
        document.removeEventListener('keydown', closePopupKey)
    };
}
