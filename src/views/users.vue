<template>
  <div>
    <div>
      <el-card class="box-card">
        <!-- 头部  -->
        <div style="display:flex;">
          <div style="width:25vw;margin-right:30px;">
            <el-input placeholder="请输入搜索内容" v-model="query" clearable>
              <el-button slot="append" icon="el-icon-search" @click="query111"></el-button>
            </el-input>
          </div>
          <div>
            <el-button type="primary" @click="dialogTableVisible = true">添加用户</el-button>
          </div>
        </div>
        <!-- 用户列表 -->
        <div style="margin:30px 0;">
          <el-table :data="userlist" stripe style="width: 100vw" border>
            <el-table-column type="index" :index="indexMethod" label="#" width="80" align="center"></el-table-column>
            <el-table-column prop="username" label="姓名" :width="width111" align="center"></el-table-column>
            <el-table-column prop="role_name" label="角色" :width="width111" align="center"></el-table-column>
            <el-table-column prop="mobile" label="电话" :width="width111" align="center"></el-table-column>
            <el-table-column prop="email" label="邮箱" :width="width111" align="center"></el-table-column>
            <el-table-column label="状态" width="120" align="center">
              <template slot-scope="scope">
                <el-switch
                  active-color="#13ce66"
                  inactive-color="#DCDFE6"
                  v-model="scope.row.mg_state"
                  @change="changestate(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <!-- 编辑按钮 -->
                <el-tooltip content="编辑按钮" placement="top">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="dialogFormVisible111(scope)"
                  ></el-button>
                </el-tooltip>
                <!-- 删除按钮 -->
                <el-tooltip content="删除按钮" placement="top">
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click="del(scope.$index)"
                  ></el-button>
                </el-tooltip>
                <!-- 分配用户 -->
                <el-tooltip content="设置按钮" placement="top">
                  <el-button
                    type="warning"
                    icon="el-icon-setting"
                    size="mini"
                    @click="dialogbranchVisible111(scope)"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页  -->
          <div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10,15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </el-card>
      <!-- 添加用户 -->
      <el-dialog title="添加用户" :visible.sync="dialogTableVisible" width="35vw">
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile" type="number">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible111">取 消</el-button>
          <el-button type="primary" @click="dialogTableVisible222">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑用户 -->
      <el-dialog title="编辑用户" :visible.sync="dialogFormVisible" width="35vw">
        <el-form :model="edit" :rules="rules111" ref="edit">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
            <el-input v-model="edit.username" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
            <el-input v-model="edit.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
            <el-input v-model="edit.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible222">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible333('edit')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分配用户 -->
      <el-dialog title="分配用户" :visible.sync="dialogbranchVisible" width="35vw">
        <el-form :model="distribution" ref="ruleForm">
          <el-form-item label="当前用户:" :label-width="formLabelWidth">{{distribution.username}}</el-form-item>
          <el-form-item label="当前角色:" :label-width="formLabelWidth">{{distribution.role_name}}</el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <el-select placeholder="请选择" v-model="roleName1" clearable>
              <el-option
                v-for="item in roles"
                :key="item.id"
                :value="item.roleName"
                :label="item.roleDesc"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogbranchVisible222">取 消</el-button>
          <el-button type="primary" @click="dialogbranchVisible333">确 定</el-button>
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
      width111: 150,
      roleName1: "", //选择器value
      edit: {}, //编辑
      distribution: {}, //分配
      pageSize: 5, //条数
      currentPage: 1, //页数
      query: "", //查询参数
      pagenum: 1, //当前页码
      pagesize: 5, //每页显示条数
      value: true,
      dialogTableVisible: false, //添加用户开关
      dialogFormVisible: false, //编辑用户开关
      dialogbranchVisible: false, //分配用户开关
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      formLabelWidth: "100px",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { min: 11, max: 11, message: "长度是11个数字", trigger: "blur" }
        ]
      },
      rules111: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        mobile: [
          {
            required: true,
            message: "请输入正确电话",
            trigger: "blur"
          },
          { min: 11, max: 11, message: "长度是11个数字", trigger: "blur" }
        ]
      }
    };
  },
  //事件方法执行
  methods: {
    ...userActions([
      "getuserlist",
      "getuserdelete",
      "getuseradd",
      "putusers",
      "putusersuid",
      "getroles",
      "putusersrole"
    ]),
    //搜索
    query111() {
      this.getuserlist({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      });
    },
    //序号
    indexMethod(index) {
      return index + 1;
    },
    //删除
    del(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.getuserdelete({
            id: this.userlist[index].id,
            query: this.query,
            pagenum: this.currentPage,
            pagesize: this.pagesize
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //取消添加
    dialogTableVisible111() {
      this.dialogTableVisible = false;
      this.$refs.ruleForm.resetFields(); //重置dom
    },
    //确定添加
    dialogTableVisible222() {
      this.dialogTableVisible = false;
      this.getuseradd({
        username: this.form.username,
        password: this.form.password,
        email: this.form.email,
        mobile: this.form.mobile,
        query: this.query,
        pagenum: this.currentPage,
        pagesize: this.pagesize
      });
      this.$refs.ruleForm.resetFields(); //重置dom
    },
    //当前页面大小
    handleSizeChange(val) {
      this.pageSize = val;
      this.getuserlist({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pageSize
      });
      console.log(`每页 ${val} 条`);
    },
    //当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getuserlist({
        query: this.query,
        pagenum: this.currentPage,
        pagesize: this.pagesize
      });
      console.log(`当前页: ${val}`);
    },
    //状态修改
    changestate(state) {
      console.log(state, "state");
      this.putusersuid({
        uId: state.id,
        type: state.mg_state,
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      });
    },
    // 点击编辑
    dialogFormVisible111(scope) {
      this.dialogFormVisible = true;
      this.edit = scope.row;
      console.log(scope, "scope");
    },
    //取消编辑
    dialogFormVisible222() {
      this.dialogFormVisible = false;
      this.$refs.ruleForm.resetFields();
    },
    //确定编辑
    dialogFormVisible333(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.putusers({
            id: this.edit.id,
            email: this.edit.email,
            mobile: this.edit.mobile,
            query: this.query,
            pagenum: this.currentPage,
            pagesize: this.pagesize
          });
          this.dialogFormVisible = false;
        } else {
          return false;
        }
      });
    },
    //分配用户
    dialogbranchVisible111(scope) {
      this.dialogbranchVisible = true;
      this.distribution = scope.row;
      console.log(this.distribution, "分配用户");
      this.getroles();
    },
    //取消分配
    dialogbranchVisible222() {
      this.dialogbranchVisible = false;
      this.roleName1 = "";
    },
    // 确定分配
    dialogbranchVisible333() {
      this.dialogbranchVisible = false;
      console.log(this.roleName1, "确定分配");
      let rid = null;
      this.roles.map(item => {
        if (item.roleName === this.roleName1) {
          rid = item.id;
        }
      });
      console.log(rid, this.distribution.id);
      this.putusersrole({
        id: this.distribution.id,
        rid: rid,
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      });
      this.roleName1 = "";
    }
  },
  //页面初始化方法
  mounted() {
    this.getuserlist({
      query: this.query,
      pagenum: this.pagenum,
      pagesize: this.pagesize
    });
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {
    query() {
      if (this.query === "") {
        this.getuserlist({
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        });
      }
    }
  },
  //计算
  computed: {
    ...userState(["userlist", "total", "roles"])
  }
};
</script>

<style scoped lang='scss'>
</style>