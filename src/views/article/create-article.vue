<template>
  <div class="create-article">
    <div class="editor-main-container">
      <v-text-field
        v-model="title"
        label="文章标题"
        class="editor-title"
      />
      <div class="editor-container">
        <Toolbar
          class="editor-tool"
          :editor="editorRef"
          :default-config="toolbarConfig"
          :mode="mode"
        />
        <Editor
          v-model="valueHtml"
          class="editor-main"
          :default-config="editorConfig"
          :mode="mode"
          @on-created="handleCreated"
        />
        <v-snackbar
          v-model="showSnackbar"
          :timeout="3000"
          :color="color"
          location="top"
        >
          {{ message }}
        </v-snackbar>
      </div>
    </div>

    <div class="operate-btn">
      <v-col
        cols="auto"
        class="save-btn"
      >
        <v-btn
          :ripple="false"
          height="50"
          width="80"
          @click="saveArticle"
        >
          保存
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn
          :ripple="false"
          height="50"
          width="80"
          @click="uploadArticle"
        >
          发布
        </v-btn>
      </v-col>
    </div>
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, ref, shallowRef, inject } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { useUserStore } from '@/store'
const $axios = inject('$axios')
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 内容 HTML
const valueHtml = ref('')
const message = ref('')
const title = ref('')
const showSnackbar = ref(false)
const color = ref('success')
const mode = 'simple'
const toolbarConfig = {
  excludeKeys: ['group-image', 'insertVideo', 'fullScreen']
}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const userStore = useUserStore()
const user = userStore.userInfo

const saveArticle = () => {
  // 将草稿保存至sessionStorage
  sessionStorage.setItem('article', valueHtml.value)
  message.value = '保存草稿成功'
  showSnackbar.value = true
}

const uploadArticle = () => {
  if (!title.value || !valueHtml.value) return
  const params = {
    title: title.value,
    content: valueHtml.value,
    authorId: user.id,
    authorName: user.username
  }
  $axios.post('/api/v1/article', params).then(res => {
    message.value = res.message
    showSnackbar.value = true
  }).catch((err) => {
    message.value = err.message
    color.value = 'error'
    console.log(err)
  })
}

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  // 监听键盘事件
  window.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault() // 阻止默认保存行为
      // 在这里执行保存操作，例如发送保存请求等
      saveArticle()
    }
  })
}

</script>

<style lang="scss" scoped>

.create-article{
  display: flex;
}

.editor-main-container{
  width: 85%;
}

.save-btn{
  padding-top: 0;
}

.editor-container{
  width: 100%;
  height: 70vh;
  border: 1px solid #ccc
}

.editor-tool{
  border-bottom: 1px solid #ccc
}

.editor-main{
  overflow-y: hidden;
}
</style>
