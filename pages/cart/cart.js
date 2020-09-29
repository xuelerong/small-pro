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
         //  全选
         check: false,
         //  总价格
         totleprices: 0,
         // 总数量
         totlenumber: 0

     },
     //  点击添加收获地址
     cartuser() {
         wx.chooseAddress({
             success: (result) => {
                 const message = result;
                 console.log(message);
                 //  将收货地址添加到缓存中
                 wx.setStorageSync("message", message)

             }
         });

         //  获取权限状态
         //  wx.getSetting({
         //      success: (result) => {
         //          //获取权限状态
         //          const address = result.authSetting["scope.address"]
         //          if (address === true || address === undefined) {
         //              wx.chooseAddress({
         //                  success: (result1) => {
         //                      console.log(result1)
         //                  }
         //              });
         //          } else {
         //              wx.openSetting({
         //                  success: (result2) => {
         //                      wx.chooseAddress({
         //                          success: (result3) => {
         //                              console.log(result3)
         //                          }
         //                      });
         //                      console.log(result2)
         //                  }
         //              });

         //          }
         //      }
         //  });


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
             //  全选按钮如果都为true那么返回true 激活全选按钮
         let check = cartuser.length ? cartuser.every(i => i.check) : false
         let totleprices = 0;
         let totlenumber = 0;
         cartuser.forEach(i => {
             if (i.check) {
                 totleprices += i.num * i.goods_price;
                 totlenumber += i.num
             }
         });
         this.setData({
             house,
             cartuser,
             check,
             totleprices,
             totlenumber
         })

     },
     //  点击按钮减少商品
     plus(e) {

         //  商品总价格
         let totleprices = 0;
         //  商品总数量
         let totlenumber = 0;
         //  获取当前商品的ID
         const goodsId = e.currentTarget.dataset.id;
         //  获取购物车商品缓存
         let goodsmes = wx.getStorageSync("messagetext").data || [];
         //  判断查找当前的商品ID 和缓存中的商品ID 找到并返回索引。
         let index = goodsmes.findIndex(i => i.goods_id === goodsId)
             //   获取DATA 中的商品数据
         let cartuser = this.data.cartuser
             // 如果商品数量为1 在次点击的时候提示用户是否删除此商品
         if (cartuser[index].num == 1) {
             let thi = this
             wx.showModal({
                 title: '提示',
                 content: '是否删除此商品',
                 success(res) {
                     if (res.confirm) {
                         cartuser.splice(cartuser[index], 1)
                         totleprices = 0;
                         totlenumber = 0
                         thi.setData({ cartuser, totleprices, totlenumber })
                             //  将重新修改好的值赋予到缓存中
                         wx.setStorageSync("messagetext", { data: cartuser })
                     } else if (res.cancel) {
                         console.log('用户点击取消')
                     }
                 }
             })
         } else {
             //   当前data 中对应的的商品 数量减一
             cartuser[index].num--;
         }

         cartuser.forEach(i => {
             if (i.check) {
                 totleprices += i.num * i.goods_price;
                 totlenumber += i.num
             }
         });

         //  在将缓存值重新赋予给data中
         this.setData({
                 cartuser,
                 totleprices,
                 totlenumber
             })
             //  将重新修改好的值赋予到缓存中
         wx.setStorageSync("messagetext", { data: cartuser })
     },

     //  点击按钮增加商品
     reduce(e) {
         //  获取当前商品的ID
         const goodsId = e.currentTarget.dataset.id;
         //  获取购物车商品缓存
         let goodsmes = wx.getStorageSync("messagetext").data || [];
         //  判断查找当前的商品ID 和缓存中的商品ID 找到并返回索引。
         let index = goodsmes.findIndex(i => i.goods_id === goodsId)
             //   获取DATA 中的商品数据
         let cartuser = this.data.cartuser
             //   当前data 中对应的的商品 数量减一
         cartuser[index].num++;
         //  商品总价格
         let totleprices = 0;
         //  商品总数量
         let totlenumber = 0;
         cartuser.forEach(i => {
             if (i.check) {
                 totleprices += i.num * i.goods_price;
                 totlenumber += i.num
             }
         });
         //  在将缓存值重新赋予给data中
         this.setData({
                 cartuser,
                 totleprices,
                 totlenumber
             })
             //  将重新修改好的值赋予到缓存中
         wx.setStorageSync("messagetext", { data: cartuser })
     },

     //  点击取消/选中商品
     ischeck(e) {
         //  获取当前商品的ID
         const goodsId = e.currentTarget.dataset.id;
         //  获取购物车商品缓存
         let goodsmes = wx.getStorageSync("messagetext").data || [];
         //  判断查找当前的商品ID 和缓存中的商品ID 找到并返回索引。
         let index = goodsmes.findIndex(i => i.goods_id === goodsId)
             //   获取DATA 中的商品数据
         let cartuser = this.data.cartuser
             //   当前data 中对应的的商品 的check trul/false
         cartuser[index].check = !cartuser[index].check;
         //  商品总价格
         let totleprices = 0;
         //  商品总数量
         let totlenumber = 0;
         cartuser.forEach(i => {
             if (i.check) {
                 totleprices += i.num * i.goods_price;
                 totlenumber += i.num
             }
         });
         let check = cartuser.length ? cartuser.every(i => i.check) : false
             //  在将缓存值重新赋予给data中
         this.setData({
                 cartuser,
                 totleprices,
                 totlenumber,
                 check
             })
             //  将重新修改好的值赋予到缓存中
         wx.setStorageSync("messagetext", { data: cartuser })
     },

     //  当点击全选按钮所有商品都取消选中/选中 
     alonecheck() {
         //  //  商品总价格
         let totleprices = 0;
         //  //  商品总数量
         let totlenumber = 0;
         //  选中按钮取反
         let check = !this.data.check
             //  //   获取DATA 中的商品数据
         let cartuser = this.data.cartuser
         cartuser.forEach(i => {
                 if (check) {
                     i.check = true;
                     totleprices += i.num * i.goods_price;
                     totlenumber += i.num

                 } else {
                     i.check = false
                     totleprices = 0;
                     totlenumber = 0;
                 }
             })
             //  在将修改后的值重新赋予给data中
         this.setData({
                 check,
                 cartuser,
                 totleprices,
                 totlenumber
             })
             //  将重新修改好的值赋予到缓存中
         wx.setStorageSync("messagetext", { data: cartuser })
     },

     //  点击跳转到支付页面
     userpay() {

         const house = this.data.house;
         const totlenumber = this.data.totlenumber
         if (!house.userName) {
             wx.showToast({
                 title: '请添加收获地址',
                 icon: 'none',
                 mask: true,
             });
             return;
         }
         if (totlenumber === 0) {
             wx.showToast({
                 title: '请添加购物商品',
                 icon: 'none',
                 mask: true,
             });
             return;
         }
         //  上面两个判断都通过执行跳转到支付页面
         wx.navigateTo({
             url: '/pages/pay/pay',
         })
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