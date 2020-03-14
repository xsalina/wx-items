// miniprogram/pages/accredit/accredit.js
const db = wx.cloud.database(); //初始化数据库
const app = getApp()
const storageTools = app.require('/comm/locaStorage.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const userInfo = JSON.parse(storageTools.getUserInfo())
    console.log(8888, userInfo)
    if (userInfo.avatarUrl) {
      wx.navigateTo({
        url: "/pages/indexPer/indexPer",
      })
    }

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

},
bindGetUserInfo: function(res) {

  if (res.detail.userInfo) {

    //用户按了允许授权按钮

    var that = this;

    // 获取到用户的信息了，打印到控制台上看下

    console.log("用户的信息如下：");

    storageTools.saveUserInfo(res.detail.userInfo)
    //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来

    that.onGetOpenid(res.detail.userInfo)

  } else {

    //用户按了拒绝按钮

    wx.showModal({

      title: '警告',

      content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',

      showCancel: false,

      confirmText: '返回授权',

      success: function(res) {

        // 用户没有授权成功，不需要改变 isHide 的值

        if (res.confirm) {

          console.log('用户点击了“返回授权”');

        }

      }

    });

  }

},
onGetOpenid: function(userInfo) {
  wx.showLoading({
    title: '正在加载中',
  })
  // 调用云函数
  wx.cloud.callFunction({
    name: 'login',
    data: {},
    success: res1 => {
      wx.hideLoading()
      console.log('[云函数] [login] user openid: ', res1)
      app.globalData.openid = res1.result.openid
      db.collection('user').where({
        appid: res1.result.appid
      })
        .get()
        .then(res => {
          console.log('查找成功', res)
          const data = res.data;
          if(data.length){
            wx.navigateTo({
              url: "/pages/indexPer/indexPer",
            })
          }else{
            //新增用户
            db.collection('user')
              .add({
                data: {
                  appid: res1.result.appid
                }
              })
              .then(res => {
                wx.navigateTo({
                  url: "/pages/indexPer/indexPer",
                })
              })
              .catch(err => {
                console.log(err)
              })
          }
         
        })
        .catch(err => {
          console.log('查找失败')
          
          
        })
      



    },
    fail: err => {
      console.error('[云函数] [login] 调用失败', err)

    }
  })
},



})