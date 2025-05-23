const palette = [
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

const testDrawingUncompressed =
  'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb88888bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb800000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0055111100bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0555111100bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb05555088081111000000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0011110008000000008118000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0111111000001111000811100bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb010000010111111110081180bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb010001010000111111001000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb00000111111000110018010bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb000000158551100011011081100bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb011000011188110101101100100bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0501000011111100011101100bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb05100400011111110101100100bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb010003330001100101111101100bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb010014344000000000100100110bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0100134444400010000100101110bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0000b000044400000000010001000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0144404044440001010000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0100000040000344000000b0bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0157704045770333000100bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0144404044440334000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb00004440000443100000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb14444444444444000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb11433344444440000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb1443344444430000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb1444442444430000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb142224444300000100bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb144444443300111111bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb1144433330111331111bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb100333301113333111bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb00333111111333111bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb11011113311130000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb13111133311100088880bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb1131111333110000088800bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb1331111333100000000880bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb1331111000000000000880bbbbbbbbbbbbbbbbbbb0bbbbbbbbbbbbbbbbbbbbbb1311111000000000000800bbbbbbbbbbbbbbbbbbb0bbbbbbbbbbbbbbbbbbbbbb13111100000000000008000bbbbbbbbbbbbbbbbb00bbbbbbbbbbbbbbbbbbbbbb11100000000000000008880bbbbbbbbbbbbbbbb00bbbbbbbbbbbbbbbbbbbbbbbbb000000000000000008880bbbbbbbbbbbbbbbb0bbbbbbbbbbbbbbbbbbbbbbbbbb0010000000000000888080bbbbbbbbbbbbbb00bbbbbbbbbbbbbbbbbbbbbbbbbb00000023300000008800808bbbbbbbbbbbb00bbbbbbbbbbbbbbbbbbbbbbbbbbb000000232000000000088080000080111b000bbbbbbbbbbbbbbbbbbbbbbbbbbb00000033200000000008088888800044400bbbbbbbbbbbbbbbbbbbbbbbbbbbb000000030000000000000000080001444000bbbbbbbbbbbbbbbbbbbbbbbbbbb00000000000000000000000000000114440014bbbbbbbbbbbbbbbbbbbbbbbbb000000000000000000000000000000144111114bbbbbbbbbbbbbbbbbbbbbbbbbb00000000000000000000000000000144144444bbbbbbbbbbbbbbbbbbbbbbbbb000000000000000000000000000001444114444bbbbbbbbbbbbbbbbbbbbbbbbb000000000000000000000000000001444411111bbbb';

// document on load
const NUM_ROWS_COLS = 64;

document.addEventListener('DOMContentLoaded', () => {
  const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('doodle'));
  const ctx = canvas.getContext('2d');

  // bg
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // cells
  const cellSide = ~~(canvas.width / NUM_ROWS_COLS);
  renderUncompressed(ctx, cellSide);

  const compressedV1 = compressV1(testDrawingUncompressed);
  const compressedV2 = compressV2(testDrawingUncompressed);
  const compressedV2ThenV1 = compressV1(compressV2(testDrawingUncompressed));
  console.log('original', testDrawingUncompressed.length, testDrawingUncompressed);
  console.log('v1', compressedV1.length, compressedV1);
  console.log('v2', compressedV2.length, compressedV2);
  console.log('v2->v1', compressedV2ThenV1.length, compressedV2ThenV1);

  // runTests();
});

function renderUncompressed(ctx, cellSide) {
  ctx.strokeStyle = null;
  for (let i = 0; i < testDrawingUncompressed.length; i++) {
    const row = ~~(i % NUM_ROWS_COLS);
    const col = ~~(i / NUM_ROWS_COLS);
    ctx.fillStyle = palette[parseInt(`0x${testDrawingUncompressed[i]}`)];
    ctx.fillRect(row * cellSide, col * cellSide, cellSide, cellSide);
  }
}

/** @param {string} uncompressedHexString */
function compressV1(uncompressedHexString) {
  if (!uncompressedHexString.length || uncompressedHexString.length % 4 !== 0) {
    throw new Error('Uncompressed string length must be a multiple of 4');
  }

  const compressed = uncompressedHexString
    .split(/([0-9abcdef]{4})/g)
    .filter(Boolean)
    .map((s) => String.fromCharCode(Number(`0x${s}`)))
    .join('');

  return compressed;
}

/** @param {string} compressedV1String */
function decompressV1(compressedV1String) {
  return compressedV1String
    .split('')
    .map((c) => c.charCodeAt(0).toString(16).padStart(4, '0'))
    .join('');
}

/** @param {string} uncompressedDoodleString */
function compressV2(uncompressedDoodleString) {
  if (!uncompressedDoodleString || uncompressedDoodleString.length % 4 !== 0) {
    throw new Error('Uncompressed string length must be a multiple of 4');
  }
  if (uncompressedDoodleString.match(/[^0-9ab]/)) {
    throw new Error('Doodle strings can only contain 0-9, a, b palette indices.');
  }

  const rleCode = 'c';
  // const lookupCode = 'd';
  // const lookupItemSeparator = 'e';
  // const lookupSeparator = 'f';

  let compressed = '';
  for (let i = 0; i < uncompressedDoodleString.length - 4; i++) {
    let repeatCount = 1;
    let currentChar = uncompressedDoodleString[i];

    while (
      uncompressedDoodleString[i + repeatCount] === currentChar &&
      repeatCount < 255 &&
      i + repeatCount < uncompressedDoodleString.length - 4
    ) {
      repeatCount++;
    }

    if (repeatCount > 4) {
      compressed += `${rleCode}${currentChar}${repeatCount.toString(16).padStart(2, '0')}`;
      i += repeatCount - 1;
    } else {
      compressed += `${uncompressedDoodleString.substring(i, i + 4)}`;
      i += 3;
    }
  }
  compressed += `${uncompressedDoodleString.substring(uncompressedDoodleString.length - 4)}`;

  return compressed;
}

/** @param {string} compressedV2String */
function decompressV2(compressedV2String) {
  const rleCode = 'c';

  let decompressed = '';
  for (let i = 0; i < compressedV2String.length; i++) {
    const currentChar = compressedV2String[i];
    const currentFour = compressedV2String.substring(i, i + 4);
    if (currentChar === rleCode) {
      decompressed += currentFour[1].repeat(Number(`0x${currentFour.substring(2, 4)}`));
      i += 3;
    } else {
      decompressed += currentChar;
    }
  }

  return decompressed;
}

function runTests() {
  const tester = new Tester();

  runCompressV1Tests();
  runDecompressV1Tests();
  runCompressV2Tests();
  runDecompressV2Tests();

  function runCompressV1Tests() {
    tester.startNew(`${compressV1.name} Tests`);
    [
      '0000',
      '9999',
      'ffff',
      '1a2b',
      'abcd',
      '1234',
      '0'.repeat(8),
      '9'.repeat(8),
      'f'.repeat(8),
      'abcdefab',
      '12345678',
      '1a2b3c4d',
      '0'.repeat(12),
      '9'.repeat(12),
      'f'.repeat(12),
    ].forEach((testStr) => {
      if (testStr.length % 4 === 0) {
        tester.assertEqual(
          `hex characters from compressing '${testStr}'`,
          getHexChars(compressV1(testStr)),
          testStr,
        );
      }
    });
    tester.assertThrows('should throw for empty', () => getHexChars(compressV1('')));
    [1, 3, 5, 13].forEach((len) => {
      tester.assertThrows(`should throw for non-multiple of 4 length (${len})`, () =>
        getHexChars(compressV1('1'.repeat(len))),
      );
    });
    tester.finish();
  }

  function runDecompressV1Tests() {
    tester.startNew(`${decompressV1.name} Tests`);
    [
      '0000',
      '9999',
      'ffff',
      '1a2b',
      'abcd',
      '1234',
      '0'.repeat(8),
      '9'.repeat(8),
      'f'.repeat(8),
      'abcdefab',
      '12345678',
      '1a2b3c4d',
      '0'.repeat(12),
      '9'.repeat(12),
      'f'.repeat(12),
    ].forEach((testStr) => {
      tester.assertEqual(
        `compressing and decompressing '${testStr}'`,
        decompressV1(compressV1(testStr)),
        testStr,
      );
    });
    tester.finish();
  }

  function runCompressV2Tests() {
    tester.startNew(
      `${compressV2.name} Tests`,
      // { showErrorsOnSuccess: true }
    );
    const rleCode = 'c';

    // 4 chars
    tester.assertEqual('4 of the same', compressV2('1111'), '1111');
    tester.assertEqual('4 with some being same', compressV2('1123'), '1123');
    tester.assertEqual('4 different', compressV2('1234'), '1234');

    // 8 chars
    tester.assertEqual('8 of same - should not use rle', compressV2('1111' + '1111'), `1111` + '1111');
    tester.assertEqual(
      '8 of two different, 4 each - should not use rle',
      compressV2('1111' + '2222'),
      '1111' + '2222',
    );
    tester.assertEqual(
      '8 of two different, 6-2 per - should not use rle',
      compressV2('1111' + '1122'),
      '1111' + '1122',
    );
    tester.assertEqual(
      '8 of all different - should not use rle',
      compressV2('1234' + '5678'),
      '1234' + '5678',
    );

    // 12 chars
    tester.assertEqual(
      '12 of same - should use RLE',
      compressV2('1111' + '1111' + '1111'),
      `${rleCode}108` + '1111',
    );
    tester.assertEqual(
      '12 of 3 different, 4 each - should not use rle',
      compressV2('1111' + '2222' + '3333'),
      '1111' + '2222' + '3333',
    );
    tester.assertEqual(
      '8 chars in middle - should use RLE',
      compressV2('1111' + '2222' + '2222' + '3333'),
      '1111' + `${rleCode}208` + '3333',
    );

    tester.assertEqual(
      '16 chars - 8 repeating in middle - some spill to last 4 - should use RLE for middle',
      compressV2('1111' + '2222' + '2222' + '2333'),
      '1111' + `${rleCode}208` + '2333',
    );
    tester.assertEqual(
      '16 chars - 8 repeating in middle - some spill to first 4 and last 4 - should use RLE for middle',
      compressV2('1112' + '2222' + '2222' + '2333'),
      '1112' + `${rleCode}208` + '2333',
    );

    // Invalid lengths
    tester.assertThrows('should throw for empty', () => compressV2(''));
    [1, 3, 5, 13].forEach((len) => {
      tester.assertThrows(`should throw for non-multiple of 4 length (${len})`, () =>
        compressV2('1'.repeat(len)),
      );
    });

    // invalid characters
    ['x', 'c', 'f'].forEach((invalidChar) => {
      tester.assertThrows(`should throw for invalid character '${invalidChar}'`, () =>
        compressV2('1'.repeat(4) + (invalidChar + '3'.repeat(3)).substring(0, 4)),
      );
    });

    tester.finish();
  }

  function runDecompressV2Tests() {
    tester.startNew(`${decompressV2.name} Tests`);

    [
      '0000',
      '9999',
      '1a2b',
      'abab',
      '0'.repeat(8),
      '9'.repeat(8),
      'a'.repeat(8),
      'b'.repeat(8),
      '0'.repeat(12),
      '9'.repeat(12),
      'a'.repeat(12),
      'b'.repeat(12),
      '0'.repeat(16),
      'aaaa' + '0'.repeat(8) + 'aaaa',
      '9'.repeat(16),
      'a'.repeat(16),
      'b'.repeat(16),
      '1234444444444567',
    ].forEach((testStr) => {
      tester.assertEqual(
        `compressing and decompressing '${testStr}'`,
        decompressV2(compressV2(testStr)),
        testStr,
      );
    });

    tester.finish();
  }
}

/** @param {string} compressedString */
function getHexChars(compressedString) {
  return compressedString
    .split('')
    .map((c) => c.charCodeAt(0).toString(16).padStart(4, '0'))
    .join('');
}

// TODO: Use modules, extract to separate file
class Tester {
  /** @type {string | null} */
  #name = null;
  /** @type {Array<{passed: boolean, message: string, error?: Error}> | undefined} */
  #results;
  #showErrorsOnSuccess;

  constructor() {
    this.#reset();
  }

  #reset() {
    this.#name = null;
    this.#results = [];
  }

  /**
   * @param {string} name
   * @param {{ showErrorsOnSuccess: any; }} [config]
   */
  startNew(name, config) {
    if (this.#name) {
      this.finish();
    }
    this.#name = name;
    this.#showErrorsOnSuccess = config?.showErrorsOnSuccess ?? false;
  }

  /**
   * @param {string} name
   * @param {string} actual
   * @param {string} expected
   */
  assertEqual(name, actual, expected) {
    if (actual !== expected) {
      this.#results.push({
        passed: false,
        message: `${name} - expected: '${expected}' actual: '${actual}'`,
      });
    } else {
      this.#results.push({ passed: true, message: name });
    }
  }

  /**
   * @param {any} name
   * @param {() => any} func
   */
  shouldNotThrow(name, func) {
    let passed = true;
    let error = null;
    try {
      func();
    } catch (e) {
      passed = false;
    }
    if (!passed) {
      this.#results.push({
        passed: false,
        message: name,
        error: error,
      });
    } else {
      this.#results.push({ passed: true, message: name });
    }
  }

  /**
   * @param {any} name
   * @param {() => void} func
   */
  assertThrows(name, func) {
    let passed = false;
    let error = null;
    try {
      func();
    } catch (e) {
      error = e;
      passed = true;
    }
    if (!passed) {
      this.#results.push({ passed: false, message: name });
    } else {
      this.#results.push({ passed: true, message: name, error: error });
    }
  }

  finish() {
    console.group(this.#name);

    this.#results.forEach((result) => {
      if (result.passed) {
        console.log(`✅ passed: ${result.message}`);
        if (this.#showErrorsOnSuccess && result.error) {
          console.log(result.error);
        }
      } else {
        console.error(`❌ failed: ${result.message}`);
        if (result.error) {
          console.error(result.error);
        }
      }
    });

    console.groupEnd();

    this.#reset();
  }
}
