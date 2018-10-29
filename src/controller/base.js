import FormData from 'form-data';

module.exports = class extends think.Controller {
  __before() {

  }

  async _postJson(url, data) {

    let headers = {};

    let params = new FormData();
		Object.keys(data).forEach(function(k) {
			params.append(k, data[k]);
		});

    console.info('_postJson', url, data);
    const resBody = await this.fetch(url, 
      { 
        method: 'POST', 
        headers,
        body: params,
      }
    ).then(res => res.json());

    return resBody;
  }

};
