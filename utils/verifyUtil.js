//utils/verifyUtil.js
//验证

/**
 * 验证邮箱
 */
function verifyMail(mail) {
  var mailRegExp = new RegExp('^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$');
  return mailRegExp.test(mail);
}

module.exports = {
  verifyMail: verifyMail
}