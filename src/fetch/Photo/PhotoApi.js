// import {get} from '../get'
import { post } from '../post'

const photoApi = '/api/photo'

export function getPhotoByUserId(userid) {
    const result = post(`${photoApi}/getUserPhoto`, {
        user_aid : userid
    });
    return result;
}


/**
 * 更新用户信息
 * @param {*} pid
 * @param {*} pname
 * @param {*} pdesc
 * @param {*} plabel
 */
export function updatePhotoData(pid, pname, pdesc, plabel) {
    const uri = `${photoApi}/updatePhotoData`;
    const result = post(uri, {
        pid: pid,
        p_name: pname,
        p_desc: pdesc,
        p_label: plabel
    });
    return result;
}