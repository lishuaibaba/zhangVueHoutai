<template>
  <div>
    <el-dialog :title="info.isTitle" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="width">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          class="el-form-item"
          label="规格属性"
          :label-width="width"
          v-for="(value, key, index) in specObj"
          :key="key"
        >
          <el-input v-model="specObj[key]" autocomplete="off"></el-input>
          <el-button
            v-if="index == 0"
            class="btn"
            type="primary"
            @click="addProp"
            >新增规格属性
          </el-button>
          <el-button v-else class="btn" type="danger" @click="specRemove(key)"
            >删除</el-button
          >
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
        <el-button type="primary" v-if="info.isAdd" @click="specAdd"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="oneEdit">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
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
        specsname: "",
        attrs: [],
        status: 1,
      },
      specObj: {
        specarr0: "",
        specarr1: "",
      },
      width: "120px",
      listObj: {
        size: 0,
        page: 1,
      },
    };
  },
  methods: {
    isQxiao() {
      this.info.isShow = false;
    },
    specAdd() {
      for (var i in this.specObj) {
        this.form.attrs.push(this.specObj[i]);
      }
      this.resquestSpecAdd(this.form); //添加
      this.$emit("speclist");
      this.info.isShow = false;
      this.empty();
    },
    // 重置
    empty() {
      this.form = {
        specsname: "",
        attrs: [],
        status: 1,
      };
      this.specObj = {
        specarr0: "",
        specarr1: "",
      };
    },
    addProp() {
      var num = Object.keys(this.specObj).length;
      this.$set(this.specObj, "specarr" + num, "");
    },
    specRemove(e) {
      delete this.specObj[e];
      this.$forceUpdate();
    },
    ...mapActions({
      resquestSpecAdd: "spec/resquestSpecAdd",
      resquestSpecList: "spec/resquestSpecList",
      resquestSpecCount: "spec/resquestSpecCount",
      resquestSpecEdit: "spec/resquestSpecEdit",
    }),
    oneEdit() {
      this.form.attrs = [];
      for (var i in this.specObj) {
        this.form.attrs.push(this.specObj[i]);
      }
      this.resquestSpecEdit(this.form);
      this.$emit("speclist");
      this.info.isShow = false;
    },
    onSpecEdit(e) {
      this.empty();
      e[0].attrs = JSON.parse(e[0].attrs);
      this.form = e[0];
      for (var i = 0; i < e[0].attrs.length; i++) {
        this.$set(this.specObj, "specarr" + i, e[0].attrs[i]);
      }
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

.el-form-item {
  position: relative;
}
.btn {
  position: absolute;
  right: 0px;
  top: 0px;
}
</style>