<template>
  <my-header  msg="sign up" page1="./Signup.vue"  msg2="login" page2="./Login.vue"  />

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
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}


</style>
