import {
  getStorageItem,
  StorageKeys,
  setStorageItem
} from '../../utils/storage';

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getStorageItem(StorageKeys.language) || 'zh',
    tagsViewList: getStorageItem(StorageKeys.tagsView) || [],
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened;
    },
    setLanguage(state, lang) {
      setStorageItem(StorageKeys.language, lang);
      state.language = lang;
    },
    addTagsViewList(state, tag) {
      // 判重
      if (state.tagsViewList.some(e => e.path === tag.path)) return;
      state.tagsViewList.push(tag);
      setStorageItem(StorageKeys.tagsView, state.tagsViewList);
    },
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag;
      setStorageItem(StorageKeys.tagsView, state.tagsViewList);
    },
    removeTagsView(state, payload) {
      switch (payload.type) {
        case 'index':
          state.tagsViewList.splice(payload.index, 1)
          break;
        case 'other':
          state.tagsViewList = [state.tagsViewList[payload.index]];
          break;
        case 'right':
          state.tagsViewList.splice(payload.index + 1, state.tagsViewList.length - payload.index + 1);
          break;
        default:
          return;
      }
      setStorageItem(StorageKeys.tagsView, state.tagsViewList)
    }
  }
};
