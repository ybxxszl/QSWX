//获取到小程序实例
const app = getApp();

var http = require("../../utils/httpUtil.js");

Page({

  //页面的初始数据
  data: {
    designTempletList: []
  },

  //生命周期函数--监听页面加载
  onLoad: function(options) {
    var that = this;
    that.getDesignTempletList();
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

  getDesignTempletList: function() {
    var that = this;
    var url = "/designTemplet/getDesignTempletList";
    http.request(url, "GET", null).then(function(result) {
      var data = result.data;
      console.log(data);
    });
  }

})