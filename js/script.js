const popupEl = document.querySelector('.popup');
const popupCloseButtonEl = document.querySelector('.popup__close-button');
const pageEl = document.querySelector('.page');
const leadTitleEl = document.querySelector('.form__button');
const profileTitle = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');

const formElement = popupEl.querySelector('.popup__form');
const nameInput = formElement.querySelector('.form__input-name-title');
const jobInput = formElement.querySelector('.form__input-name-subtitle');

function setPopupInputValue() {
    nameInput.value = profileTitle.textContent.trim();
    jobInput.value = profileText.textContent.trim();
}

function openPopup() {
    popupEl.classList.add('popup_opened');
    pageEl.classList.add('page_openpopup');
    setPopupInputValue();
}

function closePopup() {
    popupEl.classList.remove('popup_opened');
    pageEl.classList.remove('page_openpopup');
}

function setProfileInputValue() {
    profileTitle.textContent = nameInput.value;
    profileText.textContent = jobInput.value;
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    setProfileInputValue();
    closePopup ();
}

popupCloseButtonEl.addEventListener('click', closePopup)
formElement.addEventListener('submit', formSubmitHandler);
// popupEl.addEventListener('click', function (evt) {

//     popupEl.classList.remove('popup_opened')
// });