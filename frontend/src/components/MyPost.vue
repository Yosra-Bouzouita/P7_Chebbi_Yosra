<template>
  <main class="limitedWidthBlockContainer">
      <div class="limitedWidthBlock">
        <div class="titles">
         <h3>{{id}}</h3>
          <h3>{{date}}</h3>
        </div>
        <div class="items" id="items">
           <a :href=imageUrl>
              <img :src=imageUrl alt="postename">
              <h3 class="title">{{title}}</h3>
              <p class="productDescription">{{description}}</p>
              <i class="far fa-thumbs-up"></i>
          </a>
        </div>
       <div>
        <button type="button" class="btn btn-success add-btn btn-lg">modify</button>
        <button type="button" class="btn btn-success add-btn btn-lg">delete</button>
     </div>
      </div>
    </main>
</template>

<script>
export default {
props: {
    id: {
      type: Number,
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    imageUrl: {
      type: String
    },
    date: {
      type: String
    }
  },
}
</script>

<style scoped>
.limitedWidthBlockContainer
{
    border-radius: 20px 20px 0px 0px;

}

</style>