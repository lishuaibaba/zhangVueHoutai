<template>
  <div>
    <el-dialog :title="info.isTitle" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="手机号" :label-width="width">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="width">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
          留空则不修改
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
        <el-button type="primary" @click="oneEdit">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { resVipInfo, resVipEdit } from "../../../util/request.js";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
      psw: "",
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
    // 重置
    empty() {
      this.form = {
        pid: "",
        nickname: "",
        img: null,
        status: 1,
      };
    },
    //修改
    oneEdit() {
      if (this.form.password.length == 0) {
        this.form.password = this.psw;
      }
      resVipEdit(this.form);
      this.$emit("emitList");
      this.info.isShow = false;
    },
    ediOne(e) {
      resVipInfo({ uid: e }).then((res) => {
        this.form = res.data.list;
        this.psw = res.data.list.password;
      });
    },
  },
  mounted() {},
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>