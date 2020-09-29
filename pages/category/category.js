// pages/category/category.
import { getCategory } from '../../service/category.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        categoryLeft: [],
        categoryRight: [],
        //     左边的点击选中
        currenIndex: 0,
        // 右侧滚动条位置
        scrollTop: 0
    },
    categoryMessage: [],


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getCategory()
    },
    // 数据请求
    getCategory() {
        getCategory().then(res => {
            this.categoryMessage = res.data.message
            console.log(this.categoryMessage)
                //     左侧的菜单数据
            let categoryLeft = this.categoryMessage.map(v => v.cat_name)
                //     右侧栏数据
            let categoryRight = this.categoryMessage[0].children
            this.setData({
                categoryLeft,
                categoryRight
            })
            console.log(categoryRight)
        })
    },
    // 点击左边 按钮 显示对应的右侧商品
    handTab(e) {
        const currenIndex = e.currentTarget.dataset.index;
        let categoryRight = this.categoryMessage[currenIndex].children
        this.setData({
            currenIndex,
            categoryRight,
            scrollTop: 0
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})