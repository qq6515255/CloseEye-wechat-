// pages/list/list.js
const ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultList:null,
    loadList:[],
    nextUrl:'',
    loading:false,
    page:1
  },
  getSearch(key) {
    let that=this;
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
          let list = that.data.loadList;
          list.push(res.data.data.result);
          
          this.setData({
            resultList: res.data.data,
            loadList: list,
            nextUrl: list[0].next_page_url_full,
            page: that.page++
          });

        }
      },
      fail: (rse) => {},
      complete: (res) => {}
    })
  },
  getaddLoadList(){
    this.setData({
      loading: true,
    })
    if (this.nextUrl!==null){
      ajax(this.data.nextUrl).then(res => {
        if (res.data.data !== undefined){
          let list=this.data.loadList;
          list.push(res.data.data.result);
          this.setData({
            loadList: list,
            nextUrl: res.data.data.result.next_page_url_full,
            loading: false,
          })
        }
        
      })
    }
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('keywords', (data)=> {
      this.getSearch(data.data);
    })
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
    console.log('url', this.data.nextUrl);
    this.getaddLoadList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})