import axios from 'axios';

export default class Api {
  endpoint = 'http://localhost:3000';

  constructor(route = '/mealplans') {
    this.endpoint = this.endpoint + route;
  }

  async get(path = '') {
    const response = await axios.get(this.endpoint + path, {withCredentials:true});
    return response.data;
  }

  async post(path = '', data) {
    const response = await axios.post(this.endpoint + path, data, {withCredentials:true});
    return response.data;
  }

  async put(path = '', data) {
    return axios.put(this.endpoint + path, data, {withCredentials:true})
      .then(() => { return true; })
      .catch((err) => { console.log(err); return false; });
  }

  async delete(path = '') {
    const response = await axios.delete(this.endpoint + path, {withCredentials:true});
    return response.data;
  }
}