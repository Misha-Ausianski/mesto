const formsValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'error_type_visible',
    submitButtonSelector: '.popup__submit-button',
    submitButtonErrorClass: 'popup__submit-button_invalid'
}

function enableValidation(data) {
    const forms = [...document.querySelectorAll(data.formSelector)];
    forms.forEach(form => addFormListeners(form, data));
}

function addFormListeners (form, config) {
    form.addEventListener('submit', handleSubmit);
    form.addEventListener('input', () => setSubmitButtonState(form, config));
    const inputs =[...form.querySelectorAll(config.inputSelector)];
    inputs.forEach(input => input.addEventListener('input', () => handleFild(form, input, config)))
    setSubmitButtonState(form, config)
}

function handleSubmit(event) {
    event.preventDefault();
}

function handleFild (form, input, config) {
    if (input.validity.valid) {
        hideError(form, input, config);
    } else {
        showError(form, input, config);
    }
}

function showError(form, input, config) {
    input.classList.add(config.inputErrorClass);
    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = input.validationMessage;
}

function hideError(form, input, config) {
    input.classList.remove(config.inputErrorClass)
    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = ''
}

function setSubmitButtonState(form, config) {
    const button = form.querySelector(config.submitButtonSelector);
    button.disabled = !form.checkValidity();
    button.classList.toggle(config.submitButtonErrorClass, !form.checkValidity())
}

enableValidation(formsValidationConfig);