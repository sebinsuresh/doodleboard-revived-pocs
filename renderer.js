class Renderer {
  #drawing;
  #width;
  #height;
  #ctx;
  #paletteMgr;

  /** @type {HTMLCanvasElement} */
  #drawingBufferCanvas;
  /** @type {CanvasRenderingContext2D} */
  #drawingBufferCtx;
  /** @type {HTMLCanvasElement} */
  #previewBufferCanvas;
  /** @type {CanvasRenderingContext2D} */
  #previewBufferCtx;

  #drawingChanged = true;
  #previewClearedThisFrame = false;

  /**
   * @param {string[]} initialDrawing
   * @param {HTMLCanvasElement} canvas
   * @param {CanvasRenderingContext2D} ctx
   * @param {PaletteManager} paletteManager
   */
  constructor(initialDrawing, canvas, ctx, paletteManager) {
    this.#drawing = initialDrawing;
    this.#width = canvas.width;
    this.#height = canvas.height;
    this.#ctx = ctx;
    this.#paletteMgr = paletteManager;

    // integer scaled pixels
    this.#ctx.imageSmoothingEnabled = false;

    this.#createBuffers();
  }

  #createBuffers() {
    this.#drawingBufferCanvas = document.createElement('canvas');
    this.#drawingBufferCanvas.width = NUM_ROWS_COLS;
    this.#drawingBufferCanvas.height = NUM_ROWS_COLS;
    this.#drawingBufferCtx = this.#drawingBufferCanvas.getContext('2d');

    this.#previewBufferCanvas = document.createElement('canvas');
    this.#previewBufferCanvas.width = NUM_ROWS_COLS;
    this.#previewBufferCanvas.height = NUM_ROWS_COLS;
    this.#previewBufferCtx = this.#previewBufferCanvas.getContext('2d');

    this.#updateDrawingBuffer();
  }

  #updateDrawingBuffer() {
    this.#drawingBufferCtx.strokeStyle = null;
    for (let i = 0; i < this.#drawing.length; i++) {
      const row = ~~(i % NUM_ROWS_COLS);
      const col = ~~(i / NUM_ROWS_COLS);
      this.#drawingBufferCtx.fillStyle = this.#paletteMgr.getColorFromDrawingChar(this.#drawing[i]);
      this.#drawingBufferCtx.fillRect(row, col, 1, 1);
    }
  }

  #clearPreviewIfNot() {
    if (this.#previewClearedThisFrame) return;

    this.#previewBufferCtx.clearRect(0, 0, NUM_ROWS_COLS, NUM_ROWS_COLS);
    this.#previewClearedThisFrame = true;
  }

  draw() {
    if (this.#drawingChanged) {
      this.#updateDrawingBuffer();
    }
    this.#ctx.drawImage(this.#drawingBufferCanvas, 0, 0, this.#width, this.#height);

    // TODO: draw preview - cursor, tool preview
    this.#ctx.drawImage(this.#previewBufferCanvas, 0, 0, this.#width, this.#height);

    this.#drawingChanged = false;
    this.#previewClearedThisFrame = false;
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  drawPixel(x, y) {
    if (x < 0 || y < 0 || x >= NUM_ROWS_COLS || y >= NUM_ROWS_COLS) {
      return;
    }
    const index = y * NUM_ROWS_COLS + x;
    this.#drawing[index] = this.#paletteMgr.getCurrentColorIndexHex();

    this.#drawingChanged = true;
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  previewPixel(x, y) {
    this.#clearPreviewIfNot();
    this.#previewBufferCtx.fillStyle = this.#paletteMgr.getCurrentColor();
    this.#previewBufferCtx.fillRect(x, y, 1, 1);
  }

  /**
   * @param {number} x1
   * @param {number} y1
   * @param {number} x3
   * @param {number} y3
   */
  drawRectangle(x1, y1, x3, y3) {
    if (
      x1 < 0 ||
      y1 < 0 ||
      x3 < 0 ||
      y3 < 0 ||
      x1 >= NUM_ROWS_COLS ||
      y1 >= NUM_ROWS_COLS ||
      x3 >= NUM_ROWS_COLS ||
      y3 >= NUM_ROWS_COLS
    ) {
      return;
    }

    const minX = Math.min(x1, x3);
    const minY = Math.min(y1, y3);
    const maxX = Math.max(x1, x3);
    const maxY = Math.max(y1, y3);

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        this.drawPixel(x, y);
      }
    }

    this.#drawingChanged = true;
  }

  /**
   * @param {number} x1
   * @param {number} y1
   * @param {number} x3
   * @param {number} y3
   */
  previewRectangle(x1, y1, x3, y3) {
    this.#clearPreviewIfNot();
    this.#previewBufferCtx.fillStyle = this.#paletteMgr.getCurrentColor();
    this.#previewBufferCtx.fillRect(
      Math.min(x1, x3),
      Math.min(y1, y3),
      1 + Math.abs(x3 - x1),
      1 + Math.abs(y3 - y1),
    );
  }

  /**
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   */
  drawLine(x1, y1, x2, y2) {
    let nDivs = 0;
    let xDiff = Math.abs(x1 - x2);
    let yDiff = Math.abs(y1 - y2);
    let xSep = 1;
    let ySep = 1;

    if (xDiff > yDiff) {
      nDivs = xDiff;
      ySep = yDiff / nDivs;
    } else {
      nDivs = yDiff;
      xSep = xDiff / nDivs;
    }

    if (x1 > x2) {
      xSep *= -1;
    }
    if (y1 > y2) {
      ySep *= -1;
    }

    if (nDivs > 0) {
      for (let i = 0; i <= nDivs; i++) {
        let nx = ~~(x1 + i * xSep);
        let ny = ~~(y1 + i * ySep);
        this.drawPixel(nx, ny);
      }
    } else {
      this.drawPixel(x1, y1);
    }

    this.#drawingChanged = true;
  }

  /**
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   */
  previewLine(x1, y1, x2, y2) {
    this.#clearPreviewIfNot();
    throw new Error('Method not implemented.');
  }

  clearDraw() {
    this.#drawing.fill('b');
    this.#drawingChanged = true;
  }
}
