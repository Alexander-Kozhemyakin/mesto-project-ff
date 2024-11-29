const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-27/",
  headers: {
    authorization: "9b505028-7a36-4a13-bcda-c759c72913bb",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then((res) => checkResponse(res))
    .catch((err) => console.log(err));
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}cards`, {
    method: "GET",
    headers: config.headers,
  })
    .then((res) => checkResponse(res))
    .catch((err) => console.log(err));
};

export const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((res) => checkResponse(res))
    .catch((err) => console.log(err));
};

export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((res) => checkResponse(res))
    .catch((err) => console.log(err));
};

export const addLikeCardApi = (cardId) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => checkResponse(res))
    .catch((err) => console.log(err));
};

export const deleteLikeCardApi = (cardId) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => checkResponse(res))
    .catch((err) => console.log(err));
};

export function deleteCardApi(cardId) {
  return fetch(`${config.baseUrl}cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => checkResponse(res))
    .catch((err) => console.log(err));
}

export const updateAvatar = (newAvatarLink) => {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatarLink.value,
    }),
  })
    .then((res) => checkResponse(res))
    .catch((err) => console.log(err));
};
