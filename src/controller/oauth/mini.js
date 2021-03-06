const Base = require('../base.js');
const crypto = require('crypto');
const path = require('path');

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

    if(codeTokenRes && codeTokenRes.openid && codeTokenRes.openid.length > 0) {
      res.errorCode = 9000;
      res.errorMessage = "微信临时授权码兑换成功";

      let hashObj = {
        appid: appid,
        openid: codeTokenRes.openid,
      }
      //  计算加密的token值
      let hashToken = crypto
        .createHmac('sha256', appsecret)
        .update(JSON.stringify(hashObj))
        .digest('hex');

      res.data = {
        openid: codeTokenRes.openid,
        session_key: codeTokenRes.session_key,
        token: hashToken,
      }
    } else {
      console.info('微信临时授权码兑换结果', codeTokenRes)
    }

    this.body = res;
  }

  /**
   * 小程序漂流瓶消息记录文件
   */
  async chatRecordFileAction() {
    const filepath = path.join(think.ROOT_PATH, 'www/static/resources/chat-record.txt');
    this.ctx.download(filepath);
  }

};
