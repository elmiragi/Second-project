export class TokenStorage {
  LOCAL_KEY = "access_auth";
  REMEMBER_KEY = "remember_auth";
  setRemember(value: boolean) {
    localStorage.setItem(this.LOCAL_KEY, value.toString());
  }
}
