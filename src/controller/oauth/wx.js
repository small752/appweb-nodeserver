const Base = require('../base.js');

/**
 * 微信授权相关页面
 */
module.exports = class extends Base {

  testAction() {
    let openid = this.get('openid');

    console.info('openid', openid);

    if(openid == undefined || openid == ''){
      let oauthConfig = this.config('oauth');
      let scope = oauthConfig.wx.scope_userinfo;

      let urlConfig = this.config('url');

      let oauthRedirectUrl = urlConfig.currenturl + '/oauth/wx/index?scope=' + scope + '&rd=' + encodeURIComponent(this.ctx.href);
      this.ctx.status = 302;
      this.ctx.redirect(oauthRedirectUrl);
    } else {
      return this.display('index_index');
    }
    
  }

  indexAction() {
    let code = this.get('code');
    let scope = this.get('scope');
    let rd = this.get('rd');

    console.info('oauthindex', code, scope, rd);

    if(code == undefined || code == '') {
      let oauthConfig = this.config('oauth');

      let urlConfig = this.config('url');

      let appid = oauthConfig.wx.appid;
      scope = scope || oauthConfig.wx.scope_base;
      
      let wxOuthRedirectUrl = urlConfig.currenturl + '/oauth/wx/apply?appid=' + appid + '&scope=' + scope + '&rd=' + encodeURIComponent(rd);
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
