<template>
  <div style="margin-left:10px;">{{menus}}</div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  //注册组件
  components: {},
  // 定义变量
  data() {
    return {};
  },
  //事件方法执行
  methods: {
    ...userActions(["getMenus"])
  },
  //页面初始化方法
  mounted() {
    this.getMenus();
    // console.log(userState);
    // console.log(userActions);
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {
    ...userState(["menus"])
  }
};
</script>

<style scoped lang='scss'>
</style>