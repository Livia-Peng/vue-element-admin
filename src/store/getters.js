import variables from '@/styles/variables.scss';

// 快捷访问
const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => {
    return state.user.userInfo && state.user.userInfo.hasOwnProperty('id');
  },
  sidebarOpened: (state) => state.app.sidebarOpened,
  language: (state) => state.app.language,
  cssVar: (state) => variables
};

export default getters;
