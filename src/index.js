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

const add_icon = new URL("./images/add-icon.svg", import.meta.url);
const avatar = new URL("./images/avatar.jpg", import.meta.url);
const card_1 = new URL("./images/card_1.jpg", import.meta.url);
const card_2 = new URL("./images/card_2.jpg", import.meta.url);
const card_3 = new URL("./images/card_3.jpg", import.meta.url);
const close_svg = new URL("./images/close.svg", import.meta.url);
const delete_icon = new URL("./images/delete-icon.svg", import.meta.url);
const edit_icon = new URL("./images/edit-icon.svg", import.meta.url);
const like_active = new URL("./images/like-active.svg", import.meta.url);
const like_inactive = new URL("./images/like-inactive.svg", import.meta.url);
const logo = new URL("./images/logo.svg", import.meta.url);
const images = [
  { name: "add_icon", link: add_icon },
  { name: "avatar", link: avatar },
  { name: "card_1", link: card_1 },
  { name: "card_2", link: card_2 },
  { name: "card_3", link: card_3 },
  { name: "close_svg", link: close_svg },
  { name: "delete_icon", link: delete_icon },
  { name: "edit_icon", link: edit_icon },
  { name: "like_active", link: like_active },
  { name: "like_inactive", link: like_inactive },
  { name: "logo", link: logo },
];

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

editButton.addEventListener("click", () => {
  clearValidation(configValidation, formElementEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
});

profileAddButton.addEventListener("click", () => {
  clearValidation(configValidation, formElementNewPlace);
  openModal(popupTypeNewCard);
});

// открытие модального окна по клику на картинку
profileImage.addEventListener("click", () => {
  clearValidation(configValidation, formElementEditAvatar);
  openModal(popupTypeEditAvatar);
});

// функция для замены аватара
function handleFormSubmitEditAvatar(evt) {
  evt.preventDefault();
  const form = evt.target;
  const btn = form.querySelector(".popup__button");
  const input = form.querySelector(".popup__input_type_url");
  preLoadText(btn, "Сохранение...");
  updateAvatar(newAvatarLink).then(() => {
    profileImage.style.backgroundImage = `url(${newAvatarLink.value})`;
    preLoadText(btn, "Сохранить");
    input.value = "";
  });
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
  updateUserInfo(newName.value, newJob.value).then(() => {
    profileTitle.textContent = newName.value;
    profileDescription.textContent = newJob.value;
    preLoadText(btn, "Сохранить");
  });

  closeModal(popupTypeEdit);
}

formElementEdit.addEventListener("submit", handleFormSubmitEdit);

function handleFormSubmitNewPlace(evt) {
  evt.preventDefault();
  const form = evt.target;
  const btn = form.querySelector(".popup__button");
  preLoadText(btn, "Сохранение...");
  addNewCard(newPlaceName.value, newPlaceLink.value).then((newCard) => {
    renderCard(newCard, "prepend");
    preLoadText(btn, "Создать");
  });
  closeModal(popupTypeNewCard);
  evt.target.reset();
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
