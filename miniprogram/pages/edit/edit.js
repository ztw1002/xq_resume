Page({
  data: {
    userInfo: {},
    formData: {
      name: '',
      gender: '',
      age: '',
      height: '',
      education: '',
      occupation: '',
      income: '',
      location: '',
      maritalStatus: '',
      photos: [],
      introduction: '',
      requirements: ''
    },
    genderOptions: ['男', '女'],
    educationOptions: ['高中', '专科', '本科', '硕士', '博士'],
    maritalStatusOptions: ['未婚', '离异', '丧偶'],
    maxPhotos: 6
  },

  onLoad() {
    const app = getApp();
    this.setData({
      userInfo: app.globalData.userInfo || {}
    });
    this.loadUserProfile();
  },

  loadUserProfile() {
    // TODO: 从服务器加载用户资料
  },

  bindInput(e) {
    const { field } = e.currentTarget.dataset;
    const { value } = e.detail;
    this.setData({
      [`formData.${field}`]: value
    });
  },

  chooseImage() {
    const { photos } = this.data.formData;
    if (photos.length >= this.data.maxPhotos) {
      wx.showToast({
        title: `最多上传${this.data.maxPhotos}张照片`,
        icon: 'none'
      });
      return;
    }

    wx.chooseImage({
      count: this.data.maxPhotos - photos.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          'formData.photos': [...photos, ...res.tempFilePaths]
        });
      }
    });
  },

  removeImage(e) {
    const { index } = e.currentTarget.dataset;
    const { photos } = this.data.formData;
    photos.splice(index, 1);
    this.setData({
      'formData.photos': photos
    });
  },

  submitForm() {
    const { formData } = this.data;
    if (!this.validateForm(formData)) {
      return;
    }

    wx.showLoading({
      title: '保存中...'
    });

    // TODO: 上传数据到服务器
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(() => {
            wx.navigateBack();
          }, 2000);
        }
      });
    }, 1500);
  },

  validateForm(formData) {
    const requiredFields = ['name', 'gender', 'age', 'height', 'education', 'occupation'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        wx.showToast({
          title: '请填写完整信息',
          icon: 'none'
        });
        return false;
      }
    }
    return true;
  }
})