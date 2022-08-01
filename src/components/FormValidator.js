export class FormValidator {
    constructor(config, formElement) {

        this._formElement = formElement;
        this._inputSelector = config.inputSelector;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._submitButton = formElement.querySelector(config.submitButtonSelector);
        this._submitButtonErrorClass = config.submitButtonErrorClass;
        this._inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector));
    }

    // показать ошибку
    _showError (inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    }

    // скрыть ошибку
    _hideError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass)
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = ''
    }

    // состояние кнопки
    _setSubmitButtonState() {
        this._submitButton.disabled = !this._formElement.checkValidity();
        this._submitButton.classList.toggle(this._submitButtonErrorClass, !this._formElement.checkValidity())
    }

    _addFormListeners () {
        this._formElement.addEventListener('submit', this._handleSubmit)
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._handleField(inputElement);
                this._setSubmitButtonState();
            });
        })
    }

    // отмена стандартного поведения формы
    _handleSubmit(e) {
        e.preventDefault();
    }

    // проверка на валидность
    _handleField(inputElement) {
        if (inputElement.validity.valid) {
            this._hideError(inputElement);
        } else {
            this._showError(inputElement);
        }
    };

    clearValidation(){
        this._inputList.forEach((inputElement) => this._hideError(inputElement))
        this._setSubmitButtonState();
    }

    enableValidation() {
        this._addFormListeners();
    }
}
