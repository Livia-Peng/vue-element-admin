import {
  getStorageItem,
  StorageKeys,
  setStorageItem
} from '../../utils/storage';
import { commonConfig } from '@/constant';
import variables from '@/styles/variables.scss';

export default {
  namespaced: true,
  state: () => ({
    mainColor:
      getStorageItem(StorageKeys.mainColor) || commonConfig.DEFAULT_COLOR,
    variables: variables
  }),
  mutations: {
    setMainColor(state, color) {
      setStorageItem(StorageKeys.mainColor, color);
      state.variables.menuBg = color;
      state.mainColor = color;
    }
  }
};
