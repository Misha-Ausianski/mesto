export class Popup {
    constructor({ popupSelector }){
        this._popup = document.querySelector(popupSelector);
        this._popupCloseButton = this._popup.querySelector('.popup__close-btn');
    }

    // открытие popup
    open() {
        this._popup.classList.add('popup_active');
        document.addEventListener('keydown', this._handleEscClose);
    }

    // закрытие popup
    close() {
        this._popup.classList.remove('popup_active');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._popupCloseButton.addEventListener('click', () => {
            this.close(this._popup)
        });

        this._popup.addEventListener('click', this._handleOverlayClose)
    }

    // закрытие popup при нажатии на Esc
    _handleEscClose = (event) => {
        if (event.code === 'Escape') {
            this.close();
        }
    }

    // закрытие popup при клике на Overlay
    _handleOverlayClose = (event) => {
        if (event.target.classList.contains('popup')) {
            this.close();
        }
    }
}