<template>
  <!-- v-bind=$attrs 接收父组件传递的属性 -->
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme">
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')">
        <svg-icon id="guide-theme" icon="change-theme" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('msg.theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 展示弹出层 -->
  <div>
    <SelectColor v-model="selectColorVisible"></SelectColor>
  </div>
</template>

<script setup>
  import SelectColor from './SelectColor.vue';
  import { ref } from 'vue';

  const selectColorVisible = ref(false);
  const handleSetTheme = (command) => {
    selectColorVisible.value = true;
  };
</script>

<style lang="scss" scoped></style>
