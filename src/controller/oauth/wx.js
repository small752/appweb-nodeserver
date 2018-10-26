const Base = require('../base.js');

/**
 * 微信授权相关页面
 */
module.exports = class extends Base {
  indexAction() {
    let code = this.get('code');

    console.info('code', code);

    if(code == undefined || code == ''){
      let oauthConfig = this.config('oauth');

      let urlConfig = this.config('url');

      console.info('oauthConfig', oauthConfig);

      let appid = oauthConfig.wx.appid;

      let currentUrl = urlConfig.currenturl + '/oauth/wx/index';

      console.info(encodeURIComponent(currentUrl));
      
      let wxOuthRedirectUrl = urlConfig.currenturl + '/oauth/wx/apply?appid=' + appid + '&scope=snsapi_base&rd=' + encodeURIComponent(currentUrl);
      this.ctx.status = 302;
      this.ctx.redirect(wxOuthRedirectUrl);
    } else {
      return this.display('index_index');
    }
    
  }

  async applyAction() {
    let rdurl = this.get('rd');
    let scope = this.get('scope');
    let appid = this.get('appid');

    let wxOuthRedirectUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid 
                          + '&redirect_uri=' + encodeURIComponent(rdurl)
                          + '&response_type=code&scope=' + scope 
                          + '&state=STATE#wechat_redirect';

    console.info('wxOuthRedirectUrl', wxOuthRedirectUrl);
    this.ctx.status = 302;
    this.ctx.redirect(wxOuthRedirectUrl);
  }
};
