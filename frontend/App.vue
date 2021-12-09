<template>
 <my-header  msg="sign up" page1="./Signup.vue"  msg2="login" page2="./Login.vue"  />
<my-login/>

</template>

<script>
import MySignup from './signup/Signup.vue'
import MyLogin from './signup/Login.vue'
import MyHeader from './signup/MyHeader.vue'
export default {
  components: {
    MySignup,
    MyLogin,
    MyHeader

  }

}
</script>

<style>

</style>
