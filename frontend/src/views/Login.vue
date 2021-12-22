<template>
  <!-- formulaire de login -->
  <div id="wrapper">
    <form @submit.prevent="login">
      <my-input
        name="Email"
        :value="email.value"
        type="email"
        @update="update"
      />

      <my-input
        name="Password"
        :value="password.value"
        type="password"
        @update="update"
      />

      <my-button color="white" background="#f05454" :disabled="!valid" />
    </form>
    <div class="danger-alert message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import MyButton from "../components/MyButton.vue";
import MyInput from "../components/MyInput.vue";
import Auth from "../requests/Auth.js";
const jwt = require("jsonwebtoken");

export default {
  components: {
    MyButton,
    MyInput,
  },

  data() {
    //les données qui permet de valider et remplir le formulaire
    return {
      email: { value: "", valid: false },
      password: { value: "", valid: false },
      errorMessage: null,
    };
  },

  computed: {
    valid() {
      return this.email.valid && this.password.valid;
    },
  },
  //envoie d'une requête login
  methods: {
    async login() {
      try {
        this.errorMessage = "";
        const response = await Auth.login({
          email: this.email.value,
          password: this.password.value,
        });

        if (response.status == 200) {
          var decoded = jwt.verify(response.data.token, "RANDOM_TOKEN_SECRET");

          /* enregistrement de token pour l'utiliser tout au long de la session pour envoyer
   des requêtes au backend*/
          this.$store.state.token = response.data.token;
          /* enregistrement de userId pour l'utiliser dans quelques requêtes envoyer au backend*/
          this.$store.state.userId = decoded.userId;
          /*enregistrement de isAdmin pour afficher tous les boutons lorsque l'administrateur
 connecte et peut controler tous les publications et les commentaires*/
          this.$store.state.isAdmin = decoded.isAdmin;
          this.$router.push("/Home");
        }
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },
    //transmettre les données entre composants
    update(payload) {
      this[payload.name] = {
        value: payload.value,
        valid: payload.valid,
      };
    },
  },
};
</script>

<style scoped>
#wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

body {
  font-family: Arial;
  background-color: #e8e8e8;
}

form {
  max-width: 400px;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.danger-alert {
  color: red;
}
</style>
