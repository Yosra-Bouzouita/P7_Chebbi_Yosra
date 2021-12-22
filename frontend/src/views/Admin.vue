<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">FirstName</th>
          <th scope="col">LastName</th>
          <th scope="col">Email</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <my-admin v-for="user in users" :key="user.id" :user="user" />
      </tbody>
    </table>
  </div>
</template>

<script>
import MyAdmin from "../components/MyAdmin.vue";
import Api from "../requests/Auth.js";

export default {
  components: {
    MyAdmin,
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    //envoie d'une requête getAllPosts: afficher tous les publications
    async getUsers() {
      try {
        const response = await Api.getUsers();

        if (response.status == 200) {
          this.users = response.data;
        }
      } catch (error) {
        console.log("getUsers: " + error.message);
      }
    },
  },
  // Recupérer toutes les posts avant de charger la page
  beforeMount() {
    this.getUsers();
  },
  watch: {
    $route: "getUsers",
  },
};
</script>
<style scoped></style>