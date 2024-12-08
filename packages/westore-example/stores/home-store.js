import Counter from '../models/counter'
import User  from '../models/user'
import { Store }  from 'westore'

class HomeStore extends Store {
  constructor() {
    super()
    this.data = {
      count: 0,
      motto: 'Hello World',
      userInfo: null
    }
    this.counter = new Counter()
    this.user = new User({
      onUserInfoLoaded: () => {
        this.syncUserModel()
      }
    })
    this.syncCountModel()
  }

  syncCountModel () {
    this.data.count = this.counter.count
    this.update()
  }

  syncUserModel () {
    this.data.motto = this.user.motto
    this.data.userInfo = this.user.userInfo
    this.update()
  }

  increment() {
    this.counter.increment()
    this.syncCountModel()
  }

  decrement() {
    this.counter.decrement()
    this.syncCountModel()
  }

  getUserProfile() {
    this.user.getUserProfile()
  }
}

module.exports = new HomeStore