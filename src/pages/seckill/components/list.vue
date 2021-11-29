<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
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
  computed: {
    ...mapGetters({
      list: "seckill/list",
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {
      
    };
  },
  methods: {
    edit(e) {
      this.requestSeckInfo({ id: e.row.id }).then((res) => {
          res.data.list.id = e.row.id;
          this.$emit("seckInfo",res.data.list)
      });
      this.info.isAdd = false;
      this.info.isShow = true;
    },
    ...mapActions({
      requestSeckList: "seckill/requestSeckList",
      requestSeckInfo: "seckill/requestSeckInfo",
      requestSeckDel: "seckill/requestSeckDel",
    }),
    showList() {
      this.requestSeckList();
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
          this.requestSeckDel({id:e.id});
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
