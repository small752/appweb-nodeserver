// default config
module.exports = {
  workers: 1,
  port: 8301,

  url: {
    currenturl: 'https://www.yana.site/appweb',
  },
  oauth: {
    wx: {
      appid: 'wx58c51882fdcb2dc8',
      appsecret: '464501be8dd445bba5958214f3787235',
      scope_base: 'snsapi_base',   //snsapi_base / snsapi_userinfo 
      scope_userinfo: 'snsapi_userinfo',   //snsapi_base / snsapi_userinfo 
    },
    wxmini: { //  xingkong微信小程序
      appid: 'wx1819c6e21846613a',
      appsecret: '68bfb8a88dcfec0cfac8f31ad1f97343',
    }
  },
  baidu: {
    location: {
      ak: 'zvuPbfmV5D96nPH1361ZUvPTGoABeKtQ'
    }
  }
}
