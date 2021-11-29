<template>
  <div>
    <el-dialog :title="info.isTitle" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="width">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
            v-if="form.pid !== 0"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
        <el-button type="primary" v-if="info.isAdd" @click="bannerAdd"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="oneEdit">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {mapGetters ,mapActions} from "vuex";
export default {
  computed: {
    ...mapGetters({
      
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {
      imageUrl: "",
      form: {
        title: "",
        img: null,
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
      this.resquestBannerEdit(this.form)
      this.$emit("bannerShow");
      this.info.isShow = false;
    },
    ediOne(e) {
      this.imageUrl = this.$preImg + e.img;
      this.form = e;
    },
    changeImg(e) {
      var file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    bannerAdd() {
      this.resquestBannerAdd(this.form);
      this.$emit("bannerShow");
      this.info.isShow = false;
    },
    ...mapActions({
      resquestBannerAdd: "banner/resquestBannerAdd",
      resquestBannerEdit: "banner/resquestBannerEdit",
    }),
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