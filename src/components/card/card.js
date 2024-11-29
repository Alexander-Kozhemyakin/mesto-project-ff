import { addLikeCardApi, deleteLikeCardApi, deleteCardApi } from "../api/api";

export function createCard(
  card,
  deleteCard,
  likeCard,
  handleImageClick,
  cardTemplate,
  cardId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardDescriptionTitle = cardElement.querySelector(".card__title");
  const cardLikesCounter = cardElement.querySelector(".card__likes-count");

  cardDescriptionTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  if (card.owner._id === cardId) {
    deleteButton.classList.add("card__delete-button-active");
    deleteButton.addEventListener("click", () =>
      deleteCard(card, deleteButton)
    );
  }

  if (card.owner._id === cardId) {
    deleteButton.classList.add("card__delete-button-active");
    deleteButton.addEventListener("click", () =>
      deleteCard(card, deleteButton)
    );
  }

  cardLikesCounter.textContent = card.likes.length;

  if (card.likes.some((like) => like._id === cardId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  cardLikeButton.addEventListener("click", () =>
    likeCard(card, cardLikeButton, cardLikesCounter)
  );

  cardImage.addEventListener("click", () =>
    handleImageClick(cardImage, cardDescriptionTitle)
  );

  return cardElement;
}

export function deleteCard(card, deleteButton) {
  deleteCardApi(card._id)
    .then(() => {
      deleteButton.closest(".places__item").remove();
    })
    .catch((err) => console.log(err));
}

export function likeCard(card, cardLikeButton, cardLikesCounter) {
  if (cardLikeButton.closest(".card__like-button_is-active")) {
    deleteLikeCardApi(card._id)
      .then((res) => {
        cardLikeButton.classList.toggle("card__like-button_is-active");
        cardLikesCounter.textContent = res.likes.length;
      })
      .catch((err) => console.log(err));
  } else {
    addLikeCardApi(card._id)
      .then((res) => {
        cardLikeButton.classList.toggle("card__like-button_is-active");
        cardLikesCounter.textContent = res.likes.length;
      })
      .catch((err) => console.log(err));
  }
}
