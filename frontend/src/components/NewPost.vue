<template>
  <div id="wrapper">
    <form enctype="multipart/form-data" id="form_new_post">
      <div class="input">
        <div class="label"><label>Share Somthing:</label></div>
        <input
          type="file"
          id="file"
          @change="onChangeFileUpload()"
          ref="file"
        />
      </div>
      <div class="input">
        <input type="text" id="title" v-model="title" placeholder="Title" />
      </div>
      <div class="input">
        <textarea
          id="description"
          name="description"
          rows="4"
          cols="50"
          v-model="description"
          placeholder="Description"
        />
      </div>
      <button type="button" @click="NewPost">Share</button>
    </form>
  </div>
</template>

<script>
import Api from "../requests/PostService.js";
export default {
  //initialisation des données: un fichier et un titre et une description
  data() {
    return {
      file: "",
      title: "",
      description: "",
    };
  },

  methods: {
    //envoie d'une requête NewPost: ajouter une nouvelle publication
    async NewPost() {
      try {
        let formData = new FormData();

        formData.append("image", this.file);
        formData.append("title", this.title);
        formData.append("description", this.description);
        const response = await Api.createPost(formData);
        if (response.status == 200) {
          this.title = "";
          this.description = "";
          document.getElementById("file").value = "";
          let router = this.$router;
          setTimeout(function () {
            router.push({ name: "Home", params: { date: Date.now() } });
          }, 1000);
        }
      } catch (error) {
        alert("Message: " + error.message);
      }
    },
    //possibilité de modifier le téléchargement de fichier
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
  margin-bottom: 2px;
  font-size: 16px;
  width: 100%;
  cursor: pointer;
}
button {
  background: #f05454;
  margin-top: 20px;
  margin-bottom: 30px;
  position: relative;
  bottom: 15px;
}
#file {
  font-size: 0.8em;
}
</style>
