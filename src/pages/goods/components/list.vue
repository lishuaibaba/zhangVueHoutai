<template>
  <div>
    <el-table :data="list"  v-loading="loading" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="180">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="280">
      </el-table-column>
      <el-table-column prop="price" label="商品价格"> </el-table-column>
      <el-table-column prop="market_price" label="市场价格"> </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img width="180" :src="$preImg + scope.row.img" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew == 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot == 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="form.size"
      :current-page="1"
      @prev-click="prev"
      @next-click="next"
      @current-change="aolig"
      class="fenye"
      :page-count="3"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "goods/list",
      goodsInfo: "goods/goodsInfo",
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {
      loading:true,
      total: null,
      form: {
        size: 2,
        page: 1,
      },
    };
  },
  methods: {
    edit(e) {
      this.resquestGoodsInfo({ id: e.row.id }).then((res) => {
        this.goodsInfo.id = e.row.id;
        this.$emit("emitgoods", this.goodsInfo);
      });
      this.info.isAdd = false;
      this.info.isShow = true;
    },
    ...mapActions({
      resquestGoodsCount: "goods/resquestGoodsCount",
      resquestGoodsList: "goods/resquestGoodsList",
      resquestGoodsInfo: "goods/resquestGoodsInfo",
      resquestCateGoodsDel: "goods/resquestCateGoodsDel",
    }),
    showList() {
      this.resquestGoodsCount().then((res) => {
        this.total = res.data.list[0].total;
        this.resquestGoodsList(this.form);
        this.loading = false;
      });
    },
    handleDelete(e) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.resquestCateGoodsDel(e.id);
          this.showList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    prev(e) {
      this.loading = true;
      this.form.page = e;
      this.showList();
    },
    // 下一页
    next(e) {
      this.loading = true;
      this.form.page = e;
      this.showList();
    },
    // 点击页码数
    aolig(e) {
      this.loading = true;
      this.form.page = e;
      this.showList();
    },
  },
  mounted() {
    this.showList();
  },
};
</script>
<style scoped>
</style>
