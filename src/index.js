import "./pages/index.css";
// import { initialCards } from "./scripts/cards.js";
import { closeModal, openModal } from "./components/modals/modal.js";
import { createCard, deleteCard, likeCard } from "./components/card/card.js";
import {
  enableValidation,
  clearValidation,
} from "./components/validations/validation.js";
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  updateAvatar,
  // getAvatar,
} from "./components/api/api.js";
// переменная для карточек
const cardList = document.querySelector(".places__list");
// переменные для профиля карточки
const editButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
// переменные для новых карточек
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
// переменные элементов форм
const popups = document.querySelectorAll(".popup");
const formElementEdit = document.forms["edit-profile"];
const nameInput = formElementEdit.elements["name"];
const jobInput = formElementEdit.elements["description"];
// переменные для открытия модального окна картинки
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image"); //profileEditAvatar
const popupCaption = document.querySelector(".popup__caption");
const profileImage = document.querySelector(".profile__image");
const popupTypeEditAvatar = document.querySelector(".popup_type_edit-avatar"); //popupEditAvatar
// переменные имени для профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
// переменные инпутов для профиля
const newName = document.querySelector(".popup__input_type_name");
const newJob = document.querySelector(".popup__input_type_description");
const formElementEditAvatar = document.forms["edit-avatar"];
const newAvatarLink = formElementEditAvatar.elements["avatar"]; //popupInputTypeUrl
// переменные инпутов для новых карточек
const formElementNewPlace = document.forms["new-place"];
const newPlaceName = formElementNewPlace.elements["place-name"];
const newPlaceLink = formElementNewPlace.elements["link"];
// темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// айдишки
let cardId = "";

const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function preLoadText(btn, text) {
  btn.textContent = text;
}

function renderCard(card, method = "prepend") {
  const cardElement = createCard(
    card,
    deleteCard,
    likeCard,
    handleImageClick,
    cardTemplate,
    cardId
  );
  cardList[method](cardElement);
}

function clickEditButton() {
  clearValidation(configValidation, formElementEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
}

editButton.addEventListener("click", clickEditButton);

function clickProfileButton() {
  clearValidation(configValidation, formElementNewPlace);
  openModal(popupTypeNewCard);
}

profileAddButton.addEventListener("click", clickProfileButton);

function clickProfileImage() {
  clearValidation(configValidation, formElementEditAvatar);
  openModal(popupTypeEditAvatar);
}
// открытие модального окна по клику на картинку
profileImage.addEventListener("click", clickProfileImage);

// функция для замены аватара
function handleFormSubmitEditAvatar(evt) {
  evt.preventDefault();
  const form = evt.target;
  const btn = form.querySelector(".popup__button");
  const input = form.querySelector(".popup__input_type_url");
  preLoadText(btn, "Сохранение...");
  updateAvatar(newAvatarLink)
    .then(() => {
      profileImage.style.backgroundImage = `url(${newAvatarLink.value})`;
      input.value = "";
    })
    .catch((err) => console.log(err))
    .finally(() => preLoadText(btn, "Сохранить"));
  closeModal(popupTypeEditAvatar);
}

formElementEditAvatar.addEventListener("submit", handleFormSubmitEditAvatar);

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target === popup ||
      evt.target === popup.querySelector(".popup__close")
    ) {
      closeModal(popup);
    }
  });
});

function handleImageClick(cardImage, cardDescriptionTitle) {
  const cardImageSrc = cardImage.src;
  const cardImageAlt = cardImage.alt;
  const cardDescriptionTitleText = cardDescriptionTitle.textContent;

  popupImage.src = cardImageSrc;
  popupImage.alt = cardImageAlt;
  popupCaption.textContent = cardDescriptionTitleText;

  openModal(popupTypeImage);
}

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  const form = evt.target;
  const btn = form.querySelector(".popup__button");
  preLoadText(btn, "Сохранение...");
  updateUserInfo(newName.value, newJob.value)
    .then(() => {
      profileTitle.textContent = newName.value;
      profileDescription.textContent = newJob.value;
    })
    .catch((err) => console.log(err))
    .finally(() => preLoadText(btn, "Сохранить"));

  closeModal(popupTypeEdit);
}

formElementEdit.addEventListener("submit", handleFormSubmitEdit);

function handleFormSubmitNewPlace(evt) {
  evt.preventDefault();
  const form = evt.target;
  const btn = form.querySelector(".popup__button");
  preLoadText(btn, "Сохранение...");
  addNewCard(newPlaceName.value, newPlaceLink.value)
    .then((newCard) => {
      renderCard(newCard, "prepend");
      evt.target.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => preLoadText(btn, "Создать"))
  closeModal(popupTypeNewCard);
}

formElementNewPlace.addEventListener("submit", handleFormSubmitNewPlace);

enableValidation(configValidation);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    cardId = user._id;
    profileImage.style.backgroundImage = `url(${user.avatar})`;

    cards.forEach((card) => renderCard(card, "append"));
  })
  .catch((err) => console.log(err));
