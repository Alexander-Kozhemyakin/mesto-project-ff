// const configValidation = {
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button_disabled",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__error_visible",
// };
// функция отображения ошибки
function visibleError(inputElement, errorElement, configValidation) {
  inputElement.classList.add(configValidation.inputErrorClass);
  errorElement.classList.add(configValidation.errorClass);
  errorElement.textContent = inputElement.validationMessage;
}
// функция скрытия ошибки
function hideError(inputElement, errorElement, configValidation) {
  inputElement.classList.remove(configValidation.inputErrorClass);
  errorElement.classList.remove(configValidation.errorClass);
  errorElement.textContent = "";
}
// функция проверки валидного ввода
function checkInputValidity(inputElements) {
  return inputElements.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
// функция валидации
export function enableValidation(configValidation) {
  const formElements = document.querySelectorAll(configValidation.formSelector);
  formElements.forEach((formElement) => {
    // находим кнопки и инпуты фомры
    const buttonElement = formElement.querySelector(
      configValidation.submitButtonSelector
    );
    const inputElements = Array.from(
      formElement.querySelectorAll(configValidation.inputSelector)
    );
    // на каждый инпут кидаем слушатель показывающий data-message и валидацию
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        const errorElement = formElement.querySelector(
          `#${inputElement.name}-error`
        );

        if (inputElement.validity.patternMismatch) {
          inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
          inputElement.setCustomValidity("");
        }

        if (inputElement.validity.valid) {
          hideError(inputElement, errorElement, configValidation);
          buttonElement.disabled = checkInputValidity(inputElements);
          if (!checkInputValidity(inputElements)) {
            buttonElement.classList.remove(
              configValidation.inactiveButtonClass
            );
          }
        } else {
          visibleError(inputElement, errorElement, configValidation);
          buttonElement.disabled = checkInputValidity(inputElements);
          if (checkInputValidity(inputElements)) {
            buttonElement.classList.add(configValidation.inactiveButtonClass);
          }
        }
      });
    });
  });
}
// функция сброса валидации
export function clearValidation(configValidation, formElement) {
  const inputElements = Array.from(
    formElement.querySelectorAll(configValidation.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    configValidation.submitButtonSelector
  );

  inputElements.forEach((input) => {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    hideError(input, errorElement, configValidation);
    buttonElement.disabled = checkInputValidity(inputElements);
    if (checkInputValidity(inputElements)) {
      buttonElement.classList.add(configValidation.inactiveButtonClass);
    }
  });
}
