<template>
  <div>
    <el-dialog :title="info.isTitle" :visible.sync="info.isShow">
      <el-form :model="form">
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
        <el-form-item label="商品名称" :label-width="width">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="width">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="width">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
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
        <el-form-item label="商品规格" :label-width="width">
          <el-select
            v-model="form.specsid"
            placeholder="请选择"
            @change="attrSelect"
          >
            <el-option
              v-for="item in specChildren"
              :label="item.specsname"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="width">
          <el-select
            v-model="form.specsattr"
            placeholder="请选择"
            @visible-change="changeAttr"
            multiple
          >
            <el-option
              v-for="(item, index) in specChildrenAttr.attrs"
              :label="item"
              :value="item"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="width">
          <el-radio v-model="form.isnew" label="1">是</el-radio>
          <el-radio v-model="form.isnew" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="width">
          <el-radio v-model="form.ishot" label="1">是</el-radio>
          <el-radio v-model="form.ishot" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" :label-width="width">
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
        <el-form-item label="商品描述" :label-width="width">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="form.description"
          ></textarea>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isQxiao">取 消</el-button>
        <el-button type="primary" v-if="info.isAdd" @click="goodsAdd"
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
      secondChildren: [],
      specChildren: [],
      specChildrenAttr: [],
      form: {
        first_cateid: null,
        second_cateid: null,
        goodsname: null,
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: "1",
        ishot: "1",
        status: 1,
      },
      width: "120px",
      imageUrl: "",
      oneId: null,
      children: [],
    };
  },
  methods: {
    changeImg(e) {
      var file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    oneSelect() {
      this.secondChildren = this.list.find((item) => {
        return item.id == this.form.first_cateid;
      }).children;
    },
    attrSelect() {
      this.specChildrenAttr = this.specChildren.find((item) => {
        return item.id == this.form.specsid;
      });
      this.specChildrenAttr.attrs = JSON.parse(this.specChildrenAttr.attrs);
    },
    isQxiao() {
      this.info.isShow = false;
    },
    goodsAdd() {
      var arr = [];
      arr.push(this.form.specsattr);
      this.form.specsattr = JSON.stringify(arr);
      this.resquestGoodsAdd(this.form);
      this.$emit("goodsShowList");
      this.info.isShow = false;
      this.empty();
    },
    // 重置
    empty() {
      this.form = {
        first_cateid: null,
        second_cateid: null,
        goodsname: null,
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: "1",
        ishot: "1",
        status: 1,
      };
    },
    //修改
    oneEdit() {
      var arr = [];
      arr.push(this.form.specsattr);
      this.form.specsattr = JSON.stringify(arr);
      this.resquestGoodsEdit(this.form);
      this.$emit("goodsShowList");
      this.info.isShow = false;
    },
    ediOne(e) {
      e.specsattr = JSON.parse(e.specsattr)[0];
      e.isnew = e.isnew + "";
      e.ishot = e.ishot + "";
      this.imageUrl = this.$preImg + e.img;
      this.form = e;
    },
    changeAttr() {
      if (this.form.specsid && this.specChildrenAttr == "") {
        this.specChildrenAttr = this.specChildren.find((item) => {
          return item.id == this.form.specsid;
        });
        this.specChildrenAttr.attrs = JSON.parse(this.specChildrenAttr.attrs);
      }
    },
    ...mapActions({
      resquestCateList: "calssify/resquestCateList",
      resquestSpecList: "spec/resquestSpecList",
      resquestGoodsAdd: "goods/resquestGoodsAdd",
      resquestGoodsEdit: "goods/resquestGoodsEdit",
    }),
  },
  mounted() {
    this.resquestCateList().then((res) => {
      for (var i = 0; i < res.data.list.length; i++) {
        this.secondChildren.push(res.data.list[i].children);
      }
    });
    this.resquestSpecList().then((res) => {
      this.specChildren = res.data.list;
    });
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