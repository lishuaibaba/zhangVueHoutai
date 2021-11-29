<template>
  <div>
    <!-- 添加 -->
    <el-button type="primary" @click="addShow">添加</el-button>
    <!-- 添加页面 -->
    <v-add v-if="info.isShow" :info="info" ref="spec" @speclist="speclist"></v-add>
    <!-- 列表页面 -->
    <v-list :info="info" @emitspec="emitspec" ref="specls"></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        isShow: false,
        isAdd: true, //给添加按钮添加一个标识，用来提示添加还是修改
        isTitle: "商品规格添加",
      },
    };
  },
  methods: {
    addShow() {
      this.info = {
        isShow: true,
        isAdd: true,
        isTitle: "商品规格添加",
      };
    },
    emitspec(e) {
      this.info = {
        isShow: true,
        isAdd: false,
        isTitle: "商品规格编辑",
      };
      setTimeout(()=>{
          this.$refs.spec.onSpecEdit(e)
      },0)
    },
    speclist(){
        setTimeout(()=>{
          this.$refs.specls.reqList();
      },0)
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>