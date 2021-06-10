import request from '../utils/request'

export function get_my_forums() {
    return request({
        url: 'user',
        method: 'get',
    })
}

export function get_forums(params) {
    return request({
        url: 'forums',
        method: 'get',
        params: params
    })
}