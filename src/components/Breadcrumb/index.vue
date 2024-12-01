<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path">
        <!-- 当前页面，不可点击 -->
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">
          {{ item.meta.title }}
        </span>
        <!-- 父级页面 -->
        <a v-else class="redirect" @click.prevent="onLinkClick(item)">
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
  // import { generateTitle } from '@/utils/i18n';
  import { ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from 'vuex';

  const route = useRoute();
  // 定义路由数据
  const breadcrumbData = ref([]);
  const getBreadcrumbData = () => {
    // route.matched 获得当前路由记录
    console.log(route.matched);
    breadcrumbData.value = route.matched.filter(
      (item) => item.meta || item.meta.title
    );
  };
  // 监听路由变化时触发
  watch(
    route,
    () => {
      getBreadcrumbData();
    },
    {
      // 创建侦听器时，立即执行一遍回调
      immediate: true
    }
  );

  // 处理点击事件
  const router = useRouter();
  const onLinkClick = (item) => {
    router.push(item.path);
  };

  // 进行主题替换，获取动态样式
  const store = useStore();
  // eslint-disable-next-line
  const linkHoverColor = ref(store.getters.cssVar.menuBg);
</script>

<style lang="scss" scoped>
  .breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }

    .redirect {
      color: #666;
      font-weight: 600;
    }

    .redirect:hover {
      // 进行主题替换
      color: v-bind(linkHoverColor);
    }
  }
</style>
