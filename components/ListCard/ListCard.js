// components/ListCard/ListCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    // time: this.item.duration
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigateToView(e) {
      console.log(e)
      wx.navigateTo({
        url: '/pages/view/view?id=' + e.currentTarget.dataset.postid,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    },
    // durationTime(time) {
    //   if (this.listInfo !== null) {
    //     return [parseInt((time / 60) % 60), parseInt(time % 60)]
    //       .join("′")
    //       .replace(/\b(\d)\b/g, "0$1");
    //   } else {
    //     return 0;
    //   }
    // },
  }
})