const bastURL = "https://api-hmugo-web.itheima.net/api/public/v1";
export default function(options) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: bastURL + options.url,
            method: options.method || "GET",
            data: options.data || {},
            success: resolve,
            fail: reject
        })
    })
}