<template>
  <div class="navbar">
    <Hamburger class="hamburger-container"></Hamburger>
    <Breadcrumb class="breadcrumb-container"></Breadcrumb>
    <div class="right-menu">
      <!-- 全屏模式 -->
      <Screenfull class="right-menu-item hover-effect"></Screenfull>
      <!-- 主题选择 -->
      <ThemePicker class="right-menu-item hover-effect"></ThemePicker>
      <!-- 语言选择 -->
      <LangSelect class="right-menu-item hover-effect"></LangSelect>
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> {{ $t('msg.navBar.home') }}</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://coding.imooc.com/class/542.html">
              <el-dropdown-item>{{ $t('msg.navBar.course') }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              {{ $t('msg.navBar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex';
  import Hamburger from '@/components/Hamburger/index';
  import Breadcrumb from '@/components/Breadcrumb/index';
  import LangSelect from '@/components/LangSelect/index';
  import ThemePicker from '@/components/ThemePicker/index';
  import Screenfull from '@/components/Screenfull/index';

  const store = useStore();
  const logout = () => {
    store.dispatch('user/logout');
  };
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      // hover 动画
      transition: background 0.5s;

      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      display: flex;
      align-items: center;
      float: right;
      padding-right: 16px;

      ::v-deep .right-menu-item {
        display: inline-block;
        padding: 0 18px 0 0;
        font-size: 24px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      ::v-deep .avatar-container {
        cursor: pointer;
        .avatar-wrapper {
          margin-top: 5px;
          position: relative;
          .el-avatar {
            margin-right: 12px;
          }
        }
      }
    }
  }
</style>
