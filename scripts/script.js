const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonPopupClose = document.querySelector('.popup__close-btn');
const popup = document.querySelector('.popup');
const popupProfile = document.getElementById('popup-profile');
const popupActive = 'popup_active';
const formElement = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__profile_type_name');
const inputDescription = document.querySelector('.popup__profile_type_description');


// popup-profile открытие

function openPopupProfile (event) {
    event.preventDefault();
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
    popupProfile.classList.add(popupActive);
};

buttonProfileEdit.addEventListener('click', openPopupProfile);

// popup закрытие

function closePopup () {
    popup.classList.remove(popupActive);
};

buttonPopupClose.addEventListener('click',closePopup);

popup.addEventListener('click', function(event) {
    if(event.target === popup) {
        popup.classList.remove(popupActive);
    }
});

document.addEventListener('keydown', function (event) {
    if (event.code === 'Escape') {
        closePopup()
    }
});

// popup-profile изменение данных

function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup();
};

formElement.addEventListener('submit', formSubmitHandler);

// popup-add-card открытие

// Как правильно определить попапы и сделать общую функцию закрытия?


// Функция добавления карточек
// initialCards массив 6-и карточек
const elementsCardWrap = document.querySelector('.elements');  // создание обертки (место, куда вставляем темплейт элементы)
const cardTemplate = document.querySelector('#card-template').content; // находим темплейт в HTML

//Функция лайка карточек
const handelLikeButton = (e) => {
    e.target.classList.toggle('element__like-active');
};

//Функция удаления карточек
const handelDeleteButton = (e) => {
    e.target.closest('.element').remove();
};

//находим и наполняем темплейт

const getCardElement = (item) => {
    const cardElement = cardTemplate.cloneNode(true);
    const cardName = cardElement.querySelector('.element__name');
    const cardPhono = cardElement.querySelector('.element__photo');
    const cardLike = cardElement.querySelector('.element__like');
    const cardDelete =cardElement.querySelector('.element__delete-button');
    cardLike.addEventListener('click', handelLikeButton);
    cardDelete.addEventListener('click', handelDeleteButton);
    cardName.textContent = item.name;
    cardPhono.src = item.link;
    cardPhono.alt = item.name;
    return cardElement;
}

const renderCardElement = (item, wrap) => {
    const cardElement = getCardElement(item);
    wrap.prepend(cardElement);
};

initialCards.forEach(item => {
    renderCardElement(item, elementsCardWrap);
});