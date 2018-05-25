// pages/index/index.js
// 全局的 getApp()函数，获取到小程序实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today:"",
    tomorrow:"",
    finalDate:""
  },

  /**
   * 生命周期函数--监听页面加载
   * 页面载入，初始化日期，这段代码不表示必须的，用于展示 js 的 prototype 方法机制
   */
  onLoad: function (options) {
    let today = new Date();
    let tomorrow = new Date();
    let finalDate = new Date();
    Date.prototype.getCHNDateString = function(){
      return this.getFullYear() + "-" +(this.getMonth() + 1 + "").padStart(2,"0") + "-" + this.getDate()
    }
    Date.prototype.addMonth = function (value) {
      var month = this.getMonth()
      this.setMonth(month + value)
    }
    Date.prototype.addDate = function (value) {
      var date = this.getDate()
      this.setDate(date + value)
    }
    // 离店日期最早是明天
    tomorrow.addDate(1)
    // 只能预订三个月以内的房间
    finalDate.addMonth(3)
    this.setData({
      today: today.getCHNDateString(),
      tomorrow: tomorrow.getCHNDateString(),
      finalDate: finalDate.getCHNDateString()
    })
  },
// 表单提交
  formSubmit: function (e) {
    var orderno = e.detail.value.orderNo
    var orderdatebegin = e.detail.value.orderDateBegin
    var orderdateend = e.detail.value.orderDateEnd
    var ordername = e.detail.value.orderName
    var ordertel = e.detail.value.orderTel
    var formid = e.detail.formId
    console.log(e.detail.formId)
    // 校验输入为非空
    if (orderno == "" || orderdatebegin == "" || orderdateend == "" || ordername == "" || ordertel == ""){
      wx.showModal({
        title: '提示',
        content: '不能为空！'
      })
    }else {
      wx.request({
        url: 'https://wrysj9ff.qcloud.la/openid.php',// 服务器信息
        data: {
          code: app.globalData.code,
          FORMID: formid,
          datebegin: orderdatebegin,
          dateend: orderdateend,
          no: orderno,
          name: ordername,
          tel: ordertel,
          appid: 'wx3599c412069d26f5',
          appsecret: 'd9c85151c35a319bc96f6d00945ec99a',
          templateid: '5hDyt42_w1MUMuAgemfRgMPs7p9pOaAiG4dNDtfgFb8'
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          wx.showToast({
            title: res.data.errmsg,// 显示成功返回值
            icon: 'success',
            duration: 2000
          }),
          console.log(res)
        }
      })
    }
  },
  // 表单重置
  formReset:function (){
    this.setData({
      dateBegin: '',
      dateEnd: ''
    })
  },
  // 日期选择
  bindDateChange: function (e){
    if(e.target.id=="dateBegin"){
      this.setData({
        dateBegin: e.detail.value
      })
    }else{
      this.setData({
        dateEnd: e.detail.value
      })
    }
  },
})