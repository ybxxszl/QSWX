//pages/index.js

//获取到小程序实例
const app = getApp();

var http = require("../../utils/httpUtil.js");

Page({

  //页面的初始数据
  data: {
    needRegister: false,
    authorId: null,
    authorAccount: null,
    authorName: null,
    authorSex: null,
    authorBirthday: null,
    authorPhone: null,
    authorEmail: null,
    authorPhoto: null,
    token: null,
    sessionKey: null
  },

  //生命周期函数--监听页面加载
  onLoad: function(options) {
    var that = this;
    that.getWeChatInfo();
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

  getWeChatInfo: function() {
    var that = this;
    wx.login({
      success: function(result) {
        console.log("code:" + result.code);
        var url = "/author/getAuthor";
        var data = {
          code: result.code
        };
        http.noTokenRequest(url, "GET", data).then(function(result) {
          var data = result.data;
          if (data.author == null) {
            that.setData({
              needRegister: true
            });
          } else {
            app.globalData.authorId = data.author.authorId;
            app.globalData.authorAccount = data.author.authorAccount;
            app.globalData.authorName = data.author.authorName;
            app.globalData.authorSex = data.author.authorSex;
            app.globalData.authorBirthday = data.author.authorBirthday;
            app.globalData.authorPhone = data.author.authorPhone;
            app.globalData.authorEmail = data.author.authorEmail;
            app.globalData.authorPhoto = data.author.authorPhoto;
            app.globalData.token = data.token;
            app.globalData.sessionKey = data.sessionKey;

            that.setData({
              authorId: app.globalData.authorId,
              authorAccount: app.globalData.authorAccount,
              authorName: app.globalData.authorName,
              authorSex: app.globalData.authorSex,
              authorBirthday: app.globalData.authorBirthday,
              authorPhone: app.globalData.authorPhone,
              authorEmail: app.globalData.authorEmail,
              authorPhoto: app.globalData.authorPhoto,
              token: app.globalData.token,
              sessionKey: app.globalData.sessionKey
            });
          }
        }).catch(function(error) {
          wx.showToast({
            title: '您的网络不太好呀！！！',
            image: '../../images/error.png'
          })
        });
      }
    })
  }

})