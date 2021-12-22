<template>
  <tr v-show="this.user.isAdmin === 0">
    <td :for="name">{{ user.id }}</td>
    <td :for="name">{{ user.firstname }}</td>
    <td :for="name">{{ user.lastname }}</td>
    <td :for="name">{{ user.email }}</td>

    <td>
      <button
        type="button"
        id="btn_delete"
        @click="DeleteUser()"
      >
        delete
      </button>
    </td>
  </tr>
</template>

<script>
import Api from "../requests/Auth.js";

export default {
  props: {
    user: {
      type: Object,
    },
  },
  methods: {
    //l'envoie d'une requête DeleteUser: supprimer le profil
    async DeleteUser() {
      try {
        const response = await Api.deleteUser(this.user.id);

        if (response.status == 200) {
          let router = this.$router;
          setTimeout(function () {
            router.push({ name: "Admin", params: { date: Date.now() } });
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
#btn_delete{
background-color:rgb(240, 84, 84) ;
color:white;
}
</style>