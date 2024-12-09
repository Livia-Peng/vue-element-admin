<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <div class="bullshit">
          <div class="bullshit__oops">OOPS!</div>
          <div class="bullshit__info">
            All rights reserved ...
          </div>
          <div class="bullshit__headline">你没有权限访问该页面</div>
          <div class="bullshit__info">
            请检查您输入的URL是否正确，或返回上一页
          </div>
          <a class="bullshit__return-home"  @click="back">返回上一页</a>
        </div>
      </el-col>
      <el-col :span="12">
        <img
          :src="errGif"
          width="313"
          height="428"
          alt="Girl has dropped her ice cream."
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
  import gif401 from '@/assets/401_images/401.gif'
  import { ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const errGif = ref(gif401 + '?' + new Date())

  const route = useRoute()
  const router = useRouter()
  const back = () => {
    if (route.query.noGoBack) {
      router.push({ path: '/' })
    } else {
      router.go(-1)
    }
  }
</script>

<style lang="scss" scoped>
  .errPage-container {
    width: 800px;
    max-width: 100%;
    margin: 100px auto;

    .bullshit {
      position: relative;
      float: left;
      width: 300px;
      padding: 30px 0;
      overflow: hidden;

      &__oops {
        font-size: 32px;
        font-weight: bold;
        line-height: 40px;
        color: #008489;
        opacity: 0;
        margin-bottom: 20px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
      }

      &__headline {
        font-size: 20px;
        line-height: 24px;
        color: #222;
        font-weight: bold;
        opacity: 0;
        margin-bottom: 10px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.1s;
        animation-fill-mode: forwards;
      }

      &__info {
        font-size: 13px;
        line-height: 21px;
        color: grey;
        opacity: 0;
        margin-bottom: 30px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.2s;
        animation-fill-mode: forwards;
      }

      &__return-home {
        display: block;
        float: left;
        width: 110px;
        height: 36px;
        background: #008489;
        border-radius: 100px;
        text-align: center;
        color: #ffffff;
        opacity: 0;
        font-size: 14px;
        line-height: 36px;
        cursor: pointer;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.3s;
        animation-fill-mode: forwards;
      }

      @keyframes slideUp {
        0% {
          transform: translateY(60px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }

    .pan-gif {
      margin: 0 auto;
      display: block;
    }

    .pan-img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }

    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
  }
</style>
