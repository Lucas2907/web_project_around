export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._aboutSelector = document.querySelector(aboutSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
    this._currentUser = null;
  }

  getInfo() {
    return this._currentUser;
  }

  updateInfo() {
    if (this._currentUser) {
      this._nameSelector.textContent = this._currentUser.name;
      this._aboutSelector.textContent = this._currentUser.about;
      this._avatarSelector.src = this._currentUser.avatar;
    }
  }

  setInfo({ name, about, avatar }) {
    this._currentUser = { name, about, avatar };
    this.updateInfo();
  }
}
