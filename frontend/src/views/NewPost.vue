<template>
  <div id="wrapper">
    <form @submit.prevent="NewPost" enctype="multipart/form-data" id="form_new_post">
    <div class="input">
        <div class="label"><label>Select a file:</label></div>
        <input
          type="file"
          id="file"
          @change="onChangeFileUpload()"
          ref="file"
        /><br /><br />
      </div>
      <div class="input">
        <div class="label"><label>Title</label></div>
        <input type="text" id="title" v-model="title" />
      </div>
      <div class="input">
        <div class="label"><label>Description</label></div>
        <input type="text" id="description" v-model="description" />
      </div>
      <button type="button" @click="NewPost">Add</button>

    </form>
  </div>
</template>

<script>
import Api from "../services/PostService.js";
export default {
  data() {
    return {
      file: "",
      title: "",
      description: "",
    };
  },

  methods: {
    async NewPost() {
      try {
        this.errorMessage = "";
        let formData = new FormData();

        formData.append("image", this.file);
        const response =  await Api.createPost(formData);
        if(response.status ==200)
        {
          let router = this.$router;
          setTimeout(function() { router.push("/Accueil"); }, 1500);
        }

      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
    },
    onChangeFileUpload() {

      this.file = this.$refs.file.files[0];
    },
  },
};
</script>

<style scoped>


.input {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.label {
  display: flex;
  justify-content: space-between;
}

button,
input {
  box-sizing: border-box;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid silver;
  margin: 2px;
  font-size: 16px;
  width: 100%;
  cursor: pointer;
}
button {
  background: #f05454;
  margin-top: 20px;
}
</style>
