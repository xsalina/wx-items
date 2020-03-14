// pages/randommenu/randommenu.js

let istrue = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    people:1,
    arrMenu:[],
    typeID:1,
    isCartItems:false,
    createFood:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    istrue = true;
    if(options.data){
      const data = JSON.parse(options.data)
      this.setData({ people: data.people, arrMenu: data.arr, typeID: data.typeID})
    }
    
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
  save(){
    if (istrue){
      wx.showLoading({
        title: '随机生成中～',
      })
    }
    this.createProduce()
    
  },
  // 生成商品
  createProduce(){
    this.data.createFood = [];
      const { people, arrMenu, typeID} = this.data;
    let length = arrMenu.length
    if (typeID == 1 && people == 2){
      if (arrMenu.length == 2){
        this.data.createFood = arrMenu
      }else{
        const oldArr = [...arrMenu];
        this.pushGoods(length,oldArr,true)

      }
      
      
    }else{
      this.pushGoods(length, arrMenu)
      
    }
    this.setData({ createFood: this.data.createFood})
    setTimeout(()=>{
       wx.hideLoading()
      this.setData({ isCartItems: true})
    },500)

  },
  onClickHide(){
    this.setData({ isCartItems:false})
  },
  onClose(){
    this.setData({ isCartItems: false })
  },
  pushGoods(length, oldArr, type){

    let index = Math.floor(Math.random() * length)
    this.data.createFood.push(oldArr[index])
    if(type){
      oldArr.splice(index,1)
      this.pushGoods(length - 1, oldArr)
    }
  }
})