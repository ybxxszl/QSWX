//获取到小程序实例
const app = getApp();

var http = require("../../utils/httpUtil.js");

Page({

  //页面的初始数据
  data: {
    wxAuthorEmail: "",
    wxAuthorNickName: "",
    wxAuthorSex: "",
    wxAuthorCountry: "",
    wxAuthorProvince: "",
    wxAuthorCity: "",
    wxAuthorAvatarUrl: "",
    needRegister: false
  },

  //生命周期函数--监听页面加载
  onLoad: function(options) {
    var that = this;
    that.loginAuthor();
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

  loginAuthor: function() {
    var that = this;
    wx.login({
      success: function(result) {
        console.log(result);
        var url = "/author/loginAuthor";
        var data = {
          code: result.code
        };
        http.noTokenRequest(url, "GET", data).then(function(result) {
          var data = result.data;
          app.globalData.sessionKey = data.sessionKey;
          if (JSON.stringify(data.wxAuthor) == "{}") { // 判断JSON对象为空
            that.setData({
              needRegister: true
            });
          } else {
            app.globalData.wxAuthorEmail = data.wxAuthor.wxAuthorEmail;
            app.globalData.wxAuthorNickName = data.wxAuthor.wxAuthorNickName;
            app.globalData.wxAuthorSex = data.wxAuthor.wxAuthorSex;
            app.globalData.wxAuthorCountry = data.wxAuthor.wxAuthorCountry;
            app.globalData.wxAuthorProvince = data.wxAuthor.wxAuthorProvince;
            app.globalData.wxAuthorCity = data.wxAuthor.wxAuthorCity;
            app.globalData.wxAuthorAvatarUrl = data.wxAuthor.wxAuthorAvatarUrl;
            app.globalData.token = data.token;
            that.setData({
              wxAuthorEmail: app.globalData.wxAuthorEmail,
              wxAuthorNickName: app.globalData.wxAuthorNickName,
              wxAuthorSex: app.globalData.wxAuthorSex,
              wxAuthorCountry: app.globalData.wxAuthorCountry,
              wxAuthorProvince: app.globalData.wxAuthorProvince,
              wxAuthorCity: app.globalData.wxAuthorCity,
              wxAuthorAvatarUrl: app.globalData.wxAuthorAvatarUrl
            });
          }
        });
      }
    })
  },

  register: function() {
    var that = this;
    wx.redirectTo({
      url: "/pages/author/register/register"
    });
  }

})