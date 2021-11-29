<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="分类编号" width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180">
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
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "calssify/list",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      resquestCateList: "calssify/resquestCateList",
      resquestCateListDel: "calssify/resquestCateListDel",
    }),
    // 删除
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
          this.resquestCateListDel(e.id);
          this.resquestCateList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑
    edit(e) {
      this.$emit("emitclass", e.row.id);
      this.info.isAdd = false;
      this.info.isShow = true;
    },
  },
  mounted() {
    this.resquestCateList();
  },
};
</script>
<style scoped>
</style>