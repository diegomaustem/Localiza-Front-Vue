import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/LoginComponent.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../components/DashboardComponent.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  const isLoggedIn = !!localStorage.getItem("userToken");

  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: "Login" };
  }

  return true;
});

export default router;
