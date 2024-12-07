<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed">
    <el-tree
      ref="treeRef"
      :data="allPermission"
      show-checkbox
      check-strictly
      node-key="id"
      default-expand-all
      :props="defaultProps">
    </el-tree>
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
  import { useI18n } from 'vue-i18n'
  import { ElMessage } from 'element-plus'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    },
    roleId: {
      type: String,
      required: true
    }
  })
  const emits = defineEmits(['update:modelValue'])

  // 所有权限
  const allPermission = ref([])
  const getPermissionList = async () => {
    allPermission.value = await Permission.permissionList()
  }
  getPermissionList()
  watchSwitchLang(getPermissionList)

  // 属性结构配置
  const defaultProps = {
    children: 'children',
    label: 'permissionName'
  }
  // tree 节点
  const treeRef = ref(null)
  // 获取当前用户角色的权限
  const getRolePermission = async () => {
    const checkedKeys = await Permission.rolePermission(props.roleId)
    treeRef.value.setCheckedKeys(checkedKeys)
  }

  watch(
    () => props.roleId,
    (val) => {
      if (val) getRolePermission()
    }
  )

  const i18n = useI18n()
  const onConfirm = async () => {
    await Permission.distribute({
      roleId: props.roleId,
      permissions: treeRef.value.getCheckedKeys()
    })
    ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
    closed()
  }

  const closed = () => {
    emits('update:modelValue', false)
  }
</script>

<style lang="scss" scoped></style>
