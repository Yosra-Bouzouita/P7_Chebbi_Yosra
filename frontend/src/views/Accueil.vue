<template>
  <div>
    <h1>POSTS1</h1>
    <my-post v-for="post in posts" :key="post.id" :description=post.description :title=post.title :id=post.id :imageUrl=post.imageUrl :date=post.date />
  </div>
</template>

<script>
import MyPost from "../components/MyPost.vue";
import Api from "../services/PostService.js";

export default {
  components: {
    MyPost,
  },
  data() {
    return {
    posts: []
    }
  },
  methods: {
    async getAllPosts() {
      try {
        this.errorMessage = "";
        const response = await Api.getPosts();

        if (response.status == 200){
          this.$router.push("/Accueil");
          this.posts=response.data;
        }
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },

  },
  beforeMount() {
      this.getAllPosts();
    }
};
</script>
<style scoped></style>