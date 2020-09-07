<template>
  <div>
    <el-card>
      <rolelist :roles="rights" :columns="columns" :index-options="indexOptions">
        <template v-slot:action="scope">
          <el-tag v-if="scope.scope.row.level==='0'">一级</el-tag>
          <el-tag type="success" v-if="scope.scope.row.level==='1'">二级</el-tag>
          <el-tag type="danger" v-if="scope.scope.row.level==='2'">三级</el-tag>
        </template>
      </rolelist>
    </el-card>
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
    return {
      type: "list",
      columns: [
        {
          label: "#",
          align: "center"
        },
        {
          label: "权限名称",
          prop: "authName",
          align: "center"
        },
        {
          label: "权限等级",
          name: "action",
          align: "center"
        }
      ],
      indexOptions: {
        showIndex: true,
        label: "#",
        align: "center",
        width: "200",
        indexMethod(index) {
          return index++;
        }
      }
    };
  },
  //事件方法执行
  methods: {
    ...userActions(["getrights"]),
    getdata() {
      this.getrights({
        type: this.type
      });
    }
  },
  //页面初始化方法
  mounted() {
    this.getdata();
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {
    ...userState(["rights"])
  }
};
</script>

<style scoped lang='scss'>
</style>