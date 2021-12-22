import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Profil from "../views/Profil.vue";
import Admin from "../views/Admin.vue";
import Logout from "../views/Logout.vue";
import NewPost from "../components/NewPost.vue";
import EditPost from "../components/EditPost.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/Signup",
    name: "Signup",
    // route level code-splitting
    // this generates a separate chunk (Signup.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Signup" */ "../views/Signup.vue"),
  },
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/Profil",
    name: "Profil",
    component: Profil,
  },
  {
    path: "/Admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/NewPost",
    name: "NewPost",
    component: NewPost,
  },
  {
    path: "/EditPost",
    name: "EditPost",
    component: EditPost,
  },
  {
    path: "/Logout",
    name: "Logout",
    component: Logout,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
