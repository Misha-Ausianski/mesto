export class UserInfo {
    constructor({profileName, profileAbout, profileAvatar}){
        this._name = document.querySelector(profileName);
        this._about = document.querySelector(profileAbout);
        this._avatar = document.querySelector(profileAvatar);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent,
            avatar: this._avatar.src
        }
    }

    setUserInfo({name, about}){
        this._name.textContent = name,
        this._about.textContent = about
    }

    setUserAvatar(link){
        this._avatar.src = link;
    }
}
