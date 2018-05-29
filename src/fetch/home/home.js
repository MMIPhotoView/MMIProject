import {get} from '../get'

const api = '/api/photo';

/** localhost:8888/photo/getAllPhoto
 * 获取主界面所有的图片信息
 */
export function getAllPhoto() {
  const result = get(`${api}/getAllPhoto`);
  return result;
}
