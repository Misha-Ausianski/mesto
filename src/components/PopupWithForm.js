import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor({ popupSelector, handleFormSubmit }) {
        super({ popupSelector });
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll('.popup__input');
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
            this.close();
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}