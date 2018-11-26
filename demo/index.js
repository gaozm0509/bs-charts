import bsCharts from '../bs-charts.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let ctx = wx.createCanvasContext('canvasQr', this)
    let xNumArray = [1, 2, 3, 4, 5, 6]
    let yNumArray = [23, 4, 55, 64, 6,10]
    bsCharts({
      context: ctx,
      xNumArray: xNumArray,
      yNumArray: yNumArray,
      // isShowY:false,
      isYRight:true,
      paddingRight:40,
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
    // rq.api.draw('we','canvasQr',200,200)
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