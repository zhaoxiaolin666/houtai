<template>
  <div class="home">
    <div class="homepage">欢迎来到小爱后台管理系统</div>
  </div>
</template>

<script>
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
  methods: {},
  //页面初始化方法
  mounted() {},
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.home {
  position: relative;
  border: 1px solid #ccc;
  height: 700px;
}
.homepage {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30vw;
  margin-left: -15vw;
  font-size: 30px;
  text-align: center;
}
</style>