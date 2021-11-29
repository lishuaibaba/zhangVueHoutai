<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="80"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="250">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope)">编辑</el-button>
          <el-button type="danger" @click="del(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="form.size" :current-page="1"
      @prev-click="prev" @next-click="next" @current-change="aolig" class="fenye">
    </el-pagination>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from "vuex";
  import { resUserCount, resUserList, resUserDel } from "../../../util/request.js";
  export default {
    components: {},
    computed: {
      // ...mapGetters({
      //   manList: "manger/list",
      // }),
    },
    data() {
      return {
        list: [],
        total: 1,
        form: {
          size: 2,
          page: 1,
        },
      };
    },
    methods: {
      // ...mapActions({
      //   resquestUserList: "manger/resquestUserList",
      // }),
      // 上一页
      prev(e) {
        this.form.page = e;
        this.pageList();
      },
      // 下一页
      next(e) {
        this.form.page = e;
        this.pageList();
      },
      // 点击页码数
      aolig(e) {
        this.form.page = e;
        this.pageList();
      },
      // 请求数据
      pageList() {
        // this.resquestUserList(this.form);
        // this.list = this.manList;

        resUserList(this.form).then(res => {
          this.list = res.data.list;
        })
      },
      // 编辑
      edit(scope) {
        this.$emit("edit", scope.row.uid);
      },
      // 删除
      del(scope) {
        resUserDel({ uid: scope.row.uid }).then(res => {
          resUserList(this.form).then((res) => {
            this.list = res.data.list;
          });
        })
      }
    },
    mounted() {
      resUserCount().then((res) => {
        this.total = res.data.list[0].total;
      });
      // this.resquestUserList(this.form);
      // this.list = this.manList;
      resUserList(this.form).then((res) => {
        this.list = res.data.list;
      });
    },
  };
</script>
<style scoped>
  .fenye {
    float: right;
  }
</style>