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
    component: () =>
      import(
        /* webpackChunkName: "login_Home_Welcome" */ "../components/Login.vue"
      ),
  },
  {
    path: "/home",
    name: "Home",
    redirect: "/welcome",
    component: () =>
      import(
        /* webpackChunkName: "login_Home_Welcome" */ "../components/Home.vue"
      ),
    children: [
      {
        path: "/welcome",
        name: "Welcome",
        component: () =>
          import(
            /* webpackChunkName: "login_Home_Welcome" */ "../components/Welcome.vue"
          ),
      },
      {
        path: "/users",
        name: "Users",
        component: () =>
          import(
            /* webpackChunkName: "Users_Rights_Roles" */ "../components/user/Users.vue"
          ),
      },
      {
        path: "/rights",
        name: "Rights",
        component: () =>
          import(
            /* webpackChunkName: "Users_Rights_Roles" */ "../components/power/Rights.vue"
          ),
      },
      {
        path: "/roles",
        name: "Roles",
        component: () =>
          import(
            /* webpackChunkName: "Users_Rights_Roles" */ "../components/power/Roles.vue"
          ),
      },
      {
        path: "/categories",
        name: "Cate",
        component: () =>
          import(
            /* webpackChunkName: "Cate_Params" */ "../components/goods/Cate.vue"
          ),
      },
      {
        path: "/params",
        name: "Params",
        component: () =>
          import(
            /* webpackChunkName: "Cate_Params" */ "../components/goods/Params.vue"
          ),
      },
      {
        path: "/goods",
        name: "List",
        component: () =>
          import(
            /* webpackChunkName: "List_Add" */ "../components/goods/List.vue"
          ),
      },
      {
        path: "/goods/add",
        name: "Add",
        component: () =>
          import(
            /* webpackChunkName: "List_Add" */ "../components/goods/Add.vue"
          ),
      },
      {
        path: "/orders",
        name: "Order",
        component: () =>
          import(
            /* webpackChunkName: "Order_Report" */ "../components/order/Order.vue"
          ),
      },
      {
        path: "/reports",
        name: "Report",
        component: () =>
          import(
            /* webpackChunkName: "Order_Report" */ "../components/report/Report.vue"
          ),
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
