// pages/addClassify/addClassify.js
const db = wx.cloud.database(); //初始化数据库
let istrue = true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeID: "1",
    foodName: '',
    pictues: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    istrue = true
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
  onClickIcon() {
    console.log(777)
  },
  clear() {
    this.setData({
      foodName: ''
    })

  },
  inputFoodName(e) {
    this.setData({
      foodName: e.detail
    })
  },
  upload() {
    const that = this;
    //本地相册货拍照选择图片
    wx.chooseImage({
      count: 1, //最多支持9张图片
      sizeType: ['original', 'compressed'], //源文件还是压缩
      sourceType: ['album', 'camera'], //来源 拍照 还是相册
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + '.png', //上传的云端路径
          filePath: tempFilePaths, //小程序临时文件路径
          success: res => {
            let obj = {
              fileID: res.fileID,
              typeID: that.data.typeID
            }
            //返回文件ID
            console.log(999, res.fileID)
            that.setData({ pictues:obj})

          },
          fail() {
            console.error
          }
        })
      }
    })
  },
  closeFood() {

    this.setData({
      pictues: {}
    })

  },
  changeTab(e) {
    const {
      type
    } = e.currentTarget.dataset
    this.setData({
      typeID: type
    })

  },
  save() {
    const that = this;
    const {
      pictues,
      typeID,
      foodName
    } = this.data
    
    if (istrue){
      if (!foodName) {
        wx.showToast({
          title: '请输入菜名',
          icon: "none"
        })
        return;
      }
      istrue = false
      wx.showLoading({
        title: '正在添加中',
      })
      db.collection('addClassify').add({
        data: {
          fileID: pictues.fileID,
          typeID,
          foodName
        }
      })
        .then(res => {
          wx.hideLoading()
          wx.showToast({
            title: '菜谱添加成功',
          })
          istrue = true
          that.setData({
            pictues: {},
            foodName: '',

          })
        })
        .catch(err => {
          istrue = true
          console.log(err)
        })


    }
   
    //存储到数据库
    
  }
})