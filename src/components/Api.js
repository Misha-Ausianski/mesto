export class Api{
    constructor(url, token){
        this._url = url;
        this._token = token;
    }

    // Метод обработки ответа c сервера
    _getJsonOrError(res){
        if (res.ok){
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    // Получение карточек с сервера
    getInitialCards(){
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._token,
            },
        })
        .then(this._getJsonOrError);
    }

    // Отправка новой карточки на сервер
    addNewCard(data){
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'content-type': "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            })
        })
        .then(this._getJsonOrError);
    }

    // Удаление карточки с сервера
    deleteCard(data){
        return fetch(`${this._url}/cards/${data._id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'content-type': "application/json",
            },
        })
        .then(this._getJsonOrError);
    }

    // Лайк карточки(сервер)
    addLikeCard(data){
        return fetch(`${this._url}/cards/${data._id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
                'content-type': "application/json",
            },
        })
        .then(this._getJsonOrError);
    }

    // Удаление лайка карточки(сервер)
    deleteLikeCard(data){
        return fetch(`${this._url}/cards/${data._id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'content-type': "application/json",
            },
        })
        .then(this._getJsonOrError);
    }

    // Получение данных профиля с сервера
    getUserInfo(){
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._token,
            },
        }).then(this._getJsonOrError);
    }

    // Отправка новых данных профиля на сервер
    changeProfileData(data){
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'content-type': "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            })
        })
        .then(this._getJsonOrError);
    }

    // Отправка нового аватара пользователя на сервер
    changeProfileAvatar(data){
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'content-type': "application/json",
            },
            body: JSON.stringify({
                avatar: data,
            })
        })
        .then(this._getJsonOrError);
    }
}