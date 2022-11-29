import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    redirect: "/welcome",
    component: () => import("../components/Home.vue"),
    children: [
      {
        path: "/welcome",
        name: "Welcome",
        component: () => import("../components/Welcome.vue"),
      },
      {
        path: "/users",
        name: "Users",
        component: () => import("../components/user/Users.vue"),
      },
      {
        path: "/rights",
        name: "Rights",
        component: () => import("../components/power/Rights.vue"),
      },
      {
        path: "/roles",
        name: "Roles",
        component: () => import("../components/power/Roles.vue"),
      },
      {
        path: "/categories",
        name: "Cate",
        component: () => import("../components/goods/Cate.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from代表哪个路径跳转
  // next是一个函数 表示放行
  // next()放行 next('/login') 强制跳转
  if (to.path === "/login") return next();

  const tokenStr = sessionStorage.getItem("token");
  if (!tokenStr) return next("/login");
  next();
});

export default router;
