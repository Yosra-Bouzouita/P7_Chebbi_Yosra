<template>
  <div id="wrapper">
<h1> Good Bye , successfully logged out!</h1>
  </div>
</template>

<script>


export default {

  methods: {
    async logout() {
      this.$store.state.token=null;
       this.$store.state.userId=null
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
