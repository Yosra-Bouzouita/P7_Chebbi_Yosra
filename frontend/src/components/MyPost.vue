<template>
  <main class="limitedWidthBlockContainer">
    <div class="limitedWidthBlock">
      <div class="titles">
        <h5>{{ firstname }} {{ lastname }}</h5>
            <small class="form-text text-muted">{{ date }}</small>
      </div>
      <div class="items" id="items">
        <a :href="imageUrl">
          <img :src="imageUrl" alt="postename" id="image"
        /></a>
        <h4 class="title">{{ title }}</h4>
        <p class="productDescription">{{ description }}</p>
      </div>
      <div id="btn">
        <button
          type="button"
          v-show="this.$store.state.userId == userId"
          id="btn_modify"
          class="btn btn-success add-btn btn-lg"
          @click="updatePost()"
        >
          modify
        </button>
        <button
          type="button"
          v-show="this.$store.state.userId == userId"
          id="btn_delete"
          class="btn btn-success add-btn btn-lg"
           @click="deletePost()"
        >
          delete
        </button>
        <input type="checkbox" id="btnControl" />
        <label class="btn" for="btnControl"
          ><i class="far fa-thumbs-up"> {{ likes }}</i></label
        >
      </div>
<div>
</div>
    </div>
  </main>
</template>

<script>
import Api from "../services/PostService.js";

export default {


  props: {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    date: {
      type: String,
    },
    likes: {
      type: Number,
    },
    userId: {
      type: Number,
    },
    postId:{
      type:Number,
    }
  },
methods:
{
  async deletePost() {
      try {
        this.errorMessage = "";
        const response = await Api.deletePost(this.postId);
        if (response.status == 200) {
           let router=this.$router

         setTimeout(function () {
           router.push({ name: 'Accueil', params: { userId: this.userId }});
          }, 1000);
        }
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }
  },
    async updatePost() {
      this.$router.push({name :"EditPost",params :{title:this.title, description:this.description, imageUrl:this.imageUrl, postId:this.postId}});
    }
}
};
</script>

<style scoped>

#btn_modify {
  background-color: rgb(240, 84, 84);
}
#btn_delete {
  margin-left: 10px;
  margin-right: 20px;
  background-color: #30475e;
}
#btnControl {
  display: none;
}
#btnControl:checked + label {
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgb(240, 84, 84);
  font-size: 1.6em;
}
#btn {
  margin-bottom: 100px;
}
.far {
  font-size: 1.4em;
  color: #30475e;
}
#image {
  width: 50%;
  height: 200px;
  object-fit: cover;
}
</style>