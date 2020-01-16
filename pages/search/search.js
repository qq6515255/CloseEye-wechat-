// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    hotWord: null,
    historyList: null,
    inputShowed: false,
    inputVal: ""
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  onSearch(e){
    if(e!==undefined){
      console.log(e);
      this.navigateToList(e.currentTarget.dataset.words);
    }
    if (this.data.inputVal!=='' && this.data.inputVal!==null){
      this.navigateToList(this.data.inputVal);
    }
  },
  navigateToList(value) {
    wx.navigateTo({
      url: '/pages/list/list',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('keywords', {data: value})
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  getSearch(key) {
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/search',
      data: {
        kw: key
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res);
        if (res.statusCode == 200) {
          // this.hotWord = res.data.data.recommend_keywords;
          this.setData({
            hotWord: res.data.data.recommend_keywords
          });

        }
      },
      fail: (rse) => {},
      complete: (res) => {}
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSearch();
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

  }
})