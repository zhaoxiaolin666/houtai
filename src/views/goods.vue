<template>
  <div>
    <el-card class="box-card">
      <!-- 头部  -->
      <div style="display:flex;margin:30px 0 30px 0;">
        <div style="width:25vw;margin-right:30px;">
          <el-input placeholder="请输入搜索内容" v-model="query" clearable>
            <el-button slot="append" icon="el-icon-search" @click="query111"></el-button>
          </el-input>
        </div>
        <div>
          <el-button type="primary" @click="dialogTableVisible = true">添加商品</el-button>
        </div>
      </div>
      <rolelist :roles="goods" :index-options="indexOptions" :columns="columns">
        <template v-slot:action="scope">
          <el-button type="primary" @click="edit(scope.scope)" size="mini">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button type="danger" @click="del(scope.scope)" size="mini">
            <i class="el-icon-delete"></i>
          </el-button>
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
      query: "", //查询参数
      pagenum: 1, //当前页码
      pagesize: 10, //每页显示条数
      columns: [
        {
          label: "#",
          align: "center"
        },
        {
          label: "商品名称",
          prop: "goods_name",
          align: "center",
          width: "600"
        },
        {
          label: "商品价格(元)",
          prop: "goods_price",
          align: "center"
        },
        {
          label: "商品重量",
          prop: "goods_weight",
          align: "center"
        },
        {
          label: "创建时间",
          prop: "upd_time",
          align: "center",
          width: "200"
        },
        {
          label: "操作(元)",
          name: "action",
          align: "center",
          width: "150"
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
    ...userActions(["getgoods", "deletecategoriesid"]),
    query111() {
      this.getgoods({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      });
    },
    edit(scope) {
      console.log(scope);
    },
    del(scope) {
      console.log(scope);
      this.deletecategoriesid({
        id: scope.row.goods_id,
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      });
    }
  },
  //页面初始化方法
  mounted() {
    this.getgoods({
      query: this.query,
      pagenum: this.pagenum,
      pagesize: this.pagesize
    });
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {
    ...userState(["goods"])
  }
};
</script>

<style scoped lang='scss'>
</style>