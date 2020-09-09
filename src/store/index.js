import Vue from "vue";
import Vuex from "vuex";
import user from "./user/user";
// import jj from "./set-avatar/aaa.js";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user, //user模块
        // jj,
    },
});