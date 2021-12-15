<template>
  <my-header  />

</template>

<script>
import MyHeader from './components/MyHeader.vue'

export default {
  components: {
    MyHeader

  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: black;
}

#nav a.router-link-exact-active {
  color: rgb(240, 84, 84);
}


</style>
