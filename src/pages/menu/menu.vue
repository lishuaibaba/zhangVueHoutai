<template>
  <div>
    <el-button type="primary" @click="addShow">添加</el-button>
    <!-- 添加 -->
    <v-add v-show="info.isShow" :info="info" ref="one"></v-add>
    <!-- 列表 -->
    <v-list @edit="edit($event)"></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add.vue";
import vList from "./components/list.vue";
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
        isTitle: "菜单添加",
      },
    };
  },
  methods: {
    addShow() {
      this.info.isShow = !this.info.isShow;
      this.info.isAdd = true;
      this.info.isTitle = "菜单添加";
      // 清空数据
      this.$refs.one.empor();
    },
    edit(e) {
      this.info = {
        isShow: true,
        isAdd: false,
        isTitle: "菜单编辑",
      };
      this.$refs.one.look(e);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>