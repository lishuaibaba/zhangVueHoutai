<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="title" label="轮播图标题" width="280">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img width="180" :src="$preImg + scope.row.img" alt="" />
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
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "banner/list",
      bannerInfo: "banner/bannerInfo",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      resquestBannerList: "banner/resquestBannerList",
      resquestBannerInfo: "banner/resquestBannerInfo",
      resquestCateBannerDel: "banner/resquestCateBannerDel",
    }),
    showList() {
      this.resquestBannerList();
    },
    edit(e) {
      this.resquestBannerInfo({ id: e.row.id }).then((res) => {
        this.bannerInfo.id = e.row.id;
        this.$emit("emitbanner", this.bannerInfo);
      });
      this.info.isAdd = false;
      this.info.isShow = true;
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
          this.resquestCateBannerDel(e.id);
          this.showList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.showList();
  },
};
</script>
<style scoped>
</style>