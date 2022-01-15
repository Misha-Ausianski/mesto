let buttonProfileEdit = document.querySelector('.profile__edit-button');
let buttonProfileEditClose = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');
let popupActive = 'popup_active';
let formElement = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let inputName = document.querySelector('.popup__profile_type_name');
let inputDescription = document.querySelector('.popup__profile_type_description');
// popup открытие

function openPopup (event) {
    event.preventDefault();
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
    popup.classList.add(popupActive);
};

buttonProfileEdit.addEventListener('click', openPopup);

// popup закрытие

function closePopup () {
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

function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup();
};

formElement.addEventListener('submit', formSubmitHandler);