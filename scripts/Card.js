import {openPopup, photoPopupItem, photoPopupTitle, popupPhoto} from "./script.js";

export class Card {
    constructor(data, cardSelector) {

        this._text = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
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

        this._element.querySelector('.element__photo').src = this._image;
        this._element.querySelector('.element__name').textContent = this._text;
        this._likeButton = this._element.querySelector('.element__like');
        this._deleteButton = this._element.querySelector('.element__delete-button');

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners = () => {
        this._likeButton.addEventListener('click',  this._handleLikeButton);
        this._deleteButton.addEventListener('click', this._handleDeleteButton);
        this._element.querySelector('.element__photo').addEventListener('click', this._handleImage);
    }

    // функция лайка карточки
    _handleLikeButton = () => {
        this._element.querySelector('.element__like').classList.toggle('element__like-active');
    }

    // функция удаления карточки
    _handleDeleteButton = () => {
        this._element.querySelector('.element__delete-button').closest('.element').remove();
    }

    // функция открытия popup-modal
    _handleImage = () => {
        openPopup(popupPhoto);
        photoPopupItem.src = this._image;
        photoPopupItem.alt = this._text;
        photoPopupTitle.textContent = this._text;
    }
}