<template>
  <div style="margin:10px;">
    <div style="display:flex;justify-content:space-between;">
      <div style="font-size:20px;font-weight:500;color:#2E5E85;">欢迎来到小爱后台管理系统</div>
      <div style="display:flex;font-size:20px;">
        <div>{{time1}} {{time5}}{{time2}}:{{time3}}:{{time4}}</div>
        <div style="font-weight:500;color:#333;">亲爱的，{{adminUser.username}}</div>
        <div style="color:#409EFF;">退出</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  //注册组件
  components: {},
  // 定义变量
  data() {
    return {
      adminUser: {}, //用户名数据
      time1: "", //当前年月日
      time2: 0, //当前小时
      time3: 0, //当前分钟
      time4: 0, //当前秒
      time5: "" //当前时候
    };
  },
  //事件方法执行
  methods: {
    //获取当前时间
    gettime() {
      setInterval(() => {
        this.time1 = dayjs().format("YYYY/MM/DD");
        this.time2 = dayjs().hour();
        this.time4 = dayjs().format("HH");
        this.time3 = dayjs().minute();
        this.time4 = dayjs().format("mm");
        this.time4 = dayjs().second();
        this.time4 = dayjs().format("ss");
        if (this.time2 >= 7 && this.time2 < 11) {
          this.time5 = "早上";
        } else if (this.time2 >= 11 && this.time2 < 13) {
          this.time5 = "中午";
        } else if (this.time2 >= 13 && this.time2 <= 17) {
          this.time5 = "下午";
        } else {
          this.time5 = "晚上";
        }
      }, 1000);
    }
  },
  //页面初始化方法
  mounted() {
    this.adminUser = JSON.parse(localStorage.getItem("adminUser"));
    this.gettime();
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>