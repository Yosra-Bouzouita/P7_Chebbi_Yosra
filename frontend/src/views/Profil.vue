<template>
  <div>
      <div class="danger-alert message">{{ errorMessage }}</div>
  </div>

</template>

<script>

import Api from "../services/Auth.js";

export default {
  components: {

  },
  data() {
    return {
    user: Object
    }
  },
  methods: {
    async getUser() {
      try {
          console.log("Sending Request for one user")
        this.errorMessage = "";
        const response = await Api.getUserById(this.$store.state.userId);

        if (response.status == 200){
         this.user=response.data;

        }
        console.log("User : "+JSON.stringify(this.user))
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },

  },
  beforeMount() {
      this.getUser();
    }

};

</script>
<style scoped></style>