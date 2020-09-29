import request from './network.js';

export function getgoodlist(param) {
    return request({
        url: "/goods/search/",
        data: param

    })
}