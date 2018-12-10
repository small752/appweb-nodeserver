const Base = require('../base.js');

/**
 * 星空小程序相关授权接口
 */
module.exports = class extends Base {

  /**
   * 根据临时码code获取openid
   */
  async autoCodeAction() {
    let code = this.get('code');
    let oauthConfig = this.config('oauth');
    let miniConfig = oauthConfig && oauthConfig.wxmini;

    let appid = miniConfig && miniConfig.appid;
    let appsecret = miniConfig && miniConfig.appsecret;

    //根据code获取access_token
    let codeTokenRes = await this._postJson('https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + appsecret + '&js_code=' + code + '&grant_type=authorization_code');

    let res = {
      errorCode: 5000,
      errorMessage: '微信临时授权码兑换失败',
    }

    if(codeTokenRes && codeTokenRes.errcode == 0) {
      res.errorCode = 9000;
      res.errorMessage = "微信临时授权码兑换成功";
      res.data = {
        openid: codeTokenRes.openid,
        session_key: codeTokenRes.session_key,
        unionid: codeTokenRes.unionid,
      }
    } else {
      console.info('微信临时授权码兑换结果', codeTokenRes)
    }

    this.body = res;
  }

};
