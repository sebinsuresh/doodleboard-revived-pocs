const State = {
  HOVERING: 0,
  DRAWING_PENCIL: 1,
  DRAWING_RECTANGLE: 2,
  PICKING_FILL_START: 3,
};

class DoodleManager {
  #container;
  #canvas;
  #ctx;
  #drawing;
  #currColorIndex = 0;
  #cellSide;
  #inputX = 0;
  #inputY = 0;
  #pInputX = 0;
  #pInputY = 0;
  #mouseIsPressed = false;

  #rectStartX;
  #rectStartY;

  #state = State.HOVERING;

  /** @type {ToolManager} */
  #toolMgr;

  /** @type {() => void | undefined} */
  #previewFunc;

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

    this.#drawing = initialDrawing.split('');
    this.#cellSide = ~~(this.#canvas.width / NUM_ROWS_COLS);

    this.#createTools();
    this.#addInputListeners();
  }

  #createTools() {
    const toolContainer = document.createElement('div');
    this.#container.appendChild(toolContainer);

    this.#toolMgr = new ToolManager(toolContainer, this.#drawing);
  }

  #addInputListeners() {
    document.addEventListener('mousemove', (evt) => {
      this.#updateMousePosition(evt);
      this.#inputMove();
    });

    document.addEventListener('mousedown', (evt) => {
      this.#updateMousePosition(evt);
      this.#inputDown();
    });

    document.addEventListener('mouseup', (evt) => {
      this.#updateMousePosition(evt);
      this.#inputUp();
    });
  }

  #updateMousePosition(evt) {
    this.#pInputX = this.#inputX;
    this.#pInputY = this.#inputY;

    this.#inputX = evt.x - Math.round(this.#canvas.getBoundingClientRect().left);
    this.#inputY = evt.y - Math.round(this.#canvas.getBoundingClientRect().top);

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
    this.#drawPreview();
    this.#drawCursor();

    // TODO: Remove - DEBUG
    // console.log(Object.keys(State)[this.#state], Object.keys(Tools)[this.#toolMgr.activeToolId]);
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

  #drawPreview() {
    this.#previewFunc?.call(this);
  }

  #drawCursor() {
    if (!this.#inputInsideCanvas()) {
      return;
    }

    this.#ctx.fillStyle = palette[this.#currColorIndex];
    this.#ctx.strokeStyle = '#333';

    const [x, y] = this.#getCanvasCells(this.#inputX, this.#inputY);
    this.#ctx.fillRect(this.#cellSide * x, this.#cellSide * y, this.#cellSide, this.#cellSide);
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  #getCanvasCells(x, y) {
    return [~~(x / this.#cellSide), ~~(y / this.#cellSide)];
  }

  #inputDown() {
    if (!this.#inputInsideCanvas()) {
      return;
    }

    if (this.#toolMgr.activeToolId === Tools.RECTANGLE) {
      [this.#rectStartX, this.#rectStartY] = this.#getCanvasCells(this.#inputX, this.#inputY);

      this.#state = State.DRAWING_RECTANGLE;
    } else if (this.#toolMgr.activeToolId === Tools.PENCIL) {
      const [x, y] = this.#getCanvasCells(this.#inputX, this.#inputY);
      this.#drawPixel(x, y);

      this.#state = State.DRAWING_PENCIL;
    } else if (this.#toolMgr.activeToolId === Tools.FILL) {
      this.#state = State.PICKING_FILL_START;
    }
  }

  #inputUp() {
    let [x, y] = this.#getCanvasCells(this.#inputX, this.#inputY);
    x = this.#clamp(x, 0, NUM_ROWS_COLS - 1);
    y = this.#clamp(y, 0, NUM_ROWS_COLS - 1);
    if (this.#state === State.DRAWING_RECTANGLE) {
      this.#drawRectangle(this.#rectStartX, this.#rectStartY, x, y);
    } else if (this.#inputInsideCanvas()) {
      if (this.#state === State.DRAWING_PENCIL) {
        this.#drawPixel(x, y);
      } else if (this.#state === State.PICKING_FILL_START) {
        this.#fillAt(x, y);
      }
    }

    this.#previewFunc = undefined;
    this.#state = State.HOVERING;
  }

  #inputMove() {
    if (this.#state === State.DRAWING_PENCIL) {
      const [x, y] = this.#getCanvasCells(this.#inputX, this.#inputY);
      const [px, py] = this.#getCanvasCells(this.#pInputX, this.#pInputY);
      this.#drawLine(px, py, x, y);
    } else if (this.#state === State.DRAWING_RECTANGLE) {
      const [x, y] = this.#getCanvasCells(this.#inputX, this.#inputY);

      this.#previewFunc = () => {
        this.#ctx.fillStyle = palette[this.#currColorIndex];
        this.#ctx.fillRect(
          Math.min(this.#rectStartX, x) * this.#cellSide,
          Math.min(this.#rectStartY, y) * this.#cellSide,
          (1 + Math.abs(x - this.#rectStartX)) * this.#cellSide,
          (1 + Math.abs(y - this.#rectStartY)) * this.#cellSide,
        );
      };
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

  /**
   * @param {number} x1
   * @param {number} y1
   * @param {number} x3
   * @param {number} y3
   */
  #drawRectangle(x1, y1, x3, y3) {
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
        this.#drawPixel(x, y);
      }
    }
  }

  /** @type {boolean[] | undefined} */
  #fillVisited = undefined;
  /** @type {boolean[] | undefined} */
  #fillMarkedForVisit = undefined;

  /**
   * @param {number} x
   * @param {number} y
   */
  #fillAt(x, y) {
    let infLoopPreventCount = 0;
    const index = y * NUM_ROWS_COLS + x;
    const startColor = this.#drawing[index];

    this.#fillVisited ??= new Array(this.#drawing.length);
    this.#fillVisited.fill(false);
    this.#fillMarkedForVisit ??= new Array(this.#drawing.length);
    this.#fillMarkedForVisit.fill(false);

    /** @type {number[]} */
    const toVisit = [index];
    this.#fillMarkedForVisit[index] = true;

    while (toVisit.length) {
      infLoopPreventCount++;
      if (infLoopPreventCount > 5000) {
        console.error('fill tool iterating over 5000 times');
        break;
      }

      const visitingIndex = toVisit.pop();
      if (this.#fillVisited[visitingIndex] === true) {
        continue;
      }
      const vx = visitingIndex % NUM_ROWS_COLS;
      const vy = ~~(visitingIndex / NUM_ROWS_COLS);
      this.#drawPixel(vx, vy);
      this.#fillVisited[visitingIndex] = true;
      this.#pushValidAdjacentIndices(
        vx,
        vy,
        toVisit,
        this.#fillVisited,
        this.#fillMarkedForVisit,
        startColor,
      );
    }

    // console.log(`iterated ${infLoopPreventCount} times`);
  }

  #adjIndices = [-1, -1, -1, -1];
  /**
   * @param {number} x
   * @param {number} y
   * @param {number[]} toVisit
   * @param {boolean[]} visited
   * @param {boolean[]} markedIndices
   * @param {string} startColor
   */
  #pushValidAdjacentIndices(x, y, toVisit, visited, markedIndices, startColor) {
    this.#adjIndices[0] = this.#adjIndices[1] = this.#adjIndices[2] = this.#adjIndices[3] = -1;

    if (x - 1 >= 0) {
      this.#adjIndices[0] = y * NUM_ROWS_COLS + x - 1;
    }
    if (x + 1 < NUM_ROWS_COLS) {
      this.#adjIndices[1] = y * NUM_ROWS_COLS + x + 1;
    }
    if (y - 1 >= 0) {
      this.#adjIndices[2] = (y - 1) * NUM_ROWS_COLS + x;
    }
    if (y + 1 < NUM_ROWS_COLS) {
      this.#adjIndices[3] = (y + 1) * NUM_ROWS_COLS + x;
    }

    for (let adjIndex of this.#adjIndices) {
      if (adjIndex < 0) continue;

      if (
        this.#drawing[adjIndex] === startColor &&
        visited[adjIndex] === false &&
        markedIndices[adjIndex] === false
      ) {
        toVisit.push(adjIndex);
        markedIndices[adjIndex] = true;
      }
    }
  }

  #inputInsideCanvas() {
    return this.#pointInsideCanvas(this.#inputX, this.#inputY);
  }

  #pointInsideCanvas(x, y) {
    return x > 0 && y > 0 && x < this.#canvas.width && y < this.#canvas.height;
  }

  /**
   * @param {number} number
   * @param {number} min
   * @param {number} max
   */
  #clamp(number, min, max) {
    return number < min ? min : number > max ? max : number;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const doodleManager = new DoodleManager('container', testDrawingUncompressed);
  doodleManager.startDraw();
});
