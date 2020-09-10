import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueJsonp from "vue-jsonp";
import echarts from "echarts";
import "./globalcomponent";
import ZkTable from "vue-table-with-tree-grid";

import Contextmenu from "e-vue-contextmenu";
import mavonEditor from "mavon-editor"; //引入mavon-editor 就是上面所安装的
Vue.use(Contextmenu);
Vue.use(mavonEditor); //让Vue使用mavonEditor

Vue.component(ZkTable.name, ZkTable);
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);
Vue.use(VueJsonp);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");