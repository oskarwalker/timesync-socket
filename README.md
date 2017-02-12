# Timesync via Socket.IO

## Installation
```
yarn install timesync-socket
```

## Client
```javascript
import tss from 'timesync-socket/client'

const socket = io.connect()
tss.setup(socket, {
  interval: 1000,
  idleInterval: 5000,
  onOffset: offset => console.log // Listen for change
})

// or get offset whenever
const offset = tts.offset()
```

## Server
```javascript
const tss = require('timesync-socket')

io.sockets.on('connection', socket => tss.setup(socket))
```

### License

(The MIT License)

Copyright (c) 2017 Oskar Walker &lt;oskar.walker@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
