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
   return Api().put("post/" + id, data);
  },

  deletePost(id) {
    return Api().delete("post/" + id);
  },
  likePost(data) {
    return Api().post("post/like/",data)
  },

  commentPost(data) {
    return Api().post("post/comment", data);
  },

  deleteComment(id) {
    return Api().delete("post/comment/" + id);
  },
};