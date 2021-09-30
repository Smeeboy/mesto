let initialCards = [
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

function showImage (link, title) {
    let imageElement = viewImagePopup.querySelector('.popup__img');
    let imageTitle = viewImagePopup.querySelector('.popup__text');
    imageElement.src = link;
    imageTitle.textContent = title;
    openPopup('.popup_card_view');
};
 

function addCardEvents(cardElement) {
    let deleteButton = cardElement.querySelector('.button_action_delete');
    let likeButton = cardElement.querySelector('.card__button-like');
    let cardImage = cardElement.querySelector('.card__image');
    let cardTitle = cardElement.querySelector('.card__title').textContent;
    deleteButton.addEventListener('click', function(evt){
        deleteButton.closest('.card').remove()
    });
    likeButton.addEventListener('click', function(evt){
        likeButton.classList.toggle('card__button-like_active')
    });
    cardImage.addEventListener('click', function(evt){
        showImage(cardImage.src, cardTitle);
    });
};

function addCard(link, name) {
    const cardElement = templateCardElement.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent =  name;
    cardsElement.prepend(cardElement);
    addCardEvents(cardElement)
}
initialCards.forEach(function(item){
    addCard(item.link, item.name);
});

addCardForm.addEventListener('submit', function(evt){
    evt.preventDefault()
    let title = document.querySelector('.form__input_name_text').value;
    let link = document.querySelector('.form__input_name_link').value;
    addCard(link, title);
    closePopup(evt)
});

const allCards =  document.querySelectorAll('.card');


// allCards.forEach(function(cardElement){
//     addCardEvents(cardElement)
// });


const popupEl = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.button_action_edit');
const popupAddCardButton = document.querySelector('.button_action_add');
const popupCloseButtonEls = document.querySelectorAll('.popup__close-button');
const pageEl = document.querySelector('.page');
const leadTitleEl = document.querySelector('.form__button');
const profileTitle = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');

const formElement = popupEl.querySelector('.popup__form');
const nameInput = formElement.querySelector('.form__input_name_title');
const jobInput = formElement.querySelector('.form__input_name_subtitle');

function setPopupInputValue() {
    nameInput.value = profileTitle.textContent.trim();
    jobInput.value = profileText.textContent.trim();
};

function openPopup(classPopup) {
    const popupEl = document.querySelector(classPopup);
    popupEl.classList.add('popup_opened');
    setPopupInputValue();
};

function closePopup(e) {
    e.target.closest('.popup').classList.remove('popup_opened');
};

function setProfileInputValue() {
    profileTitle.textContent = nameInput.value;
    profileText.textContent = jobInput.value;
};

function formSubmitHandler(evt) {
    evt.preventDefault();
    setProfileInputValue();
    closePopup ();
}

popupOpenButton.addEventListener('click', function (){
    openPopup('.popup_profile_edit');
});

popupAddCardButton.addEventListener('click', function (){
    openPopup('.popup_add_card');
});


popupCloseButtonEls.forEach(function (item){
    item.addEventListener('click', closePopup);
});
formElement.addEventListener('submit', formSubmitHandler);