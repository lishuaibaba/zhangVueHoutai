<template>
  <div>
    <el-button type="primary" @click="addShow">添加</el-button>
    <v-add v-if="info.isShow" :info="info"></v-add>
    <v-list @edit="edit($event)" @aaa="aaa($event)"></v-list>
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
        isTitle: "角色添加",
        isAdd: true, // 默认添加
      },
    };
  },
  methods: {
    // 角色添加
    addShow() {
      this.info.isShow = !this.info.isShow;
      this.info.isAdd = true;
    },
    edit(e) {
      this.info.isShow = true;
      this.info.isTitle = "角色编辑"
      this.info.id = e;
      this.info.isAdd = false;
    },
    aaa(e){
      console.log(e);
      this.info.aaa = e;
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>