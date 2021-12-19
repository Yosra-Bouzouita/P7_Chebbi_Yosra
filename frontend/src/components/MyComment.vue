<template>
  <main class="limitedWidthBlockContainer">
    <div class="limitedWidthBlock">
      <div class="titles">
        <small class="form-text text-muted">{{ comment.user.firstname }} {{ comment.user.lastname }} écrit :{{ comment.message }} id [{{comment.id}}]</small>
      <div id="btn">
        <button
          type="button"
          v-show="
            this.$store.state.userId == comment.user.id ||
            this.$store.state.isAdmin == 1
          "
          id="btn_delete"
          class="btn btn-success add-btn btn-lg"
          @click="deleteComment()"
        >
          delete
        </button></div></div>
    </div>
  </main>
</template>

<script>

import Api from "../services/PostService.js";

export default {
  props: {
    comment: {
      type: Object,
    },
  },
  data: function () {
    return { };
  },
  methods: {
        async deleteComment() {
                    try {
        const response = await Api.deleteComment(this.comment.id);
       if (response.status == 200) {
          let router = this.$router;

          setTimeout(function () {
            router.push({ name: "Home", params: { date: Date.now() } });
          }, 1000);
        }
      } catch (error) {
        alert(error.response.data.error);
      }
    },

  },
};
</script>

<style scoped>

</style>