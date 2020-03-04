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

  start = (port) => {
    const server = http.createServer((req, res) => {
      const { url, method } = req;
      const route = this.routes.find(object => object.rootPath === url);

      if (route) {
        const subRoute = route.routes.find(object => object.method === method);
        return subRoute.callback(req, res);
      }   

      res.writeHead(404, { 'Content-type': 'text/html' });
      res.end(render('404', 'errors'))
    });

    return new Promise((resolve, reject) => {
      resolve(server.listen(port));
    })
  }
}

const rapid = () => new Rapid();

module.exports = rapid;
module.exports.Router = () => new Router();