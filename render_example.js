document.addEventListener('DOMContentLoaded', () => {
  const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('doodle'));
  const ctx = canvas.getContext('2d');

  // bg
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // cells
  const cellSide = ~~(canvas.width / NUM_ROWS_COLS);
  renderUncompressed(ctx, cellSide);
});

function renderUncompressed(ctx, cellSide) {
  ctx.strokeStyle = null;
  for (let i = 0; i < testDrawingUncompressed.length; i++) {
    const row = ~~(i % NUM_ROWS_COLS);
    const col = ~~(i / NUM_ROWS_COLS);
    ctx.fillStyle = palette[parseInt(testDrawingUncompressed[i], 16)];
    ctx.fillRect(row * cellSide, col * cellSide, cellSide, cellSide);
  }
}
