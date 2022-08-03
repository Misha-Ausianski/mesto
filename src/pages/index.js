import './index.css';

import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from '../utils/constants.js';
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { buttonProfileEdit, buttonAddNewCard, popupProfileForm, popupAddNewCardForm, popupProfileInputName, popupProfileInputDescription, elementsCardWrap, formsValidationConfig} from '../utils/constants.js';

// создание popup фото
const imagePopup = new PopupWithImage({ popupSelector: '.popup-modal'});
imagePopup.setEventListeners();

// открытие popup фото
const handleCardClick = (name, link) => {
    imagePopup.open(name, link);
}

// Создание popup профиля
const profilePopup = new PopupWithForm({
    popupSelector: '.popup-profile',
    handleFormSubmit: (formData) => {
        pageUserInfo.setUserInfo({
            name: formData.editProfileName,
            description: formData.editProfileDescription,
        });
    },
});
profilePopup.setEventListeners();

// данные профиля
const pageUserInfo = new UserInfo({
    profileName: '.profile__name',
    profileDescription: '.profile__description'
});

// открытие popup профиля
buttonProfileEdit.addEventListener('click', () => {
    profilePopup.open();
    popupProfileInputName.value = pageUserInfo.getUserInfo().name;
    popupProfileInputDescription.value = pageUserInfo.getUserInfo().description;
    profileFormValidation.clearValidation();
});

// функция создания карточки
const createCard = (item) => {
    const card = new Card (item, '#card-template', handleCardClick);
    return card.generateCard();
}

const cardList = new Section({
    items: initialCards,
    render: (item) => {
        const createdCard = createCard(item)
        cardList.setItem(createdCard);
    }
}, elementsCardWrap);

cardList.renderItems();

// создание popup добавления карточки
const addCardPopup = new PopupWithForm({
    popupSelector: '.popup-add-card',
    handleFormSubmit: (formData) => {
        const createdCard = createCard(formData)
        cardList.setItem(createdCard);
    }
});

addCardPopup.setEventListeners();

// открытие popup добавления карточки
buttonAddNewCard.addEventListener('click', () => {
    addCardFormValidation.clearValidation(addCardPopup);
    addCardPopup.open();
});

// добавление валидации форме профиля
const profileFormValidation = new FormValidator(formsValidationConfig, popupProfileForm);
profileFormValidation.enableValidation();

// добавление валидации форме добавления новой карточки
const addCardFormValidation = new FormValidator(formsValidationConfig, popupAddNewCardForm);
addCardFormValidation.enableValidation();