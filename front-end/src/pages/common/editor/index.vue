<template>
  <div ref="editor"></div>
</template>

<script>
import E from 'wangeditor'

export default {
  name: 'editor',
  model: {
    prop: 'content',
    event: 'change'
  },
  props: {
    content: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      editor: null,
      isChanging: false
    }
  },
  methods: {
    // 父组件通过该方法来设置内容
    setContent (content) {
      this.$nextTick(() => {
        this.editor.txt.html(content)
      })
    }
  },
  watch: {
    content (newVal) {
      if (!this.isChanging) {
        this.isChanging = false
        this.editor.txt.html(newVal)
      }
    }
  },
  mounted () {
    this.editor = new E(this.$refs.editor)
    this.editor.customConfig.onchange = (html) => {
      this.isChanging = true
      this.$emit('change', html)
    }
    this.editor.create()
    this.editor.txt.html(this.content)
    // 禁用编辑器
    if (this.readonly) {
      this.editor.$textElem.attr('contenteditable', false)
    }
  }
}
</script>

<style lang="less">
.editor {
  padding-top: 5px;
}
</style>
