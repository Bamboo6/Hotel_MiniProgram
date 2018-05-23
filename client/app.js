App({
  //  定义全局表量
  globalData: {
    code: null,
  },
  //获取code值和用户信息
  onLaunch: function () {
    wx.login({
      success: (e) => {
        console.log(e)
        this.globalData.code = e.code
      }
    })
  }

})