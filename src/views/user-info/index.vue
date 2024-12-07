<template>
  <div class="user-info-container">
    <el-card class="print-box">
      <el-button type="primary" v-print="printObj" :loading="printLoading">{{
        $t('msg.userInfo.print')
      }}</el-button>
    </el-card>
    <el-card>
      <div id="userInfoBox" class="user-info-box">
        <!-- 标题 -->
        <h2 class="title">{{ $t('msg.userInfo.title') }}</h2>

        <div class="header">
          <!-- 头部渲染表格 -->
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('msg.userInfo.name')">{{
              userData.username
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.sex')">{{
              userData.gender
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.nation')">{{
              userData.nationality
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.mobile')">{{
              userData.mobile
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.province')">{{
              userData.province
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.date')">{{
              $filters.dateFormat(userData.openTime)
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.remark')" :span="2">
              <el-tag
                class="remark"
                size="small"
                v-for="(item, index) in userData.remark"
                :key="index"
                >{{ item }}</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.address')" :span="2">
              {{ userData.address }}
            </el-descriptions-item>
          </el-descriptions>
          <!-- 头像渲染 -->
          <el-image
            class="avatar"
            :src="userData.avatar"
            :preview-src-list="[userData.avatar]"></el-image>
        </div>
        <div class="body">
          <!-- 内容渲染表格 -->
          <el-descriptions direction="vertical" :column="1" border>
            <el-descriptions-item :label="$t('msg.userInfo.experience')">
              <ul>
                <li v-for="(item, index) in userData.experience" :key="index">
                  <span>
                    {{ $filters.dateFormat(item.startTime, 'YYYY/MM') }}
                    ----
                    {{ $filters.dateFormat(item.endTime, 'YYYY/MM') }}</span
                  >
                  <span>{{ item.title }}</span>
                  <span>{{ item.desc }}</span>
                </li>
              </ul>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.major')">
              {{ userData.major }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.glory')">
              {{ userData.glory }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <!-- 尾部签名 -->
        <div class="foot">{{ $t('msg.userInfo.foot') }}</div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
  import { ref, defineProps, defineEmits } from 'vue'
  import { getUserDetail } from '@/api/user-manage'
  import { watchSwitchLang } from '@/utils/tools'
  import { useI18n } from 'vue-i18n'
  import { ElMessageBox, ElMessage } from 'element-plus'

  // 可通过路由组件化从路径直接获取
  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  })
  const userData = ref({})
  const getDetail = async () => {
    userData.value = (await getUserDetail(props.id)) || {}
  }
  getDetail()
  watchSwitchLang(getDetail)

  const printLoading = ref(false)
  const printObj = {
    // 打印区域
    id: 'userInfoBox',
    // 打印标题
    popTitle: 'vue-element-admin',
    // 打印前
    beforeOpenCallback() {
      printLoading.value = true
    },
    // 执行打印
    openCallback() {
      printLoading.value = false
    }
  }
</script>

<style lang="scss" scoped>
  .print-box {
    margin-bottom: 20px;
    text-align: right;
  }
  .user-info-box {
    width: 1024px;
    margin: 0 auto;
    .title {
      text-align: center;
      margin-bottom: 18px;
    }
    .header {
      display: flex;
      ::v-deep .el-descriptions {
        flex-grow: 1;
      }
      .avatar {
        width: 187px;
        box-sizing: border-box;
        padding: 30px 20px;
        border: 1px solid #ebeef5;
        border-left: none;
      }
      .remark {
        margin-right: 12px;
      }
    }
    .body {
      ul {
        list-style: none;
        li {
          span {
            margin-right: 62px;
          }
        }
      }
    }
    .foot {
      margin-top: 42px;
      text-align: right;
    }
  }
</style>
