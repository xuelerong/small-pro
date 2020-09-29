 /*pages/cart/cart.js*/
 // 获取收获地址流程  
 //  1绑定单击事件  
 // 2调用小程序内置的API获取用户收获地址wx.chooseAddress
 // 3获取 用户对小程序 所授权的收获地址 权限状态scope     获取权限状态 wx.getSetting
 // （1）假设用户点击获取用户收获地址提示框的确定按钮，authSetting scope.address scope的值就为true
 // （2）假设用户从来没有调用过收获地址的api，scope 值为undefined，也是直接调用获取收获地址
 // (3）假设用户点击了收获提示框的取消按钮 scope的值为false
 // (3.1) 诱导用户自己打开授权页面  wx.openSetting  当用户重新给收获地址权限时 
 // (3.2）获取收获地址

 Page({

     /**
      * 页面的初始数据
      */
     data: {
         //  地址缓存数据
         house: {},
         //  购物车商品缓存
         cartuser: {},
         //  总价格
         totleprices: 0,
         // 总数量
         totlenumber: 0

     },

     /**
      * 生命周期函数--监听页面显示
      */
     // 讲缓存的地址保存到data中
     onShow: function() {
         //  获取地址的缓存
         let house = wx.getStorageSync("message")
             //  获取购物车商品的缓存
         let cartuser = wx.getStorageSync("messagetext").data || []
             // 过滤 check 为 true 的商品
         let decartuser = cartuser.filter(i => i.check)
         let totleprices = 0;
         let totlenumber = 0;
         decartuser.forEach(i => {
             if (i.check) {
                 totleprices += i.num * i.goods_price;
                 totlenumber += i.num
             }
         });
         this.setData({
             house,
             cartuser: decartuser,
             totleprices,
             totlenumber
         })

     },
     //      点击支付
     hahah() {
         wx.showToast({
             title: '支付宝:15556923243',
             icon: 'none',
             duration: 5000,
             mask: true
         });

     },
     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function(options) {

     },

     /**
      * 生命周期函数--监听页面初次渲染完成
      */
     onReady: function() {

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