<template>
  <main class="limitedWidthBlockContainer">
    <div class="limitedWidthBlock">
      <div class="titles">
        <h5>{{ post.user.firstname }} {{ post.user.lastname }}</h5>
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
        <button
          type="button"
          v-show="
            this.$store.state.userId == post.userId ||
            this.$store.state.isAdmin == 1
          "
          id="btn_modify"
          class="btn btn-success add-btn btn-lg"
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
          class="btn btn-success add-btn btn-lg"
          @click="deletePost()"
        >
          delete
        </button>

        <label
          ><i
            class="far fa-thumbs-up"
            @click="likePost($event)"
            style="font-size: 24px; color: green"
          >
            {{ nb_like }}</i
          ></label
        >
        <my-comment
          v-for="comment in post.comments"
          :key="comment.message"
          :comment="comment"
        />
      </div>
      <div></div>
    </div>
  </main>
</template>

<script>
import MyComment from "./MyComment.vue";
import Api from "../services/PostService.js";

export default {
  components: {
    MyComment,
  },
  props: {
    post: {
      type: Object,
    },
  },
  data: function () {
    return { nb_like: this.post.nb_like };
  },
  methods: {
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
        alert(error.response.data.error);
      }
    },
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

    async likePost(event) {
      try {
        let formData = new FormData();

        formData.append("postId", this.post.id);

        if (event.target.style.color == "green") {
          formData.append("like", "1");
          event.target.style.color = "red";
        } else {
          formData.append("like", "0");
          event.target.style.color = "green";
        }

        const response = await Api.likePost(formData);
        if (response.status == 200) {
          this.nb_like = response.data.nb_like;
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  },
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

#btn {
  margin-bottom: 100px;
}

#image {
  width: 50%;
  height: 200px;
  object-fit: cover;
}
</style>