<template>
  <div class="permission-list-container">
    <el-card>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column
          prop="permissionName"
          :label="$t('msg.permission.name')"
          width="180">
        </el-table-column>
        <el-table-column
          prop="permissionMark"
          :label="$t('msg.permission.mark')"
          width="180">
        </el-table-column>
        <el-table-column
          prop="permissionDesc"
          :label="$t('msg.permission.desc')">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import Permission from '@/api/permission'
  import { watchSwitchLang } from '@/utils/tools'

  // 表格数据定义
  const tableData = ref([])
  // 获取数据的方法
  const getListData = async () => {
    tableData.value = await Permission.permissionList()
  }
  getListData()
  // 监听语言切换
  watchSwitchLang(getListData)
</script>

<style lang="scss" scoped></style>
