import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super({ popupSelector });
        this._form = this._popup.querySelector(".popup__form");
        this._handleFormSubmit = handleFormSubmit;
    }

    open(card) {
        this._card = card;
        super.open();
    }

    close() {
        super.close();
    }

    setSubmit({ handleSubmit }) {
        this.submitAction = handleSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._card);
        });
    }
}