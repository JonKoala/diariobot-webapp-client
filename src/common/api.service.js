import appconfig from '~/appconfig.yml'

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

// define if the configurations are coming from appconfig or from env variables
const apiUrl = process.env['DIARIOBOT_API_URL'] || appconfig['url']['api'];

function formatUrl(url) {
  return url.startsWith('/') ? url.slice(1) : url;
}

export default {
  get(service, config) {
    service = formatUrl(service);
    return Vue.axios.get(`${apiUrl}/${service}`, config)
      .then(response => {
        return response.data;
      }).catch(err => {
        throw new Error(`ApiService error: ${err}`);
      });
  },
  post(service, data) {
    service = formatUrl(service);
    return Vue.axios.post(`${apiUrl}/${service}`, data);
  },
  delete(service, config) {
    service = formatUrl(service);
    return Vue.axios.delete(`${apiUrl}/${service}`, config);
  }
};
