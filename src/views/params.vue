<template>
  <div>
    <el-card class="box-card">
      <el-alert title="注意:只允许为第三级分类设置相关参数！" type="warning" show-icon></el-alert>
      <div style="margin:20px 0;">
        <span style="font-size:20px;margin-right:20px;">选择商品分类:</span>
        <el-cascader
          v-model="value"
          :options="categories"
          :props="{ expandTrigger: 'hover' ,label:'cat_name',value:'cat_name'}"
          ref="cascader"
          @change="cascader"
        ></el-cascader>
      </div>
      <div style="display:flex;margin-bottom:10px;">
        <div
          style="margin-right:15px; cursor: pointer;"
          @click="dynamic"
          :class="flag===1 ? 'color' : ''"
        >动态参数</div>
        <div
          style="margin-left:15px; cursor: pointer;"
          @click="statics"
          :class="flag===2 ? 'color' : ''"
        >静态属性</div>
      </div>
      <div style="height:2px;width:74vw;background:#f0f0f0;">
        <div
          style="height:2px;background:skyblue;width:65px;"
          :class="flag===1 ? 'transform1' : 'transform2'"
        ></div>
      </div>
      <!-- 动态参数 -->
      <div style="margin:20px 0;" v-if="flag===1">
        <div>
          <el-button
            type="primary"
            :disabled="value.length===0?true:false"
            size="mini"
            @click="dialogTableVisible111"
          >添加参数</el-button>
        </div>
      </div>
      <!-- 静态属性 -->
      <div style="margin:20px 0;" v-if="flag===2">
        <div>
          <el-button
            type="primary"
            :disabled="value.length===0?true:false"
            size="mini"
            @click="dialogFormVisible111"
          >添加属性</el-button>
        </div>
      </div>
      <div>
        <rolelist :roles="attributes" :columns="columns" :index-options="indexOptions">
          <template v-slot:action="scope">
            <el-button type="primary" @click="eidt(scope.scope)" size="mini">
              <i class="el-icon-edit"></i>编辑
            </el-button>
            <el-button type="danger" @click="del(scope.scope)" size="mini">
              <i class="el-icon-delete"></i>删除
            </el-button>
          </template>
        </rolelist>
      </div>
    </el-card>
    <!-- 添加动态参数 -->
    <div>
      <el-dialog title="添加动态参数" :visible.sync="dialogTableVisible" width="35vw">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item label="动态参数" :label-width="formLabelWidth" prop="attr_name">
            <el-input v-model="form.attr_name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible222">取 消</el-button>
          <el-button type="primary" @click="dialogTableVisible333">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 添加静态参数 -->
    <div>
      <el-dialog title="添加动态参数" :visible.sync="dialogFormVisible" width="35vw">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item label="动态参数" :label-width="formLabelWidth" prop="attr_name">
            <el-input v-model="form.attr_name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible222">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible333">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 编辑参数 -->
    <div>
      <el-dialog title="编辑参数" :visible.sync="dialogeditVisible" width="35vw">
        <el-form :model="form111" ref="form" :rules="rules">
          <el-form-item
            :label="sel==='many'? '动态参数':'静态参数'"
            :label-width="formLabelWidth"
            prop="attr_name"
          >
            <el-input v-model="form111.attr_name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogeditVisible222">取 消</el-button>
          <el-button type="primary" @click="dialogeditVisible333">确 定</el-button>
        </div>
      </el-dialog>
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
      attr_id: "",
      formLabelWidth: "120px",
      form: { attr_name: "" },
      form111: { attr_name: "" },
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogeditVisible: false,
      cascaderid: "", //dom
      disabled: true,
      value: [],
      type: "", //查询参数
      pagenum: 1, //当前页码
      pagesize: 10, //每页显示条数
      flag: 1,
      sel: "many", //动态参数
      columns: [
        {
          label: "#",
          align: "center",
          width: "200"
        },
        {
          label: "参数名称",
          prop: "attr_name",
          align: "center"
        },
        {
          label: "操作",
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
      },
      rules: {
        attr_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  //事件方法执行
  methods: {
    ...userActions([
      "getcategories",
      "getcategoriesattributes",
      "postcategoriesattributes",
      "deletecategoriesattrid",
      "putcategoriesattrId"
    ]),
    //动态
    dynamic() {
      this.flag = 1;
      this.sel = "many";
      this.getcategoriesattributes({
        id: this.cascaderid,
        sel: this.sel
      });
    },
    //静态
    statics() {
      this.flag = 2;
      this.sel = "only";
      this.getcategoriesattributes({
        id: this.cascaderid,
        sel: this.sel
      });
    },
    cascader() {
      console.log(this.value);
      let a = this.$refs.cascader.getCheckedNodes();
      this.cascaderid = a[0].data.cat_id;
      console.log(a, "aaaaa");
      console.log(a[0].data.cat_id, "bbbbbb");
      this.getcategoriesattributes({
        id: a[0].data.cat_id,
        sel: this.sel
      });
    },
    //打开添加动态参数
    dialogTableVisible111() {
      this.dialogTableVisible = true;
    },
    //取消添加动态参数
    dialogTableVisible222() {
      this.dialogTableVisible = false;
      this.form.attr_name = "";
    },
    //确定添加动态参数
    dialogTableVisible333() {
      this.dialogTableVisible = false;
      this.postcategoriesattributes({
        id: this.cascaderid,
        attr_name: this.form.attr_name,
        attr_sel: this.sel
      });
      this.form.attr_name = "";
    },
    //打开添加静态参数
    dialogFormVisible111() {
      this.dialogTableVisible = true;
    },
    //取消添加静态参数
    dialogFormVisible222() {
      this.dialogTableVisible = false;
      this.form.attr_name = "";
    },
    //确定添加静态参数
    dialogFormVisible333() {
      this.dialogTableVisible = false;
      this.postcategoriesattributes({
        id: this.cascaderid,
        attr_name: this.form.attr_name,
        attr_sel: this.sel
      });
      this.form.attr_name = "";
    },
    //编辑参数
    eidt(scope) {
      console.log(scope);
      this.attr_id = scope.row.attr_id;
      this.form111.attr_name = scope.row.attr_name;
      this.dialogeditVisible = true;
    },
    //取消编辑参数
    dialogeditVisible222() {
      this.dialogeditVisible = false;
    },
    //确定编辑参数
    dialogeditVisible333() {
      this.dialogeditVisible = false;
      this.putcategoriesattrId({
        id: this.cascaderid,
        attrId: this.attr_id,
        attr_name: this.form111.attr_name,
        attr_sel: this.sel
      });
    },
    //删除参数
    del(scope) {
      console.log(scope);
      this.deletecategoriesattrid({
        id: this.cascaderid,
        attrid: scope.row.attr_id,
        sel: this.sel
      });
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
    ...userState(["categories", "attributes"])
  }
};
</script>

<style scoped lang='scss'>
.transform1 {
  transform: translateX(0px);
  transition: 0.5s;
}
.transform2 {
  transform: translateX(93px);
  transition: 0.5s;
}
.color {
  color: skyblue;
}
</style>