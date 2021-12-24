<template>
  <main class="limitedWidthBlockContainer">
    <div class="limitedWidthBlock">
      <div class="titles">
        <!--Le nom et le prénom de l'utilisateur qui fait le commentaire-->
        <div class="form-text text-muted">
          {{ comment.user.firstname }} {{ comment.user.lastname }} écrit:
          {{ comment.message }}
        </div>
        <!-- Le bouton delete qui s'affiche que pour le commentaire de l'utilisateur et pour l'admin-->
        <button
          type="button"
          v-show="
            this.$store.state.userId == comment.user.id ||
            this.$store.state.isAdmin == 1
          "
          @click="deleteComment()"
        >
          delete
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import Api from "../requests/PostService.js";

export default {
  props: {
    comment: {
      type: Object,
    },
  },
  data: function () {
    return {};
  },
  methods: {
    //Envoi d'une requête deleteComment: supprimer le commentaire
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
        alert("Message: " + error.message);
      }
    },
  },
};
</script>

<style scoped>
.text-muted {
  word-wrap: break-word;
  margin-right: 20px;
  margin-left: 20px;
  text-decoration-color: black;
}

</style>