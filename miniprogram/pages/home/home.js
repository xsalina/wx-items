// miniprogram/pages/home/home.js
const db = wx.cloud.database();//初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iamges:[]
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
  },
  //调用云函数
  sum(){
    wx.cloud.callFunction({
      name:'sum',
      data:{
        a:2,
        b:3
      }
    })
    .then( res => {
      console.log(res)
    })
    .catch( err => {
      console.log(err)
    })
  },
  batchDelete(){
    wx.cloud.callFunction({
      name:'batchDelete',
      data:{
        name:'salina'
      }
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  },
  upload(){
    //本地相册货拍照选择图片
    wx.chooseImage({
      count: 1,//最多支持9张图片
      sizeType: ['original', 'compressed'],//源文件还是压缩
      sourceType: ['album', 'camera'],//来源 拍照 还是相册
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        console.log(77777,tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath:new Date().getTime() + '.png',//上传的云端路径
          filePath:tempFilePaths,//小程序临时文件路径
          success:res => {
            //返回文件ID
            console.log(res)
            console.log(res.fileID)
            //存储到数据库
            db.collection('image').add({
              data:{
                fileID:res.fileID
              }
            })
            .then(res => {

              console.log(res)
            })
            .catch(err => {
              console.log(err)
            })
          },
          fail(){
            console.error
          }
        })
      }
    })
  },
  //文件展示
  getFile(){
    wx.cloud.callFunction({
      name:'login',
    })
    .then(res => {
      console.log(636,res)
      db.collection('image').where({
        _openid:res.result.openid
      })
      .get()
      .then(res2 => {
        this.setData({images:res2.data})
        console.log(77,res2)
      })
      .catch(err2 => {
        console.log(444,err2)
      })
    })
    .catch(err => {
      console.log(998,err)
    })
  },
  //下载文件
  downloadFile(e){
    console.log(e.target.dataset)
    wx.cloud.downloadFile({
      fileID:e.target.dataset.fileid,//文件ID
      success(res){
       //返回临时文件路径
       console.log(33355,res.tempFilePath)
       //保存图片到系统相册。
       wx.saveImageToPhotosAlbum({
        //  filePath:res.tempFilePath,
        success(res) { 
          wx.showToast({
            title: '保存成功',
          })
        }
      })
      },
      fail(err){

      }
    })
  }
  
})