<template>
  <div>
    <el-table v-loading="loading" :data="list" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="160">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column prop="attrs" label="规格属性">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            v-for="(item, index) in scope.row.attrs"
            :key="index"
            >{{ item }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="220">
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
      :page-size="listObj.size"
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
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      specInfo: "spec/specInfo",
    }),
  },
  components: {},
  data() {
    return {
      total: null,
      listObj: {
        size: 3,
        page: 1,
      },
      loading: true,
      list: [
        {
          id: 1,
          specsname: "haha",
          attrs: ["黄色", "黑色"],
          status: 1,
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      resquestSpecList: "spec/resquestSpecList",
      resquestSpecCount: "spec/resquestSpecCount",
      resquestSpecListDel: "spec/resquestSpecListDel",
      resquestSpecInfo: "spec/resquestSpecInfo",
    }),
    reqList() {
      var count = this.resquestSpecCount();
      count.then((res) => {
        this.total = res.data.list[0].total;
        var arr = this.resquestSpecList(this.listObj);
        arr.then((res) => {
          for (var i = 0; i < res.data.list.length; i++) {
            var str = JSON.parse(res.data.list[i].attrs);
            console.log(str);
            res.data.list[i].attrs = str;
          }
          this.list = res.data.list;
          this.loading = false;
        });
      });
    },
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
          this.resquestSpecListDel(e.id);
          this.reqList();
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
      this.resquestSpecInfo({ id: e.row.id }).then((res) => {
        this.$emit("emitspec", this.specInfo);
      });
      this.info.isAdd = false;
      this.info.isShow = true;
    },
    prev(e) {
      this.loading = true;
      this.listObj.page = e;
      this.reqList();
    },
    // 下一页
    next(e) {
      this.loading = true;
      this.listObj.page = e;
      this.reqList();
    },
    // 点击页码数
    aolig(e) {
      this.loading = true;
      this.listObj.page = e;
      this.reqList();
    },
  },
  mounted() {
    this.reqList();
  },
};
</script>
<style scoped>
.fenye {
  float: right;
  margin-right: 50px;
  margin-top: 20px;
}
</style>