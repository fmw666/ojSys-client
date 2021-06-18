<template>
  <div id="login">
    <el-form status-icon label-position="left" label-width="105px" class="login-container">
      <h3 class="login_title">用户登录</h3>

      <el-form-item label="用户名/手机号" prop="username">
        <el-input type="text" v-model="username" autocomplete="off"></el-input>
<!--        <el-alert v-show="error_username" title="请输入3-20个字符的用户名" type="warning" ></el-alert>-->
        <el-alert v-show="true" title="请输入3-20个字符的用户名" type="warning" ></el-alert>
      </el-form-item>

      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="password" autocomplete="off"></el-input>
        <el-alert v-show="error_password" title="密码最少8位，最长20位" type="warning"></el-alert>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>

      <el-divider></el-divider>

      <el-row style="margin-top: 5px; position: relative;">
        <el-link @click="to_path('/forget')" type="primary">忘记密码</el-link>
        <span class="set_center">&emsp;|&emsp;</span>
        <el-link @click="to_path('/register')" type="primary">用户注册</el-link>
        <span class="set_center" style="position: absolute; right: 0">
          <el-checkbox v-model="remember">记住账户？</el-checkbox>
        </span>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {Base, Auth} from '../../components/mixins'

export default {
  name: "login",
  mixins: [Base, Auth],
  data() {
    return {
      password: '',
      error_username: false,
      error_password: false,
      remember: false,
    };
  },
  watch: {
    username: {
      handler() {
        const len = this.username.length;
        if (len > 0) {
          this.error_username = len < 3 || len > 20;
        } else if (len === 0) {
          this.error_username = false
        }
      }
    },
    password: {
      handler() {
        const len = this.password.length;
        if (len > 0) {
          this.error_password = len < 8 || len > 20;
        } else if (len === 0) {
          this.error_password = false
        }
      }
    }
  },
  created() {
    // 判断用户登录状态
    if (this.user_id && this.token) {
      this.$axios.get(this.$host + "/api/v1/user/", {
      // 向后端传递 JWT token 的方法
      headers: {
        'Authorization': 'JWT ' + this.token
      },
      responseType: 'json'
      }).then(response => {
        console.log(response.data)
        this.username = response.data.username
        this.$message.warning('请在退出登录后再访问')
        this.$router.push('/')
      }).catch(error => {
        console.log(error)
      });
    }
  },
  methods: {
    submit() {
      if (this.error_username === false && this.error_password === false && this.username !== '' && this.password !== '') {
        this.$axios.post(this.$host + "/api/v1/api-token-auth/", {
          username: this.username,
          password: this.password
        }, {
          responseType: 'json',
          withCredentials: true
        })
        .then(res => {
          if (this.remember) {
            // 记住登录
            sessionStorage.clear();
            localStorage.token = res.data.token;
            localStorage.user_id = res.data.user_id;
            localStorage.username = res.data.username;
          } else {
            // 未记住登录
            localStorage.clear();
            sessionStorage.token = res.data.token;
            sessionStorage.user_id = res.data.user_id;
            sessionStorage.username = res.data.username;
          }
          this.$store.commit("setToken", res.data.token);
          this.$store.commit("setUserId", res.data.user_id);
          this.$store.commit("setUsername", res.data.username);

          // 跳转页面
          let return_url = this.get_query_string('next');
          if (!return_url) {
            return_url = '/';
          }
          location.href = return_url;
        })
        .catch(error => {
          console.log(error)
          this.$message.error('用户名/手机号 或 密码 有误');
        })
      } else {
        this.$message.error('请检查您的输入');
      }
    },
    // 重置表单
    reset() {
      this.username = ''
      this.password = ''
      this.error_username = false
      this.error_password = false
    },
  }
}
</script>

<style scoped>
  #login {
    /*background: url("../assets/code-bg.jpg") no-repeat center;*/
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: max-content;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .set_center {
    vertical-align: middle;
    height: 25px;
    line-height: 25px;
  }

  #login .el-alert {
    padding: 0 0 0 10px;
    font-size: 1px;
  }

  #login >>> .el-alert__title {
    font-size: 12px;
  }

  #login >>> .el-form-item {
    margin-bottom: 10px;
  }
</style>