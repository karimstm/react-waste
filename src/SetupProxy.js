const proxy = require('http-proxy-middleware');

const URL = 'http://wastetoresources-env.5aqp9mu79y.eu-west-3.elasticbeanstalk.com';

module.exports = function(app) {
    app.use(proxy('/api', { target: URL }));
  };