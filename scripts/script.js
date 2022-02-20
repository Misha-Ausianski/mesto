const popupActive = 'popup_active';
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const popupProfile = document.getElementById('popup-profile');
const popupAddCard = document.getElementById('popup-add-card');
const popupPhoto = document.getElementById('popup-modal');
const buttonPopupProfileClose = popupProfile.querySelector('.popup__close-btn');
const buttonPopupAddNewCardClose = popupAddCard.querySelector('.popup__close-btn');
const buttonPopupModalСlose = popupPhoto.querySelector('.popup__close-btn');
const popupProfileForm = document.querySelector('[name="popup-profile-info"]');
const popupAddNewCardForm = document.querySelector('[name="popup-add-card"]');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupProfileInputName = document.querySelector('.popup__input_type_name');
const popupProfileInputDescription = document.querySelector('.popup__input_type_description');
const popupAddCardInputCardPlaceName = popupAddCard.querySelector('.popup__input_type_place-name');
const popupAddCardInputCardPlaceLink = popupAddCard.querySelector('.popup__input_type_place-link');
const photoPopupItem = popupPhoto.querySelector('.popup__picture-fullscreen');
const photoPopupTitle = popupPhoto.querySelector('.popup__picture-name');
const elementsCardWrap = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;
const popups = document.querySelectorAll('.popup');
const formsValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'error_type_visible',
    submitButtonSelector: '.popup__submit-button',
    submitButtonErrorClass: 'popup__submit-button_invalid'
}

// функция открытия popup
const openPopup = (popupName) => {
    popupName.classList.add(popupActive);
    document.addEventListener('keydown', closePopupKeydownEsc);
    const form = popupName.querySelector('form')
        if (form) {
            fetchValidation(form, formsValidationConfig)
            setSubmitButtonState(form, formsValidationConfig);
        }
}

// функция закрытия popup
const closePopup = (popupName) => {
    popupName.classList.remove(popupActive);
    document.removeEventListener('keydown', closePopupKeydownEsc);
};

// Закрытие попапов(доп ф-ии)
const closePopupOverlayClick = (event) => {
    if (event.target.classList.contains('popup')) {
        closePopup(event.target);
    }
};

const closePopupKeydownEsc = (event) => {
    if (event.code === 'Escape') {
        const popupActiveClose = document.querySelector('.popup_active');
        closePopup(popupActiveClose);
    }
};

// функция лайка карточек
const handleLikeButton = (event) => {
    event.target.classList.toggle('element__like-active');
};

// функция удаления карточек
const handleDeleteButton = (event) => {
    event.target.closest('.element').remove();
};

// функция добавления новой карточки
const handleFormPopupAddCard = (event) => {
    event.preventDefault();
    const item = {
        name: popupAddCardInputCardPlaceName.value,
        link: popupAddCardInputCardPlaceLink.value
    };
    renderCardElement(item, elementsCardWrap);
    popupAddNewCardForm.reset();
    closePopup(popupAddCard);
};

// функция открытия popup-modal
const handleClickCardPhoto = (item) => {
    openPopup(popupPhoto);
    photoPopupItem.src = item.src;
    photoPopupItem.alt = item.alt;
    photoPopupTitle.textContent = item.alt;
};

// функция добавления карточек
const createCard = (item) => {
    // const cardElement = cardTemplate.cloneNode(true);
    const cardElement= cardTemplate.querySelector('.element').cloneNode(true);
    const cardName = cardElement.querySelector('.element__name');
    const cardPhoto = cardElement.querySelector('.element__photo');
    const cardLike = cardElement.querySelector('.element__like');
    const cardDelete =cardElement.querySelector('.element__delete-button');

    cardLike.addEventListener('click', handleLikeButton);
    cardDelete.addEventListener('click', handleDeleteButton);
    cardPhoto.addEventListener('click', () => {
    handleClickCardPhoto(cardPhoto)});

    cardName.textContent = item.name;
    cardPhoto.src = item.link;
    cardPhoto.alt = item.name;
    return cardElement;
}

const renderCardElement = (item, wrap) => {
    const cardElement = createCard(item);
    wrap.prepend(cardElement);
};

initialCards.forEach(item => {
    renderCardElement(item, elementsCardWrap);
});

// popup-profile открытие
const openPopupProfile = () => {
    popupProfileInputName.value = profileName.textContent;
    popupProfileInputDescription.value = profileDescription.textContent;
    openPopup(popupProfile);
};

// popup-profile изменение данных
const handlePopupProfileForm = (event) => {
    event.preventDefault();
    profileName.textContent = popupProfileInputName.value;
    profileDescription.textContent = popupProfileInputDescription.value;
    popupAddNewCardForm.reset();
    closePopup(popupProfile);
};

enableValidation(formsValidationConfig);

[...popups].forEach(popup => popup.addEventListener('click', closePopupOverlayClick))

buttonProfileEdit.addEventListener('click', openPopupProfile);

buttonAddNewCard.addEventListener('click', () => {
    openPopup(popupAddCard)});

popupAddNewCardForm.addEventListener('submit', handleFormPopupAddCard);

popupProfileForm.addEventListener('submit', handlePopupProfileForm);

buttonPopupModalСlose.addEventListener('click', () => {
    closePopup(popupPhoto)});

buttonPopupProfileClose.addEventListener('click', () => {
    closePopup(popupProfile)});

buttonPopupAddNewCardClose.addEventListener('click', () => {
    closePopup(popupAddCard);});