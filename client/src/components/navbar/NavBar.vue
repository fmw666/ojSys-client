<template>
  <div id="nav_bar">
    <el-menu :default-active="activeIndex" class="el-menu-nav" mode="horizontal" @select="handleSelect">
      <el-menu-item index="/"><img style="width: 50px" src="../../assets/ico.png" alt=""/></el-menu-item>
      <el-menu-item index="/problems">刷题区</el-menu-item>
      <el-menu-item index="/contests">竞赛区</el-menu-item>
      <el-menu-item index="/forum">讨论区</el-menu-item>

      <el-submenu class="sub_menu" index="/editor">
        <template #title>编辑器</template>
        <el-menu-item index="/editor/code">Code Editor</el-menu-item>
        <el-menu-item index="/editor/markdown">Markdown Editor</el-menu-item>
      </el-submenu>

      <el-submenu v-if="login_flag" class="sub_menu" index="/account">
        <template #title>您好，{{username}}</template>
        <el-menu-item index="/account">个人中心</el-menu-item>
        <div v-if="identity === '竞赛发布者'">
          <el-submenu index="/contest">
            <template #title>竞赛管理</template>
            <el-menu-item index="/contest_post">发布比赛</el-menu-item>
            <el-menu-item index="/contest_list">查看比赛</el-menu-item>
          </el-submenu>
          <el-submenu index="/problem">
            <template #title>题库管理</template>
            <el-menu-item index="/problem_post">添加题目</el-menu-item>
            <el-menu-item index="/problem_list">查看题目</el-menu-item>
          </el-submenu>
        </div>
<!--        <el-divider style="margin: 0"></el-divider>-->
        <el-menu-item index="/login" @click="logout()"><b>退出登录</b></el-menu-item>
      </el-submenu>
      <el-menu-item v-else index="/login">您还未登录，马上去登录</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import {Auth} from '../mixins'
export default {
  mixins: [Auth],
  name: "NavBar",
  props: {
    msg: String,
  },
  data() {
    return {
      activeIndex: "/",

    };
  },
  created() {
    // 判断用户登录状态
    this.login();
    this.activeIndex = '/' + this.$route.path.split('/')[1];
  },
  mounted() {
    // 固定页面不显示 navbar
    if (this.$route.path === '/login' || this.$route.path ==='/register' || this.$route.path === '/sregister' || this.$route.path==='/forget') {
      document.querySelector("#nav_bar").style.display = "none";
    }
  },
  watch: {
    $route(to) {
      // 对路由变化作出响应..
      if (to.path === '/login' || this.$route.path === '/login' || this.$route.path ==='/register' || this.$route.path === '/sregister' || this.$route.path==='/forget'){
        document.querySelector("#nav_bar").style.display = "none";
      } else {
        this.activeIndex = '/' + this.$route.path.split('/')[1];
        console.log(this.activeIndex)
        document.querySelector("#nav_bar").style.display = "block";
      }
    },
  },

  methods: {
    handleSelect(key) {
      this.$router.push(key);
    },

  },
};
</script>

<style scoped>
#nav_bar {
  /*display: none !important;*/
  /*width: 1140px;*/
  width: 66vw;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  z-index: 99;
  box-shadow: rgba(0, 0, 0, .17) 13px 15px 13px 2px;
}
#nav_bar :hover {
}
.el-menu-nav {
  background-color: whitesmoke;
}
#nav_bar >>> .el-menu--horizontal {
  border-radius: 8px;
  overflow: hidden;
}

#nav_bar >>> .el-menu--horizontal > .el-menu-item {
  height: 72px;
  line-height: 72px;
}
#nav_bar >>> .el-menu--horizontal > .el-submenu {
  height: 72px;
  line-height: 72px;
}
#nav_bar >>> .el-menu--horizontal > .el-submenu  .el-submenu__title{
  line-height: 72px;
  height: 72px;
}
.el-menu > .el-menu-item, #nav_bar >>> .el-submenu__title, .el-submenu > .el-submenu__title {
  font-size: 14px !important;
}
</style>