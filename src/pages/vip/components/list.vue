<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="480">
      </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="status" label="状态" width="480">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="480">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

import { resVipList } from "../../../util/request.js";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      list: [],
    };
  },
  methods: {
    edit(e) {
      this.$emit("emitvip", e.row.uid);
      this.info.isAdd = false;
      this.info.isShow = true;
    },
    showList() {
      resVipList().then((res) => {
        this.list = res.data.list
      })
    },
  },
  mounted() {
    this.showList();
  },
};
</script>
<style scoped>
</style>