const Base = require('../base.js');

/**
 * 百度相关api
 */
module.exports = class extends Base {

  async locationAction() {

    let latitude = this.get('latitude');
    let longitude = this.get('longitude');

    let baiduConfig = this.config('baidu');
    let baiduLocationConfig = baiduConfig && baiduConfig.location;
    let baiduLocationAk = baiduLocationConfig && baiduLocationConfig.ak;

    let locationUrl = 'https://api.map.baidu.com/geocoder/v2/?ak=' + baiduLocationAk + '&location=' + latitude + ',' + longitude + '&output=json';
    let locationResult = await this._postJson(locationUrl, {});

    let res = {
      errorCode: 5000,
      errorMessage: '定位信息获取失败',
    }
    if(locationResult && locationResult.status == '0'){

      let locationRes = locationResult.result || {};
      let locationResDetail = locationRes.addressComponent || {};

      res.errorCode = 9000;
      res.errorMessage = "定位定向获取成功";
      res.data = {
        location: locationRes.location,
        format_address: locationRes.formatted_address,
        sematic_description: locationRes.sematic_description,
        cityCode: locationRes.cityCode,
        ...locationResDetail,
      }
    } else {
      console.info('百度定位API结果', locationResult)
    }
    this.body = res;
  }
};
