import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const templateCardElement = document.querySelector('#card').content;
const cardsElement = document.querySelector('.cards');
const addCardForm = document.querySelector('#AddCardForm');
const viewImagePopup = document.querySelector('.popup_card_view');
const imageElement = viewImagePopup.querySelector('.popup__img');
const imageTitle = viewImagePopup.querySelector('.popup__text');
const popupAddCard = document.querySelector('.popup_add_card');
const popupCardView = document.querySelector('.popup_card_view');
const popupProfileEdit = document.querySelector('.popup_profile_edit');
const allCards = document.querySelectorAll('.card');
const profilePopup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.button_action_edit');
const popupAddCardButton = document.querySelector('.button_action_add');
const popupCloseButtonEls = document.querySelectorAll('.popup__close-button');
const pageEl = document.querySelector('.page');
const leadTitleEl = document.querySelector('.form__button');
const profileTitle = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');
const profileEditForm = profilePopup.querySelector('.popup__form');
const nameInput = profileEditForm.querySelector('.form__input_name_title');
const jobInput = profileEditForm.querySelector('.form__input_name_subtitle');
const allPopups = document.querySelectorAll('.popup');


function showImage(link, title) {
    imageElement.src = link;
    imageTitle.textContent = title;
    imageTitle.alt = title;
    openPopup(popupCardView);
};

function addCard(link, name) {
    const card = new Card('#card', name, link);
    card.onImageClick = showImage;
    cardsElement.prepend(card.get());
}

function setPopupInputValue() {
    nameInput.value = profileTitle.textContent.trim();
    jobInput.value = profileText.textContent.trim();
    nameInput.dispatchEvent(new Event('input', { bubbles: true }));
    jobInput.dispatchEvent(new Event('input', { bubbles: true }));
};


function handlerKeydownClosePopup(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    };
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handlerKeydownClosePopup);
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handlerKeydownClosePopup);
};


function setProfileInputValue() {
    profileTitle.textContent = nameInput.value;
    profileText.textContent = jobInput.value;
};

function formSubmitHandler(formElement) {
    setProfileInputValue();
    closePopup(formElement.closest('.popup'));
}


initialCards.forEach(function (item) {
    addCard(item.link, item.name);
});

allPopups.forEach(function (popup) {
    popup.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup')) {
            closePopup(popup);
        }
    });
});


addCardForm.addEventListener('submit', function (evt) {
    evt.preventDefault()
    const formInputText = document.querySelector('.form__input_name_text');
    const formInputLink = document.querySelector('.form__input_name_link');
    const title = formInputText.value;
    const link = formInputLink.value;
    addCard(link, title);
    evt.target.reset();
    closePopup(evt.target.closest('.popup'))
});



popupOpenButton.addEventListener('click', function () {
    openPopup(popupProfileEdit);
    setPopupInputValue();
});

popupAddCardButton.addEventListener('click', function () {
    openPopup(popupAddCard);
});


popupCloseButtonEls.forEach(function (item) {
    item.addEventListener('click', function (evt) {
        closePopup(evt.target.closest('.popup'));
    });
});
// profileEditForm.addEventListener('submit', formSubmitHandler);

const formSettings = {
    inputSelector: '.form__input',
    submitSelector: '.form__button',
    inputErrorClass: 'popup__input_state_invalid',
    inactiveButtonClass: 'form__button_invalid',
}

const profileEditFormValidator = new FormValidator(formSettings, profileEditForm, formSubmitHandler);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(formSettings, addCardForm);
addCardFormValidator.enableValidation();
