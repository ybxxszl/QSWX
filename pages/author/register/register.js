//获取到小程序实例
const app = getApp();

var http = require("../../../utils/httpUtil.js");
var verify = require("../../../utils/verifyUtil.js");
var time = require("../../../utils/timeUtil.js");

Page({

  //页面的初始数据
  data: {
    wxAuthorEmail: "",
    verifyCode: "",
    verifyTap: true,
    verifyMsg: "获取验证码"
  },

  //生命周期函数--监听页面加载
  onLoad: function(options) {
    var that = this;
  },

  //生命周期函数--监听页面显示
  onReady: function() {

  },

  //生命周期函数--监听页面显示
  onShow: function() {

  },

  //生命周期函数--监听页面隐藏
  onHide: function() {

  },

  //生命周期函数--监听页面卸载
  onUnload: function() {

  },
  //页面上拉触底事件的处理函数
  onReachBottom: function() {

  },

  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function() {

  },

  authorEmail: function(e) {
    var that = this;
    var mail = e.detail.value;
    that.setData({
      wxAuthorEmail: mail
    });
    if (verify.verifyMail(mail)) {
      that.setData({
        verifyTap: false
      });
    } else {
      that.setData({
        verifyTap: true
      });
    }
  },

  verifyCode: function(e) {
    var that = this;
    that.setData({
      verifyCode: e.detail.value
    });
  },

  getVerifyCode: function() {
    var that = this;
    var url = "/author/sendVerifyCode";
    var data = {
      wxAuthorEmail: that.data.wxAuthorEmail
    };
    http.noTokenRequest(url, "GET", data).then(function(result) {
      var msg = result.data;
      wx.showModal({
        title: "提示",
        content: msg,
        showCancel: false
      });
      that.setData({
        verifyTap: true
      });
      time.count_down(that, 60 * 1000);
      if (msg !== "验证码发送成功") {
        that.setData({
          verifyMsg: "获取验证码",
          verifyTap: false
        });
        time.clearTimer();
      }
    });
  },

  registerAuthor: function() {
    var that = this;
    if (that.checkData()) {
      wx.getUserInfo({
        success: function(result) {
          var url = "/author/registerAuthor";
          var data = {
            wxAuthorEmail: that.data.wxAuthorEmail,
            verifyCode: that.data.verifyCode,
            encryptedData: result.encryptedData,
            iv: result.iv,
            sessionKey: app.globalData.sessionKey
          };
          http.noTokenRequest(url, "POST", data).then(function(result) {
            var msg = result.data;
            if (msg === "注册成功") {
              wx.redirectTo({
                url: "/pages/index/index",
              });
            } else {
              wx.showModal({
                title: "提示",
                content: msg,
                showCancel: false
              });
            }
          });
        }
      });
    }
  },

  checkData: function() {
    var that = this;
    if (!verify.verifyMail(that.data.wxAuthorEmail)) {
      wx.showToast({
        title: "邮箱有误",
        image: "/images/error.png"
      })
      return false;
    }
    if (that.data.verifyCode.length !== 6) {
      wx.showToast({
        title: "验证码有误",
        image: "/images/error.png"
      })
      return false;
    }
    return true;
  }

})