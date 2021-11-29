<template>
  <div>
    <el-button type="primary" @click="addShow">添加</el-button>
    <v-add v-if="info.isShow" :info="info"></v-add>
    <v-list @edit="edit($event)"></v-list>
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
        isTitle: "管理员添加",
        isAdd: true, // 默认添加
      },
    };
  },
  methods: {
    addShow() {
      this.info.isShow = true;
    },
    edit(e) {
      this.info = {
        isShow: true,
        isTitle: "管理员修改",
        isAdd: false, // 默认添加
        uid: e,
      };
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>