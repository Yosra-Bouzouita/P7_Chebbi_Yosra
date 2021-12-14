import Api from "../services/Api";

export default {
  getPosts() {
    return Api().get("post/");
  },
  getPostById(id) {
    return Api().get("post/" + id);
  },
  createPost(data) {
    return Api().post("post/", data);
  },
  updatePost(id, data) {
    return Api.put("post/" + id, data);
  },

  deletePost(id) {
    return Api().delete("post/" + id);
  },
  likePost(id) {
    return Api().post("post/like/" + id) + "/like";
  },

  commentPost(id, data) {
    return Api().post("post/" + id + "/comments", data);
  },

  deleteComment(id) {
    return Api().delete("posts/comments/" + id);
  },
};