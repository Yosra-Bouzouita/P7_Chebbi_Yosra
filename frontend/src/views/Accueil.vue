<template>
  <div>
    <my-post
      v-for="post in posts"
      :key="post.id"
      :description="post.description"
      :title="post.title"
      :firstname="post.user.firstname"
      :lastname="post.user.lastname"
      :imageUrl="post.imageUrl"
      :date="post.date"
      :likes="post.likes"
      :userId="post.userId"
      :postId="post.id"
    />
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
      posts: [],
    };
  },
  methods: {
    async getAllPosts() {
      try {
        console.log("Request all posts " + this.$store.state.token)
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