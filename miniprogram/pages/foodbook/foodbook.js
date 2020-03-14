// miniprogram/pages/foodbook/foodbook.js
const app =getApp();
const db = wx.cloud.database(); //初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: '炒菜',
    isCloseDish:false,//炒菜
    isCloseSoup:false,//汤
    isCloseFruit:false,//水果
    isCloseWheaten:false,//面食
    foods:{
      dish: [],//炒菜
      soup:[],//汤
      wheaten:[],//面食
      fruit:[]//水果

    },
    typeID:"1",
    obj :{
      fileID: '',
      _id: '',
      foodName: ''
    },
    peopleNumber:false,
    columns:[1,2],
    howManypeople:1,
    jumpArr:[]
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
    this.getFile("1")

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
  onClickChangeTab(e) {
    let query = e.currentTarget.dataset.index;
    this.setData({ activeTab: query })
    let typeID
    switch(query){
      case '炒菜':
        this.data.typeID = "1"
        break;
      case '汤':
        this.data.typeID = "2"
      break;
      case '面食':
        this.data.typeID = "3"
        break;
      case '水果':
        this.data.typeID = "4"
        break;
    }
    this.getFile(this.data.typeID)
  },
  longTap: function (e) {
    const { type } = e.currentTarget.dataset;
    this.setData({ [type]: true})
  },
  closeFood(e){
    const that = this;
    const { id, type } = e.currentTarget.dataset;
    console.log(that.data.foods.dish)
    //  删除菜谱
    db.collection('addClassify').doc(id)
        .remove()
        .then(res => {
          console.log('删除成功', res)
          that.setData({[type]:false})
          that.getFile(that.data.typeID)
        })
        .catch(err => {
          console.log('删除失败', err)
        })
    


  },
  jumpOrder(){
    wx:wx.navigateTo({
      url: "/pages/addClassify/addClassify",
     
    })
  },
  //查找菜谱
  //文件展示
  getFile(typeID) {
    const that = this;
    wx.showLoading({
      title: '正在加载中',
    })
    db.collection('addClassify').where({
      _openid: app.globalData.openid,
      typeID: that.data.typeID
    })
      .get()
      .then(res2 => {
        wx.hideLoading()
        // dish: [],//炒菜
        //   soup: [],//汤
        //     wheaten: [],//面食
        //       fruit: []//水果
        console.log()
        switch(typeID){
          case "1":
            that.data.foods.dish = res2.data;
            this.addChildren(that.data.foods,"dish")
          break;
          case "2":
            that.data.foods.soup = res2.data;
            this.addChildren(that.data.foods, "soup")
            break;
          case "3":
            that.data.foods.wheaten = res2.data;
            this.addChildren(that.data.foods, "wheaten")
            break;
          case "4":
            that.data.foods.fruit = res2.data;
            this.addChildren(that.data.foods, "fruit")
            break;
        }
        that.setData({ foods:that.data.foods})
      })
      .catch(err2 => {
        wx.hideLoading()
        console.log(444, err2)
      })
  },
  addChildren(obj,type){
    if (obj[type].length == 1){
      obj[type].push(this.data.obj, this.data.obj)
    } else if (obj[type].length == 2){
      obj[type].push(this.data.obj)
    }else {
      if (obj[type].length % 3 == 1){
        obj[type].push(this.data.obj, this.data.obj)
      } else if (obj[type].length % 3 == 2)
        obj[type].push(this.data.obj)
    }
   
  },
  onConfirmPeople(event) {
    const { picker, value, index } = event.detail;
    
    const { typeID, foods, howManypeople, jumpArr} = this.data;
    let arr = []
   
    let obj ={
      people: value,
      typeID,
      arr: jumpArr
    }
    
    wx.navigateTo({
      url: '/pages/randommenu/randommenu?data=' + JSON.stringify(obj),
    })
    this.setData({ howManypeople: value })
    this.onCancelPeople()
  },
  onCancelPeople() {
    const { typeID, foods, howManypeople, jumpArr } = this.data;
    let arr = []
    
    let obj = {
      people: howManypeople,
      typeID,
      arr: jumpArr
    }
    
    wx.navigateTo({
      url: '/pages/randommenu/randommenu?data=' + JSON.stringify(obj)})
    this.setData({ peopleNumber: false })
  },

  cancelled(){
    const { typeID} = this.data
    switch (typeID) {
      case "1":
        this.data.jumpArr = this.data.foods.dish
        break;
      case "2":
        this.data.jumpArr = this.data.foods.soup

        break;
      case "3":
        this.data.jumpArr = this.data.foods.wheaten

        break;
      case "4":
        this.data.jumpArr = this.data.foods.fruit

        break;
    }
    this.data.jumpArr = this.data.jumpArr.filter(item => item._id)
    console.log(999, this.data.jumpArr)
    if (this.data.jumpArr.length < 2){
      wx.showToast({
        title: '至少含有两种菜品',
        icon:'none'
      })
      return
    }
   
    
    this.setData({ peopleNumber: true, jumpArr: this.data.jumpArr })
    
  }
})