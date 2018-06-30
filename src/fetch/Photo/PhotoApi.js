// import {get} from '../get'
import { post } from '../post'

const photoApi = '/api/photo'

export function getPhotoByUserId(userid) {
    const result = post(`${photoApi}/getUserPhoto`, {
        user_aid : userid
    });
    return result;
}