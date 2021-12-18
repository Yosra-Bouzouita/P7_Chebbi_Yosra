<template>
  <div id="wrapper">
    <form

      enctype="multipart/form-data"
      id="form_new_post"
    >
      <div class="input"> <div class="label"><label>Share Somthing:</label></div>
        <input  type="file" id="file"  @change="onChangeFileUpload()"  ref="file"   />  </div>
      <div class="input">  <input type="text" id="title" v-model="title"  placeholder="Title" /> </div>
      <div class="input">  <textarea id="description" name="description" rows="4" cols="50" v-model="description" placeholder="Description" /> </div>
      <button type="button" @click="NewPost">Share</button>
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

        let formData = new FormData();

        formData.append("image", this.file);
        formData.append("title", this.title);
        formData.append("description", this.description);
        const response = await Api.createPost(formData);
        if (response.status == 200) {
          let router = this.$router;
          setTimeout(function () {
             router.push({ name: "Home", params: { date: Date.now() } });
          }, 1000);
        }
      } catch (error) {
        alert(error.response.data.error);
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
