/**
 * 公用倒计时
 */
var timer = null;
/*清除倒计时*/
function clearTimer() {
  clearTimeout(timer);
}

/*毫秒级倒计时*/
function count_down(that, total_micro_second) {
  if (total_micro_second <= 0) {
    that.setData({
      verifyMsg: "重新发送",
      verifyTap: false
    });
    // timeout则跳出递归
    return;
  }

  // 渲染倒计时时钟
  that.setData({
    verifyMsg: date_format(total_micro_second) + " 秒"
  });

  timer = setTimeout(function() {
    // 放在最后--
    total_micro_second -= 10;
    count_down(that, total_micro_second);
  }, 10)
}

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60)); // equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));

  return sec;
}

// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}

module.exports.count_down = count_down
module.exports.clearTimer = clearTimer