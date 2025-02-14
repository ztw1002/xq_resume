Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    resumeStats: {
      views: 0,
      likes: 0,
      matches: 0
    },
    recentVisitors: []
  },

  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      });
    }
  },

  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      }
    });
  },

  navigateToEdit() {
    wx.navigateTo({
      url: '/pages/edit/edit'
    });
  },

  navigateToBrowse() {
    wx.switchTab({
      url: '/pages/browse/browse'
    });
  },

  onShareAppMessage() {
    return {
      title: '缘分简历 - 找到您的另一半',
      path: '/pages/index/index'
    };
  }
})