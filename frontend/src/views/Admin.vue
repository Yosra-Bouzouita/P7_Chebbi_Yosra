<template>
  <div>
    <!-- tableau de tous les utilisateurs dans la page admin -->
    <table class="table ">
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
    //envoie d'une requête getUsers: afficher tous les utilisateurs
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
  // Recupérer toutes les utilisateurs avant de charger la page
  beforeMount() {
    this.getUsers();
  },
  watch: {
    $route: "getUsers",
  },
};
</script>
<style scoped>
table{

word-wrap: break-word;
}
@media all and (min-width: 460px) and (max-width: 540px)
{
table{
font-size:0.8em ;
width: 40%;
}
}
@media all and (max-width:460px)
{
table{

font-size:0.6em ;


}
}

</style>