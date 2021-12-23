<template>
  <my-header />
</template>

<script>
import MyHeader from "./components/MyHeader.vue";

export default {
  components: {
    MyHeader,
  },
};
</script>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#nav {
  padding: 30px;
}
</style>
