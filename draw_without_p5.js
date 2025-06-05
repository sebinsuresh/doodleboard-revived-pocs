const State = {
  HOVERING: 0,
  DRAWING_PENCIL: 1,
  DRAWING_RECTANGLE: 2,
};

class DoodleManager {
  #container;
  #canvas;
  #ctx;
  #drawing;
  #currColorIndex = 0;
  #cellSide;
  #mouseX = 0;
  #mouseY = 0;
  #pmouseX = 0;
  #pmouseY = 0;
  #state = State.HOVERING;
  #mouseIsPressed = false;
  #rectStartX;
  #rectStartY;

  /**
   * @param {string} containerId
   * @param {string} initialDrawing
   */
  constructor(containerId, initialDrawing) {
    this.#container = /** @type {HTMLDivElement} */ (document.getElementById(containerId));

    this.#canvas = document.createElement('canvas');
    this.#canvas.width = this.#canvas.height = 512;
    this.#container.appendChild(this.#canvas);

    this.#ctx = this.#canvas.getContext('2d');

    const paletteContainer = document.createElement('div');
    this.#container.appendChild(paletteContainer);
    for (let i = 0; i < palette.length; i++) {
      const swatch = document.createElement('button');
      this.#container.appendChild(swatch);
      swatch.addEventListener('click', () => {
        this.#currColorIndex = i;
      });

      // TODO: Move styles to CSS
      swatch.style.display = 'inline-block';
      swatch.style.width = '32px';
      swatch.style.height = '32px';
      swatch.style.backgroundColor = palette[i];
    }

    const toolContainer = document.createElement('div');
    this.#container.appendChild(toolContainer);

    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.addEventListener('click', () => {
      this.#drawing.fill('b');
    });
    toolContainer.appendChild(clearButton);

    const rectButton = document.createElement('button');
    rectButton.textContent = 'Rectangle';
    rectButton.addEventListener('click', () => {
      if (this.#mouseInsideCanvas()) {
        this.#state = State.DRAWING_RECTANGLE;
      }
    });
    toolContainer.appendChild(rectButton);

    this.#drawing = initialDrawing.split('');
    this.#cellSide = ~~(this.#canvas.width / NUM_ROWS_COLS);

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.#container.addEventListener('mousemove', (evt) => {
      this.#updateMousePosition(evt);
      this.#mouseMove();
    });

    document.addEventListener('mousedown', (evt) => {
      this.#updateMousePosition(evt);
      this.#mouseDown();
    });

    document.addEventListener('mouseup', (evt) => {
      this.#updateMousePosition(evt);
      this.#mouseUp();
    });
  }

  #updateMousePosition(evt) {
    this.#pmouseX = this.#mouseX;
    this.#pmouseY = this.#mouseY;

    this.#mouseX = evt.x - Math.round(this.#canvas.getBoundingClientRect().left);
    this.#mouseY = evt.y - Math.round(this.#canvas.getBoundingClientRect().top);

    // TODO: verify this works on old iOS & normal devices
    this.#mouseIsPressed = !!(evt.buttons || evt.which);
  }

  startDraw() {
    this.#draw();
    requestAnimationFrame(this.startDraw.bind(this));
  }

  #draw() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#renderDrawing();
    this.#drawCursor();
  }

  #renderDrawing() {
    this.#ctx.strokeStyle = null;
    for (let i = 0; i < this.#drawing.length; i++) {
      const row = ~~(i % NUM_ROWS_COLS);
      const col = ~~(i / NUM_ROWS_COLS);
      this.#ctx.fillStyle = palette[parseInt(this.#drawing[i], 16)];
      this.#ctx.fillRect(row * this.#cellSide, col * this.#cellSide, this.#cellSide, this.#cellSide);
    }
  }

  #drawCursor() {
    if (!this.#mouseInsideCanvas()) {
      return;
    }

    this.#ctx.fillStyle = palette[this.#currColorIndex];
    this.#ctx.strokeStyle = '#333';

    const [x, y] = this.#getCanvasCells(this.#mouseX, this.#mouseY);
    this.#ctx.fillRect(this.#cellSide * x, this.#cellSide * y, this.#cellSide, this.#cellSide);
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  #getCanvasCells(x, y) {
    return [~~(x / this.#cellSide), ~~(y / this.#cellSide)];
  }

  #mouseDown() {
    if (!this.#mouseInsideCanvas()) {
      return;
    }

    if (this.#state === State.DRAWING_RECTANGLE) {
      [this.#rectStartX, this.#rectStartY] = this.#getCanvasCells(this.#mouseX, this.#mouseY);
      return;
    } else if (this.#state === State.HOVERING) {
      this.#state = State.DRAWING_PENCIL;

      const [x, y] = this.#getCanvasCells(this.#mouseX, this.#mouseY);
      this.#drawPixel(x, y);
    }
  }

  #mouseUp() {
    if (this.#mouseInsideCanvas()) {
      const [x, y] = this.#getCanvasCells(this.#mouseX, this.#mouseY);
      if (this.#state === State.DRAWING_RECTANGLE) {
        this.#drawRectangle(this.#rectStartX, this.#rectStartY, x, y);
      } else if (this.#state === State.DRAWING_PENCIL) {
        this.#drawPixel(x, y);
      }
    }
    // TODO: handle mouseUp on tool buttons
    this.#state = State.HOVERING;
  }

  #mouseMove() {
    if (this.#state === State.DRAWING_PENCIL) {
      const [x, y] = this.#getCanvasCells(this.#mouseX, this.#mouseY);
      const [px, py] = this.#getCanvasCells(this.#pmouseX, this.#pmouseY);
      this.#drawLine(px, py, x, y);
    }
  }

  /**
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   */
  #drawLine(x1, y1, x2, y2) {
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
        this.#drawPixel(nx, ny);
      }
    } else {
      this.#drawPixel(x1, y1);
    }
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  #drawPixel(x, y) {
    if (x < 0 || y < 0 || x >= NUM_ROWS_COLS || y >= NUM_ROWS_COLS) {
      return;
    }

    const index = y * NUM_ROWS_COLS + x;
    this.#drawing[index] = this.#currColorIndex.toString(16);
  }

  #drawRectangle(x1, y1, x2, y2) {
    if (
      x1 < 0 ||
      y1 < 0 ||
      x2 < 0 ||
      y2 < 0 ||
      x1 >= NUM_ROWS_COLS ||
      y1 >= NUM_ROWS_COLS ||
      x2 >= NUM_ROWS_COLS ||
      y2 >= NUM_ROWS_COLS
    ) {
      return;
    }

    const minX = Math.min(x1, x2);
    const minY = Math.min(y1, y2);
    const maxX = Math.max(x1, x2);
    const maxY = Math.max(y1, y2);

    for (let x = minX; x < maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        this.#drawPixel(x, y);
      }
    }
  }

  #mouseInsideCanvas() {
    return this.#pointInsideCanvas(this.#mouseX, this.#mouseY);
  }

  #pointInsideCanvas(x, y) {
    return x > 0 && y > 0 && x < this.#canvas.width && y < this.#canvas.height;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const doodleManager = new DoodleManager('container', testDrawingUncompressed);
  doodleManager.startDraw();
});
