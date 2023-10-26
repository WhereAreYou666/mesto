export default class UserInfo {

    constructor(data) {
        this._nameSelector = data.name;
        this._jobSelector = data.job; 
        this._avatar = data.avatar;
        this._avatarSelector = document.querySelector(this._avatar);
        this._nameProfile = document.querySelector(this._nameSelector);
        this._jobProfile = document.querySelector(this._jobSelector);
    }

    getUserInfo() {
        const userInfo = {
            name: this._nameProfile.textContent,
            job: this._jobProfile.textContent,
            avatar: this._avatar.src
        }
        return userInfo;
    }

    setUserInfo({name, about, avatar, _id}) {
        this.userId = _id;
        this._nameProfile.textContent = name;
        this._jobProfile.textContent = about;
        this._avatarSelector.src = avatar;
    }
}