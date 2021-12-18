<template>
  <div id="wrapper">
<h1> Good Bye , successfully logged out!</h1>
  </div>
</template>

<script>


export default {

  methods: {
    async logout() {
      // this.$route.state.token=null;
      // this.$route.state.userId=null
    },
  },

  beforeMount()
  {
    this.logout();
  }
};
</script>

<style>

body {
  font-family: Arial;
  background-color: #e8e8e8;
}

</style>
