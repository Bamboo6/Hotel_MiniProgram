// pages/index/index.js
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
    tomorrow.addDate(1)
    finalDate.addMonth(3)
    this.setData({
      today: today.getCHNDateString(),
      tomorrow: tomorrow.getCHNDateString(),
      finalDate: finalDate.getCHNDateString()
    })
  },

  formSubmit: function (e) {
    var orderno = e.detail.value.orderNo
    var orderdatebegin = e.detail.value.orderDateBegin
    var orderdateend = e.detail.value.orderDateEnd
    var ordername = e.detail.value.orderName
    var ordertel = e.detail.value.orderTel
    var formid = e.detail.formId
    console.log(e.detail.formId)

    if (orderno == "" || orderdatebegin == "" || orderdateend == "" || ordername == "" || ordertel == ""){
      wx.showModal({
        title: '提示',
        content: '不能为空！'
      })
    }else {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      }),
      wx.request({
        url: 'https://wrysj9ff.qcloud.la/openid.php',
        data: {
          code: app.globalData.code,
          FORMID: formid,
          dateBegin: orderdatebegin,
          dateend: orderdateend,
          no: orderno,
          name: ordername,
          tel: ordertel,
          appid: 'wx3599c412069d26f5',
          appsecret: 'd9c85151c35a319bc96f6d00945ec99a',
          templateid: '5hDyt42_w1MUMuAgemfRgFje9XUtpT8sIix3A2Y9vRg'
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res)
        }
      })
    }
  },

  formReset:function (){
    this.setData({
      dateBegin: '',
      dateEnd: ''
    })
  },

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