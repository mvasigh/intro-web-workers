function createBounce(canvas) {
  const ctx = canvas.getContext('2d');
  const BALL_RADIUS = 20;

  canvas.width = BALL_RADIUS * 2;

  let x = canvas.width / 2;
  let y = canvas.height - 150;
  let v = 0;
  let a = 0.98;

  return function bounce() {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw the ball
    ctx.beginPath();
    ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = '#eee';
    ctx.fill();

    // update the position
    y += v;
    v += a;
    if (y > canvas.height - BALL_RADIUS && v > 0) {
      v *= -0.95;
    }

    requestAnimationFrame(bounce);
  };
}

export default createBounce;
