import Vue from "vue";
import Vuex from "vuex";
import user from "./user/user";
// import jj from "./set-avatar/aaa.js";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        arr: [{ authName: "首页", path: "/homepage" }],
    },
    mutations: {
        setarr(state, data) {
            let a = JSON.parse(localStorage.getItem("arr"));
            if (!a) {
                localStorage.setItem("arr", JSON.stringify(state.arr));
            } else {
                let b = a.filter((item) => {
                    return item.authName === data.authName;
                });
                console.log(b, a, data, "bbbbb");
                if (b.length === 0) {
                    a.push(data);
                    state.arr = a;
                    localStorage.setItem("arr", JSON.stringify(a));
                }
            }
        },
    },
    actions: {},
    modules: {
        user, //user模块
        // jj,
    },
});