import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPictureFullscreen = this._popup.querySelector('.popup__picture-fullscreen');
        this._popupPictureName = this._popup.querySelector('.popup__picture-name');
    }

    open (name, link) {
        this._popupPictureName.textContent = name;
        this._popupPictureFullscreen.src = link;
        this._popupPictureFullscreen.alt = name;

        super.open();
    }
}