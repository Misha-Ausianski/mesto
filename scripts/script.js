import { Card } from "./Card.js";
import { initialCards } from "./cards.js";
import { FormValidator } from "./FormValidator.js";

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
}

// функция закрытия popup
const closePopup = (popupName) => {
    popupName.classList.remove(popupActive);
    document.removeEventListener('keydown', closePopupKeydownEsc);
};

// Закрытие попапов(клик по оверлею)
const closePopupOverlayClick = (event) => {
    if (event.target.classList.contains('popup')) {
        closePopup(event.target);
    }
};

// Закрытие попапов(нажатие на esc)
const closePopupKeydownEsc = (event) => {
    if (event.code === 'Escape') {
        const popupActiveClose = document.querySelector('.popup_active');
        closePopup(popupActiveClose);
    }
};

// popup-profile открытие
const openPopupProfile = () => {
    popupProfileInputName.value = profileName.textContent;
    popupProfileInputDescription.value = profileDescription.textContent;
    openPopup(popupProfile);
    ProfileFormValidation.clearValidation(popupProfile);
};

// popup-profile изменение данных
const handlePopupProfileForm = (event) => {
    event.preventDefault();
    profileName.textContent = popupProfileInputName.value;
    profileDescription.textContent = popupProfileInputDescription.value;
    popupAddNewCardForm.reset();
    closePopup(popupProfile);
};

// функция добавления новой карточки
const handleFormPopupAddCard = (event) => {
    event.preventDefault();
    const item = {
        name: popupAddCardInputCardPlaceName.value,
        link: popupAddCardInputCardPlaceLink.value
    };

    const card = new Card(item, '#card-template');
    const cardElement = card.generateCard();
    elementsCardWrap.prepend(cardElement);

    popupAddNewCardForm.reset();
    closePopup(popupAddCard);
};

// добавление карточек
initialCards.forEach((item) => {
    const card = new Card(item, '#card-template');
    const cardElement = card.generateCard();
    elementsCardWrap.prepend(cardElement);
});

[...popups].forEach(popup => popup.addEventListener('click', closePopupOverlayClick))

buttonProfileEdit.addEventListener('click', openPopupProfile);

buttonAddNewCard.addEventListener('click', () => {
    openPopup(popupAddCard);
    AddCardFormValidation.clearValidation(popupAddCard);
});

popupAddNewCardForm.addEventListener('submit', handleFormPopupAddCard);

popupProfileForm.addEventListener('submit', handlePopupProfileForm);

buttonPopupModalСlose.addEventListener('click', () => {
    closePopup(popupPhoto)});

buttonPopupProfileClose.addEventListener('click', () => {
    closePopup(popupProfile)});

buttonPopupAddNewCardClose.addEventListener('click', () => {
    closePopup(popupAddCard);});

const ProfileFormValidation = new FormValidator(formsValidationConfig, popupProfileForm);
ProfileFormValidation.enableValidation();

const AddCardFormValidation = new FormValidator(formsValidationConfig, popupAddNewCardForm);
AddCardFormValidation.enableValidation();

export {openPopup, photoPopupItem, photoPopupTitle, popupPhoto};