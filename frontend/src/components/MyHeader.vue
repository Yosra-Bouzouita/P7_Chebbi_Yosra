<template>
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
          <router-link to="/">       <i v-show="this.$store.state.userId==null"  class="fas fa-key "        style="font-size: 36px; color: #30475e"  data-toggle="tooltip" data-placement="top" title="login"></i></router-link>&nbsp;&nbsp;
          <router-link to="/Signup"> <i v-show="this.$store.state.userId==null"  class="fas fa-sign-in-alt" style="font-size: 36px; color: #30475e"  data-toggle="tooltip" data-placement="top" title="Signup"></i> </router-link>&nbsp;&nbsp;
          <router-link to="/Home">   <i v-show="this.$store.state.userId!==null" class="fas fa-home"        style="font-size: 36px; color: #30475e"  data-toggle="tooltip" data-placement="top" title="Home"></i></router-link>&nbsp;&nbsp;
          <router-link to="/Profil"> <i v-show="this.$store.state.userId!==null" class="fas fa-user"        style="font-size: 36px; color: #30475e"  data-toggle="tooltip" data-placement="top" title="Profil"></i></router-link>&nbsp;&nbsp;
          <router-link to="/Logout"> <i v-show="this.$store.state.userId!==null" class="fas fa-power-off"   style="font-size: 36px; color: #30475e"  data-toggle="tooltip" data-placement="top" title="Logout"></i></router-link>
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
  right: 60px;
  top: 70px;
}

</style>
