const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const buttonAvatarEdit = document.querySelector('.profile__avatar');
const popupProfileForm = document.querySelector('[name="popup-profile-info"]');
const popupAddNewCardForm = document.querySelector('[name="popup-add-card"]');
const popupAvatarProfile = document.querySelector('[name="popup-avatar"]');
const popupProfileInputName = document.querySelector('.popup__input_type_name');
const popupProfileInputAbout = document.querySelector('.popup__input_type_about');
const elementsCardWrap = document.querySelector('.elements');

// Конфиг валидации
const formsValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error_type_visible',
  submitButtonSelector: '.popup__submit-button',
  submitButtonErrorClass: 'popup__submit-button_invalid'
};

export {buttonProfileEdit,
        buttonAddNewCard,
        buttonAvatarEdit,
        popupProfileForm,
        popupAddNewCardForm,
        popupAvatarProfile,
        popupProfileInputName,
        popupProfileInputAbout,
        elementsCardWrap,
        formsValidationConfig,
      };