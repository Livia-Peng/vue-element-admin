import variables from '@/styles/variables.scss';

// 快捷访问
const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => {
    return state.user.userInfo && state.user.userInfo.hasOwnProperty('id');
  },
  cssVar: (state) => variables
};

export default getters;
