// pages/index/test.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    formid:'',
    code:''
  },

  bindsubmit:function(e){
    console.log(e)
    this.setData({
      formid: e.detail.formId,
      code: getApp().globalData.code // 获取 App 对象的全局属性
    })
  }
})