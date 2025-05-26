export default class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInfoUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._headers,
      },
    });
  }

  setUserInfo({ name, about, avatar }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
        avatar
      }),
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._headers,
      },
    });
  }

  createCard(newCard) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCard),
    });
  }

  updateLike(cardId) {
    return fetch(
      `https://around-api.pt-br.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: {
          authorization: this._headers,
        },
      }
    );
  }
  removeLike(cardId) {
    return fetch(
      `https://around-api.pt-br.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization: this._headers,
        },
      }
    );
  }

  deleteCard(cardId) {
    return fetch(
      `https://around-api.pt-br.tripleten-services.com/v1/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: this._headers,
        },
      }
    );
  }

  changeProfileImage({avatar}) {
    return fetch(
      "https://around-api.pt-br.tripleten-services.com/v1/users/me/avatar",
      {
        method: "PATCH",
        headers: {
          authorization: this._headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar,
        }),
      }
    );
  }
}
