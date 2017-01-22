const {
  CLIENT_REQUEST_CHANNEL,
  SERVER_RESPONSE_CHANNEL
} = require('./constants')

function setup (socket) {
  if (socket.listeners(CLIENT_REQUEST_CHANNEL) > 0) {
    return
  }

  socket.on(CLIENT_REQUEST_CHANNEL, request =>
    socket.emit(SERVER_RESPONSE_CHANNEL, { serverTime: Date.now(), clientTime: request.clientTime })
  )
}

module.exports = {
  setup
}
