App({
  globalData: {
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName')
  },
  onLaunch() {
    if (wx.getUserProfile) {
      this.globalData.canIUseGetUserProfile = true;
    }
  }
})