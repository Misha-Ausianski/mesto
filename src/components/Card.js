export class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._text = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    // забираем разметку из HTML и клонируем элемент
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
            return cardElement;
    }

    // публичный метод, возвращает готовые карточки
    generateCard() {
        this._element = this._getTemplate();

        this._cardImage = this._element.querySelector('.element__photo');
        this._cardImage.src = this._image;
        this._cardImage.alt = this._text
        this._element.querySelector('.element__name').textContent = this._text;
        this._likeButton = this._element.querySelector('.element__like');
        this._deleteButton = this._element.querySelector('.element__delete-button');

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners = () => {
        this._likeButton.addEventListener('click',  this._handleLikeButton);
        this._deleteButton.addEventListener('click', this._handleDeleteButton);
        this._cardImage.addEventListener('click', () => {this._handleCardClick(this._text, this._image)});
    }

    // функция лайка карточки
    _handleLikeButton = () => {
        this._likeButton.classList.toggle('element__like-active');
    }

    // функция удаления карточки
    _handleDeleteButton = () => {
        this._element.remove();
        this._element = null;
    }
}