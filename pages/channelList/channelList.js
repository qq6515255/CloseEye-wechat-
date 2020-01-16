// pages/channelList/channelList.js
const ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadList: [],
    loading: false,
    page: 1,
    listid:null,
  },
  getListInfo(id, p) {

    let page = 1;
    if (p !== undefined) {
      page = p;
    }
    this.setData({
      loading:true
    })
    ajax('https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/getPostInCate', {
      p: page,
      size: 10,
      cateid: id
    }).then((res) => {
      if (res.data.msg =='OK'){
        let num=this.data.page+1;
        let list = this.data.loadList;
        list.push(res.data.data);
        this.setData({
          page: num,
          loadList:list,
          loading:false,
          listid: id
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('cateid', (data) => {
      this.getListInfo(data.data);
    })
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
    this.getListInfo(this.data.listid,this.data.page);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})