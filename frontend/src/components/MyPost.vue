<template>
  <main class="limitedWidthBlockContainer">
      <div class="limitedWidthBlock">
        <div class="titles">
         <h5>{{firstname}} {{lastname}}</h5>
          <p>{{date}}</p>
        </div>
        <div class="items" id="items">
             <a :href=imageUrl> <img :src=imageUrl alt="postename" id="image"></a>
              <h4 class="title">{{title}}</h4>
              <p class="productDescription">{{description}}</p>
            </div>
       <div id="btn">
        <button type="button" id="btn1" class="btn btn-success add-btn btn-lg">modify</button>
        <button type="button" id="btn2" class="btn btn-success add-btn btn-lg">delete</button>
        <input type="checkbox" id="btnControl"/>
         <label class="btn" for="btnControl"><i class="far fa-thumbs-up"> {{likes}}</i></label>

     </div>
      </div>
    </main>
</template>

<script>
export default {
props: {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
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
    },
    likes: {
      type: Number
    }
  },
}
</script>

<style scoped>
.limitedWidthBlockContainer{
  padding-bottom: 30px;
}
.limitedWidthBlock
{
 border-style: solid;
margin: 40px 400px 40px 400px;
border-color: #30475e;
padding-top: 30px;
}
#btn1{
background-color: rgb(240, 84, 84);
}
#btn2{
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
#btn{
margin-bottom: 100px;

}
.far{
font-size: 1.4em;
color:#30475e;
}
#image{
width: 50%;
 height: 200px;
 object-fit: cover;
}
</style>