// pages/category/category.js
const ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listdata:null,
  },
  enterList(e){
    this.navigateToList(e.currentTarget.dataset.cateid);
  }, 
  navigateToList(value) {
    wx.navigateTo({
      url: '/pages/channelList/channelList',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('cateid', { data: value })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  getIndexInfo(){
    ajax('https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/cate/getList').then((res)=>{
      if (res.statusCode == 200) {
        // this.listdata = res.data.data;
        // 清除类型1的4个
        let list = res.data.data.filter(e=>{
          return e.cate_type==0;
        });
        this.setData({
          listdata: list
        })
        
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIndexInfo();
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

  }
})