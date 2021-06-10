import request from '../utils/request'

export function get_problems(data) {
    return request({
        url: 'problems?page_size' + Number.MAX_SAFE_INTEGER,
        method: 'get',
        data: data
    })
}