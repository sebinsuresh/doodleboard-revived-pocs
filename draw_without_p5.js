const State = {
  HOVERING: 0,
  DRAWING_PENCIL: 1,
  DRAWING_RECTANGLE: 2,
  PICKING_FILL_START: 3,
};

const NUM_ROWS_COLS = 64;

// pattern:
// const testDrawingUncompressed = ('0123456789ab'.repeat(5) + '0123').repeat(64);
// const testDrawingUncompressed = 'b'.repeat(4096);

// doodle from old project:
const testDrawingUncompressed =
  'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb88888bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb800000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0055111100bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0555111100bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb05555088081111000000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0011110008000000008118000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0111111000001111000811100bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb010000010111111110081180bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb010001010000111111001000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb00000111111000110018010bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb000000158551100011011081100bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb011000011188110101101100100bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0501000011111100011101100bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb05100400011111110101100100bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb010003330001100101111101100bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb010014344000000000100100110bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0100134444400010000100101110bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0000b000044400000000010001000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0144404044440001010000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0100000040000344000000b0bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0157704045770333000100bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0144404044440334000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb00004440000443100000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb14444444444444000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb11433344444440000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb1443344444430000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb1444442444430000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb142224444300000100bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb144444443300111111bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb1144433330111331111bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb100333301113333111bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb00333111111333111bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb11011113311130000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb13111133311100088880bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb1131111333110000088800bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb1331111333100000000880bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb1331111000000000000880bbbbbbbbbbbbbbbbbbb0bbbbbbbbbbbbbbbbbbbbbb1311111000000000000800bbbbbbbbbbbbbbbbbbb0bbbbbbbbbbbbbbbbbbbbbb13111100000000000008000bbbbbbbbbbbbbbbbb00bbbbbbbbbbbbbbbbbbbbbb11100000000000000008880bbbbbbbbbbbbbbbb00bbbbbbbbbbbbbbbbbbbbbbbbb000000000000000008880bbbbbbbbbbbbbbbb0bbbbbbbbbbbbbbbbbbbbbbbbbb0010000000000000888080bbbbbbbbbbbbbb00bbbbbbbbbbbbbbbbbbbbbbbbbb00000023300000008800808bbbbbbbbbbbb00bbbbbbbbbbbbbbbbbbbbbbbbbbb000000232000000000088080000080111b000bbbbbbbbbbbbbbbbbbbbbbbbbbb00000033200000000008088888800044400bbbbbbbbbbbbbbbbbbbbbbbbbbbb000000030000000000000000080001444000bbbbbbbbbbbbbbbbbbbbbbbbbbb00000000000000000000000000000114440014bbbbbbbbbbbbbbbbbbbbbbbbb000000000000000000000000000000144111114bbbbbbbbbbbbbbbbbbbbbbbbbb00000000000000000000000000000144144444bbbbbbbbbbbbbbbbbbbbbbbbb000000000000000000000000000001444114444bbbbbbbbbbbbbbbbbbbbbbbbb000000000000000000000000000001444411111bbbb';

class DoodleManager {
  #container;
  #canvas;
  #ctx;
  #drawing;
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
  /** @type {PaletteManager} */
  #paletteMgr;
  /** @type {Renderer} */
  #renderer;

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

    this.#paletteMgr = new PaletteManager(this.#container);

    this.#drawing = initialDrawing.split('');
    this.#cellSide = ~~(this.#canvas.width / NUM_ROWS_COLS);

    this.#renderer = new Renderer(this.#drawing, this.#canvas, this.#ctx, this.#paletteMgr);

    this.#createTools();
    this.#addInputListeners();
  }

  #createTools() {
    const toolContainer = document.createElement('div');
    this.#container.appendChild(toolContainer);

    this.#toolMgr = new ToolManager(toolContainer, this.#drawing, this.#renderer);
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
    this.#renderer.draw();
    this.#drawPreview();
    this.#drawCursor();

    // TODO: Remove - DEBUG
    // console.log(Object.keys(State)[this.#state], Object.keys(Tools)[this.#toolMgr.activeToolId]);
  }

  #drawPreview() {
    this.#previewFunc?.call(this);
  }

  #drawCursor() {
    if (!this.#inputInsideCanvas()) {
      return;
    }

    const [x, y] = this.#getCanvasCells(this.#inputX, this.#inputY);
    this.#renderer.previewPixel(x, y);
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
      this.#renderer.drawPixel(x, y);

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
      this.#renderer.drawRectangle(this.#rectStartX, this.#rectStartY, x, y);
    } else if (this.#inputInsideCanvas()) {
      if (this.#state === State.DRAWING_PENCIL) {
        this.#renderer.drawPixel(x, y);
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
      this.#renderer.drawLine(px, py, x, y);
    } else if (this.#state === State.DRAWING_RECTANGLE) {
      const [x, y] = this.#getCanvasCells(this.#inputX, this.#inputY);

      this.#previewFunc = () => {
        this.#renderer.previewRectangle(this.#rectStartX, this.#rectStartY, x, y);
      };
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
      this.#renderer.drawPixel(vx, vy);
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
