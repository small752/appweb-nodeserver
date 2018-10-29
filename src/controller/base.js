

module.exports = class extends think.Controller {
  __before() {

  }

  async _postJson(url, data) {

    const headers = { 
      'Content-Type': 'application/json' , 
      referer : this.ctx.request.header.referer || undefined 
    };

    console.info('_postJson', url, data, JSON.stringify(data));
    const resBody = await this.fetch(url, 
      { 
        method: 'POST', 
        headers,
        body: JSON.stringify(data),
        dataType: 'json',
      }
    ).then(res => res.json());

    return resBody;
  }

};
