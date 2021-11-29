<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="80"> </el-table-column>
      <el-table-column prop="rolename" label="角色名称"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope)">编辑</el-button>
          <el-button type="danger" @click="roleDel(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { resRoleDel } from "../../../util/request.js";
export default {
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestRoleList: "role/requestRoleList",
    }),
    roleDel(id) {
      resRoleDel({id:id}).then((res) => {});
      alert("删除成功")
      this.requestRoleList();
    },
    // 编辑按钮
    edit(scope){
      this.$emit("edit", scope.row.id);
      this.$emit("aaa", true);
    }
  },
  mounted() {
    this.requestRoleList();
  },
};
</script>
<style scoped>
</style>