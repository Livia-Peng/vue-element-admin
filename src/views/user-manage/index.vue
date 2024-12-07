<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary" @click="onImportExcelClick">
          {{ $t('msg.excel.importExcel') }}
        </el-button>
        <el-button type="success" @click="onExportExcelClick">
          {{ $t('msg.excel.exportExcel') }}
        </el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index" />
        <el-table-column prop="username" :label="$t('msg.excel.name')">
        </el-table-column>
        <el-table-column prop="mobile" :label="$t('msg.excel.mobile')">
        </el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image class="avatar" :src="row.avatar"></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="small">
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="small">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFormat(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="260">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="onShowDetailClick(row._id)">
              {{ $t('msg.excel.show') }}
            </el-button>
            <el-button type="info" size="small" @click="onShowRoleClick(row)">
              {{ $t('msg.excel.showRole') }}
            </el-button>
            <el-button type="danger" size="small" @click="onRemoveClick(row)">
              {{ $t('msg.excel.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :current-page="pageInfo.page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="pageInfo.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total">
      </el-pagination>
    </el-card>

    <ImportExcel
      v-model="importExcelVisible"
      @getList="getListData"></ImportExcel>
    <ExportExcel v-model="exportExcelVisible"></ExportExcel>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { getUserManageList, deleteUser } from '@/api/user-manage'
  import { watchSwitchLang } from '@/utils/tools'
  import { useI18n } from 'vue-i18n'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import ExportExcel from './ExportExcel.vue'
  import ImportExcel from './ImportExcel.vue'

  // 表格数据定义
  const tableData = ref([])
  const pageInfo = ref({
    total: 0,
    page: 1,
    size: 1
  })
  // 获取数据的方法
  const getListData = async () => {
    const result = await getUserManageList({
      page: pageInfo.value.page,
      size: pageInfo.value.size
    })
    tableData.value = result.list
    pageInfo.value.total = result.total
  }
  getListData()
  // 监听语言切换
  watchSwitchLang(getListData)

  // 更新数据
  const handleSizeChange = (currentSize) => {
    pageInfo.value.size = currentSize
    getListData()
  }
  const handlePageChange = (currentPage) => {
    pageInfo.value.page = currentPage
    getListData()
  }
  // 查看详情/查看角色/删除/导入/导出
  const i18n = useI18n()
  const onShowDetailClick = (id) => {
    console.log(id)
  }
  const onShowRoleClick = (row) => {
    console.log(row)
  }
  const onRemoveClick = (row) => {
    // console.log(row)
    ElMessageBox.confirm(
      i18n.t('msg.excel.dialogTitle1') +
        row.username +
        i18n.t('msg.excel.dialogTitle2'),
      {
        type: 'warning'
      }
    ).then(async () => {
      await deleteUser(row._id)
      ElMessage.success(i18n.t('msg.excel.removeSuccess'))
      // 重新渲染数据
      getListData()
    })
  }
  const importExcelVisible = ref(false)
  const onImportExcelClick = () => {
    importExcelVisible.value = true
  }
  const exportExcelVisible = ref(false)
  const onExportExcelClick = () => {
    exportExcelVisible.value = true
  }
</script>

<style lang="scss" scoped>
  .user-manage-container {
    .header {
      margin-bottom: 22px;
      text-align: right;
    }

    ::v-deep .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

    ::v-deep .el-tag {
      margin-right: 6px;
    }

    .pagination {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
