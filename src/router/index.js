import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: "/homepage",
    },
    {
        path: "",
        name: "",
        component: Home,
        children: [{
            path: "/homepage",
            name: "homepage",
            component: () =>
                import ("../views/homepage.vue"),
            meta: {
                name: "首页",
                icon: "el-icon-s-home",
            },
        }, ],
    },
    {
        path: "#",
        name: "",
        component: Home,
        meta: {
            name: "用户管理",
            icon: "el-icon-user",
        },
        children: [{
            path: "/users/users",
            name: "users",
            component: () =>
                import ("../views/users.vue"),
            meta: {
                name: "用户列表",
                icon: "el-icon-folder-opened",
            },
        }, ],
    },
    {
        path: "#",
        name: "",
        component: Home,
        meta: {
            name: "权限管理",
            icon: "el-icon-folder",
        },
        children: [{
                path: "/rights/roles",
                name: "roles",
                component: () =>
                    import ("../views/roles.vue"),
                meta: {
                    name: "角色列表",
                    icon: "el-icon-setting",
                },
            },
            {
                path: "/rights/rights",
                name: "rights",
                component: () =>
                    import ("../views/rights.vue"),
                meta: {
                    name: "权限列表",
                    icon: "el-icon-c-scale-to-original",
                },
            },
        ],
    },
    {
        path: "#",
        name: "",
        component: Home,
        meta: {
            name: "商品管理",
            icon: "el-icon-shopping-bag-2",
        },
        children: [{
                path: "/goods/goods",
                name: "goods",
                component: () =>
                    import ("../views/goods.vue"),
                meta: {
                    name: "商品列表",
                    icon: "el-icon-bangzhu",
                },
            },
            {
                path: "/goods/params",
                name: "params",
                component: () =>
                    import ("../views/params.vue"),
                meta: {
                    name: "分类参数",
                    icon: "el-icon-bell",
                },
            },
            {
                path: "/goods/categories",
                name: "categories",
                component: () =>
                    import ("../views/categories.vue"),
                meta: {
                    name: "商品分类",
                    icon: "el-icon-date",
                },
            },
        ],
    },
    {
        path: "#",
        name: "",
        component: Home,
        meta: {
            name: "订单管理",
            icon: "el-icon-s-order",
        },
        children: [{
            path: "/orders/orders",
            name: "orders",
            component: () =>
                import ("../views/orders.vue"),
            meta: {
                name: "订单列表",
                icon: "el-icon-folder-add",
            },
        }, ],
    },
    {
        path: "#",
        name: "",
        component: Home,
        meta: {
            name: "数据统计",
            icon: "el-icon-message",
        },
        children: [{
            path: "/reports/reports",
            name: "reports",
            component: () =>
                import ("../views/reports.vue"),
            meta: {
                name: "数据列表",
                icon: "el-icon-position",
            },
        }, ],
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("../views/login.vue"),
        meta: {
            name: "登录",
        },
    },
    {
        path: "*",
        name: "404",
        component: () =>
            import ("../views/404.vue"),
        meta: {
            name: "404",
        },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;