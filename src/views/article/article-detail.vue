<template>
  <div class="article-container">
    <div class="left-area">
      <div class="article-content">
        <div v-html="articleInfo.content" />
      </div>
      <div class="article-comment">
        <div class="comment-count">
          评论8
        </div>
        <div class="comment-commit">
          <img
            :src="userInfo.avatar"
            alt="!"
            class="avatar-img"
          >
          <div class="commit-input">
            <v-text-field :hide-details="true" />
            <div class="commit-input-bottom">
              <v-btn>提交</v-btn>
            </div>
          </div>
        </div>
        <div class="comment-sort">
          <v-btn variant="plain">
            最新
          </v-btn>|
          <v-btn variant="plain">
            最热
          </v-btn>
        </div>
        <div class="comment-content">
          <div class="comment-item flex">
            <div class="comment-avatar">
              <img
                :src="userInfo.avatar"
                alt="!"
                class="avatar-img"
              >
            </div>
            <div class="comment-wrapper">
              <div>future</div>
              <div class="comment-desc">
                感谢分享
              </div>
              <div class="comment-time">
                <div class="flex">
                  <div>n天前</div>
                  <div class="pd-20 can-click">
                    点赞
                  </div>
                  <div class="can-click">
                    评论
                  </div>
                </div>
                <div class="comment-more can-click">
                  ...
                </div>
              </div>
            </div>
          </div>
          <div class="comment-item flex">
            <div class="comment-avatar">
              <img
                :src="userInfo.avatar"
                alt="!"
                class="avatar-img"
              >
            </div>
            <div class="comment-wrapper">
              <div>future</div>
              <div class="comment-desc">
                感谢分享
              </div>
              <div class="comment-time">
                <div class="flex">
                  <div>n天前</div>
                  <div class="pd-20 can-click">
                    点赞
                  </div>
                  <div class="can-click">
                    评论
                  </div>
                </div>
                <div class="comment-more can-click">
                  ...
                </div>
              </div>
            </div>
          </div>
          <div class="comment-item flex">
            <div class="comment-avatar">
              <img
                :src="userInfo.avatar"
                alt="!"
                class="avatar-img"
              >
            </div>
            <div class="comment-wrapper">
              <div>future</div>
              <div class="comment-desc">
                感谢分享
              </div>
              <div class="comment-time">
                <div class="flex">
                  <div>n天前</div>
                  <div class="pd-20 can-click">
                    点赞
                  </div>
                  <div class="can-click">
                    评论
                  </div>
                </div>
                <div class="comment-more can-click">
                  ...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="right-area">
      点赞，评论，转发
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'

const userStore = useUserStore()
const userInfo = userStore.userInfo
const $axios = inject('$axios')
const router = useRouter()
const articleInfo = ref({})
const id = router.currentRoute.value.params.id

$axios.get(`/api/v1/article/${id}`).then(res => {
  console.log(res.data)
  articleInfo.value = res.data
}).catch(err => {
  console.log(err)
})
</script>

<style lang="scss" scoped>
.article-container{
  display:flex;
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
  padding: 20px;
  background-color: #fff;
}

.right-area{
  margin-left: 24px;
  background-color: pink;
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
  background-color: rgb(245,245,245);
}

.avatar-img{
  width:50px;
  height: 50px;
  border-radius: 50%;
}

.comment-item{
  padding: 20px;
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
