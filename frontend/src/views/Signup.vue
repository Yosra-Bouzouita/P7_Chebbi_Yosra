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
        type="lastname"
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

      <my-button
        color="white"
        background=#f05454
        :disabled="!valid"
      />
    </form>
  </div>
</template>

<script>
import MyButton from '../components/MyButton.vue'
import MyInput from '../components/MyInput.vue'
import Auth from "../services/Auth.js"

export default {
  components: {
    MyButton,
    MyInput
  },

  data() {
    return {
        firstname: { value: '', valid: false  },
        lastname:  { value: '', valid: false  },
        email:     { value: '', valid: false  },
        password:  { value: '', valid: false  },
        errorMessage: null
    }
  },

  computed: {
    valid() {
      return this.firstname.valid && this.lastname.valid && this.email.valid && this.password.valid
    }
  },

  methods: {
    async signup() {
      try {
        /*const response = */await Auth.signup({
          firstname: this.firstname.value,
          lastname: this.lastname.value,
          email: this.email.value,
          password: this.password.value,
        });


        this.errorMessage = "";
       /* this.message = response.data.message;
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$store.dispatch("getUserById", response.data.user.id);
        let router = this.$router;
        setTimeout(function() {
          router.push("/posts");
        }, 1500);*/
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },

    update(payload) {
      this[payload.name] = {
        value: payload.value,
        valid: payload.valid
      }
    }
  }
}
</script>

<style>
#wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

body {
  font-family: Arial;
background-color:#e8e8e8;
}

form {
  max-width: 400px;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
