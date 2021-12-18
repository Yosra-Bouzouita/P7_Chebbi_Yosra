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
          <router-link to="/">       <i class="fas fa-key "        style="font-size: 48px; color: #30475e"  data-toggle="tooltip" data-placement="top" title="login"></i></router-link> |
          <router-link to="/Signup"> <i class="fas fa-sign-in-alt" style="font-size: 48px; color: #30475e"  data-toggle="tooltip" data-placement="top" title="Signup"></i> </router-link> |
          <router-link to="/Home">   <i class="fas fa-home"        style="font-size: 48px; color: #30475e"  data-toggle="tooltip" data-placement="top" title="Home"></i></router-link> |
          <router-link to="/Profil"> <i class="fas fa-user"        style="font-size: 48px; color: #30475e"  data-toggle="tooltip" data-placement="top" title="Profil"></i></router-link> |
          <router-link to="/Logout"> <i class="fas fa-power-off"   style="font-size: 48px; color: #30475e"  data-toggle="tooltip" data-placement="top" title="Logout"></i></router-link>
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
