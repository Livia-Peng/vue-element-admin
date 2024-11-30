<template>
  <el-menu :uniqueOpened="true">
    <SidebarItem
      v-for="item in routes"
      :key="item.path"
      :route="item"></SidebarItem>
  </el-menu>
</template>

<script setup>
  import { useRouter, useRoute } from 'vue-router';
  import { computed } from 'vue';
  import { filterRoutes, generateMenus } from '@/utils/route';
  import SidebarItem from './SidebarItem.vue';

  // 计算路由表结构
  const router = useRouter();
  const routes = computed(() => {
    const filterRouters = filterRoutes(router.getRoutes());
    return generateMenus(filterRouters);
  });
  // console.log(routes.value);
</script>

<style lang="scss"></style>
