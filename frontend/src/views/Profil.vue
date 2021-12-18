<template>
  <div id="wrapper">
 <form  @submit.prevent="">
      <my-input name="FirstName" :value="this.firstname.value" type="text"      @update="update" />
      <my-input name="LastName"  :value="this.lastname.value"  type="text"      @update="update"  />
      <my-input name="Email"     :value="this.email.value"     type="email"     @update="update"  />
      <my-input name="Password"  :value="this.password.value"  type="password"  @update="update" />
      <div><input type="checkbox" @click="showPassword" />Show Password</div>
      <my-button color="white" background="#f05454"  :disabled="!valid" value="save" @click="EditUser" />
      <my-button color="white" background="#f05454"  :disabled="!valid" value="Delete Account"  @click="DeleteUser" />
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
      return ( this.firstname.valid &&  this.lastname.valid && this.email.valid &&  this.password.valid);
    },
  },
  methods: {
    async getUser() {
      try {
        const response = await Api.getUserById(this.$store.state.userId);

        if (response.status == 200) {
          this.firstname.value=response.data.firstname;
          this.lastname.value=response.data.lastname;
          this.email.value=response.data.email;
          this.password.value=response.data.password;
        }
      } catch (error) {
        alert(error);
      }
    },

    async DeleteUser() {
      try {
        const response = await Api.deleteUser(this.$store.state.userId);

        if (response.status == 200) {
          alert(response.data.message)
        }
      } catch (error) {
        alert(error);
      }
    },

async EditUser() {
      try {

        const response = await Api.editUser(this.$store.state.userId, {firstname:this.firstname.value,
                                                                           lastname:this.lastname.value,
                                                                           email:this.email.value,
                                                                           password:this.password.value});
        if (response.status == 200) {
         alert(response.data.message)
        }
      } catch (error) {
        alert(error);
      }
    },

    update(payload) {
      this[payload.name] = {
        value: payload.value,
        valid: payload.valid,
      };
    },

    showPassword() {
      var x = document.getElementById("Password");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    },
  },

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