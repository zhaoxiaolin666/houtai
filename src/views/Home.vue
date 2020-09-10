<template>
  <div style="height:95vh;">
    <div>
      <el-container>
        <el-header style="background:#f2f2f2;">
          <headers></headers>
        </el-header>
        <el-container>
          <el-aside>
            <div>
              <asides></asides>
            </div>
          </el-aside>
          <el-main>
            <div>
              <navss></navss>
            </div>
            <div class="cont">
              <router-view></router-view>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import headers from "../components/header";
import asides from "../components/asides";
import navss from "../components/nav";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  //注册组件
  components: {
    headers,
    asides,
    navss
  },
  // 定义变量
  data() {
    return {
      //   arr: [{ authName: "首页", path: "/homepage" }]
    };
  },
  //事件方法执行
  methods: {},
  //页面初始化方法
  mounted() {
    // localStorage.setItem("arr", JSON.stringify(this.arr));
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.cont {
  height: 70vh;
  overflow: auto;
}
</style>