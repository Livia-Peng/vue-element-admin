<template>
  <el-dialog
    :title="$t('msg.excel.importExcel')"
    :model-value="modelValue"
    @close="closed"
    width="60%">
    <UploadExcel :onSuccess="onSuccess"></UploadExcel>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, defineProps, defineEmits } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { userBatchImport } from '@/api/user-manage'
  import { commonConfig } from '@/constant'
  import UploadExcel from '@/components/UploadExcel'
  import { ElMessage } from 'element-plus'
  import { formatExcelDate } from '@/utils/tools'

  defineProps({
    modelValue: {
      type: Boolean,
      required: true
    }
  })
  const emits = defineEmits(['update:modelValue', 'getList'])

  const i18n = useI18n()
  const loading = ref(false)
  const onSuccess = async ({ header, results }) => {
    const updateData = generateData(results)
    await userBatchImport(updateData)
    ElMessage.success({
      message: results.length + i18n.t('msg.excel.importSuccess'),
      type: 'success'
    })
    emits('getList')
    closed()
  }
  const closed = () => {
    loading.value = false
    emits('update:modelValue', false)
  }

  const generateData = (results) => {
    const arr = []
    results.forEach((item) => {
      const userInfo = {}
      Object.keys(item).forEach((key) => {
        if (commonConfig.userExcelTitles[key] === 'openTime') {
          userInfo[commonConfig.userExcelTitles[key]] = formatExcelDate(
            item[key]
          )
          return
        }
        userInfo[commonConfig.userExcelTitles[key]] = item[key]
      })
      arr.push(userInfo)
    })
    return arr
  }
</script>

<style lang="sass" scoped></style>
