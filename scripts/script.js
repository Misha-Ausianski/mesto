import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { popupPhoto, openPopup, closePopup, closePopupOverlayClick, initialCards } from './utils.js';

const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const popupProfile = document.getElementById('popup-profile');
const popupAddCard = document.getElementById('popup-add-card');
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
const elementsCardWrap = document.querySelector('.elements');
const popups = document.querySelectorAll('.popup');

const formsValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'error_type_visible',
    submitButtonSelector: '.popup__submit-button',
    submitButtonErrorClass: 'popup__submit-button_invalid'
}

// popup-profile открытие
const openPopupProfile = () => {
    popupProfileInputName.value = profileName.textContent;
    popupProfileInputDescription.value = profileDescription.textContent;
    openPopup(popupProfile);
    profileFormValidation.clearValidation(popupProfile);
};

// popup-profile изменение данных
const handlePopupProfileForm = (event) => {
    event.preventDefault();
    profileName.textContent = popupProfileInputName.value;
    profileDescription.textContent = popupProfileInputDescription.value;
    popupAddNewCardForm.reset();
    closePopup(popupProfile);
};

// функция создания карточки
const createCard = (item) => {
    const card = new Card (item, '#card-template');
    return card.generateCard();
}

// функция рендера карточки
const renderCard = (item) => {
    const cardElement = createCard(item);
    elementsCardWrap.prepend(cardElement);
};

// добавление карточек
initialCards.forEach((item) => {
    renderCard(item);
});

// функция добавления новой карточки
const handleFormPopupAddCard = (event) => {
    event.preventDefault();
    const item = {
        name: popupAddCardInputCardPlaceName.value,
        link: popupAddCardInputCardPlaceLink.value
    };

    renderCard(item);

    popupAddNewCardForm.reset();
    closePopup(popupAddCard);
};

[...popups].forEach(popup => popup.addEventListener('click', closePopupOverlayClick))

buttonProfileEdit.addEventListener('click', openPopupProfile);

buttonAddNewCard.addEventListener('click', () => {
    openPopup(popupAddCard);
    addCardFormValidation.clearValidation(popupAddCard);
});

popupAddNewCardForm.addEventListener('submit', handleFormPopupAddCard);

popupProfileForm.addEventListener('submit', handlePopupProfileForm);

buttonPopupModalСlose.addEventListener('click', () => {
    closePopup(popupPhoto)});

buttonPopupProfileClose.addEventListener('click', () => {
    closePopup(popupProfile)});

buttonPopupAddNewCardClose.addEventListener('click', () => {
    closePopup(popupAddCard);});

const profileFormValidation = new FormValidator(formsValidationConfig, popupProfileForm);
profileFormValidation.enableValidation();

const addCardFormValidation = new FormValidator(formsValidationConfig, popupAddNewCardForm);
addCardFormValidation.enableValidation();