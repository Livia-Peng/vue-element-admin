<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <ProjectCard class="user-card" :features="featureData"></ProjectCard>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <Feature :features="featureData" />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <Chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <Author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
  import ProjectCard from './partial/ProjectCard.vue'
  import Chapter from './partial/Chapter.vue'
  import Feature from './partial/Feature.vue'
  import Author from './partial/Author.vue'
  import { ref } from 'vue'
  import { feature } from '@/api/user'
  import { watchSwitchLang } from '@/utils/tools'

  const activeName = ref('feature')

  const featureData = ref([])
  const getFeatureData = async () => {
    featureData.value = await feature()
  }
  getFeatureData()
  // 监听语言切换
  watchSwitchLang(getFeatureData)
</script>

<style lang="scss" scoped>
  .my-container {
    .user-card {
      margin-right: 20px;
    }
  }
</style>
