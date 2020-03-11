// miniprogram/pages/home/home.js
const db = wx.cloud.database();//初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //新增用户
  addUser(){
      db.collection('user')
      .add({
        data:{
          name:'salina',
          age:18
        }
      })
      .then( res => {
        console.log('添加成功',res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  //更新用户
  updateUser(){
    db.collection('user').doc('1583913633437_0.4624225424598627_33571850')
    .update({
      data:{
        age:10
      }
    })
    .then(res => {
      console.log('更新成功',res)
    })
    .catch(err => {
      console.log(err)
    })
  },
  //查询数据
  search(){
    db.collection('user').where({
      name:"salina"
    })
    .get()
    .then(res => {
      console.log('查找成功',res)
    })
    .catch(err => {
      console.log(res)
    })
  },
  //删除成功
  delete(){
    db.collection('user').doc("1583913633437_0.4624225424598627_33571850")
    .remove()
    .then(res => {
      console.log('删除成功',res)
    })
    .catch(err => {
      console.log('删除失败',err)
    })
  }
})