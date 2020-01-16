module.exports = (url, data, method) =>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url: url,
      data:data,
      method: method || 'GET',
      dataType: 'json',
      responseType: 'text',
      success: resolve,
      fail: reject
    })
  })
}