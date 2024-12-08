<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLabel">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :label="item.label"
            :key="index">
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :prop="item.prop"
          :label="item.label">
          <template #default="{ row }" v-if="item.prop === 'publicDate'">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
          <template #default="{ row }" v-else-if="item.prop === 'action'">
            <el-button type="primary" size="small" @click="onShowClick(row)">{{
              $t('msg.article.show')
            }}</el-button>
            <el-button type="danger" size="small" @click="onRemoveClick(row)">{{
              $t('msg.article.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :current-page="pageInfo.page"
        :page-sizes="[5, 10, 50, 100, 200]"
        :page-size="pageInfo.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
  import { ref, onActivated, onMounted } from 'vue'
  import { getArticleList, deleteArticle } from '@/api/article'
  import { watchSwitchLang } from '@/utils/tools'
  import {
    dynamicData,
    selectDynamicLabel,
    tableColumns
  } from './dynamic/index'
  import { tableRef, initSortable } from './sortable/index'
  import { useRouter } from 'vue-router'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { useI18n } from 'vue-i18n'

  // 表格数据定义
  const tableData = ref([])
  const pageInfo = ref({
    total: 0,
    page: 1,
    size: 10
  })
  // 获取数据的方法
  const getListData = async () => {
    const result = await getArticleList({
      page: pageInfo.value.page,
      size: pageInfo.value.size
    })
    tableData.value = result.list
    pageInfo.value.total = result.total
  }
  getListData()
  // 监听语言切换
  watchSwitchLang(getListData)
  // 处理数据不重新加载的问题
  onActivated(getListData)
  // 更新数据
  const handleSizeChange = (currentSize) => {
    pageInfo.value.size = currentSize
    getListData()
  }
  const handlePageChange = (currentPage) => {
    pageInfo.value.page = currentPage
    getListData()
  }

  // 表格拖拽相关
  onMounted(() => {
    initSortable(tableData, getListData)
  })

  const router = useRouter()
  const onShowClick = (row) => {
    router.push(`/article/detail/${row._id}`)
  }

  const i18n = useI18n()
  const onRemoveClick = (row) => {
    // console.log(row)
    ElMessageBox.confirm(
      i18n.t('msg.article.dialogTitle1') +
        row.title +
        i18n.t('msg.article.dialogTitle2'),
      {
        type: 'warning'
      }
    ).then(async () => {
      await deleteArticle(row._id)
      ElMessage.success(i18n.t('msg.article.removeSuccess'))
      // 重新渲染数据
      getListData()
    })
  }
</script>

<style lang="scss" scoped>
  .article-ranking-container {
    .header {
      margin-bottom: 20px;
      .dynamic-box {
        display: flex;
        align-items: center;
        .title {
          margin-right: 20px;
          font-size: 14px;
          font-weight: bold;
        }
      }
    }

    ::v-deep .el-table__row {
      cursor: pointer;
    }

    .pagination {
      margin-top: 20px;
      text-align: center;
    }
  }

  ::v-deep .sortable-ghost {
    opacity: 0.6;
    color: #fff !important;
    background: #304156 !important;
  }
</style>
