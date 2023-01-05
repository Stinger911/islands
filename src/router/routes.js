import { computed } from "vue";
import { useMainStore } from "../stores/main";

const routes = [
  {
    path: "/",
    component: () => import("layouts/Basic.vue"),
    children: [
      {
        path: "",
        name: "signin",
        component: () => import("pages/Auth.vue"),
      },
      { path: "quasar", component: () => import("pages/IndexPage.vue") },
    ],
  },
  {
    path: "/game",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter: (to, from, next) => {
      const store = useMainStore();
      const isLoggedIn = computed(() => store.logged);
      // console.log(to, from, store);
      if (!isLoggedIn.value) {
        next({ name: "signin", query: { next: to.fullPath } });
      } else {
        next();
      }
    },
    children: [
      { path: "", name: "game", component: () => import("pages/GamePage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
