export class Card {
    constructor(data, cardSelector, handleCardClick,{ userId, handleLikeClick, handleDislikeClick, handleDeleteButton }) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = userId;
        this._ownerId = data.owner._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDislikeClick = handleDislikeClick;
        this._handleDeleteButton = handleDeleteButton;
    }

    // Берем разметку из HTML и клонируем элемент
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

            return cardElement;
    }

    // Метод возвращающий готовую карточку
    generateCard() {
        this._element = this._getTemplate();

        this._cardImage = this._element.querySelector('.element__photo');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name
        this._element.querySelector('.element__name').textContent = this._name;
        this._likesAmountOnPage = this._element.querySelector('.element__likes-amount');
        this._likeButton = this._element.querySelector('.element__like');
        this._deleteButton = this._element.querySelector('.element__delete-button');

        this.likesAmountFromServer(this._likes);
        this._removeDeleteButton();
        this._showLikeCard();
        this._setEventListeners();

        return this._element;
    }

    // Обработка лайка карточки
    // _changeCardLike () {
        // if (this._likeButton.classList.contains("element__like-active")) {
        //     this._handleDislikeClick();
        // } else {
        //     this._handleLikeClick();
        // }
    // }

    // Слушатель событий для карточки
    _setEventListeners = () => {
        this._likeButton.addEventListener('click', () => {
            if (this._likeButton.classList.contains("element__like-active")) {
                this._handleDislikeClick();
            } else {
                this._handleLikeClick();
            }
        });

        this._deleteButton.addEventListener('click', this._handleDeleteButton);

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });
    }

    // Скрытие уд-я карточки
    _removeDeleteButton() {
        if(this._id !== this._ownerId) {
            this._deleteButton.style.display = "none";
        }
    }

    // Установка лайка карточке
    likeCard(){
        this._likeButton.classList.add("element__like-active");
    }

    // Снятие лайка с карточки
    dislike(){
        this._likeButton.classList.remove("element__like-active");
    }

    // Количество лайков карточки(данные с сервера)
    likesAmountFromServer(likes){
        if (likes.length === 0) {
            this._likesAmountOnPage.textContent = '';
        } else {
            this._likesAmountOnPage.textContent = likes.length;
        }
    }

    // Отображение лайков на карточках от пользователя(активные), c сервера
    _showLikeCard(){
        this._likes.forEach((like) => {
            if (this._id === like._id) {
              this._likeButton.classList.add('element__like-active');
            }
        });
    }

    // Функция удаления карточки
    deleteCard() {
        this._element.remove();
        this._element = null;
    }
}