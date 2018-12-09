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
    }
  },
  baidu: {
    location: {
      ak: 'zvuPbfmV5D96nPH1361ZUvPTGoABeKtQ'
    }
  }
}
