import './index.css';

import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js"
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { buttonProfileEdit,
    buttonAddNewCard,
    buttonAvatarEdit,
    popupProfileForm,
    popupAddNewCardForm,
    popupAvatarProfile,
    popupProfileInputName,
    popupProfileInputAbout,
    elementsCardWrap,
    formsValidationConfig} from '../utils/constants.js';

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-47', 'a17752ea-bd10-4bb7-94f2-3b255ca27047');

let userId;

// Данные профиля
const pageUserInfo = new UserInfo({
    profileName: '.profile__name',
    profileAbout: '.profile__about',
    profileAvatar: '.profile__avatar-img'
});

// функция создания карточки
const createCard = (data) => {
    const card = new Card (data, '#card-template', handleCardClick, {
        userId: userId,
        handleLikeClick: () => {
            api.addLikeCard(data)
                .then((res) => {
                    card.likesAmountFromServer(res.likes);
                    card.likeCard();
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                })
        },
        handleDislikeClick: () => {
            api.deleteLikeCard(data)
                .then((res) => {
                    card.likesAmountFromServer(res.likes);
                    card.dislike();
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                })
        },
        handleDeleteButton: () => {
            confirmPopup.open(data);
            confirmPopup.setSubmit({
                handleSubmit: () =>{
                    api.deleteCard(data)
                    .then(() => {
                        confirmPopup.close();
                        card.deleteCard()
                    })
                    .catch((err) => {
                        console.log(`Ошибка: ${err}`);
                    })
                }
            })
        }
    });
    return card.generateCard();
}

// Рендер карточек
const cardList = new Section({
    render: (item) => {
        const createdCard = createCard(item)
        cardList.setItem(createdCard);
    }
}, elementsCardWrap);


// Создание всех форм и popup


// Создание формы(popup) добавления карточки
const addCardPopup = new PopupWithForm({
    popupSelector: '.popup-add-card',
    handleFormSubmit: handlerCardSubmit
});
addCardPopup.setEventListeners();

// Создание формы(popup) редактирования профиля
const profilePopup = new PopupWithForm({
    popupSelector: '.popup-profile',
    handleFormSubmit: handleProfileDataSubmit
});
profilePopup.setEventListeners();

// Создание формы(popup) изменения аватара профиля
const avatarPopup = new PopupWithForm({
    popupSelector: '.popup-avatar',
    handleFormSubmit: handlerAvatarSubmit
})
avatarPopup.setEventListeners();

// Создание popup фото
const imagePopup = new PopupWithImage({
    popupSelector: '.popup-modal'
});
imagePopup.setEventListeners();

// Создание popup подтверждения удаления карточки
const confirmPopup = new PopupWithConfirmation({
    popupSelector: '.popup-confirm',
    handleFormSubmit: () => confirmPopup.submitAction(),
});
confirmPopup.setEventListeners();


// Открытие всех форм и popup


// Открытие popup(формы) добавления карточки
buttonAddNewCard.addEventListener('click', () => {
    addCardFormValidation.clearValidation(addCardPopup);
    addCardPopup.open();
});

// Открытие popup(формы) редактирования профиля
buttonProfileEdit.addEventListener('click', () => {
    profilePopup.open();
    popupProfileInputName.value = pageUserInfo.getUserInfo().name;
    popupProfileInputAbout.value = pageUserInfo.getUserInfo().about;
    profileFormValidation.clearValidation();
});

// Открытие popup(формы) изменения аватара
buttonAvatarEdit.addEventListener('click', () => {
    avatarPopup.open();
    avatarProfileValidation.clearValidation();
})

// Открытие popup фото по клику на карточку
const handleCardClick = (name, link) => {
    imagePopup.open(name, link);
}

// Создание функций отправки данных

// Отправка нового аватара на сервер
function handlerAvatarSubmit(formData){
    avatarPopup.renderLoading(true, 'Сохранение...');
    api.changeProfileAvatar(formData.link)
        .then((res) => {
            pageUserInfo.setUserAvatar(res.avatar);
            avatarPopup.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            avatarPopup.renderLoading(false, 'Сохранить')
        })
}

// Отправка новой карточки на сервер
function handlerCardSubmit(formData) {
    addCardPopup.renderLoading(true, 'Сохранение...');
    api.addNewCard(formData)
        .then((res) => {
            const createdCard = createCard(res)
            cardList.setItem(createdCard);
            addCardPopup.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            addCardPopup.renderLoading(false, 'Сохранить')
        })
}

// Отправка новых данных профиля на сервер
function handleProfileDataSubmit(formData){
    profilePopup.renderLoading(true, 'Сохранение...');
    api.changeProfileData(formData)
        .then((res) => {
            pageUserInfo.setUserInfo({
                name: res.name,
                about: res.about
            });
            profilePopup.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            profilePopup.renderLoading(false, 'Сохранить')
        })
}


// Получение данных сервера при загрузке страницы
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, cards]) => {
    userId = data._id;
    pageUserInfo.setUserInfo(data);
    pageUserInfo.setUserAvatar(data.avatar)
    cardList.renderItems(cards.reverse());
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
})

// Валидация всех форм

// Добавление валидации форме редактирования профиля
const profileFormValidation = new FormValidator(formsValidationConfig, popupProfileForm);
profileFormValidation.enableValidation();

// Добавление валидации форме добавления новой карточки
const addCardFormValidation = new FormValidator(formsValidationConfig, popupAddNewCardForm);
addCardFormValidation.enableValidation();

// Добавление валидации форме добавления нового аватара
const avatarProfileValidation = new FormValidator(formsValidationConfig, popupAvatarProfile);
avatarProfileValidation.enableValidation();
