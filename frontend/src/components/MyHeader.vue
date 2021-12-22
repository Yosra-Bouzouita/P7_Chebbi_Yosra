<template>
<!-- Header -->
  <header>
    <div class="header">
      <div>
        <img
          id="logo"
          src="../assets/icon-left-font-monochrome-white.png"
          alt="Logo"
        />
      </div>
      <div>
        <div id="nav">
          <!-- Les liens de header:une icône de login,une icône de signup,une icône de la page d'accueil
          une icône de profil et une icône pour déconnecter -->
          <router-link to="/">       <i v-show="this.$store.state.userId==null"  class="fas fa-key "        data-toggle="tooltip" data-placement="top" title="login"></i></router-link>&nbsp;&nbsp;
          <router-link to="/Signup"> <i v-show="this.$store.state.userId==null"  class="fas fa-sign-in-alt" data-toggle="tooltip" data-placement="top" title="Signup"></i> </router-link>&nbsp;&nbsp;
          <router-link to="/Home">   <i v-show="this.$store.state.userId!==null" class="fas fa-home"        data-toggle="tooltip" data-placement="top" title="Home"></i></router-link>&nbsp;&nbsp;
          <router-link to="/Profil"> <i v-show="this.$store.state.userId!==null" class="fas fa-user"        data-toggle="tooltip" data-placement="top" title="Profil"></i></router-link>&nbsp;&nbsp;
           <router-link to="/Admin"> <i v-show="this.$store.state.isAdmin=== 1" class="fas fa-users-cog"    data-toggle="tooltip" data-placement="top" title="Admin"></i></router-link>&nbsp;&nbsp;
          <router-link to="/Logout"> <i v-show="this.$store.state.userId!==null" class="fas fa-power-off"   data-toggle="tooltip" data-placement="top" title="Logout"></i></router-link>
        </div>
        <router-view />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {},
};
</script>

<style scoped>
.header {
  background-color: #30475e;
  height: 100px;
}

#logo {
  width: 200px;
  position: relative;
  bottom: 50px;
}
#nav {
  position: absolute;
  right: 30px;
  top: 70px;
}
.fas{
  margin-top:10px;
  font-size: 23px;
  color: #30475e;
}

</style>
