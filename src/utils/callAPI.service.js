import axios from 'axios';
import {from} from 'seamless-immutable';
import storage from '../Screen/asyncStorage/Storage';

const callApiService = {
  get: async (url, body) => {
    // console.log(url);
    let authorization = await storage.getItem('Authorization');
    // console.log(authorization);
    return axios({
      method: 'get',
      url: url,
      data: body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + authorization,
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // Accept: 'application/json',
      },
    })
      .then(function (response) {
        // console.log(response);
        if (response) {
          return response;
        } else return null;
      })
      .catch(function (error) {
        console.log('error get : ', error);
      });
  },
  post: async (url, body) => {
    console.log('body', body);
    let authorization = await storage.getItem('Authorization');
    return axios({
      method: 'post',
      url: url,
      data: body,
      headers: {
        // 'Content-Type': body.image ? 'multipart/form-data' : 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + authorization,
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // Accept: 'application/json',
      },
    })
      .then(function (response) {
        // console.log('reaaaa post: ', response);
        if (response) {
          return response;
        } else return null;
      })
      .catch(function (error) {
        console.log('error post: ' + JSON.stringify(error));
      });
  },
  postFD: async (url, body) => {
    console.log('body', body);
    let authorization = await storage.getItem('Authorization');
    return axios({
      method: 'post',
      url: url,
      data: body,
      headers: {
        // 'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer' + authorization,
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // Accept: 'application/json',
      },
    })
      .then(function (response) {
        // console.log('reaaaa post: ', response);
        if (response) {
          return response;
        } else return null;
      })
      .catch(function (error) {
        console.log('error post: ' + JSON.stringify(error));
      });
  },
  delete: async (url, body) => {
    console.log('body', body);
    let authorization = await storage.getItem('Authorization');
    return axios({
      method: 'delete',
      url: url,
      data: body,
      headers: {
        // 'Content-Type': body.image ? 'multipart/form-data' : 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + authorization,
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // Accept: 'application/json',
      },
    })
      .then(function (response) {
        console.log('delete post: ', response);
        if (response) {
          return response;
        } else return null;
      })
      .catch(function (error) {
        console.log('error post: ' + JSON.stringify(error));
      });
  },
  put: async (url, body) => {
    console.log('body', body);
    let authorization = await storage.getItem('Authorization');
    return axios({
      method: 'put',
      url: url,
      data: body,
      headers: {
        // 'Content-Type': body.image ? 'multipart/form-data' : 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + authorization,
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // Accept: 'application/json',
      },
    })
      .then(function (response) {
        // console.log('reaaaa post: ', response);
        if (response) {
          return response;
        } else return null;
      })
      .catch(function (error) {
        console.log('error post: ' + JSON.stringify(error));
      });
  },
};

export default callApiService;
