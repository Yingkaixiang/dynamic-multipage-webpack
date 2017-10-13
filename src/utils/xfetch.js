import axios from 'axios';
import config from '../config/';

/**
 * 请求信息格式
 *
 * @param {object} req 请求参数
 * @param {object} res 返回参数
 * @param {number} ms  请求耗时
 */
const createInfo = (req, res, ms) => `
  ******************** request api start ********************
  ${req.method} ${req.baseURL}${req.url} ${ms}ms
  request params: ${JSON.stringify(req.params)}
  request data: ${JSON.stringify(req.data)}
  request body: ${JSON.stringify(res.data)}
  ******************** request api end ********************
`;

/**
 * api请求
 * @param {string} url     请求地址
 * @param {string} method  请求方法
 * @param {string} baseURL 默认域名地址
 * @param {object} params  请求参数（GET）
 * @param {object} data    请求参数（非GET）
 */
export default async ({
  url, method, baseURL, params, data,
}) => {
  const start = Date.now();
  const conf = {
    url,
    method,
    baseURL: baseURL || config.appApiHost,
  };
  const selfConf = {};
  if (method.toUpperCase() === 'GET' || params) {
    selfConf.params = params;
  } else {
    selfConf.headers['Content-Type'] = 'application/json';
    selfConf.data = JSON.stringify(data);
  }
  const req = Object.assign(conf, selfConf);
  const res = await axios(req);
  const end = Date.now();
  console.log(createInfo(req, res, (end - start)));
  return res;
};
