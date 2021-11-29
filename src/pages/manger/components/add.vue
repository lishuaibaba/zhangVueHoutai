<template>
  <div>
    <el-dialog :title="info.isTitle" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="width">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option
              :label="item.rolename"
              :value="item.id"
              v-for="item in list"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="width">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态:" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#3F9BFB"
            inactive-color="#F56C6C"
            :active-value="1"
            :inactive-value="2"
          >
            >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isQxiao">取 消</el-button>
        <el-button type="primary" v-if="info.isAdd" @click="userAdd"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="xiuGai">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { resUserAdd, resUserInfo, resUserEdit } from "../../../util/request.js";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  components: {},
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      width: "120px",
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  methods: {
    isQxiao() {
      this.info.isShow = false;
    },
    ...mapActions({
      requestRoleList: "role/requestRoleList",
    }),
    // 管理员添加
    userAdd() {
      resUserAdd(this.form).then((res) => {
        this.info.isShow = false;
      });
    },
    // 修改
    xiuGai() {
      resUserEdit(this.form).then((res) => {
        this.info.isShow = false;
      });
    },
  },
  mounted() {
    this.requestRoleList();
    if (this.info.uid) {
      resUserInfo({ uid: this.info.uid }).then((res) => {
        this.form = res.data.list;
        this.form.uid = this.info.uid;
      });
    }
  },
};
</script>
<style scoped>
</style>