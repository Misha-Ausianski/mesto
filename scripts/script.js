const popup = document.querySelector('.popup');
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
const elementsCardWrap = document.querySelector('.elements');  // создание обертки (место, куда вставляем темплейт элементы)
const cardTemplate = document.querySelector('#card-template').content; // находим темплейт в HTML

// функция открытия popup
const openPopup = (popupName) => {
    popupName.classList.add(popupActive);
}

// функция закрытия popup
const closePopup = (popupName) => {
    popupName.classList.remove(popupActive);
};

// функция лайка карточек
const handelLikeButton = (e) => {
    e.target.classList.toggle('element__like-active');
};

// функция удаления карточек
const handelDeleteButton = (e) => {
    e.target.closest('.element').remove();
};

// функция добавления новой карточки
const formPopupAddCardHandle = (event) => {
    event.preventDefault();
    const item = {
        name: popupAddCardInputCardPlaceName.value,
        link: popupAddCardInputCardPlaceLink.value
    };
    renderCardElement(item, elementsCardWrap);
    popupAddNewCardForm.reset();
    closePopup(popupAddCard);
};

popupAddNewCardForm.addEventListener('submit', formPopupAddCardHandle);

// функция открытия/закрытия popup-modal
const hangleClickCardPhoto = (item) => {
    openPopup(popupPhoto);
    photoPopupItem.src = item.src;
    photoPopupItem.alt = item.alt;
    photoPopupTitle.textContent = item.alt;
};

buttonPopupModalСlose.addEventListener('click', () => {
    closePopup(popupPhoto)});

// функция добавления карточек
const getCardElement = (item) => {
    const cardElement = cardTemplate.cloneNode(true);
    const cardName = cardElement.querySelector('.element__name');
    const cardPhoto = cardElement.querySelector('.element__photo');
    const cardLike = cardElement.querySelector('.element__like');
    const cardDelete =cardElement.querySelector('.element__delete-button');

    cardLike.addEventListener('click', handelLikeButton);
    cardDelete.addEventListener('click', handelDeleteButton);
    cardPhoto.addEventListener('click', () => {
    hangleClickCardPhoto(cardPhoto)});

    cardName.textContent = item.name;
    cardPhoto.src = item.link;
    cardPhoto.alt = item.name;
    return cardElement;
}

const renderCardElement = (item, wrap) => {
    const cardElement = getCardElement(item);
    wrap.prepend(cardElement);
};

initialCards.forEach(item => {
    renderCardElement(item, elementsCardWrap);
});

// popup-profile открытие
function openPopupProfile () {
    popupProfileInputName.value = profileName.textContent;
    popupProfileInputDescription.value = profileDescription.textContent;
    openPopup(popupProfile);
};

buttonProfileEdit.addEventListener('click', openPopupProfile);

// popup-profile закрытие
buttonPopupProfileClose.addEventListener('click', () => {
    closePopup(popupProfile)});

// popup-profile изменение данных
function formPopupProfileHandle (event) {
    event.preventDefault();
    profileName.textContent = popupProfileInputName.value;
    profileDescription.textContent = popupProfileInputDescription.value;
    closePopup(popupProfile);
};

popupProfileForm.addEventListener('submit', formPopupProfileHandle);

// popup-add-card открытие
buttonAddNewCard.addEventListener('click', () => {
    openPopup(popupAddCard)});

// popup-add-card закрытие
buttonPopupAddNewCardClose.addEventListener('click', () => {
    popupAddNewCardForm.reset();
    closePopup(popupAddCard);});





// Закрытие попапов(доп ф-ии)

// document.addEventListener('keydown', function (event) {
//     if (event.code === 'Escape') {
//         closePopup(popupProfile)
//     }
// });

// popup.addEventListener('click', function(event) {
//     if(event.target === popup) {
//         popup.classList.remove(popupActive);
//     }
// });