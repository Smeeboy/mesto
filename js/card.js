export default class Card {
    constructor(cardElementSelector, name, link) {
        this._cardElement = document
            .querySelector(cardElementSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
        this._image = this._cardElement.querySelector('.card__image');
        this._title = this._cardElement.querySelector('.card__title');
        this._likeBtn = this._cardElement.querySelector('.card__button-like');
        this._deleteBtn = this._cardElement.querySelector('.button_action_delete');
        this._setEventListeners();
        this._setprops(name, link);
    }

    _setprops(name, link) {
        this._image.src = link;
        this._image.alt = name;
        this._title.textContent = name;
    }

    get() {
        return this._cardElement
    }

    onImageClick() {
        
    }

    _setEventListeners() {
        this._likeBtn.addEventListener('click', () => {
            this._like();
        });
        this._deleteBtn.addEventListener('click', () => {
            this._delete();
        });

        this._image.addEventListener('click', () => {
            this.onImageClick(this._image.src, this._title.textContent);
        });
    }

    _delete() {
        this._cardElement.remove();
    }

    _like() {
        this._likeBtn.classList.toggle('card__button-like_active')
    }


}