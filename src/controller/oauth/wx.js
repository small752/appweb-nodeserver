const Base = require('../base.js');

/**
 * 微信授权相关页面
 */
module.exports = class extends Base {

  testAction() {
    let openid = this.ctx.post('openid');

    console.info('openid', openid);

    if(openid == undefined || openid == ''){
      let oauthConfig = this.config('oauth');
      let scope = oauthConfig.wx.scope_userinfo;

      let urlConfig = this.config('url');

      let oauthRedirectUrl = urlConfig.currenturl + '/oauth/wx/index?scope=' + scope + '&rd=' + encodeURIComponent(this.ctx.href);
      this.ctx.status = 302;
      this.ctx.redirect(oauthRedirectUrl);
    } else {
      this.assign('openid', openid);
      return this.display('index_index');
    }
    
  }

  async indexAction() {
    let code = this.get('code');
    let scope = this.get('scope');
    let rd = this.get('rd');

    console.info('oauthindex', code, scope, rd);

    let oauthConfig = this.config('oauth');
    let urlConfig = this.config('url');

    if(code == undefined || code == '') {
      
      let appid = oauthConfig.wx.appid;
      scope = scope || oauthConfig.wx.scope_base;
      
      let rdUrl = urlConfig.currenturl + '/oauth/wx/index?scope=' + scope + '&rd=' + encodeURIComponent(rd);
      let wxOuthRedirectUrl = urlConfig.currenturl + '/oauth/wx/apply?appid=' + appid + '&scope=' + scope + '&rd=' + encodeURIComponent(rdUrl);
      this.ctx.status = 302;
      this.ctx.redirect(wxOuthRedirectUrl);
    } else {
      
      //根据code获取access_token
      let codeTokenRes = await this._postJson('https://api.weixin.qq.com/sns/oauth2/access_token', {
        appid: oauthConfig.wx.appid,
        secret: oauthConfig.wx.appsecret,
        code,
        grant_type: 'authorization_code',
      });

      console.info('codeTokenRes', codeTokenRes);

      //根据openid缓存微信授权信息
      let wxOauthCacheKey = 'wxoauth_' + codeTokenRes.openid;
      await this.cache(wxOauthCacheKey, {
        openid: codeTokenRes.openid,
        scope: codeTokenRes.scope,
        refresh_token: codeTokenRes.refresh_token,
        expires_in: codeTokenRes.expires_in,
        access_token: codeTokenRes.access_token,
        create_time: new Date().getTime(),
      });

      console.info('wxOauthCacheKey', wxOauthCacheKey);
      
      this.ctx.type = 'text/html; charset=utf-8';
      this.body = '\
      <html>\
        <head>\
        </head>\
        <body onload=\"document.getElementById(\'autoForm\').submit();\">\
          <form id=\"autoForm\" method=\"post\" action=\"'+rd+'\" >\
            <input type="hidden" name="openid" value="' + codeTokenRes.openid + '" /> \
          </form>\
        </body>\
      </html>\
      ';
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
