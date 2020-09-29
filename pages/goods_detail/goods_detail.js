// pages/goods_detail/goods_detail.js
import { getGoodsdetail } from '../../service/goodsdetail.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detailMes: {}
    },
    goods_id: {
        goods_id: 0
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.goods_id.goods_id = options.goods_id;
        console.log(this.goods_id)
        this.getGoodsdetail()

    },
    //     网络请求
    getGoodsdetail() {
        getGoodsdetail(this.goods_id).then(res => {
            const detailMes = res.data.message;
            this.setData({
                detailMes
            })
        })
    },
    // 点击轮播图图片放大预览
    handTabImg(e) {
        const urls = this.data.detailMes.pics.map(v => v.pics_mid)
        const current = e.currentTarget.dataset.url;
        console.log(current)
        console.log(e)
        wx.previewImage({
            current, // 当前显示图片的http链接
            urls // 需要预览的图片http链接列表
        })
    },

    // 点击加入购物车
    catemessage() {
        //获取缓存中的数据
        let cast = wx.getStorageSync("messagetext").data || [];
        // 获取当前商品ID
        let cadindex = this.data.detailMes.goods_id
            // 获取当前商品数据
        let detailpxixi = this.data.detailMes
            //判断商品的ID有没有和缓存的ID匹配的
        let index = cast.findIndex(i => i.goods_id === cadindex)
        if (index === -1) { // 不存相同ID商品
            detailpxixi.num = 1;
            detailpxixi.check = true;
            cast.push(detailpxixi)
        } else {
            // 有存在ID相同的商品那么数量加一 
            cast[index].num++;
        }
        // 将购物车重新添加到缓存中
        wx.setStorageSync("messagetext", { time: Date.now(), data: cast })
        wx.showToast({
            title: '添加商品成功',
            icon: 'success',
            // true 时等默认时间过后才可以添加商品
            mask: true,
        });
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