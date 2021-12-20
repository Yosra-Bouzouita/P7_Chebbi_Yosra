<template>
  <div id="wrapper">
    <h4>Good Bye , successfully logged out!</h4>
  </div>
</template>

<script>
export default {
  //la fonction logout pour déconnecter(vider le token et le userId)
  methods: {
    async logout() {
      this.$store.state.token = null;
      this.$store.state.userId = null;
    },
  },
//exécuter la fonction logout avant d'afficher la page
  beforeMount() {
    this.logout();
  },
};
</script>

<style>
body {
  font-family: Arial;
  background-color: #e8e8e8;
}
</style>
