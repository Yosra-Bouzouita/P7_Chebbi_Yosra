import Api from "../requests/Api";

export default {
  signup(data) {
    return Api().post("auth/signup", data);
  },
  login(data) {
    return Api().post("auth/login", data);
  },
  deleteUser(id) {
    return Api().delete("auth/user/" + id);
  },
  editPassword(id, data) {
    return Api().put("auth/user/password/" + id, data);
  },
  editUser(id, data) {
    return Api().put("auth/user/" + id, data);
  },
  getUsers() {
    return Api().get("auth/user");
  },
  getUserById(id) {
    return Api().get("auth/user/" + id);
  }
};