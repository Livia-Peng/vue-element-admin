<template>
  <el-menu
    :default-active="activeMenu"
    :background-color="cssVar.menuBg"
    :text-color="cssVar.menuText"
    :active-text-color="cssVar.menuActiveText"
    :unique-opened="true"
    router>
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
  import { useStore } from 'vuex';

  // 计算路由表结构
  const router = useRouter();
  const routes = computed(() => {
    const filterRouters = filterRoutes(router.getRoutes());
    return generateMenus(filterRouters);
  });
  // console.log(routes.value);

  const route = useRoute();
  const activeMenu = computed(() => {
    const { meta, path } = route;
    if (meta.activeMenu) {
      return meta.activeMenu;
    }
    return path;
  });

  const store = useStore();
  const cssVar = computed(() => {
    return store.getters.cssVar;
  });
</script>

<style lang="scss"></style>
