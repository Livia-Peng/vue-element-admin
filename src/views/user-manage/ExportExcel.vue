<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%">
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, defineProps, defineEmits } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { getUserManageAllList } from '@/api/user-manage'
  import { commonConfig } from '@/constant'
  import { dateFormat, watchSwitchLang } from '@/utils/tools'

  defineProps({
    modelValue: {
      type: Boolean,
      required: true
    }
  })
  const emits = defineEmits(['update:modelValue'])

  const i18n = useI18n()
  let exportDefaultName = i18n.t('msg.excel.defaultName')
  const excelName = ref(exportDefaultName)
  watchSwitchLang(() => {
    exportDefaultName = i18n.t('msg.excel.defaultName')
    excelName.value = exportDefaultName
  })

  const loading = ref(false)
  // 将数组转化成二维数组
  const formatJson = (headers, rows) => {
    // 首先遍历数组
    // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
    return rows.map((item) => {
      return Object.keys(headers).map((key) => {
        // 时间特殊处理
        if (headers[key] === 'openTime') {
          return dateFormat(item[headers[key]])
        }
        // 角色特殊处理
        if (headers[key] === 'role') {
          const roles = item[headers[key]]
          return roles.map((role) => role.title).join(',')
        }
        return item[headers[key]]
      })
    })
  }
  const onConfirm = async () => {
    loading.value = true
    // 获取数据
    const { list } = (await getUserManageAllList()) || {}
    const data = formatJson(commonConfig.userExcelTitles, list)
    // 导出数据
    const excel = await import('@/utils/Export2Excel')
    excel.export_json_to_excel({
      // excel 表头
      header: Object.keys(commonConfig.userExcelTitles),
      // excel 数据（二维数组结构）
      data,
      // 文件名称
      filename: excelName.value || exportDefaultName,
      // 是否自动列宽
      autoWidth: true,
      // 文件类型
      bookType: 'xlsx'
    })
    closed()
  }
  const closed = () => {
    loading.value = false
    emits('update:modelValue', false)
  }
</script>

<style lang="sass" scoped></style>
