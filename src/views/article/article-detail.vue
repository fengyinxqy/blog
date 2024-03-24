<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="article-container">
    <div class="left-area">
      <div class="article-content">
        <h1>{{ articleInfo.title }}</h1>
        <div class="article-info">
          <span class="author">{{ articleInfo.authorName }}</span>
          <span class="create-time">{{ createTime }}</span>
        </div>
        <div
          class="article-info-content"
          v-html="articleInfo.content"
        />
      </div>
      <div class="article-comment">
        <div class="comment-count">
          评论{{ commentData.count }}
        </div>
        <div class="comment-commit">
          <img
            :src="userInfo.avatar"
            alt="!"
            class="avatar-img"
          >
          <div class="commit-input">
            <v-text-field
              v-model="commentValue"
              label="评论"
              variant="solo"
            />
            <div class="commit-input-bottom">
              <v-btn
                variant="flat"
                color="indigo-darken-3"
                @click="commitComment"
              >
                提交
              </v-btn>
            </div>
          </div>
        </div>
        <div
          v-if="commentData.count"
          class="comment-sort"
        >
          <v-btn
            variant="plain"
            @click="sortComment('new')"
          >
            最新
          </v-btn>|
          <v-btn variant="plain">
            最热
          </v-btn>
        </div>
        <div class="comment-content">
          <div
            v-for="item in commentData.comments"
            :key="item.commentId"
            class="comment-item flex "
          >
            <div class="flex">
              <div class="comment-avatar">
                <img
                  :src="userInfo.avatar"
                  alt="!"
                  class="avatar-img"
                >
              </div>
              <div class="comment-wrapper">
                <div>{{ item.authorName }}</div>
                <div class="comment-desc">
                  {{ item.content }}
                </div>
                <div class="comment-time">
                  <div class="flex">
                    <div>{{ $dayjs(item.createdAt).format('YYYY-MM-DD HH:mm') }}</div>
                    <div
                      class="can-click pd-20"
                      @click="openCommentInput(item.commentId)"
                    >
                      {{ item.isOpen ? '收起' : '回复' }}
                    </div>
                  </div>
                  <div class="comment-more can-click">
                    ...
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="item.isOpen"
              class="commit-input sub-commit-input"
            >
              <v-text-field
                v-model="subCommentValue"
                label="评论"
                variant="solo"
              />
              <div class="commit-input-bottom">
                <v-btn
                  variant="flat"
                  color="indigo-darken-3"
                  @click="commitComment(item.commentId)"
                >
                  提交
                </v-btn>
              </div>
            </div>
            <div
              v-for="subComment in item.subComments"
              :key="subComment.commentId"
              class="comment-item flex "
            >
              <div class="flex">
                <div class="comment-avatar">
                  <img
                    :src="userInfo.avatar"
                    alt="!"
                    class="avatar-img"
                  >
                </div>
                <div class="comment-wrapper">
                  <div>{{ subComment.authorName }} <span>回复 {{ replayAuthor(item,subComment) }}</span></div>
                  <div class="comment-desc">
                    {{ subComment.content }}
                  </div>
                  <div class="comment-time">
                    <div class="flex">
                      <div>{{ $dayjs(subComment.createdAt).format('YYYY-MM-DD HH:mm') }}</div>
                      <div
                        class="can-click"
                        @click="openCommentInput(item.commentId,subComment.commentId)"
                      >
                        {{ subComment.isOpen ? '收起' : '回复' }}
                      </div>
                    </div>
                    <div class="comment-more can-click">
                      ...
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="subComment.isOpen"
                class="commit-input sub-commit-input"
              >
                <v-text-field
                  v-model="subCommentValue"
                  label="评论"
                  variant="solo"
                />
                <div class="commit-input-bottom">
                  <v-btn
                    variant="flat"
                    color="indigo-darken-3"
                    @click="commitComment(item.commentId,subComment.commentId)"
                  >
                    提交
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, computed, getCurrentInstance, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'

const { proxy } = getCurrentInstance()
const userStore = useUserStore()
const userInfo = userStore.userInfo
const $axios = inject('$axios')
const router = useRouter()
const articleInfo = ref({})
const commentValue = ref('')
const subCommentValue = ref('')
const articleId = router.currentRoute.value.params.id

const commentData = ref([])

const createTime = computed(() => {
  return proxy.$dayjs(articleInfo.value.createdAt).format('YYYY-MM-DD')
})

onMounted(() => {
  getArticleInfo()
  getCommentData()
})

const getArticleInfo = () => {
  $axios.get(`/api/v1/article/${articleId}`).then(res => {
    articleInfo.value = res.data
  }).catch(err => {
    console.log(err)
  })
}

const getCommentData = () => {
  $axios.get(`/api/v1/comment/${articleId}`).then(res => {
    commentData.value = res.data
  }).catch(err => {
    console.log(err)
  })
}

const commitComment = (commentId, replayCommentId) => {
  if (!commentValue.value && !subCommentValue.value) return
  const { id, username } = userInfo
  const params = {
    authorId: id,
    authorName: username,
    articleId,
    content: commentValue.value || subCommentValue.value
  }
  if (replayCommentId) {
    params.replayCommentId = replayCommentId
  }
  if (subCommentValue.value) {
    params.parentCommentId = commentId
  }
  $axios.post('/api/v1/comment', params).then(res => {
    commentValue.value = ''
    subCommentValue.value = ''
    location.reload()
  }).catch(err => {
    console.log(err)
  })
}

const replayAuthor = (parentComment, comment) => {
  if (comment.replayCommentId) {
    const replayComment = parentComment.subComments.find(item => item.commentId === comment.replayCommentId)
    return replayComment.authorName
  } else {
    return parentComment.authorName
  }
}

const openCommentInput = (commentId, subCommentId = '') => {
  const index = commentData.value.comments.findIndex(item => item.commentId === commentId)
  if (subCommentId) {
    const subComment = commentData.value.comments[index].subComments.find(item => item.commentId === subCommentId)
    subComment.isOpen = !subComment.isOpen
    return
  }
  commentData.value.comments[index].isOpen = !commentData.value.comments[index].isOpen
}

const sortComment = () => {
  commentData.value.comments.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
  })
}

</script>

<style lang="scss" scoped>
.article-container{
  display:flex;
}

.article-info{
  padding:  10px 0;
}

.author{
  color: #666;
  font-size: 14px;
}

.create-time{
  margin-left: 10px;
  color: #999;
  font-size: 14px;
}

.article-comment{
  min-height: 200px;
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.left-area{
  width: 85%;
}

.article-content{
  min-height: 800px;
  padding: 20px 40px ;
  background-color: #fff;
}

/** 评论区域 */
.comment-count{
  font-weight: 700;
  font-size: 18px;
}

.comment-commit{
  display:flex;
  padding: 20px 0;
}

.commit-input{
  width: 100%;
  padding-left: 20px;
}

.commit-input-bottom{
  display:flex;
  justify-content: flex-end;
}

.avatar-img{
  width:50px;
  height: 50px;
  border-radius: 50%;
}

.comment-item{
  flex-direction: column;
  padding: 20px;
}

.sub-commit-input{
  padding-top: 20px;
  padding-left: 70px;
}

.comment-wrapper{
  width: 100%;
  padding-left: 20px;
  font-size: 16px;
}

.comment-time{
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: rgb(138, 145, 159);
  font-size: 14px;
}

.pd-20{
  padding: 0 20px;
}

.flex{
  display: flex;
}

.can-click{
  cursor: pointer;
}
</style>
