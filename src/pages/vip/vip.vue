<template>
  <div>
    <!-- 添加页面 -->
    <v-add v-if="info.isShow" :info="info" ref="vip" @emitList="emitList"></v-add>
    <!-- 列表页面 -->
    <v-list :info="info" @emitvip="emitvip" ref="listVip"></v-list>
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
        isTitle: "商品分类添加",
      },
    };
  },
  methods: {
    addShow() {
      this.info = {
        isShow: true,
        isAdd: true,
        isTitle: "商品分类添加",
      };
    },
    emitvip(e) {
      this.info = {
        isShow: true,
        isAdd: false,
        isTitle: "商品分类编辑",
      };
      setTimeout(() => {
        this.$refs.vip.ediOne(e);
      }, 0);
    },
    emitList(){
        this.$refs.listVip.showList(); 
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>