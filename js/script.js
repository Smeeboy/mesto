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
const formElement = profilePopup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.form__input_name_title');
const jobInput = formElement.querySelector('.form__input_name_subtitle');
const allPopups = document.querySelectorAll('.popup');


function showImage(link, title) {
    imageElement.src = link;
    imageTitle.textContent = title;
    imageTitle.alt = title;
    openPopup(popupCardView);
};

function addCardEvents(cardElement) {
    const deleteButton = cardElement.querySelector('.button_action_delete');
    const likeButton = cardElement.querySelector('.card__button-like');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title').textContent;
    deleteButton.addEventListener('click', function (evt) {
        deleteButton.closest('.card').remove()
    });
    likeButton.addEventListener('click', function (evt) {
        likeButton.classList.toggle('card__button-like_active')
    });
    cardImage.addEventListener('click', function (evt) {
        showImage(cardImage.src, cardTitle);
    });
};

function createCard(link, name) {
    const cardElement = templateCardElement.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    addCardEvents(cardElement);
    return cardElement
}

function addCard(link, name) {
    const cardElement = createCard(link, name);
    cardsElement.prepend(cardElement);
}

function setPopupInputValue() {
    nameInput.value = profileTitle.textContent.trim();
    jobInput.value = profileText.textContent.trim();
    nameInput.dispatchEvent(new Event('input', { bubbles: true }));
    jobInput.dispatchEvent(new Event('input', { bubbles: true }));
};

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
            closePopup(document.querySelector('.popup_opened'));
            document.removeEventListener('keydown', function () {
                closePopup();
            });
        };
    });
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

function setProfileInputValue() {
    profileTitle.textContent = nameInput.value;
    profileText.textContent = jobInput.value;
};

function formSubmitHandler(evt) {
    evt.preventDefault();
    setProfileInputValue();
    closePopup(evt.target.closest('.popup'));
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
formElement.addEventListener('submit', formSubmitHandler);
