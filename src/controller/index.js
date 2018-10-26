const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  async getCacheAction() {
    const data = await this.cache('name');
    console.info('222222222', data);
    this.body = {
      errorCode: 9000,
      data: data,
    };
  }

  async setCacheAction() {
    const data = await this.cache('name', {"name": 'tttttt'}, 'file');
    this.body = {
      errorCode: 9000,
    };
  }
};
