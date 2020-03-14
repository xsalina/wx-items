const app = getApp()
const appUserDetail = "appUserDetail_4"; //保存用户信息

/**
 * 保存用户数据
 */
export function saveUserInfo(data) {
  //console.log('缓存数据', data)
  wx.setStorageSync(appUserDetail, JSON.stringify(data))
  // wx.setStorageSync({
  //    key: 'appUserDetail',
  //    data: data
  // }) 
}

/**
 * 获取用户数据
 */
export function getUserInfo(callback) {
  let data = wx.getStorageSync(appUserDetail) || "{}"
     return data;
    
  


}