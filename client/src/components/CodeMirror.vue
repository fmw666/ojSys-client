<template>
  <div style="margin: 0 0 15px 0" id="CodeMirror">

    <el-card class="tool-top">
      <div class="tool-list">
        <el-button-group style="float: right;">
          <el-button @click="downloadCode" type="text" size="medium" round icon="el-icon-download">下载</el-button>
          <el-button @click="uploadCode" type="text" size="medium" round>上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </el-button-group>
        <el-button-group>
          <el-button v-if="is_collect" @click="is_collect = ~is_collect" type="text" size="medium" round icon="el-icon-star-off">收藏</el-button>
          <el-button v-else @click="is_collect = ~is_collect" type="text" size="medium" round icon="el-icon-star-on">已收藏</el-button>

          <el-tooltip placement="top">
            <div slot="content">
              <el-button @click="shareCodeByWechat" size="mini" type="success" circle><i class="fa fa-weixin"></i></el-button>
              <el-button @click="shareCodeByQQ" size="mini" type="primary" circle><i class="fa fa-qq"></i></el-button>
              <el-button @click="shareCodeByQZone" size="mini" type="warning" circle><i class="fa fa-star"></i></el-button>
              <el-button @click="shareCodeByWeibo" size="mini" type="danger" circle><i class="fa fa-weibo"></i></el-button>
            </div>
            <el-button type="text" size="medium" round>分享<i class="el-icon-share el-icon--right"></i></el-button>
          </el-tooltip>
        </el-button-group>
      </div>

      <el-row type="flex" justify="space-between" class="header">
        <el-col :span="12">
          <div>
            <span class="select-text">Language:</span>
            <el-select size="small" :value="language" @change="onLangChange" class="adjust">
              <el-option v-for="item in languages" :key="item.label" :label="item.label" :value="item.label"></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span=12>
          <div class="fl-right">
            <span class="select-text">Theme:</span>
            <el-select size="small" :value="theme" @change="onThemeChange" class="adjust">
              <el-option-group v-for="group in themes" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.label" :label="item.label" :value="item.value"></el-option>
              </el-option-group>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="textarea-code">
      <codemirror :value="value" :options="options" @change="onEditorCodeChange" ref="myEditor">
    </codemirror>
    </el-card>

  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror-lite';

// theme
// 浅色
import 'codemirror/theme/solarized.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/neo.css';
import 'codemirror/theme/xq-light.css';
// 深色
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/ayu-mirage.css';
import 'codemirror/theme/yonce.css';
import 'codemirror/theme/zenburn.css';
import 'codemirror/theme/nord.css';

// mode
import 'codemirror/mode/clike/clike.js';
import 'codemirror/mode/python/python.js';
// active-line.js
import 'codemirror/addon/selection/active-line.js';
// foldGutter
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/indent-fold.js';

export default {
  name: "CodeMirror",
  components: {
    codemirror
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: 'Python3'
    },
    theme: {
      type: String,
      default: 'solarized'
    }
  },
  data() {
    return {
      options: {
        // codemirror options
        tabSize: 4,
        mode: 'python',
        theme: 'solarized',
        lineNumbers: true,
        line: true,
        // 代码折叠
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        // 选中文本自动高亮，及高亮方式
        styleSelectedText: true,
        lineWrapping: true,
        highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true},
        // 当前行背景高亮
        styleActiveLine: true,
        // 括号匹配
        matchBrackets: true,
      },
      mode: {
        'C': 'text/x-csrc',
        'C++': 'text/x-csrc',
        'Python3': 'python'
      },
      languages: [
        {'label': 'C', 'suffix': 'c'},
        {'label': 'C++', 'suffix': 'cpp'},
        {'label': 'Python3', 'suffix': 'py'}
      ],

      themes: [{
        label: '浅色',
        options: [
          {label: 'Solarized_Light', value: 'solarized'},
          {label: 'eclipse', value: 'eclipse'},
          {label: 'neo', value: 'neo'},
          {label: 'xq-light', value: 'xq-light'},
        ]
      }, {
        label: '深色',
        options: [
          {label: 'Monokai', value: 'monokai'},
          {label: 'Material', value: 'material'},
          {label: 'ayu-mirage', value: 'ayu-mirage'},
          {label: 'yonce', value: 'yonce'},
          {label: 'zenburn', value: 'zenburn'},
          {label: 'nord', value: 'nord'},
        ]
      }],

      // 是否收藏了此题
      is_collect: false,
    }
  },
  mounted() {
    this.editor.focus()
  },
  computed: {
    editor () {
      // get current editor object
      return this.$refs.myEditor.editor
    }
  },
  methods: {
    onEditorCodeChange (newCode) {
      this.$emit('update:value', newCode);
    },
    onLangChange (newVal) {
      console.log(this.mode[newVal])
      this.editor.setOption('mode', this.mode[newVal]);
      this.$emit('changeLang', newVal);
    },
    onThemeChange (newTheme) {
      this.editor.setOption('theme', newTheme);
      this.$emit('changeTheme', newTheme);
    },

    // 下载文件到本地
    downloadCode () {
      let isSupportDownload = 'download' in document.createElement('a');
      if (isSupportDownload === false) {
        this.$message({
          'message': '当前浏览器不支持下载',
          'type': 'warning'
        });
        return false;
      }

      const blob = new Blob([this.value]);
      let filename = '';

      let pid = this.$route.params && this.$route.params.id;
      filename += pid + '.';
      for(let i=0; i<this.languages.length; i++) {
        if (this.languages[i].label === this.language) {
          filename += this.languages[i].suffix;
          break;
        }
      }

      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      a.click();
    },

    // 上传 code
    uploadCode() {

    },

    // 通过 微信 分享代码
    shareCodeByWechat() {

    },
    // 通过 qq好友/群 分享代码
    shareCodeByQQ() {
      const url = window.location.href;
      const desc = '分享描述';
      const title = '分享标题';
      const summary = '分享摘要';
      const pics = '';

      const urlPath = 'https://connect.qq.com/widget/shareqq/index.html?url=' + encodeURI(url) +
          '&desc=' + desc +
          '&title=' + title +
          '&summary=' + summary +
          '&pics=' + pics;
      window.open (urlPath);
    },
    // 通过 qq空间 分享代码
    shareCodeByQZone() {
      const url = window.location.href;
      const title = '我遇到了一道很有意思的算法题，快来看看吧~';
      const summary = '分享摘要';
      const pics = '';

      const urlPath = 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURI(url) +
          '&sharesource=qzone&title=' + title + '&pics=' + pics + '&summary=' + summary;
      window.open (urlPath);
    },
    // 通过 微博 分享代码
    shareCodeByWeibo() {
      const url = window.location.href;
      const title = '我遇到了一道很有意思的算法题，快来跟我一起看看吧';
      const pics = '';
      const appkey = 'xxx';

      const urlPath = 'https://service.weibo.com/share/share.php?url=' + encodeURI(url) +
          '&sharesource=weibo&title=' + title + '&pic=' + pics + '&appkey=' + appkey;
      window.open (urlPath);
    }
  },
  watch: {
    'theme' (newVal) {
      this.editor.setOption('theme', newVal);
    }
  }
}
</script>

<style lang="less" scoped>
  .header {
    margin: 5px 5px 0 5px;
    white-space: nowrap;
    .adjust {
      width: 150px;
      margin-left: 10px;
      height: 30px;
    }
    .fl-right {
      float: right;
    }
  }
</style>

<style>
  #CodeMirror .CodeMirror {
    height: 55.0vh !important;
  }
  #CodeMirror .CodeMirror-scroll {
    min-height: 300px;
    max-height: 1000px;
  }

  .tool-top {
    background: rgba(255,255,255,0.85);
    margin-bottom: 10px;
  }

  .tool-top > .el-card__body {
    padding-top: 14px;
  }

  .tool-list {
    margin-bottom: 15px;
    white-space: nowrap;
  }

  .el-select > .el-input {
    font-size: 13px !important;
  }
  .select-text {
    font-size: 15px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  .textarea-code > .el-card__body {
    padding: 5px 2px !important;
  }
</style>