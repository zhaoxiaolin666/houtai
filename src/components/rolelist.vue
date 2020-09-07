<template>
  <el-table
    :data="roles"
    border
    stripe
    style="width: 100%"
    :element-loading-text="loadingOptions.text"
    :element-loading-spinner="loadingOptions.icon"
    :element-loading-background="loadingOptions.bgColor"
    v-loading="!roles.length"
  >
    <template v-for="(item,index) in columns">
      <el-table-column type="expand" v-if="expandOptions&&item.label==='#'" :key="item.label">
        <template slot-scope="scope">
          <slot name="expand" :scope="scope"></slot>
        </template>
      </el-table-column>
      <el-table-column
        v-if="item.label==='#'"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        :key="index"
        type="index"
      ></el-table-column>
      <el-table-column
        v-if="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        :key="index"
      ></el-table-column>
      <el-table-column
        v-if="!item.prop&&item.label!=='#'"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        :key="index"
      >
        <template slot-scope="scope">
          <slot :name="item.name" :scope="scope"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {
    roles: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    expandOptions: {
      type: Boolean,
      reruired: true
    },
    indexOptions: {
      type: Object,
      required: true
    },
    loadingOptions: {
      type: Object,
      default: () => {
        return {
          text: "",
          icon: "el-icon-loading",
          bgColor: "hsla(0,0%,100%,.9)"
        };
      }
    }
  },
  //注册组件
  components: {},
  // 定义变量
  data() {
    return {};
  },
  //事件方法执行
  methods: {},
  //页面初始化方法
  mounted() {},
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>