import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import about from "@/views/AboutView.vue";
import AttendeesList from "@/views/AttendeesList.vue";
import HttpRequest from "@/views/HttpRequest.vue";
import AttendeesView from "@/views/AttendeesView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: about,
  },
  {
    path: "/AttendeesList",
    name: "AttendeesList",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AttendeesList,
  },
  {
    path: "/HttpRequest",
    name: "HttpRequest",
    component: HttpRequest,
  },
  {
    path: "/AttendeesView",
    name: "AttendeesView",
    component: AttendeesView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
