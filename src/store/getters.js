// 快捷访问
const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => {
    return state.user.userInfo && state.user.userInfo.hasOwnProperty('id');
  }
};

export default getters;
