// https://github.com/mdn/voice-change-o-matic/blob/gh-pages/scripts/app.js
let requestFrameId

export const visualize = (canvas, canvasCtx, analyser) => {
  const WIDTH = canvas.width
  const HEIGHT = canvas.height
  const bufferLength = 2048

  analyser.minDecibels = -90
  analyser.maxDecibels = -10
  analyser.smoothingTimeConstant = 0.85

  const dataArray = new Uint8Array(bufferLength)
  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT)

  function draw() {
    requestFrameId = requestAnimationFrame(draw)

    analyser.getByteTimeDomainData(dataArray)

    canvasCtx.fillStyle = 'rgb(200, 200, 200)'
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

    canvasCtx.lineWidth = 2
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)'

    canvasCtx.beginPath()

    var sliceWidth = WIDTH * 1.0 / bufferLength
    var x = 0

    for(var i = 0; i < bufferLength; i++) {

      var v = dataArray[i] / 128.0
      var y = v * HEIGHT/2

      if(i === 0) {
        canvasCtx.moveTo(x, y)
      } else {
        canvasCtx.lineTo(x, y)
      }

      x += sliceWidth
    }

    canvasCtx.lineTo(canvas.width, canvas.height/2)
    canvasCtx.stroke()
  }

  draw()

}

export const stopVisualization = () => {
  cancelAnimationFrame(requestFrameId)
  requestFrameId = null
}