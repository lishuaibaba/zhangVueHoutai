<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
          <el-col>
            <el-menu
              router
              default-active="/index/home"
              class="el-menu-vertical-demo"
              background-color="#21202B"
              text-color="#fff"
              active-text-color="#FFD04B"
            >
              <el-menu-item
                index="/index/home"
                style="width: 201px"
                active-text-color="#409EFF"
              >
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <el-submenu index="1" style="width: 200px">
                <template slot="title">
                  <i class="el-icon-s-tools"></i>
                  <span>系统设置</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/index/menu">菜单管理</el-menu-item>
                  <el-menu-item index="/index/role">角色管理</el-menu-item>
                  <el-menu-item index="/index/manger">管理员管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2" style="width: 200px">
                <template slot="title">
                  <i class="el-icon-lock"></i>
                  <span>商城管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/index/classify">商品分类</el-menu-item>
                  <el-menu-item index="/index/spec">商品规格</el-menu-item>
                  <el-menu-item index="/index/goods">商品管理</el-menu-item>
                  <el-menu-item index="/index/vip">会员管理</el-menu-item>
                  <el-menu-item index="/index/banner">轮播图管理</el-menu-item>
                  <el-menu-item index="/index/seckill">秒杀活动</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <div v-if="topShow == 1">
            <el-button type="primary" class="topLogin" @click="toLogin"
              >登陆</el-button
            >
          </div>
          <div v-else class="tooto" @click="loginChong">
            <i class="el-icon-s-tools logini"></i>
            <span class="loginTitle">{{ user }}</span>
          </div>
        </el-header>
        <el-main>
          <!-- 面包蟹导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <div style="margin-top: 15px">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {logasdasd} from "../../util/request.js"
export default {
  components: {},
  data() {
    return {
      topShow: 1,
      user: "",
    };
  },
  methods: {
    loginChong() {
      this.$confirm("确定要退出登陆吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!",
          });
          this.topShow = 1;
          this.toLogin();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
    toLogin() {
      this.$router.push("/login");
    },
  },
  mounted() {
    this.user = this.$route.query.data;
    this.topShow = this.$route.query.show;
  },
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100vh;
  background: #21202b;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

.el-menu-item {
  position: relative;
  left: -1px;
}
.topLogin {
  float: right;
  position: relative;
  top: 10px;
}
.logini {
  float: right;
  font-size: 20px;
  position: relative;
  top: 20px;
  margin-left: 10px;
}
.loginTitle {
  float: right;
  font-size: 20px;
}
.tooto {
  cursor: pointer;
}
</style>