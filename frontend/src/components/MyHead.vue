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
  background-color: red;
  height: 100px;
}

#logo {
  width: 200px;
position:relative;
bottom: 50px;
}


</style>
