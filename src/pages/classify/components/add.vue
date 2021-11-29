<template>
  <div>
    <el-dialog :title="info.isTitle" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="width">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0" :key="0"></el-option>
            <el-option
              v-for="item in list"
              :label="item.catename"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="width">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
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
        <el-button type="primary" v-if="info.isAdd" @click="classAdd"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="oneEdit">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  resCateAdd,
  resCateedit,
  resCateOneEdit,
} from "../../../util/request.js";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "calssify/list",
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
      width: "120px",
      imageUrl: "",
      defaultProps: {
        children: "children",
        label: "title",
      },
      oneId: null,
    };
  },
  methods: {
    changeImg(e) {
      var file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },

    isQxiao() {
      this.info.isShow = false;
    },
    classAdd() {
      this.info.isShow = false;
      resCateAdd(this.form).then((res) => {
        this.resquestCateList();
      });
      this.empty();
    },
    // 重置
    empty() {
      this.form = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
    },
    ediOne(e) {
      this.oneId = e;
      resCateedit({ id: e }).then((res) => {
        this.form = res.data.list;
        this.imageUrl = this.$preImg + res.data.list.img;
      });
    },
    //修改
    oneEdit() {
      this.form.id = this.oneId;
      resCateOneEdit(this.form).then((res) => {
        if (res.status == 200) {
          this.resquestCateList();
          this.info.isShow = false;
        }
      });
      
    },
    ...mapActions({
      resquestCateList: "calssify/resquestCateList",
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