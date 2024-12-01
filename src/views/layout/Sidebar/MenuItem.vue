<template>
  <svg-icon :icon="icon"></svg-icon>
  <span>{{ generateTitle(title) }}</span>
</template>

<script setup>
  import { defineProps } from 'vue';
  import { generateTitle } from '@/utils/tools';
  defineProps({
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  });
</script>

<style lang="scss" scoped></style>
