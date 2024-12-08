// index.js
// 获取应用实例
const homeStore = require('../../stores/home-store')

Page({
  data: homeStore.data,

  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad() {
    homeStore.bind(this)
  },

  getUserProfile() {
    homeStore.getUserProfile()
  },

  decrement() {
    homeStore.decrement()
  },

  increment() {
    homeStore.increment()
  },

  gotoOtherPage() {
    wx.navigateTo({
      url: '../other/other'
    })
  },

  gotoGamePage() {
    wx.navigateTo({
      url: '../game/game'
    })
  },
})
