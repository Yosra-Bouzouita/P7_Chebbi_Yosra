<template>
  <div id="wrapper">
    <form @submit.prevent="ModifyUser">
      <my-input
        name="FirstName"
        :value="this.user.firstname"
        type="text"
        @update="update"
      />

      <my-input
        name="LastName"
        :value="this.user.lastname"
        type="text"
        @update="update"
      />

      <my-input
        name="Email"
        :value="this.user.email"
        type="email"
        @update="update"
      />

      <my-input
        name="Password"
        :value="this.user.password"
        type="password"
        @update="update"
      />
      <div><input type="checkbox" @click="showPassword()" />Show Password</div>

      <my-button
        color="white"
        background="#f05454"
        :disabled="!valid"
        value="save"
      />
    </form>
    <div class="message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import Api from "../services/Auth.js";
import MyButton from "../components/MyButton.vue";
import MyInput from "../components/MyInput.vue";

export default {
  components: {
    MyButton,
    MyInput,
  },
  data() {
    return {
      user: Object,
      firstname: { value: "", valid: true },
      lastname: { value: "", valid: true },
      email: { value: "", valid: true },
      password: { value: "", valid: true },
      errorMessage: null,
    };
  },
  computed: {
    valid() {
      return (
        this.firstname.valid &&
        this.lastname.valid &&
        this.email.valid &&
        this.password.valid
      );
    },
  },
  methods: {
    async getUser() {
      try {
        this.errorMessage = "";
        const response = await Api.getUserById(this.$store.state.userId);

        if (response.status == 200) {
          this.user = response.data;
        }
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },

    async  ModifyUser()
    {
      alert("Add code to modify user ..")
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

  created() {
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