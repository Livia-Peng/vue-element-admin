<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed">
    <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"></el-checkbox>
    </el-checkbox-group>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
  import { defineProps, defineEmits, ref, watch } from 'vue'
  import Permission from '@/api/permission'
  import { watchSwitchLang } from '@/utils/tools'
  import { getUserRoles, updateRole } from '@/api/user-manage'
  import { ElMessage } from 'element-plus'
  import { useI18n } from 'vue-i18n'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  })

  const emits = defineEmits(['update:modelValue', 'updateRole'])

  // 所有角色
  const allRoleList = ref([])
  // 获取所有角色数据的方法
  const getListData = async () => {
    allRoleList.value = await Permission.roleList()
  }
  getListData()
  watchSwitchLang(getListData)

  // 当前用户角色
  const userRoleTitleList = ref([])
  // 获取当前用户角色
  const getRoles = async () => {
    const res = await getUserRoles(props.userId)
    userRoleTitleList.value = res.role.map((item) => item.title)
  }
  watch(
    () => props.userId,
    (val) => {
      if (val) getRoles()
    }
  )

  const i18n = useI18n()
  const onConfirm = async () => {
    // 处理数据结构
    const roles = userRoleTitleList.value.map((title) => {
      return allRoleList.value.find((role) => role.title === title)
    })
    await updateRole(props.userId, roles)
    ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
    closed()
    emits('updateRole')
  }
  const closed = () => {
    emits('update:modelValue', false)
  }
</script>

<style lang="scss" scoped></style>
