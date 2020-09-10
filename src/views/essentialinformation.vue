<template>
  <div>
    <div style="margin:10px;">
      <el-alert title="添加商品信息" type="info" show-icon center></el-alert>
    </div>
    <div style="margin:10px;">
      <el-steps :active="active" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <div style="margin:30px;">
      <el-tabs :tab-position="tabPosition" v-model="editableTabsValue">
        <el-tab-pane label="基本信息">
          <el-form :model="form" label-width="100px" :rules="rules">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="form.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="form.goods_price" :disabled="form.goods_name===''?true:false"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="form.goods_weight" :disabled="form.goods_price===''?true:false"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="form.goods_number" :disabled="form.goods_weight===''?true:false"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-cascader
                v-model="form.goods_cat"
                :options="categories"
                :props="{ expandTrigger: 'hover' ,label:'cat_name',value:'cat_name'}"
                :disabled="form.goods_number===''?true:false"
              ></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数" :disabled="flag1?true:false">暂无参数</el-tab-pane>
        <el-tab-pane label="商品属性" :disabled="flag2?true:false">暂无属性</el-tab-pane>
        <el-tab-pane label="商品图片" :disabled="flag3?true:false">
          <el-upload class="upload-demo" drag action="/api/upload" multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" :disabled="flag4?true:false">
          <mavon-editor v-model="goods_introduce" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div style="margin-left:250px;">
      <el-button
        style="margin-top: 12px;"
        @click="next"
        type="success"
        v-if="form.goods_cat!==''"
      >下一步</el-button>
    </div>
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
      goods_introduce: "",
      flag1: true,
      flag2: true,
      flag3: true,
      flag4: true,
      editableTabsValue: "0",
      type: "", //查询参数
      pagenum: 1, //当前页码
      pagesize: 10, //每页显示条数
      value: [],
      active: 0,
      tabPosition: "left",
      query: "",
      form: {
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        goods_number: "",
        goods_cat: ""
      },
      rules: {
        goods_name: [
          { required: true, message: "商品名字不能为空", trigger: "blur" }
        ],
        goods_price: [
          { required: true, message: "商品价格不能为空", trigger: "blur" }
        ],
        goods_weight: [
          { required: true, message: "商品重量不能为空", trigger: "blur" }
        ],
        goods_number: [
          { required: true, message: "商品数量不能为空", trigger: "blur" }
        ]
      }
    };
  },
  //事件方法执行
  methods: {
    ...userActions(["getcategories", "postgoods"]),
    next() {
      if (this.active > 5) {
        this.active = 0;
        this.editableTabsValue = "0";
      } else {
        this.active++;
        this.editableTabsValue = this.active.toString();
        if (this.active === 1) {
          this.flag1 = false;
        } else if (this.active === 2) {
          this.flag1 = false;
          this.flag2 = false;
        } else if (this.active === 3) {
          this.flag1 = false;
          this.flag2 = false;
          this.flag3 = false;
        } else if (this.active === 4) {
          this.flag1 = false;
          this.flag2 = false;
          this.flag3 = false;
          this.flag4 = false;
        } else if (this.active === 5) {
          let a = this.form.goods_cat.toString();
          //   console.log(
          //     this.form.goods_name,
          //     a,
          //     this.form.goods_price,
          //     this.form.goods_number,
          //     this.form.goods_weight,
          //     this.goods_introduce
          //   );
          this.postgoods({
            query: this.query,
            pagenum: this.pagenum,
            pagesize: this.pagesize,
            goods_name: this.form.goods_name,
            goods_cat: a,
            goods_price: this.form.goods_price,
            goods_number: this.form.goods_number,
            goods_weight: this.form.goods_weight,
            goods_introduce: "",
            pics: [],
            attrs: []
          });
          this.$router.push("/goods/goods");
        }
      }
    }
  },
  //页面初始化方法
  mounted() {
    this.getcategories({
      type: this.type,
      pagenum: this.pagenum,
      pagesize: this.pagesize
    });
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {
    ...userState(["categories"])
  }
};
</script>

<style scoped lang='scss'>
</style>