<template>
<header>
            <div class="d-flex justify-content-between p-4" >
                <div>
                    <img id="logo" src="images/icon-left-font-monochrome-white.png" alt="Logo" />
                </div>
                <div class="d-flex justify-content-between p-2" >
                    <nav>
                        <ul>
                            <li class="nav-item">
                                <a id="a1" href="">{{ msg }}</a>
                            </li>
                            <li class="nav-item">
                                <a id="a1" href="">{{ msg2 }}</a>
                            </li>

                        </ul>
                    </nav>
                </div>
            </div>
		</header>

</template>

<script>
export default {
  props: {
    msg: String,
    msg2: String
  }
}
</script>

<style scoped>
   .p-4 {
      background-color: #30475e;
      height: 100px;
    }

    #logo {
      width: 20%;
      position: relative;
      bottom: 60px;
    }
nav ul
{
    list-style-type: none;
    display:flex;
}
nav  li {
margin-right: 50px;

}
nav a
{
    text-decoration: none;
    color:white;
    font-family: "Raleway-bold";
  }
  nav a:hover /* Apparence au survol des liens */
  {
     color:white;
  }
 #a1
{
    font-size: 1.6em;
}

</style>
