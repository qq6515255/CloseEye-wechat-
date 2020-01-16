// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    loadList: [],
    indexData: null,
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },
  // 
  navigateToSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },


  // ajax获取数据
  getIndexData() {
    let that = this;
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/index/index',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res)
        if (res.data.status == 0) {
          let list=that.data.loadList;
          list.push(res.data.data.posts),

          this.setData({
            indexData: res.data.data,
            loadList: list,
            nextUrl: res.data.data.posts.next_page_url_full
          })
          console.log('that.loadList', list);
          wx.setStorage({
            key: 'indexData',
            data: JSON.stringify({
              time: Date.now(),
              data: res.data.data
            }),
            success: function(res) {
              console.log('indexData本地存储成功')
            },
            fail: function(res) {},
            complete: function(res) {},
          })

        }

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getaddLoadList(){
    let that = this;
    
    this.setData({
      loading:true,
    })
    
    wx.request({
      url: 'https://api.kele8.cn/agent/'+that.data.nextUrl,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res)=>{
        if (res.data.status == 0){
          let list = that.data.loadList;
          list.push(res.data.data);
          this.setData({
            loadList: list,
            nextUrl: res.data.data.next_page_url_full,
            loading:false,
          })
          
        }
      },
      fail:(res)=>{},
      complete:(res)=>{}
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(this);
    var that = this;
    wx.getStorage({
      key: 'indexData',
      success: (res) => {
        // console.log(res.data)
        var x = JSON.parse(res.data)
        // 是否过期
        if (Date.now() - x.time > 0.5 * 60 * 1000) {
          // 过期
          that.getIndexData();
          console.log('过期');
        } else {
          // 未过期
          
          let list = that.data.loadList;
          list.push(x.data.posts);
          this.setData({
            indexData: x.data,
            loadList: list,
            nextUrl: x.data.posts.next_page_url_full

          })
          console.log('未过期');
        }
      },
      fail: function(res) {
        console.log('首次打开');
        that.getIndexData();
      },
      complete: function(res) {
        console.log(res, 'res')
      },
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
    console.log('url', this.data.nextUrl);
    this.getaddLoadList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})