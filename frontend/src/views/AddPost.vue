<template>
  <div>

<h1>New Post</h1>
  </div>
</template>

<script>

import Api from "../services/PostService.js";

export default {
  components: {
    MyPost,
  },
  data() {
    return {

    }
  },
  methods: {
    async createPost() {
      try {
        this.errorMessage = "";
        const response = await Api.createPost();

        if (response.status == 200){
          this.$router.push("/Accueil");
        }
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },

  }
};
</script>
<style scoped></style>