// import {get} from '../get'
import { post } from '../post'

const loginApi = '/api/accounts';
const userApi = '/api/users'

/** localhost:8888/photo/getAllPhoto
 * 获取主界面所有的图片信息
 */
export function userLoginIn(username, password) {
  console.log('login');
  const result = post(`${loginApi}/signIn`, {
    user_account : username,
    user_password : password
  });
  return result;
}

/**
 * 根据id字段请求用户信息
 * @param {*} userId
 */
export function getUserData(userId) {
  const uri = `${userApi}/getUserInfo`;
  const result = post(uri, {
    user_aid : userId
  });
  return result;
}
