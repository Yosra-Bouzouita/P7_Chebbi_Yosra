<template>
    <div id="wrapper">
 <form @submit.prevent="submit">
      <my-input
        name="FirstName"
        :rules="{ required: true }"
        :value="firstname.value"
        type="text"
        @update="update"
      />

      <my-input
        name="LastName"
        :rules="{ required: true }"
        :value="lastname.value"
        type="lastname"
        @update="update"
      />

      <my-input
        name="Email"
        :rules="{ required: true }"
        :value="email.value"
        type="email"
        @update="update"
      />

      <my-input
        name="Password"
        :rules="{ required: true, min: 8 }"
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
import MyButton from './MyButton.vue'
import MyInput from './MyInput.vue'

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
        password:  { value: '', valid: false  }
    }
  },

  computed: {
    valid() {
      return this.firstname.valid && this.lastname.valid && this.email.valid && this.password.valid
    }
  },

  methods: {
    submit() {
      console.log('Submit')
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
  margin-top: 200px;
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
