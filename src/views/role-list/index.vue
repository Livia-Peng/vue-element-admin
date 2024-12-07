<template>
  <div class="role-list-container">
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column :label="$t('msg.role.index')" type="index" width="120">
        </el-table-column>
        <el-table-column :label="$t('msg.role.name')" prop="title">
        </el-table-column>
        <el-table-column :label="$t('msg.role.desc')" prop="describe">
        </el-table-column>
        <el-table-column
          :label="$t('msg.role.action')"
          prop="action"
          width="260"
          #default="{ row }">
          <el-button
            type="primary"
            size="small"
            v-permission="['distributePermission']"
            @click="onDistributePermissionClick(row)">
            {{ $t('msg.role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <DistributePermission
      v-model="distributePermissionVisible"
      :roleId="distributeRoleId"></DistributePermission>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import Permission from '@/api/permission'
  import { watchSwitchLang } from '@/utils/tools'
  import DistributePermission from './DistributePermission.vue'

  // 表格数据定义
  const tableData = ref([])
  // 获取数据的方法
  const getListData = async () => {
    tableData.value = await Permission.roleList()
  }
  getListData()
  // 监听语言切换
  watchSwitchLang(getListData)

  const distributeRoleId = ref('')
  const distributePermissionVisible = ref(false)
  watch(distributePermissionVisible, (val) => {
    if (!val) distributeRoleId.value = ''
  })
  const onDistributePermissionClick = (row) => {
    distributeRoleId.value = row.id
    distributePermissionVisible.value = true
  }
</script>

<style lang="scss" scoped></style>
