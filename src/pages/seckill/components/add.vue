<template>
  <div>
    <el-dialog :title="info.isTitle" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="width">
          <div class="block">
            <el-date-picker
              v-model="form.begintime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="width">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择"
            @change="oneSelect()"
          >
            <el-option
              v-for="(item, index) in list"
              :label="item.catename"
              :value="item.id"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="width">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option
              v-for="itemc in secondChildren"
              :label="itemc.catename"
              :value="itemc.id"
              :key="itemc.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="width">
          <el-select v-model="form.goodsid" placeholder="请选择">
            <el-option
              v-for="item in listgoods"
              :label="item.goodsname"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
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
        <el-button type="primary" v-if="info.isAdd" @click="seckAdd"
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
      listgoods: "goods/list",
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {
      secondChildren: [],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
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
      var endTime = this.form.begintime.shift();
      this.form.begintime = this.form.begintime[0];
      this.form.endtime = endTime;
      this.form.begintime = new Date(this.form.begintime).getTime();
      this.form.endtime = new Date(this.form.endtime).getTime();
      this.requestSeckEdit(this.form);
      this.$emit("seckShow");
      this.info.isShow = false;
    },
    ediOne(e) {
      e.begintime = new Date(Math.floor(e.begintime));
      e.endtime = new Date(Math.floor(e.endtime));
      var arr = [];
      arr.push(e.endtime);
      arr.push(e.begintime);
      e.begintime = arr;
      this.form = e;
      this.resquestCateList().then((res) => {
        this.oneSelect();
      });
      this.resquestGoodsList();
    },
    seckAdd() {
      var endTime = this.form.begintime.shift();
      this.form.begintime = this.form.begintime[0];
      this.form.endtime = endTime;
      this.form.begintime = new Date(this.form.begintime).getTime();
      this.form.endtime = new Date(this.form.endtime).getTime();
      this.requestSeckAdd(this.form);
      this.$emit("seckShow");
      this.info.isShow = false;
    },
    oneSelect() {
      this.secondChildren = this.list.find((item) => {
        return item.id == this.form.first_cateid;
      }).children;
    },
    ...mapActions({
      resquestCateList: "calssify/resquestCateList",
      resquestGoodsList: "goods/resquestGoodsList",
      requestSeckAdd: "seckill/requestSeckAdd",
      requestSeckEdit: "seckill/requestSeckEdit",
    }),
  },
  mounted() {
    this.resquestCateList();
    this.resquestGoodsList();
  },
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