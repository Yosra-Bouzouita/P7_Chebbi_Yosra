<template>
  <div>
    <form>
      <div class="form-group">
        <label for="firstname">First Name</label>
        <input
          type="text"
          class="form-control"
          id="firstname"
          aria-describedby="emailHelp"
          :value="this.user.firstname"
          placeholder="Enter First Name"
        />
      </div>
      <div class="form-group">
        <label for="lastname">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="lastname"
          aria-describedby="emailHelp"
          :value="this.user.lastname"
          placeholder="Enter Last Name"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          :value="this.user.email"
          placeholder="Enter email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          :value="this.user.password"
          placeholder="Password"
        />
        <input type="checkbox" @click="showPassword()" />Show Password
      </div>

      <button type="submit" class="btn btn-primary">Save</button>
    </form>

    <div class="danger-alert message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import Api from "../services/Auth.js";

export default {
  components: {},
  data() {
    return {
      user: Object,
    };
  },
  methods: {
    async getUser() {
      try {
        this.errorMessage = "";
        const response = await Api.getUserById(this.$store.state.userId);

        if (response.status == 200) {
          this.user = response.data;
        }
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },

    showPassword() {
      var x = document.getElementById("exampleInputPassword1");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    },
  },
  created() {
    this.getUser();
  },
};
</script>
<style scoped></style>