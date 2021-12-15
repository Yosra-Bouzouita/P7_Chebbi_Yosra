<template>
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
import Auth from "../services/Auth.js";

export default {
  components: {
    MyButton,
    MyInput,
  },

  data() {
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

  methods: {
    async login() {
      console.log("send login data : ");

      try {
        this.errorMessage = "";
        const response = await Auth.login({
          email: this.email.value,
          password: this.password.value,
        });

        if (response.status == 200) {
          this.$store.state.token = response.data.token;
          this.$store.state.userId = response.data.userId;
          this.$router.push("/Accueil");
        }
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },

    update(payload) {
      this[payload.name] = {
        value: payload.value,
        valid: payload.valid,
      };
    },
  },
};
</script>

<style>
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
