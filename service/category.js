// 分类界面数据
import request from './network.js'
export function getCategory() {
    return request({
        url: '/categories'
    })
}