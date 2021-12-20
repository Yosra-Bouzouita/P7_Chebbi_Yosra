<template>
  <div id="wrapper">
    <!-- la publication à modifier -->
    <form
      @submit.prevent="ModifyPost"
      enctype="multipart/form-data"
      id="form_new_post"
    >
      <div class="items" id="items">
        <a :href="imageUrl">
          <img :src="imageUrl" alt="postename" id="image"
        /></a>
      </div>
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
         <textarea id="description" name="description" rows="4" cols="50" v-model="description"/>
      </div>
      <button type="button" @click="EditPost">Edit</button>
    </form>
  </div>
</template>

<script>
import Api from "../services/PostService.js";
export default {
  props: {},
  //Initialisation des données de la publication à modifier
  data() {
    return {
      file: "",
      title: "",
      description: "",
      imageUrl: "",
      postId:null,
    };
  },
//envoie d'une requête updatePost: modifier la publication
  methods: {
    async EditPost() {
      try {
        let formData = new FormData();

        formData.append("image", this.file);
        formData.append("title", this.title);
        formData.append("description", this.description);
        const response = await Api.updatePost(this.postId, formData);
        if (response.status == 200) {
          let router = this.$router;
          setTimeout(function () {
            router.push("/Home");
          }, 1000);
        }
      } catch (error) {
        alert("Message: " + error.message);
      }
    },
//fonction qui permet de modifier le téléchargement de fichier
    onChangeFileUpload() {
      this.file = this.$refs.file.files[0];
    },
  },
  //les données sont remplies avant l'affichage de la page
  beforeMount() {
    this.imageUrl = this.$route.params.imageUrl;
    this.title = this.$route.params.title;
    this.description = this.$route.params.description;
    this.postId = this.$route.params.postId;
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
