import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor({ popupSelector, handleFormSubmit }) {
        super({ popupSelector });
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
        this._submitButton = this._popup.querySelector('.popup__submit-button');
    }

    _getInputValues() {
        const formValues = {};
        this._inputList.forEach(input => {
            formValues[input.name] = input.value;
        })
        return formValues;
    }

    setEventListeners(){
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    renderLoading(isLoading, text){
        if (isLoading) {
            this._submitButton.textContent = text;
        } else {
            this._submitButton.textContent = text;
        }
    };
}