// popup открытие
let buttonProfileEdit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupActive = 'popup_active';

const openPopup = function() {
    popup.classList.add(popupActive);
};

buttonProfileEdit.addEventListener('click', openPopup);

// popup закрытие
let buttonProfileEditClose = document.querySelector('.popup__close-btn');

const closePopup = function() {
    popup.classList.remove(popupActive);
};

buttonProfileEditClose.addEventListener('click', closePopup);

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

// popup изменение данных

let formElement = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.innerHTML = evt.target.elements.name.value;
    profileDescription.innerHTML = evt.target.elements.description.value;
    closePopup();
};

formElement.addEventListener('submit', formSubmitHandler);