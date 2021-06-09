<template>
  <div style="margin: 0 0 15px 0">
    <el-row type="flex" justify="space-between" class="header">
      <el-col :span="12">
        <div>
          <span>Language:</span>
          <el-select :value="language" @change="onLangChange" class="adjust">
            <el-option v-for="item in languages" :key="item" :label="item" :value="item"></el-option>
          </el-select>

          <el-button style="margin-left: 10px" @click="onResetClick" type="primary" icon="el-icon-refresh-right"></el-button>
        </div>
      </el-col>
      <el-col :span=12>
        <div class="fl-right">
          <span>Theme:</span>
          <el-select :value="theme" @change="onThemeChange" class="adjust">
            <el-option v-for="item in themes" :key="item.label" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <codemirror :value="value" :options="options" @change="onEditorCodeChange" ref="myEditor">
    </codemirror>

  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror-lite'

// theme
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/solarized.css'
import 'codemirror/theme/material.css'
// mode
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/python/python.js'
// active-line.js
import 'codemirror/addon/selection/active-line.js'
// foldGutter
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/indent-fold.js'

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
        highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true}
      },
      mode: {
        'C': 'clike',
        'C++': 'text/x-csrc',
        'Python3': 'python'
      },
      languages: ['C', 'C++', 'Python3'],

      themes: [
        {label: 'Monokai', value: 'monokai'},
        {label: 'Solarized_Light', value: 'solarized'},
        {label: 'Material', value: 'material'}
      ]
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
      this.$emit('update:value', newCode)
    },
    onLangChange (newVal) {
      console.log(this.mode[newVal])
      this.editor.setOption('mode', this.mode[newVal])
      this.$emit('changeLang', newVal)
    },
    onThemeChange (newTheme) {
      this.editor.setOption('theme', newTheme)
      this.$emit('changeTheme', newTheme)
    },
    onResetClick () {
      this.$emit('resetCode')
    },
  },
  watch: {
    'theme' (newVal) {
      this.editor.setOption('theme', newVal)
    }
  }
}
</script>

<style lang="less" scoped>
  .header {
    margin: 5px 5px 15px 5px;
    .adjust {
      width: 150px;
      margin-left: 10px;
    }
    .fl-right {
      float: right;
    }
  }
</style>

<style>
  .CodeMirror {
    height: auto !important;
  }
  .CodeMirror-scroll {
    min-height: 300px;
    max-height: 1000px;
  }
</style>