<template>
  <div>
    <el-dialog :title="info.isTitle" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="width">
          <el-select v-model="form.pid" placeholder="请选择" @change="changeMune">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态循环数据 菜单分类 -->
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="width">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <!-- 菜单图标 -->
        <el-form-item
          label="菜单图标"
          :label-width="width"
          v-show="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option label="星星" value="el-icon-star-on">
              <i class="el-icon-star-on"></i>
            </el-option>
            <el-option label="图片" value="el-icon-picture">
              <i class="el-icon-picture"></i>
            </el-option>
            <el-option label="电脑" value="el-icon-s-platform">
              <i class="el-icon-s-platform"></i>
            </el-option>
            <el-option label="魔方" value="el-icon-s-grid">
              <i class="el-icon-s-grid"></i>
            </el-option>
            <el-option label="文件" value="eel-icon-document">
              <i class="eel-icon-document"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 菜单地址 -->
        <el-form-item
          label="菜单地址"
          :label-width="width"
          v-show="form.type == 2"
        >
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="(item, index) in indexRouterss"
              :key="index"
              :label="'/' + item.path"
              :value="item.name"
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
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="menuAdd" v-if="info.isAdd == true"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { indexRouters } from "../../../router/index.js";
import {
  resMenuAdd,
  resMenuListOne,
  resMenuEdit,
} from "../../../util/request.js";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  components: {},
  data() {
    return {
      indexRouterss: [],
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      width: "120px",
      value: true,
    };
  },
  methods: {
    ...mapActions({
      requestMenuList: "menu/requestMenuList",
    }),
    menuAdd() {
      // 提交数据 调用axios
      resMenuAdd(this.form).then((res) => {});
      // 隐藏菜单添加页面
      this.info.isShow = false;
      this.requestMenuList();
    },
    // 查看一条数据
    look(id) {
      resMenuListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    // 修改单条数据
    update() {
      resMenuEdit(this.form).then((res) => {
        this.info.isShow = false;
        this.requestMenuList();
        this.empor();
      });
    },
    changeMune(e){
      this.form.type = e == 0 ? 1:2
    },
    // 清空数据
    empor(){
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      }
    }
  },
  mounted() {
    this.indexRouterss = indexRouters;
  },
};
</script>
<style scoped>
</style>