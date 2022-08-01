export class UserInfo {
    constructor({profileName, profileDescription}){
        this._name = document.querySelector(profileName);
        this._description = document.querySelector(profileDescription);
    }

    getUserInfo(){
        const userInfo = {
            name: this._name.textContent,
            description: this._description.textContent
        }
        return userInfo;
    }

    setUserInfo({name, description}){
        this._name.textContent = name,
        this._description.textContent = description;
    }
}
