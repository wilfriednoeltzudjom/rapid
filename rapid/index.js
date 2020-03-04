const http = require('http');

const render = require('../helpers/render');

class Router {
  constructor() {
    this.routes = [];
  }

  get(path, callback) {
    this.routes.push({
      method: 'GET',
      path,
      callback
    });
  }

  post(path, callback) {
    this.routes.push({
      method: 'POST',
      path,
      callback
    });
  }

  delete(path, callback) {
    this.routes.push({
      method: 'DELETE',
      path,
      callback
    });
  }

  head(path, callback) {
    this.routes.push({
      method: 'HEAD',
      path,
      callback
    });
  }
}

class Rapid {
  constructor() {
    this.routes = [];
  }

  use = (rootPath, router) => {
    this.routes.push({ rootPath, routes: router.routes });
  }

  loadError = async (responseCode, res) => {
    res.writeHead(responseCode, { 'Content-type': 'text/html' });
    const contents = await render(`${responseCode}`, 'errors');
    res.end(contents)
  }

  start = (port, callback) => {
    const server = http.createServer((req, res) => {
      const { url, method } = req;
      const route = this.routes.find(object => object.rootPath === url);

      if (route) {
        const subRoute = route.routes.find(object => object.method === method);
        return subRoute.callback(req, res);
      }   

      return this.loadError(404, res);
    });

    return server.listen(port, callback);
  }
}

const rapid = () => new Rapid();

module.exports = rapid;
module.exports.Router = () => new Router();