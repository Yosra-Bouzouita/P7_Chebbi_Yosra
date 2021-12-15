<template>
    <div id="wrapper">
 <form @submit.prevent="newpost">
      <my-new-post
        name="imageUrl"
        :value="imageUrl.value"
        type="file"
        @update="update"
      />

      <my-new-post
        name="title"
        :value="title.value"
        type="title"
        @update="update"
      />

      <my-new-post
        name="description"
        :value="description.value"
        type="description"
        @update="update"
      />


      <my-button
        color="white"
        background=#f05454
        :disabled="!valid"
      />
    </form>
    <div class="message">{{ message }}</div>
  </div>
</template>

<script>
import MyButton from '../components/MyButton.vue'
import MyInput from '../components/MyInput.vue'
import MyNewPost from '../components/MyNewPost.vue'
import Auth from "../services/Auth.js"

export default {
  components: {
    MyButton,
    MyInput,
    MyNewPost
  },

  data() {
    return {
        firstname: { value: '', valid: false  },
        lastname:  { value: '', valid: false  },
        email:     { value: '', valid: false  },
        password:  { value: '', valid: false  },
        message: null
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
        const response = await Auth.signup({
          firstname: this.firstname.value,
          lastname: this.lastname.value,
          email: this.email.value,
          password: this.password.value,
        });


        if(response.status ==201)
          this.message = `${this.firstname.value}, Successully signed up!`;
        else
          this.message = `${this.firstname.value}, Failed to signed up!`;
       /*
        let router = this.$router;
        setTimeout(function() {
          router.push("/posts");
        }, 1500);*/
      } catch (error) {
         this.message = `${this.firstname.value}, Failed to signed up!`;
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

<style scoped>
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
