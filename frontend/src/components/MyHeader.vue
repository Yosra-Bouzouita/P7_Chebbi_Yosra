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
          <router-link to="/">Login</router-link> |
          <router-link to="/Signup">Signup</router-link>
        </div>
        <router-view />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    msg: String,
    msg2: String,
    page1: String,
    page2: String,
  },
};
</script>

<style scoped>
.header {
  background-color: #30475e;
  height: 100px;
}

#logo {
  width: 200px;
position:relative;
bottom: 50px;
}


</style>
