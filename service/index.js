// 首页数据
import request from './network.js'
// 请求首页轮播图数据
export function getindexSwiper() {
    return request({
        url: "/home/swiperdata"
    })
}
// 导航菜单数据
export function getindexRecommed() {
    return request({
        url: '/home/catitems',
    })
}
// 楼层数据
export function getindexFloor() {
    return request({
        url: '/home/floordata',
    })
}