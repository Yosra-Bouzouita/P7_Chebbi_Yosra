<template>
  <div id="wrapper">
    <!-- formulaire de profil de l'utilisateur-->
    <form @submit.prevent="">
      <my-input
        name="FirstName"
        :value="this.firstname.value"
        type="text"
        @update="update"
      />
      <my-input
        name="LastName"
        :value="this.lastname.value"
        type="text"
        @update="update"
      />
      <my-input
        name="Email"
        :value="this.email.value"
        type="email"
        @update="update"
      />

      <my-button
        color="white"
        background="#f05454"
        :disabled="!valid"
        value="save"
        @click="EditUser"
      />
      <my-input
        name="Password"
        :value="this.password.value"
        type="text"
        @update="update"
      />
      <my-button
        color="white"
        background="#f05454"
        :disabled="!passwordValid"
        value="Change password"
        @click="changePassword"
      />
       <my-button
        color="white"
        background="#30475e"
        :disabled="!valid"
        value="Delete account"
        @click="DeleteUser"
      />
    </form>
  </div>
</template>

<script>
import Api from "../requests/Auth.js";
import MyButton from "../components/MyButton.vue";
import MyInput from "../components/MyInput.vue";

export default {
  components: {
    MyButton,
    MyInput,
  },
  //les données de profil qui doivent être affichées
  data() {
    return {
      firstname: { value: "", valid: true },
      lastname: { value: "", valid: true },
      email: { value: "", valid: true },
      password: { value: "", valid: false },
    };
  },
  computed: {
    valid() {
      return this.firstname.valid && this.lastname.valid && this.email.valid;
    },
//fonction pour activer le bouton changer le password si le password est validé
    passwordValid() {
      return this.password.valid;
    },
  },
  methods: {
    //envoie d'une requête getUser: afficher le profil de l'utilisateur dans le formulaire
    async getUser() {
      try {
        const response = await Api.getUserById(this.$store.state.userId);

        if (response.status == 200) {
          this.firstname.value = response.data.firstname;
          this.lastname.value = response.data.lastname;
          this.email.value = response.data.email;
        }
      } catch (error) {
        alert("Message: " + error.message);
      }
    },
    //l'envoie d'une requête DeleteUser: supprimer le profil
    async DeleteUser() {
      try {
        const response = await Api.deleteUser(this.$store.state.userId);


           if (response.status == 200) {
          let router = this.$router;
          setTimeout(function () {
            router.push("/Logout");
          }, 1000);
        }

      } catch (error) {
        alert("Message: " + error.message);
      }
    },
    //l'envoie d'une requête EditUser: modifier le profil
    async EditUser() {
      try {
        const response = await Api.editUser(this.$store.state.userId, {
          firstname: this.firstname.value,
          lastname: this.lastname.value,
          email: this.email.value,
        });
        if (response.status == 200) {
          alert(response.data.message);
        }
      } catch (error) {
        alert("Message: " + error.message);
      }
    },
//l'envoie d'une requête editPassword: modifier le mot de passe
    async changePassword() {
      try {
        const response = await Api.editPassword(this.$store.state.userId, {
          password: this.password.value,
        });
        if (response.status == 200) {
          this.password.value="";
          alert(response.data.message);
        }
      } catch (error) {
        alert("Message: " + error.message);
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
  //Cette fonction  récupère les données de profil que le composant rendra ensuite
  beforeMount() {
    this.getUser();
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
  margin-bottom: 20px;
}
</style>