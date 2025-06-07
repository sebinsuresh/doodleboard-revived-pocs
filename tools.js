// TODO: extract tools to own class, implement drawing & preview draws via render manager, handle start, move, events in each tool

const Tools = {
  PENCIL: 0,
  RECTANGLE: 1,
  FILL: 2,
  LINE: 3,
  CLEAR: 4,
};

class ToolManager {
  #toolContainerElem;
  #drawing; // TODO: Would I still need this?
  #renderer;

  /** @type {Object[]} */
  #tools = [];
  /** @type {number} */
  activeToolId;

  /**
   * @param {HTMLDivElement} toolContainerElem
   * @param {string[]} drawing
   * @param {Renderer} renderer
   */
  constructor(toolContainerElem, drawing, renderer) {
    this.#toolContainerElem = toolContainerElem;
    this.#drawing = drawing;
    this.#renderer = renderer;

    this.#addToolElements();
    this.activeToolId = Tools.PENCIL;
  }

  #addToolElements() {
    this.#tools.push(new PencilTool(this));
    this.#tools.push(new RectangleTool(this));
    this.#tools.push(new FillTool(this));
    this.#tools.push(new ClearTool(this));

    for (let tool of this.#tools) {
      this.#toolContainerElem.appendChild(tool.element);
    }
  }

  /**
   * @param {number} toolId
   */
  handleToolSelect(toolId) {
    if (toolId === Tools.CLEAR) {
      const clearTool = /** @type {ClearTool} */ (this.#tools.find((tool) => tool.toolId === toolId));
      if (!clearTool.useTool) {
        throw new Error(`useTool not defined on ${clearTool.constructor.name}`);
      }
      clearTool.useTool(this.#renderer);
    } else {
      this.activeToolId = toolId;
    }
  }
}

class PencilTool {
  toolId = Tools.PENCIL;

  /**
   * @param {ToolManager} manager
   */
  constructor(manager) {
    this.element = document.createElement('button');
    this.element.textContent = 'Pencil';
    this.element.addEventListener('click', () => {
      manager.handleToolSelect(this.toolId);
    });
  }
}

class RectangleTool {
  toolId = Tools.RECTANGLE;

  /**
   * @param {ToolManager} manager
   */
  constructor(manager) {
    this.element = document.createElement('button');
    this.element.textContent = 'Rectangle';
    this.element.addEventListener('click', () => {
      manager.handleToolSelect(this.toolId);
    });
  }
}

class FillTool {
  toolId = Tools.FILL;

  /**
   * @param {ToolManager} manager
   */
  constructor(manager) {
    this.element = document.createElement('button');
    this.element.textContent = 'Fill';
    this.element.addEventListener('click', () => {
      manager.handleToolSelect(this.toolId);
    });
  }
}

class ClearTool {
  toolId = Tools.CLEAR;

  /**
   * @param {ToolManager} manager
   */
  constructor(manager) {
    this.element = document.createElement('button');
    this.element.textContent = 'Clear';
    this.element.addEventListener('click', () => {
      manager.handleToolSelect(this.toolId);
    });
  }

  /**
   * @param {Renderer} renderer
   */
  useTool(renderer) {
    renderer.clearDraw();
  }
}
