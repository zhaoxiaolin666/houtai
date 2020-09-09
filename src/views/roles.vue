<template>
  <div>
    <el-row>
      <div style="padding:20px 0;">
        <el-button type="primary" @click="dialogTableVisible111">添加角色</el-button>
      </div>
    </el-row>
    <el-dialog title="添加角色" :visible.sync="dialogTableVisible" width="35vw">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="角色名" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible222">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible333">确 定</el-button>
      </div>
    </el-dialog>
    <rolelist
      :roles="roles"
      :columns="columns"
      :expand-options="true"
      :index-options="indexOptions"
      :loadingOptions="loadingOptions"
    >
      <template v-slot:expand="scope">
        <div style="border-top:1px solid #f2f2f2;" v-if="scope.scope.row.children.length>0">
          <div v-for="(item,index) in scope.scope.row.children" :key="index">
            <div style="display:flex;align-items:center;border-bottom:1px solid #f2f2f2;">
              <div style="padding:15px;">
                <el-tag closable @close="handleClose1(scope.scope.row,item)">{{item.authName}}</el-tag>
              </div>
              <div>
                <div
                  v-for="(item1,index1) in item.children"
                  :key="index1"
                  style="display:flex;
                  align-items:center;"
                >
                  <div style="padding:15px;">
                    <el-tag
                      type="success"
                      closable
                      @close="handleClose2(scope.scope.row,item1)"
                    >{{item1.authName}}</el-tag>
                  </div>
                  <div style="display:flex;flex-wrap:wrap;">
                    <div v-for="(item2,index2) in item1.children" :key="index2">
                      <div style="padding:15px;">
                        <el-tag
                          type="warning"
                          closable
                          @close="handleClose3(scope.scope.row,item2)"
                        >{{item2.authName}}</el-tag>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>暂无数据</div>
      </template>
      <template v-slot:action1="scope">
        <el-button type="primary" @click="dialogformVisible111(scope.scope)" size="mini">编辑</el-button>
        <el-button type="danger" @click="del(scope.scope)" size="mini">删除</el-button>
        <el-button type="warning" @click="distribution111(scope.scope)" size="mini">分配角色</el-button>
      </template>
    </rolelist>
    <el-dialog title="编辑角色" :visible.sync="dialogformVisible" width="35vw">
      <el-form :model="edit" :rules="rules" ref="ruleForm">
        <el-form-item label="角色名" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="edit.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="edit.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogformVisible222">取 消</el-button>
        <el-button type="primary" @click="dialogformVisible333">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="分配权限"
      :visible.sync="dialogbranchVisible"
      width="35vw"
      :before-close="handleClose"
    >
      <el-tree
        :data="rights"
        :props="defaultProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="treeid"
        ref="tree"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogbranchVisible222">取 消</el-button>
        <el-button type="primary" @click="dialogbranchVisible333">确 定</el-button>
      </div>
    </el-dialog>
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
      row: {},
      treeid: [],
      type: "tree",
      id: "",
      edit: {}, //编辑角色
      dialogTableVisible: false,
      dialogformVisible: false,
      dialogbranchVisible: false,
      formLabelWidth: "100px",
      rules: {
        roleName: [
          { required: true, message: "请输入角色", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      },
      form: {
        roleName: "",
        roleDesc: ""
      },
      columns: [
        {
          label: "#",
          align: "center",
          width: "100"
        },
        {
          label: "职位",
          prop: "roleName",
          align: "center",
          width: "350"
        },
        {
          label: "描述",
          prop: "roleDesc",
          align: "center",
          width: "350"
        },
        {
          label: "操作",
          name: "action1",
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
      loadingOptions: {
        text: "加载中...",
        bgColor: "rgba(0, 0, 0, 0.8)"
      },
      defaultProps: {
        children: "children",
        label: "authName"
      }
    };
  },
  //事件方法执行
  methods: {
    //操作方法
    ...userActions([
      "getroles",
      "postsoles",
      "deleteroles",
      "putroles",
      "getrights",
      "postroles",
      "deleterolesroleIdrightsrightId"
    ]),
    //添加角色
    dialogTableVisible111() {
      this.dialogTableVisible = true;
    },
    //取消添加
    dialogTableVisible222() {
      this.dialogTableVisible = false;
      this.$refs.ruleForm.resetFields(); //重置dom
    },
    //确定添加
    dialogTableVisible333() {
      this.dialogTableVisible = false;
      this.postsoles({
        roleName: this.form.roleName,
        roleDesc: this.form.roleDesc
      });
      this.$refs.ruleForm.resetFields(); //重置dom
    },
    //删除角色
    del(scope) {
      //   console.log(scope.row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteroles({
            id: scope.row.id
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑角色
    dialogformVisible111(scope) {
      console.log(scope.row);
      this.dialogformVisible = true;
      this.edit = scope.row;
    },
    //取消编辑
    dialogformVisible222() {
      this.dialogformVisible = false;
    },
    //确定编辑
    dialogformVisible333() {
      this.dialogformVisible = false;
      this.putroles({
        id: this.edit.id,
        roleName: this.edit.roleName,
        roleDesc: this.edit.roleDesc
      });
    },
    //分配角色
    distribution111(scope) {
      this.treeid = [];
      this.getrights({ type: this.type });
      this.dialogbranchVisible = true;
      this.edit = scope.row;
      console.log(scope);
      let a = [];
      a = scope.row;
      if (a.children.length > 0) {
        a.children.map(item1 => {
          if (item1.children.length > 0) {
            item1.children.map(item2 => {
              item2.children.map(item3 => {
                this.treeid.push(item3.id);
              });
            });
          }
        });
      }
    },
    //取消分配
    dialogbranchVisible222() {
      this.dialogbranchVisible = false;
    },
    //确定分配
    dialogbranchVisible333() {
      this.dialogbranchVisible = false;
      let arr = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
      let temp = arr.toString();
      console.log(temp, "111");
      this.postroles({
        roleId: this.edit.id,
        rids: temp
      });
    },
    //x
    handleClose() {
      this.dialogbranchVisible = false;
    },
    handleClose1(tag, item) {
      console.log(tag, "tag");
      console.log(item, "item");
      //   console.log(tag.indexOf(item), "tag.indexOf(item)");
      //   tag.splice(tag.indexOf(item), 1);
      this.deleterolesroleIdrightsrightId({
        roleId: tag.id,
        rightId: item.id
      });
    },
    handleClose2(tag, item) {
      console.log(tag, "tag");
      console.log(item, "item");
      //   console.log(tag.indexOf(item), "tag.indexOf(item)");
      //   tag.splice(tag.indexOf(item), 1);
      this.deleterolesroleIdrightsrightId({
        roleId: tag.id,
        rightId: item.id
      });
    },
    handleClose3(tag, item) {
      console.log(tag, "tag");
      console.log(item, "item");
      //   console.log(tag.indexOf(item), "tag.indexOf(item)");
      //   tag.splice(tag.indexOf(item), 1);
      this.deleterolesroleIdrightsrightId({
        roleId: tag.id,
        rightId: item.id
      });
    }
  },
  //页面初始化方法
  mounted() {
    //挂载角色列表
    this.getroles();
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {
    //获取全局的roles
    ...userState(["roles", "rights"])
  }
};
</script>

<style scoped lang='scss'>
</style>