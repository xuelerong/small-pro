//Page Object
import { getindexSwiper, getindexRecommed, getindexFloor } from '../../service/index.js'
Page({
    data: {
        // 轮播图
        swiper: [],
        // 导航菜单
        recommed: [],
        // 楼层数据
        floor: []
    },
    //options(Object)
    onLoad: function(options) {
        this.getindexSwiper()
        this.getindexRecommed()
        this.getindexFloor()
    },
    // 网络请求函数
    // 轮播图
    getindexSwiper() {
        getindexSwiper().then(res => {
            const swiper = res.data.message
            this.setData({
                swiper
            })
        })
    },
    // 导航菜单
    getindexRecommed() {
        getindexRecommed().then(res => {
            const recommed = res.data.message
            this.setData({
                recommed
            })
        })
    },
    // 楼层数据
    getindexFloor() {
        getindexFloor().then(res => {
            console.log(res)
            const floor = res.data.message
            this.setData({
                floor
            })
            console.log(floor)
        })
    },



    onReady: function() {

    },
    onShow: function() {

    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    },
    onPageScroll: function() {

    },
    //item(index,pagePath,text)
    onTabItemTap: function(item) {

    }
});