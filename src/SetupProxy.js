import { DEFAULT_URL} from './actions/types'
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/api/*', { target: DEFAULT_URL }));
    app.use(proxy('/api/*/*', { target: DEFAULT_URL }));
    app.use(proxy('/api/offers/*/*', { target: DEFAULT_URL }));
  };