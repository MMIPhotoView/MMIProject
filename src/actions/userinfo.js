import * as actionTypes from '../constants/userinfo'

export function update(data) {
    return {
        type: actionTypes.USERINFO_UPDATE,
        data
    }
}

export function rm(item) {
    return {
        type: actionTypes.USERINFO_RM,
        data: item
    }
}

