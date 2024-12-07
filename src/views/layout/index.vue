<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'open-sidebar' : 'hide-sidebar']">
    <!-- 左侧 -->
    <Sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ background: $store.getters.cssVar.menuBg }" />
    <!-- 右侧 -->
    <div class="main-container">
      <!-- 顶部 -->
      <div class="fixed-header">
        <Navbar />
        <TagsView id="guide-tags" />
      </div>
      <!-- 中间内容 -->
      <AppMain />
    </div>
  </div>
</template>

<script setup>
  import Navbar from './Navbar.vue';
  import AppMain from './AppMain.vue';
  import Sidebar from './Sidebar/index.vue';
  import TagsView from '@/components/TagsView/index';
</script>

<style lang="scss" scoped>
  @import '~@/styles/mixin.scss';
  @import '~@/styles/variables.scss';

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width #{$sideBarDuration};
  }

  .hide-sidebar .fixed-header {
    width: calc(100% - #{$hideSideBarWidth});
  }
</style>
