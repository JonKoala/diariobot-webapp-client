import axios from 'axios'
import yaml from 'js-yaml'

export default new Promise((res, rej) => {
  return axios.get('./appconfig.yml')
    .then(response => {
      res(yaml.load(response.data));
    });
});
