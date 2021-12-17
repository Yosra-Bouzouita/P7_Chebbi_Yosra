<template>
  <div id="wrapper">
    <form @submit.prevent="signup">
      <my-input
        name="FirstName"
        :value="firstname.value"
        type="text"
        @update="update"
      />

      <my-input
        name="LastName"
        :value="lastname.value"
        type="text"
        @update="update"
      />

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

      <my-button color="white" background="#f05454" :disabled="!valid"  value="Signup"/>
    </form>
    <div class="message">{{ message }}</div>
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
      firstname: { value: "", valid: false },
      lastname: { value: "", valid: false },
      email: { value: "", valid: false },
      password: { value: "", valid: false },
      message: null,
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
    async signup() {
      try {
        const response = await Auth.signup({
          firstname: this.firstname.value,
          lastname: this.lastname.value,
          email: this.email.value,
          password: this.password.value,
        });

        if (response.status == 201) {
          this.message = `${this.firstname.value}, Successully signed up!`;
          let router = this.$router;
          setTimeout(function () {
            router.push("/");
          }, 1000);
        } else this.message = `${this.firstname.value}, Failed to signed up!`;
      } catch (error) {
        this.message = `${this.firstname.value}, Failed to signed up!`;
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
</style>
