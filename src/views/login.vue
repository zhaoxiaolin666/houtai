<template>
  <div class="loginbox">
    <div style="width:42vw;height:40vh;">
      <div class="logincont">
        <div style="text-align:center;">
          <h2>欢迎来到小爱后台管理系统</h2>
        </div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="8vw"
          class="demo-ruleForm"
        >
          <el-form-item label="请输入用户名" prop="username">
            <el-input
              type="text"
              v-model="ruleForm.username"
              autocomplete="off"
              clearable
              style="width:30vw"
            ></el-input>
          </el-form-item>
          <el-form-item label="请输入密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
              show-password
              clearable
              style="width:30vw"
            ></el-input>
          </el-form-item>
          <div
            style="text-align:center;padding-bottom:20px;"
          >特别提醒：如果您是管理员，请使用管理员账号登录，如果不知道账号，请联系公司人事。</div>
          <div style="text-align:center;">
            <el-button type="primary" @click="submitForm">立即登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  //注册组件
  components: {},
  // 定义变量
  data() {
    return {
      ruleForm: {
        username: "admin", //用户名
        password: "123456" //密码
      },
      rules: {
        //规则
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },

  //事件方法执行
  methods: {
    //登录跳转
    submitForm() {
      this.$store.dispatch("user/login", {
        username: this.ruleForm.username,
        password: this.ruleForm.password
      });
      console.log(this.$store);
    },
   
  },
  //页面初始化方法
  mounted() {},
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {
      
  }
};
</script>

<style scoped lang='scss'>
.loginbox {
  position: relative;
}
.logincont {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -19vw;
  margin-top: 20vh;
  border: 1px solid #f0f0f0;
  background-color: #fafafa;
  padding: 30px;
}
</style>