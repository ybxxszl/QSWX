//utils/httpUtil.js
//异步请求

const app = getApp();

var API_URL = "http://127.0.0.1:8181/qs/api/wechat";
var token = app.globalData.token;

function request(url, method, data) {
  console.log("url:" + url);
  console.log("method:" + method);
  console.log("data:" + data);
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  return new Promise(function(resolve, reject) { // 异步
    wx.request({
      url: API_URL + url,
      method: method,
      data: data,
      header: {
        'H-token': token
      },
      success(result) {
        console.log("statusCode:" + result.statusCode);
        wx.hideLoading();
        if (result.statusCode === 200) {
          resolve(result);
          return;
        } else {
          wx.showModal({
            title: '您的网络不太好呀！！！',
            content: result.data.message,
            showCancel: false
          });
          return;
        }
      },
      fail(error) {
        wx.hideLoading();
        reject(error);
      }
    });
  });
}

function noTokenRequest(url, method, data) {
  console.log("url:" + url);
  console.log("method:" + method);
  console.log("data:" + data);
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  return new Promise(function(resolve, reject) { // 异步
    wx.request({
      url: API_URL + url,
      method: method,
      data: data,
      success(result) {
        console.log("statusCode:" + result.statusCode);
        wx.hideLoading();
        if (result.statusCode === 200) {
          resolve(result);
          return;
        } else {
          wx.showModal({
            title: '您的网络不太好呀！！！',
            content: result.data.message,
            showCancel: false
          });
          return;
        }
      },
      fail(error) {
        wx.hideLoading();
        reject(error);
      }
    });
  });
}

module.exports = {
  request: request,
  noTokenRequest: noTokenRequest
}