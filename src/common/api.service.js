import getConfig from './appconfig'

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

function formatUrl(url) {
  return url.startsWith('/') ? url.slice(1) : url;
}

export default {
  get(service) {
    service = formatUrl(service);
    return getConfig.then(config => {
      return Vue.axios.get(`${config['url']['api']}/${service}`)
        .then(response => {
          return response.data;
        })
        .catch(err => {
          throw new Error(`ApiService error: ${err}`);
        });
    });
  },
  post(service, data) {
    service = formatUrl(service);
    return getConfig.then(config => {
      return Vue.axios.post(`${config['url']['api']}/${service}`, data)
        .then(() => {
          console.log('ok');
        })
    });
  }
};
