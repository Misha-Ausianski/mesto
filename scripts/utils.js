const SelectorPopupActive = 'popup_active';
const popupPhoto = document.getElementById('popup-modal');
const photoPopupItem = popupPhoto.querySelector('.popup__picture-fullscreen');
const photoPopupTitle = popupPhoto.querySelector('.popup__picture-name');

// функция открытия popup
const openPopup = (popupName) => {
    popupName.classList.add(SelectorPopupActive);
    document.addEventListener('keydown', closePopupKeydownEsc);
}

// функция закрытия popup
const closePopup = (popupName) => {
    popupName.classList.remove(SelectorPopupActive);
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
        const SelectorPopupActiveClose = document.querySelector('.popup_active');
        closePopup(SelectorPopupActiveClose);
    }
};

// Массив с данными карточек
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export {photoPopupItem, photoPopupTitle, popupPhoto, initialCards, openPopup, closePopup, closePopupOverlayClick, closePopupKeydownEsc};