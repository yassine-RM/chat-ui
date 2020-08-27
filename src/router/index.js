import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
Vue.use(VueRouter);

const routes = [
  {
    path: "/auth",
    component: () =>
      import(
        /* webpackChunkName: "auth-layout" */ "../components/Auth-Layout.vue"
      ),
    children: [
      {
        path: "sign-in",
        name: "signIn",
        component: () =>
          import(/* webpackChunkName: "sign-in" */ "../views/Sign-In.vue"),
      },
      {
        path: "sign-up",
        name: "signUp",
        component: () =>
          import(/* webpackChunkName: "sign-up" */ "../views/Sign-Up.vue"),
      },
    ],
  },
  {
    path: "/chat",
    component: () =>
      import(
        /* webpackChunkName: "master-layout" */ "../components/Master-Layout.vue"
      ),
    beforeEnter: (to, from, next) => {
      if (store.state.userConnected != null) {
        next();
      }
      else
      next({name:'signIn'});
    },
    children: [
      {
        path: "/",
        name: "chat",
        component: () =>
          import(/* webpackChunkName: "chat" */ "../views/Chat.vue"),
      },
      {
        path: "profile",
        name: "profile",
        component: () =>
          import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
      },
    ],
  },
  {
    path: "*",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "not-found" */ "../views/Not-Found.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
