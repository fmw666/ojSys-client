<template>
<div id="test">

  <div class="container">

    <el-card>

      <CodeMirror :value.sync="code"
                    :languages="problem.languages"
                    :language="language"
                    :theme="theme"
                    @resetCode="onResetToTemplate"
                    @changeTheme="onChangeTheme"
                    @changeLang="onChangeLang"></CodeMirror>

    </el-card>
  </div>

</div>
</template>

<script>
import CodeMirror from "../../components/CodeMirror";

export default {
  components: {
    CodeMirror
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'text/x-csrc'
    }
  },
  name: "test",
  data() {
    return {
      code: '',
      language: 'Python3',
      theme: 'solarized',
      problem: {
        title: '',
        description: '',
        hint: '',
        my_status: '',
        template: {},
        languages: [],
        created_by: {
          username: ''
        },
        tags: [],
        io_mode: {'io_mode': 'Standard IO'}
      },
    }
  },
  mounted() {

  },
  methods: {
    onChangeLang (newLang) {
      if (this.problem.template[newLang]) {
        if (this.code.trim() === '') {
          this.code = this.problem.template[newLang]
        }
      }
      this.language = newLang
    },
    onChangeTheme (newTheme) {
      this.theme = newTheme
    },
    onResetToTemplate () {
      console.log('重置')
    },
  }
}
</script>

<style scoped>
  .CodeMirror {
    height: auto !important;
  }
  .CodeMirror-scroll {
    min-height: 300px;
    max-height: 1000px;
  }
</style>