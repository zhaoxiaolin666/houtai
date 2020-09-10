<template>
  <div>
    <el-card class="box-card">
      <div style="width:25vw;margin:30px 0 30px 0;">
        <el-input placeholder="请输入搜索内容" v-model="query" clearable>
          <el-button slot="append" icon="el-icon-search" @click="query111"></el-button>
        </el-input>
      </div>
      <rolelist :roles="orders" :columns="columns" :index-options="indexOptions">
        <template v-slot:action1="scope">
          <el-tag v-if="scope.scope.row.order_pay===0">未付款</el-tag>
          <el-tag type="success" v-else>已付款</el-tag>
        </template>
        <template v-slot:action2="scope">
          <el-button type="primary" @click="edit(scope.scope)" size="mini">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button type="danger" @click="logistics(scope.scope)" size="mini">
            <i class="el-icon-location-outline"></i>
          </el-button>
        </template>
      </rolelist>
      <el-dialog title="物流信息" :visible.sync="dialogVisible" width="35vw">
        <el-steps direction="vertical" :active="1">
          <template v-for="(item,index) in kuaidiid">
            <el-step :title="item.context" :description="item.time" :key="index"></el-step>
          </template>
        </el-steps>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑地址" :visible.sync="dialogVisible111" width="35vw">
        <!-- <el-cascader v-model="value" :options="options"></el-cascader> -->
        <!-- <el-cascader :options="cityOptions" :value="city" change-on-select></el-cascader> -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible111 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible111 = false">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// import cityOptions from "@/js/provinces-china-master/city_data2017_element.js";
import { createNamespacedHelpers } from "vuex";
const userMoudule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userMoudule;
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  //注册组件
  components: {},
  // 定义变量
  data() {
    return {
      city: [],
      //   cityOptions: cityOptions,
      value: [],
      dialogVisible: false,
      dialogVisible111: false,
      query: "",
      pagenum: "1",
      pagesize: "10",
      user_id: "",
      pay_status: "",
      is_send: "",
      order_fapiao_title: "",
      order_fapiao_company: "",
      order_fapiao_content: "",
      consignee_addr: "",
      columns: [
        {
          label: "#",
          align: "center"
        },
        {
          label: "订单编号",
          prop: "order_number",
          align: "center",
          width: "300"
        },
        {
          label: "订单价格",
          prop: "order_price",
          align: "center"
        },
        {
          label: "是否付款",
          name: "action1",
          align: "center"
        },
        {
          label: "是否发货",
          prop: "is_send",
          align: "center"
        },
        {
          label: "下单时间",
          prop: "update_time",
          align: "center"
        },
        {
          label: "操作",
          name: "action2",
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
    ...userActions(["getorders", "getkuaidiid"]),
    edit(scope) {
      this.dialogVisible111 = true;
      console.log(scope);
    },
    logistics(scope) {
      console.log(scope);
      this.dialogVisible = true;
      this.getkuaidiid({ id: 1106975712662 });
    },
    query111() {
      this.getorders({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        user_id: this.user_id,
        pay_status: this.pay_status,
        is_send: this.is_send,
        order_fapiao_title: this.order_fapiao_title,
        order_fapiao_company: this.order_fapiao_company,
        order_fapiao_content: this.order_fapiao_content,
        consignee_addr: this.consignee_addr
      });
    }
  },
  //页面初始化方法
  mounted() {
    this.getorders({
      query: this.query,
      pagenum: this.pagenum,
      pagesize: this.pagesize,
      user_id: this.user_id,
      pay_status: this.pay_status,
      is_send: this.is_send,
      order_fapiao_title: this.order_fapiao_title,
      order_fapiao_company: this.order_fapiao_company,
      order_fapiao_content: this.order_fapiao_content,
      consignee_addr: this.consignee_addr
    });
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {
    ...userState(["orders", "kuaidiid"])
  }
};
</script>

<style scoped lang='scss'>
</style>