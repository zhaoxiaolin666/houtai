<template>
  <div style="margin-bottom:15px;">
    <!--使用draggable组件-->

    <draggable
      v-model="$store.state.arr"
      force-fallback="true"
      group="people"
      animation="1000"
      @start="onStart"
      @end="onEnd"
      style="display:flex;"
    >
      <div
        @contextmenu.prevent="rightClick($event)"
        v-for="(item,index) in $store.state.arr"
        :key="index"
        style="width:80px;"
      >
        <el-tag
          @click="goto(item)"
          :class="item.path===$route.path ?'item' : '' "
          :closable="item.path===$route.path&&$route.path!=='/homepage'"
          @close="handleClose(index)"
          style="margin-right: 10px;cursor:pointer;"
        >{{item.authName}}</el-tag>
      </div>
    </draggable>

    <!-- //右键事件 -->
    <e-vue-contextmenu ref="ctxshow" id="contextStyle">
      <div>关闭其他</div>
      <div style="margin-top:5px">关闭左侧</div>
      <div style="margin-top:5px">关闭右侧</div>
    </e-vue-contextmenu>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userModule;
import draggable from "vuedraggable";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  //注册组件
  components: {
    draggable
  },
  // 定义变量
  data() {
    return {
      arr: [{ authName: "首页", path: "/homepage" }]
    };
  },
  //事件方法执行
  methods: {
    ...userActions(["getMenus"]),
    //开始拖拽事件
    onStart() {
      this.drag = true;
    },
    //拖拽结束事件
    onEnd() {
      this.drag = false;
    },
    goto(item) {
      console.log(`${item.path}`);
      this.$router.push(`${item.path}`);
    },
    handleClose(index) {
      this.$store.state.arr.splice(index, 1);
      localStorage.setItem("arr", JSON.stringify(this.$store.state.arr));
      if (this.$store.state.arr.length === 0) {
        this.$store.state.arr = this.arr;
        localStorage.setItem("arr", JSON.stringify(this.arr));
        this.$router.push("/homepage");
      } else {
        let a = this.$store.state.arr.length - 1;
        console.log(a, "fhafjh");
        this.$router.push(`${this.$store.state.arr[a].path}`);
      }
    },
    //右键事件 获取dom元素打开菜单
    rightClick(e) {
      this.$refs.ctxshow.showMenu(e);
    }
  },
  //页面初始化方法
  mounted() {
    if (JSON.parse(localStorage.getItem("arr"))) {
      this.$store.state.arr = JSON.parse(localStorage.getItem("arr"));
    } else {
      this.$store.state.arr = this.arr;
      localStorage.setItem("arr", JSON.stringify(this.arr));
    }
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
.item {
  background-color: skyblue;
}
</style>