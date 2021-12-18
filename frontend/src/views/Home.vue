<template>
  <div>
    <new-post/>
    <my-post
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
  </div>
</template>

<script>
import MyPost from "../components/MyPost.vue";
import Api from "../services/PostService.js";
import NewPost from "../components/NewPost.vue";

export default {
  components: {
    MyPost,
    NewPost
  },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    async getAllPosts() {
      try {
        this.errorMessage = "";
        const response = await Api.getPosts();

        if (response.status == 200) {
          this.posts = response.data;
        }
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },
  },
  created() {
    this.getAllPosts();
  },
  watch:
  {
    '$route':'getAllPosts'
  }

};
</script>
<style scoped></style>