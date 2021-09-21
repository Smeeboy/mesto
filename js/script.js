const popupEl = document.querySelector('.popup');
const popupCloseButtonEl = document.querySelector('.popup__close-button');
const leadTitleEl = document.querySelector('.form__button');
const profileTitle = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');

const formElement = popupEl.querySelector('.popup__form');
const nameInput = formElement.querySelector('.form__input-name-title');
const jobInput = formElement.querySelector('.form__input-name-subtitle');

function openPopup() {
    popupEl.classList.add('popup_opened');
    setPopupInputValue();
}

function closePopup (evt) {
    const closeBtn = evt.target;
    console.log (closeBtn);

    if (closeBtn.classList.contains ('popup__close-button')) {
        closeBtn.closest ('.popup').classList.remove('popup_opened');
    }
}

popupCloseButtonEl.addEventListener('click', closePopup)

function setPopupInputValue() {
    nameInput.value = profileTitle.textContent.trim();
    jobInput.value = profileText.textContent.trim();
}

function setProfileInputValue() {
    profileTitle.innerHTML = nameInput.value;
    profileText.innerHTML = jobInput.value;
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    setProfileInputValue();
    popupEl.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
// popupEl.addEventListener('click', function (evt) {
    
//     popupEl.classList.remove('popup_opened')
// });