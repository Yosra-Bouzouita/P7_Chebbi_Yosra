<template>
  <div>
    <new-post />
    <my-post v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import MyPost from "../components/MyPost.vue";
import Api from "../services/PostService.js";
import NewPost from "../components/NewPost.vue";

export default {
  components: {
    MyPost,
    NewPost,
  },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    //envoie d'une requête getAllPosts: afficher tous les publications
    async getAllPosts() {
      try {
        const response = await Api.getPosts();

        if (response.status == 200) {
          this.posts = response.data;
        }
      } catch (error) {
        alert(error.response.data.error);
      }
    },
  },
  //cette fonction permet d'ajouter du code à exécuter.
  created() {
    this.getAllPosts();
  },
  watch: {
    $route: "getAllPosts",
  },
};
</script>
<style scoped></style>