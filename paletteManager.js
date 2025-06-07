class PaletteManager {
  #palette = [
    '#14141E',
    '#46282D',
    '#9B4146',
    '#BE783C',
    '#D7AF87',
    '#EBEBAF',
    '#64AF50',
    '#556E6E',
    '#3C3C5F',
    '#96D2F0',
    '#A07DA0',
    // '#000000',
    '#FFFFFF',
  ];

  currColorIndex = 0;

  /**
   * @param {HTMLDivElement} parentDiv
   */
  constructor(parentDiv) {
    const paletteContainer = document.createElement('div');
    parentDiv.appendChild(paletteContainer);
    for (let i = 0; i < this.#palette.length; i++) {
      const swatch = document.createElement('button');
      paletteContainer.appendChild(swatch);
      swatch.addEventListener('click', () => {
        this.currColorIndex = i;
      });

      // TODO: Move styles to CSS
      swatch.style.display = 'inline-block';
      swatch.style.width = '32px';
      swatch.style.height = '32px';
      swatch.style.backgroundColor = this.#palette[i];
    }
  }

  getCurrentColorIndexHex() {
    return this.currColorIndex.toString(16);
  }

  getCurrentColor() {
    return this.#palette[this.currColorIndex];
  }

  /**
   * @param {string} char
   */
  getColorFromDrawingChar(char) {
    return this.#palette[parseInt(char, 16)];
  }
}
