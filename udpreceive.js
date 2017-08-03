const dgram = require('dgram')
const fs = require('fs')
const path = require('path')
const child_process = require('child_process')
const s = dgram.createSocket('udp4')

const blockLength = 4096
const byteDepth = 2
const udpPort = 8005
const frequency = '100.3'
const method = process.argv.length >= 2 ? 'file' : 'pifm'

if (method !== 'pifm' && method !== 'file') {
  console.error(`usage :\nnode ${__filename} [filename]\n\nif filename is provided, writes sound to file instead of pifm`)
  process.exit(1)
}

// ---------- Networking ---------- //
let totalBytes = 0
let handleBuffer

s.bind(udpPort)
s.on('listening', function() {console.log('socket listening')})
s.on('error', function(err) {console.log('socket error', err)})

s.on('message', function(buf) {
  if (buf.length === blockLength) {
    buf = buf.slice(1, -1)
    totalBytes += buf.length
    handleBuffer(buf)
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(totalBytes + ' bytes written')
  }
})

// ---------- writing raw PCM to PiFM ---------- //
if (method === 'pifm') {
  console.log('starting pifm ...')
  const pifm = child_process.spawn(path.join(__dirname, 'pifm'), ['-', frequency])
  pifm.on('error', function(err) { console.log('pifm error', err) })
  pifm.on('close', function() { console.log('pifm closed') })

  handleBuffer = function(buf) {
    pifm.stdin.write(buf)
  }
}

// ---------- writing raw PCM to file ---------- //
else if (method === 'file') {
  const filename = process.argv[2]
  console.log(`writing raw sound to file ${filename}`)

  const readFloat = function(buf, offset) {
    return buf.readInt16LE(offset) / Math.pow(2, byteDepth * 8 - 1)
  }

  handleBuffer = function(buf) {
    _all = Buffer.concat([_all, buf])
    if (_all.length > 351256) {
      fs.writeFile(filename, _all, function(err) {
        if (err) throw err
        process.exit(0)
      })
    }
  }
  let _all = new Buffer('')
}
