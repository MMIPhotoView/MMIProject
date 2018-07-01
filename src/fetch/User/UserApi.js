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

/**
 * 根据id获取用户的关注列表
 * @param {用户id} userId
 */
export function getUserFollowList(userId){
  const uri = `${userApi}/getFollowList`;
  const result = post(uri, {
    user_aid : userId
  });
  return result;
}

/**
 * 根据id获取用户的粉丝列表
 * @param {用户id} userId
 */
export function getUserFansList(userId){
  const uri = `${userApi}/getBeFollowList`;
  const result = post(uri, {
    user_aid : userId
  });
  return result;
}

/**
 * 关注某人
 * @param {关注发起者} fromid
 * @param {被关注者} toid
 */
export function follow(fromid, toid) {
  const uri = `${userApi}/doFollow`;
  const result = post(uri, {
    fromAid : fromid,
    toAid : toid
  });
  return result;
}
/**
 * 关注某人
 * @param {关注发起者} fromid
 * @param {被关注者} toid
 */
export function unFollow(fromid, toid) {
  const uri = `${userApi}/doFollow`;
  const result = post(uri, {
    fromAid : fromid,
    toAid : toid
  });
  return result;
}