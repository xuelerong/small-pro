// pages/goods_list/goods_list.js

import { getgoodlist } from '../../service/goodslist.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tarbar: [{
                id: 0,
                value: '综合',
                isactive: true
            },
            {
                id: 1,
                value: '销量',
                isactive: false
            },
            {
                id: 2,
                value: '价格',
                isactive: false
            }
        ],
        // 获取到的数据
        goods: []
    },
    // 列表数据
    gooodList: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10
    },
    // 总页数
    pagenumber: 1,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        this.gooodList.cid = options.cid
        console.log(this.gooodList.cid)
        this.getgoodlist()
    },
    handtabtrigger(e) {
        // 获取选项卡索引
        const { index } = e.detail;
        let tab = this.data.tarbar;
        // 修改原数组
        tab.forEach((v, i) => {
            i === index ? v.isactive = true : v.isactive = false;
        });
        // 赋值给data中
        this.setData({
            tarbar: tab
        })

    },

    // 获取数据
    getgoodlist() {
        getgoodlist(this.gooodList).then(res => {
                console.log(res)
                let goods = res.data.message.goods;
                // 获取总条数
                const total = res.data.message.total;
                // 向上取整获  总条数初一每页条数  获取总页数
                this.pagenumber = Math.ceil(total / this.gooodList.pagesize)
                console.log(this.pagenumber)
                this.setData({
                    // 每次加载更多数据，要把新数据结构储存到老数据中，而不是清空老数据
                    goods: [...this.data.goods, ...goods]
                })
            })
            // 数据请求成功关闭下来请求数据的窗口
        wx.stopPullDownRefresh();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        // 判断如果当前页数小于总页数，上拉加载跟多数据，反之提示用户没有更多商品了！
        if (this.pagenumber > this.gooodList.pagenum) {
            this.getgoodlist()
            this.gooodList.pagenum++;
            console.log('加载成功')
        } else {
            wx: wx.showToast({
                title: '没有更多商品',
                icon: 'none',
                duration: 1500,
            });
        }

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        // 重置数组
        this.setData({
                goods: []
            })
            // 重置页码
        this.gooodList.pagenum = 1;
        // 发送请求
        this.getgoodlist()
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})