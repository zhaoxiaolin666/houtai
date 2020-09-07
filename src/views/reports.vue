<template>
  <div>
    <div ref="myChart" style="height:400px;"></div>
  </div>
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
    ...userActions(["getreportstype"]),
    drawline() {
      let myChart = this.$echarts.init(this.$refs.myChart); // 基于准备好的dom，初始化echarts实例
      // 使用刚指定的配置项和数据显示图表(this.reportstype)
      myChart.setOption(this.reportstype);
    }
  },
  //页面初始化方法
  mounted() {
    this.getreportstype();
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {
    reportstype: {
      //统计图表数据
      handler() {
        //immediate:true代表如果在 wacth 里声明了 viewDetials之后，
        //   就会立即先去执行里面的handler方法，
        //   如果为 false就跟我们以前的效果一样，
        //   不会在绑定的时候就执行
        this.drawline();
      }
    }
  },
  //计算
  computed: {
    ...userState(["reportstype"])
  }
};
</script>

<style scoped lang='scss'>
</style>