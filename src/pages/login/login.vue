<template>
  <div class="box">
    <div class="con">
      <h1>登录</h1>
      <ul>
        <li>
          <input type="text" v-model="form.user" placeholder="请输入用户名" />
        </li>
        <li>
          <input type="password" v-model="form.pass" placeholder="请输入密码" />
        </li>
        <li>
          <button class="btn" @click="login">登录</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      form: {
        user: "",
        pass: "",
      },
    };
  },
  methods: {
    login() {
      if (this.form.user == "zhang" && this.form.pass == "520gly" || this.form.user == "gao" && this.form.pass == "520zhang") {
        this.$router.push({ path: "/index", query: { data: this.form.user,show:2 } });
      }else{
        alert("账号或者密码错误")
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
.box {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right, #563443, #2f3d60);
  position: relative;
}
.con {
  width: 400px;
  height: 250px;
  background: #ffffff;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.con > h1 {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  margin-top: 15px;
}
.con ul li input {
  width: 300px;
  height: 40px;
  border: 1px solid #e0e3e9;
  text-indent: 1em;
  border-radius: 6px;
}
.con ul li {
  width: 300px;
  margin: 0px auto;
  margin-top: 15px;
}
.con ul li button {
  width: 300px;
  height: 40px;
  background: #409eff;
  line-height: 40px;
  text-align: center;
  color: #fff;
  outline: none;
  border: none;
  border-radius: 6px;
}
</style>