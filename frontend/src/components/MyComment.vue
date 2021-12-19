<template>
  <main class="limitedWidthBlockContainer">
    <div class="limitedWidthBlock">
      <div class="titles">
        <small class="form-text text-muted">{{ comment.user.firstname }} {{ comment.user.lastname }} écrit :{{ comment.message }}</small>
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
          console.log("Delete comment, not yet developped , 7obi");
    },

  },
};
</script>

<style scoped>

</style>