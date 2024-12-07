import { generateColors } from '@/utils/theme';
import { getStorageItem, StorageKeys } from '@/utils/storage';

// 快捷访问
const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => {
    return state.user.userInfo && state.user.userInfo.hasOwnProperty('id');
  },
  sidebarOpened: (state) => state.app.sidebarOpened,
  language: (state) => state.app.language,
  tagsViewList: (state) => state.app.tagsViewList,
  mainColor: (state) => state.theme.mainColor,
  cssVar: (state) => ({
    ...state.theme.variables,
    ...generateColors(getStorageItem(StorageKeys.mainColor))
  })
};

export default getters;
