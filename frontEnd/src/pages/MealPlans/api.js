import axios from 'axios';

export default class Api {
  endpoint = 'http://localhost:3000';

  constructor(route = '/mealplans') {
    this.endpoint = this.endpoint + route;
  }

  async get(path = '') {
    const response = await axios.get(this.endpoint + path);
    return response.data;
  }

  async post(path = '', data) {
    const response = await axios.post(this.endpoint + path, data);
    return response.data;
  }

  async put(path = '', data) {
    const response = await axios.put(this.endpoint + path, data);
    return response.data;
  }

  async delete(path = '') {
    const response = await axios.delete(this.endpoint + path);
    return response.data;
  }
}