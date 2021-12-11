import Api from "../services/Api";

export default {
  signup(data) {
    return Api().post("auth/signup", data);
  },
  login(data) {
    return Api().post("auth/login", data);
  },
  deleteAccount(id) {
    return Api().delete("auth/accounts/" + id);
  },

  updateAccount(id, data) {
    return Api.put("auth/accounts/" + id, data);
  },
  getUsers() {
    return Api().get("auth/accounts");
  },
  getUserById(id) {
    return Api().get("auth/accounts/" + id);
  },
};