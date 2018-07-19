import axios from 'axios';
import Vue from 'vue';
import { baseUrl } from '../env';
import errorMessage from './errorMessage';

const vm = new Vue();

const axiosConfig = {
  baseURL: baseUrl,
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
  },
  timeout: 5000,
  withCredentials: false,
  responseType: 'json',
};

function getOptions(initialOptions) {
  const options = Object.assign({}, axiosConfig, initialOptions);
  options.headers.CRS_TOKEN = localStorage.getItem('crs-admin-info') ? JSON.parse(localStorage.getItem('crs-admin-info')).token : '';
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data;
    delete options.data;
  }

  return options;
}

function $axios(initialOptions) {
  const options = getOptions(initialOptions);

  axios.interceptors.response.use(
    (response) => {
      const data = response.data;
      // 根据返回的code值来做不同的处理
      switch (data.code) {
        case '':
          break;
        default:
      }

      if (data.success && response.config.method !== 'get') {
        vm.$message.success('操作成功');
      }

      // status为200，如果出现业务错误，统一在这里提示
      if (!data.success) {
        const errorMsg = response.config.method === 'get' ? '获取数据失败：' : '操作失败：';
        vm.$message.error(errorMsg);
        throw new Error(`业务错误：${errorMsg}`);
      }
      // 这里只能返回response，不然会有预料不到的错误
      return response;
    }, (error) => {
      let message = '';
      // error.response 是一个对象保存着错误信息
      if (error && error.response && errorMessage[error.response.status]) {
        message = errorMessage[error.response.status];
      } else {
        message = error.message;
      }

      vm.$message.error(`请求异常：${message}`);
      return Promise.reject(error);
    });

  return axios(options).then(response => response.data);
}

export default function (url, data, method) {
  return $axios({ url, data, method });
}
