//获取到小程序实例
const app = getApp();

var http = require("../../utils/httpUtil.js");

Page({

  //页面的初始数据
  data: {
    designTempletList: [],
    searchContent: "",
    pageSize: 6,
    pageCurrent: 1,
    hasMoreData: true
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
    var that = this;
    that.setData({
      pageCurrent: that.data.pageCurrent + 1
    });
    that.getDesignTempletList();
  },

  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function() {

  },

  getDesignTempletList: function() {
    var that = this;
    if (that.data.hasMoreData) {
      var url = "/designTemplet/getDesignTempletList";
      var data = {
        searchContent: that.data.searchContent,
        pageSize: that.data.pageSize,
        pageCurrent: that.data.pageCurrent
      };
      http.request(url, "GET", data).then(function(result) {
        var data = result.data;
        that.setData({
          designTempletList: that.data.designTempletList.concat(data)
        });
        if (data.length < that.data.pageSize) {
          that.setData({
            hasMoreData: false
          });
        }
      });
    } else {
      wx.showToast({
        title: '没有更多的数据',
        image: '/images/error.png',
        mask: true
      });
    }
  },

  searchDesignTempletList: function(e) {
    var that = this;
    that.setData({
      designTempletList: [],
      searchContent: e.detail.value,
      pageCurrent: 1,
      hasMoreData: true
    });
    that.getDesignTempletList();
  },

  getDesignTemplet: function(e) {
    var designTempletId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/designTemplet/show/show?designTempletId=' + designTempletId
    });
  }

})