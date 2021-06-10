<template>
  <div id="app">
    <nav-bar></nav-bar>

    <transition :name="transitionName">
      <router-view class="router-view">
      </router-view>
    </transition>

    <div class="tools">
      <el-button @click="changeBgColor" type="success" plain round size="small" icon="el-icon-edit">切换背景</el-button>
    </div>
  </div>
</template>

<script>
import NavBar from './components/navbar/NavBar.vue'
export default {
  name: 'App',
  data() {
    return {
      transitionName: 'fold-left',
      bgColor: [
          'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)',
          'linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)',
          'linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)',
          'linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)',
          'linear-gradient(-225deg, #D4FFEC 0%, #57F2CC 48%, #4596FB 100%)',
          'linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%)',
          'linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)',
          'linear-gradient(-225deg, #7DE2FC 0%, #B9B6E5 100%)',
          'linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%)',
          'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      ],
      val: ''
    }
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        this.transitionName = 'fold-left';
      } else {
        this.transitionName = 'fold-right';
      }
    },
  },
  components: {
    NavBar
  },
  mounted() {
    // 选择背景颜色
    this.val = localStorage.getItem('bgColor');
    document.body.style.setProperty('background-image', this.val, 'important');

    // 保存 state 状态
    window.addEventListener('unload', this.saveState);
  },
  methods: {
    // 改变背景颜色
    changeBgColor() {
      const el = document.body.style;
      let val = this.bgColor[Math.floor((Math.random() * this.bgColor.length))];
      while (val === this.val) {
        val = this.bgColor[Math.floor((Math.random() * this.bgColor.length))];
      }
      this.val = val;
      el.setProperty('background-image', val, 'important');
      localStorage.setItem('bgColor', val)
    },

    // 保存状态
    saveState() {
      sessionStorage.setItem("state",JSON.stringify(this.$store.state))
    }
  }
}
</script>

<style>
/*.el-card__body {*/
/*  background-color: rgba(255, 255, 255, 0.5) !important;*/
/*}*/
.tools {
  position: fixed;
  right: 30px;
  top: 120px;
}

body{
  margin: 0 !important;
  padding: 0;

  /*background-color: #C7EDCC;*/
  background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%) !important;
  background-repeat: no-repeat !important;
  background-attachment: fixed;

  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

.router-view{
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
}

/* 公共容器 */
.container {
  /*width: 1142px;*/
  width: 66vw;
  margin: 0 auto;
  padding-top: 110px;
}

.fold-left-enter-active {
  animation-name: fold-left-in;
  animation-duration: .6s;
}
.fold-left-leave-active {
  animation-name: fold-left-out;
  animation-duration: .6s;
}
@keyframes fold-left-in {
  0% {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    /* visibility: visible; */
  }
  /*50% {
    transform: translate3d(50%, 0, 0);
  }*/
  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-left-out {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  /*50% {
    transform: translate3d(-50%, 0 , 0);
  }*/
  100% {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    /* visibility: hidden; */
  }
}
.fold-right-enter-active {
  animation-name: fold-right-in;
  animation-duration: .6s;
}
.fold-right-leave-active {
  animation-name: fold-right-out;
  animation-duration: .6s;
}
@keyframes fold-right-in{
  0% {
    width: 100%;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    /* visibility: visible; */
  }
  /*50% {
    transform: translate3d(50%, 0, 0);
  }*/
  100% {
    width: 100%;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-right-out  {
  0% {
    width: 100%;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  /*50% {
    transform: translate3d(-50%, 0 , 0);
  }*/
  100% {
    width: 100%;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    /* visibility: hidden; */
  }
}

/* 全局滚动条样式 */
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 8px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  cursor: pointer;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius   : 10px;
  /*background-color: skyblue;*/
  background-color: skyblue;
  background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
  );

}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  background   : #ededed;
  border-radius: 10px;

}
/* element滚动条的宽度 */
.el-table__body-wrapper::-webkit-scrollbar {
  width : 8px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  cursor: pointer;
}
/* element 滚动条的滑块 */
.el-table__body-wrapper::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius   : 10px;
  background-color: skyblue;
  background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
  );

}
</style>