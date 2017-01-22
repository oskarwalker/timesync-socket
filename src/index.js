import {
  CLIENT_REQUEST_CHANNEL,
  SERVER_RESPONSE_CHANNEL
} from '../constants'

function onServerResponse (response) {
  const diff = Date.now() - response.serverTime + ((Date.now() - response.clientTime) / 2)
  this.offsets.push(diff)
  if (this.offsets.length > 5) {
    this.offsets.shift()
  }
}

const setFiniteInterval = (func, interval, times) => new Promise((resolve, reject) =>
  new function () {
    this.iteration = 0
    this._func = () => func() || ++this.iteration === times ? clearInterval(this.handle) || resolve() : undefined
    this.handle = setInterval(this._func, interval)
  }()
)

class TSS {
  constructor () {
    this.offsets = []
    this.socket = undefined
  }

  setup (socket, options = { interval: 1000, idleInterval: 5000 }) {
    this.socket = socket
    this.socket.on(SERVER_RESPONSE_CHANNEL, onServerResponse.bind(this))

    // Request time immediately
    setTimeout(() => this.requestTime(), 0)

    // Run initial sync, then at idle interval time
    setFiniteInterval(() => this.requestTime(), options.interval, 5)
    .then(() => setInterval(() => this.requestTime(), options.idleInterval))
  }

  offset () {
    const total = this.offsets.reduce((prev, next) => prev + next, 0)
    return this.offsets.length > 1 ? total / this.offsets.length : total
  }

  requestTime () {
    this.socket.emit(CLIENT_REQUEST_CHANNEL, { clientTime: Date.now() })
  }
}

export default new TSS()
