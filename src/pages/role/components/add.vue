<template>
  <div>
    <el-dialog :title="info.isTitle" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="width">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="width">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="defaultProps"
          >
          </el-tree>
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
        <el-button type="primary" @click="roleAdd" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="xiugai">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { resRoleAdd, resRoleInfo, resRoleEdit } from "../../../util/request.js";
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
      form: {
        rolename: "",
        menus: [],
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
      this.$props.info.isShow = false;
    },
    roleAdd() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      resRoleAdd(this.form).then((res) => {});
      this.$props.info.isShow = false;
      this.requestRoleList();
    },
    ...mapActions({
      requestMenuList: "menu/requestMenuList",
      requestRoleList: "role/requestRoleList",
    }),
    // 修改
    xiugai(){
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      resRoleEdit(this.form).then(res=>{
        this.$props.info.isShow = false;
        this.requestRoleList();
      })
    }
  },
  mounted() {
    if (this.menuList.length == 0) {
      this.requestMenuList();
    }
    if (this.info.aaa == true) {
      resRoleInfo({ id: this.info.id }).then((res) => {
        this.form = res.data.list;
        this.form.id = this.info.id;
        var a = JSON.parse(res.data.list.menus)
        this.$refs.tree.setCheckedKeys(a)
      });
    }
  },
};
</script>
<style scoped>
</style>