<template>
  <main>
    <div class="limitedWidthBlock">
      <div class="titles">
        <!-- Le nom d'utilisateur qui a partagé la publication et la date -->
        <h4>{{ post.user.firstname }} {{ post.user.lastname }}</h4>
        <small class="form-text text-muted">{{ post.date }}</small>
      </div>
      <div class="items" id="items">
        <a :href="post.imageUrl">
          <img :src="post.imageUrl" alt="postename" id="image"
        /></a>
        <h4 class="title">{{ post.title }}</h4>
        <p class="productDescription">{{ post.description }}</p>
      </div>
      <div id="btn">
        <my-comment
          v-for="comment in post.comments"
          :key="comment.id"
          :comment="comment"
        />
        <textarea
          placeholder=" add comment"
          type="text"
          rows="2"
          cols="5"
          id="add_comment"
          v-model="comment_message"
        />

        <button
          type="button"
          id="btn_comment"
          class="btn btn-success add-btn btn-lg"
          @click="addComment()"
        >
          Add Comment
        </button>
        <br />
 <!-- le bouton modify et le bouton delete sont affichés que dans la publication de l'utilisateur  qu'il a partagé-->
        <button
          type="button"
          v-show="
            this.$store.state.userId == post.userId ||
            this.$store.state.isAdmin == 1
          "
          id="btn_modify"
          class="btn btn-default add-btn btn-lg"
          @click="updatePost()"
        >
          modify
        </button>
        <button
          type="button"
          v-show="
            this.$store.state.userId == post.userId ||
            this.$store.state.isAdmin == 1
          "
          id="btn_delete"
          class="btn btn-default add-btn btn-lg"
          @click="deletePost()"
        >
          delete
        </button>

        <label
          ><i
            class="far fa-thumbs-up"
            :class="{ liked: isLiked, disliked: !isLiked }"
            @click="likePost()"
          >
            {{ likes.length }}</i
          ></label
        >
      </div>
    </div>
  </main>
</template>

<script>
import MyComment from "./MyComment.vue";
import Api from "../requests/PostService.js";

export default {
  components: {
    MyComment,
  },
  props: {
    post: {
      type: Object,
    },
  },
  //initialisation des données: nombre de like et le message de commentaire
  data: function () {
    return { likes: this.post.likes, comment_message: "" };
  },
  methods: {
    //l'envoie d'une requête deletePost: supprimer la publication
    async deletePost() {
      try {
        const response = await Api.deletePost(this.post.id);
        if (response.status == 200) {
          let router = this.$router;

          setTimeout(function () {
            router.push({ name: "Home", params: { date: Date.now() } });
          }, 1000);
        }
      } catch (error) {
        alert("Message: " + error.message);
      }
    },
    //pousser vers le composant EditPost
    async updatePost() {
      this.$router.push({
        name: "EditPost",
        params: {
          title: this.post.title,
          description: this.post.description,
          imageUrl: this.post.imageUrl,
          postId: this.post.id,
        },
      });
    },

    //l'envoie d'une requête likePost: liker le poste ou disliker la publication
    async likePost() {
      try {
        let formData = new FormData();

        formData.append("postId", this.post.id);

        if (this.isLiked) {
          formData.append("like", "0");
        } else {
          formData.append("like", "1");
        }

        const response = await Api.likePost(formData);
        if (response.status == 200) {
          this.likes = response.data;
        }
      } catch (error) {
        alert("Message: " + error.message);
      }
    },

    //l'envoie d'une requête addComment: ajouter un commentaire
    async addComment() {
      try {
        const response = await Api.commentPost({
          message: this.comment_message,
          postId: this.post.id,
        });
        if (response.status == 200) {
          this.comment_message = "";
          let router = this.$router;

          setTimeout(function () {
            router.push({ name: "Home", params: { date: Date.now() } });
          }, 1000);
        }
      } catch (error) {
        alert("Message: " + error.message);
      }
    },
  },
  computed: {
    isLiked() {
      const user_liked = this.likes.map((element) => element.userId);
      return user_liked.includes(this.$store.state.userId);
    },
  },
};
</script>

<style scoped>
.limitedWidthBlock {
  border: solid rgb(224, 224, 224);
  border-radius: 40px;
  margin-bottom: 100px;
  padding: 15px;
}
#btn_modify {
  background-color: rgb(240, 84, 84);
  color:white;
  margin-top:20px ;
}
#btn_delete {
  margin-left: 10px;
  margin-right: 20px;
  background-color: #30475e;
   color:white;
   margin-top:20px ;
}
#image {
  width: 50%;
  height: 200px;
  object-fit: cover;
}
.far {
  font-size: 1.8em;
  position:relative;
  top:17px;
}
#add_comment {
  width:25%;
  position: relative;
  top:17px;
  margin-right:10px;
  border-radius: 10px;
}
#btn_comment {
  background-image: linear-gradient(#30475e, rgb(240, 84, 84));
  color: white;
}

.liked {
  color: rgb(240, 84, 84);
}

.disliked {
  color: rgb(48, 71, 94);
}
</style>