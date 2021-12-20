<template>
  <div id="wrapper">
    <!-- formulaire de profil de l'utilisateur-->
 <form  @submit.prevent="">
      <my-input name="FirstName" :value="this.firstname.value" type="text"      @update="update" />
      <my-input name="LastName"  :value="this.lastname.value"  type="text"      @update="update"  />
      <my-input name="Email"     :value="this.email.value"     type="email"     @update="update"  />
      <my-button color="white" background="#f05454"  :disabled="!valid" value="save" @click="EditUser" />
      <my-button color="white" background="#f05454"  :disabled="!valid" value="Delete Account"  @click="DeleteUser" />
      <my-input name="New Password" :value="this.password.value"          type="text"      @update="update"  />
      <my-button color="white" background="#f05454"  :disabled="!passwordValid" value="Change password"  @click="changePassword" />

    </form>
  </div>
</template>

<script>
import Api      from "../services/Auth.js";
import MyButton from "../components/MyButton.vue";
import MyInput  from "../components/MyInput.vue";

export default {
  components: {
    MyButton,
    MyInput,
  },
  data() {
    return {
      firstname: { value: "", valid: true },
      lastname:  { value: "", valid: true },
      email:     { value: "", valid: true },
      password:  { value: "", valid: true },
    };
  },
  computed: {
    valid() {
      return ( this.firstname.valid &&  this.lastname.valid && this.email.valid);
    },

    passwordValid() {
      return ( this.password.valid);
    },
  },
  methods: {
    //envoie d'une requête getUser: afficher le profil de l'utilisateur dans le formulaire
    async getUser() {
      try {
        const response = await Api.getUserById(this.$store.state.userId);

        if (response.status == 200) {
          this.firstname.value=response.data.firstname;
          this.lastname.value=response.data.lastname;
          this.email.value=response.data.email;
        }
      } catch (error) {
        alert("Message: " + error.message);
      }
    },
//envoie d'une requête DeleteUser: supprimer le profil
    async DeleteUser() {
      try {
        const response = await Api.deleteUser(this.$store.state.userId);

        if (response.status == 200) {
          alert(response.data.message)
        }
      } catch (error) {
        alert("Message: " + error.message);
      }
    },
//envoie d'une requête EditUser: modifier le profil
async EditUser() {
      try {

        const response = await Api.editUser(this.$store.state.userId, {firstname:this.firstname.value,
                                                                           lastname:this.lastname.value,
                                                                           email:this.email.value});
        if (response.status == 200) {
         alert(response.data.message)
        }
      } catch (error) {
        alert("Message: " + error.message);
      }
    },

    async changePassword() {
      try {
        const response = await Api.editPassword(this.$store.state.userId, {password:this.password.value});
        if (response.status == 200) {
         // this.password.value="";
         alert(response.data.message)
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
}
</style>