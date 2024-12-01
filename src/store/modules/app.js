import {
  getStorageItem,
  StorageKeys,
  setStorageItem
} from '../../utils/storage';

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getStorageItem(StorageKeys.language) || 'zh'
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened;
    },
    setLanguage(state, lang) {
      setStorageItem(StorageKeys.language, lang);
      state.language = lang;
    }
  }
};
