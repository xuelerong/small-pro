import request from './network.js'

export function getGoodsdetail(param) {
    return request({
        url: "/goods/detail/",
        data: param
    })
}


// export default function(options) {
//     return new Promise((resolve, reject) => {
//         wx.request({
//             url: bastURL + options.url,
//             method: options.method || "GET",
//             data: options.data || {},
//             success: resolve,
//             fail: reject
//         })
//     })
// }