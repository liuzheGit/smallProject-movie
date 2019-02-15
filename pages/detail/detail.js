// pages/detail/detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieData: {},
    actionText: '展开',
    showAll: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.movieId
    var url = app.globalData.doubanBase + app.globalData.resourceURL + movieId
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    wx.request({
      url,
      header: { 'content-type': 'json' },
      success: res => {
        var movie = res.data
        var country = res.data.countries.join(' / ')
        var infoDes = res.data.year + ' / ' + res.data.genres.join(' / ')
        this.setData({
          movieData: res.data,
          country,
          infoDes
        })
      },
      fail: err => console.log(err),
      complete() {
        wx.hideToast()
      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  foldContent() {
    if (this.data.showAll == false) {
      this.setData({
        actionText: '收起',
        showAll: true
      })
    } else {
      this.setData({
        actionText: '展开',
        showAll: false
      })
    }
  },
  wantToSee () {
    wx.showModal({
      title: '现在就购票去看吧'
    })
  },
  haveSeen () {
    wx.showModal({
      title: '来评分吧'
    })
  },
  previewImage (e) {
    wx.previewImage({
      urls: [e.target.dataset.src],
    })
  },
  movetoActor(e) {
    var actorId = e.currentTarget.dataset.actorId
    wx.navigateTo({
      url: '../actor/actor?actorId=' + actorId,
    })
  }
})