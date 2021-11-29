<template>
  <div>
    <!-- 添加 -->
    <el-button type="primary" @click="addShow">添加</el-button>
    <!-- 添加页面 -->
    <v-add
      v-if="info.isShow"
      :info="info"
      ref="goods"
      @goodsShowList="goodsShowList"
    ></v-add>
    <!-- 列表页面 -->
    <v-list :info="info" @emitgoods="emitgoods" ref="goodsList"></v-list>
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
        isTitle: "商品列表添加",
      },
    };
  },
  methods: {
    addShow() {
      this.info = {
        isShow: true,
        isAdd: true,
        isTitle: "商品列表添加",
      };
    },
    emitgoods(e) {
      this.info = {
        isShow: true,
        isAdd: false,
        isTitle: "商品列表编辑",
      };
      setTimeout(() => {
        this.$refs.goods.ediOne(e);
      }, 0);
    },
    goodsShowList() {
      setTimeout(() => {
        this.$refs.goodsList.showList();
      }, 0);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>