<template>
  <div class="app-main">
    <router-view />
    <!-- <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view> -->
  </div>
</template>

<script setup>
  import { watch } from 'vue'
  import { generateTitle, watchSwitchLang, validTags } from '@/utils/tools'
  import { useRoute } from 'vue-router'
  import { useStore } from 'vuex'

  const route = useRoute()

  const getTitle = (route) => {
    let title = ''
    if (!route.meta) {
      // 处理无 meta 的路由
      const pathArr = route.path.split('/')
      title = pathArr[pathArr.length - 1]
    } else {
      title = generateTitle(route.meta.title)
    }
    return title
  }

  const store = useStore()
  watch(
    route,
    (to, from) => {
      if (!validTags(to.path)) return
      const { fullPath, meta, name, params, path, query } = to
      store.commit('app/addTagsViewList', {
        fullPath,
        meta,
        name,
        params,
        path,
        query,
        title: getTitle(to)
      })
    },
    {
      immediate: true
    }
  )

  watchSwitchLang(() => {
    store.getters.tagsViewList.forEach((route, index) => {
      store.commit('app/changeTagsView', {
        index,
        tag: {
          ...route,
          title: getTitle(route)
        }
      })
    })
  })
</script>

<style lang="scss" scoped>
  .app-main {
    width: 100%;
    min-height: calc(100vh - 50px - 43px);
    position: relative;
    overflow: hidden;
    padding: 104px 20px 20px 20px;
    box-sizing: border-box;
  }
</style>
