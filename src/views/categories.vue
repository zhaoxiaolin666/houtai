<template>
  <div>
    <el-card class="box-card">
      <div style="margin-bottom:20px;">
        <el-button type="primary" @click="dialogTableVisible111">添加分类</el-button>
      </div>
      <zk-table
        ref="table"
        sum-text="sum"
        index-text="#"
        :data="categories"
        :columns="columns"
        :stripe="props.stripe"
        :border="props.border"
        :show-header="props.showHeader"
        :show-summary="props.showSummary"
        :show-row-hover="props.showRowHover"
        :show-index="props.showIndex"
        :tree-type="props.treeType"
        :is-fold="props.isFold"
        :expand-type="props.expandType"
        :selection-type="props.selectionType"
      >
        <template slot="likes111" scope="scope">
          <i class="el-icon-circle-check" v-if="!scope.row.cat_deleted" style="color:skyblue;"></i>
          <i class="el-icon-circle-close" v-if="scope.row.cat_deleted" style="color:red;"></i>
        </template>
        <template slot="likes222" scope="scope">
          <el-tag v-if="scope.row.cat_level===0">一级</el-tag>
          <el-tag type="success" v-if="scope.row.cat_level===1">二级</el-tag>
          <el-tag type="danger" v-if="scope.row.cat_level===2">三级</el-tag>
        </template>
        <template slot="likes333" scope="scope">
          <el-button type="primary" @click="eidt(scope.row)" size="mini">
            <i class="el-icon-edit"></i>编辑
          </el-button>
          <el-button type="danger" @click="del(scope.row)" size="mini">
            <i class="el-icon-delete"></i>删除
          </el-button>
        </template>
      </zk-table>
    </el-card>
    <!-- 编辑分类 -->
    <el-dialog title="编辑分类" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="分类名称" :label-width="formLabelWidth" prop="cat_name">
          <el-input v-model="form.cat_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible222">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible333">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加分类 -->
    <el-dialog title="添加分类" :visible.sync="dialogTableVisible" width="30vw">
      <el-form :model="form111" ref="form111" :rules="rules">
        <el-form-item label="分类名称" :label-width="formLabelWidth" prop="cat_name">
          <el-input v-model="form111.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" :label-width="formLabelWidth">
          <el-cascader
            v-model="value"
            :options="categories"
            :props="{label:'cat_name',value:'cat_name',checkStrictly: true}"
            :disabled="form111.cat_name===''?true:false"
            ref="cascader"
            @change="cascader"
            checkStrictly="true"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible222">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible333">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentpage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totals"
    ></el-pagination>
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
      cat_pid: 0,
      cat_level: 0,
      options: [],
      disabled: true,
      value: [],
      form: { cat_name: "", cat_id: "" }, //编辑表单
      form111: { cat_name: "" }, //编辑表单
      dialogFormVisible: false,
      dialogTableVisible: false,
      formLabelWidth: "120px",
      type: "", //查询参数
      pagenum: 1, //当前页码
      currentpage: 1,
      pagesize: 10, //每页显示条数
      pageSize: 10,
      props: {
        stripe: false,
        border: true,
        showHeader: true,
        showSummary: false,
        showRowHover: false,
        showIndex: true,
        treeType: true,
        isFold: true,
        expandType: false,
        selectionType: false
      },
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
          align: "center",
          headerAlign: "center"
        },
        {
          label: "是否有效",
          align: "center",
          headerAlign: "center",
          type: "template",
          template: "likes111"
        },
        {
          label: "排序",
          align: "center",
          headerAlign: "center",
          type: "template",
          template: "likes222"
        },
        {
          label: "操作",
          type: "template",
          template: "likes333",
          align: "center",
          headerAlign: "center"
        }
      ],
      rules: {
        cat_name: [
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
      "postcategories",
      "deletecategories",
      "putcategories"
    ]),
    handleSizeChange(val) {
      this.getcategories({
        type: this.type,
        pagenum: this.currentpage,
        pagesize: val
      });
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getcategories({
        type: this.type,
        pagenum: val,
        pagesize: this.pageSize
      });
      console.log(`当前页: ${val}`);
    },
    //打开编辑
    eidt(row) {
      console.log(row);
      this.form.cat_id = row.cat_id;
      this.form.cat_name = row.cat_name;
      this.dialogFormVisible = true;
    },
    //取消编辑
    dialogFormVisible222() {
      this.dialogFormVisible = false;
      this.$refs.form.resetFields(); //重置dom
    },
    //确定编辑
    dialogFormVisible333() {
      this.dialogFormVisible = false;
      this.putcategories({
        id: this.form.cat_id,
        cat_name: this.form.cat_name,
        type: this.type,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      });
      this.pagenum = 1;
      this.$refs.form.resetFields(); //重置dom
    },
    //删除
    del(row) {
      //   console.log(row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deletecategories({
            id: row.cat_id,
            type: this.type,
            pagenum: this.pagenum,
            pagesize: this.pagesize
          });
          this.pagenum = 1;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //打开添加分类
    dialogTableVisible111() {
      //   this.long = totals;
      this.dialogTableVisible = true;
      this.getcategories({
        type: this.type,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      });
    },
    //取消分类添加
    dialogTableVisible222() {
      this.dialogTableVisible = false;
      this.$refs.form111.resetFields();
      this.value = [];
    },
    cascader() {
      let a = this.$refs.cascader.getCheckedNodes();
      console.log(a);
      this.cat_pid = a[0].data.cat_id;
      console.log("父id111", this.cat_pid);
      this.cat_level = a[0].level;
      // console.log(this.options);
    },
    //确定分类添加
    dialogTableVisible333() {
      console.log("父id", this.cat_pid);
      console.log(this.cat_level);
      this.postcategories({
        cat_pid: this.cat_pid,
        cat_name: this.form111.cat_name,
        cat_level: this.cat_level,
        type: this.type,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      });
      this.dialogTableVisible = false;
      this.$refs.form111.resetFields();
      this.value = [];
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
    ...userState(["categories", "totals"])
  }
};
</script>

<style scoped lang='scss'>
</style>