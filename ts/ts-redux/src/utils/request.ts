//
// API request helper
//

import originAxios, { AxiosResponse } from 'axios';
import { message } from 'antd';


const axios = originAxios.create({
  timeout: 20000,
});
axios.interceptors.response.use(function (response: AxiosResponse) {
  if (response.data && response.data.flag === 1) {
    /*
      successful response:
      {"flag": 0, "data": ""}

      unsuccessful response:
      {"flag": 1, "msg": "server error"}
    */

    let errorMsg: string = response.data.msg;
    message.error(errorMsg);
    return Promise.reject(errorMsg);
  }
  return response.data;
}, function (error) {
  return Promise.reject(error);
})

export function get(url: string, data: any) {
  return axios({
    method: 'GET',
    url,
    params: data
  });
}

export function post(url: string, data: any) {
  return axios({
    method: 'POST',
    url,
    data
  });
}
