/* 
Other ideas:

1. Delta encoding followed by RLE:
Sort palette in order of hue and brightness.
Then run RLE on it.
4, 5, 6, 7, 8, 9 ->  4, 1, 1, 1, 1, 1 ->  (4,1), (1,5)

2. 

*/

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

  // console.log('original', testDrawingUncompressed.length, testDrawingUncompressed);
  // const compressedV1 = compressV1(testDrawingUncompressed);
  // console.log('v1', compressedV1.length, compressedV1);

  // const compressedV2 = compressV2(testDrawingUncompressed);
  // console.log('v2', compressedV2.length, compressedV2);
  // const compressedV2ThenV1 = compressV1(compressedV2);
  // console.log('v2->v1', compressedV2ThenV1.length, compressedV2ThenV1);

  // const compressedV3 = compressV3(testDrawingUncompressed);
  // console.log('v3', compressedV3.length, compressedV3);
  // const compressedV3ThenV1 = compressV1(compressedV3);
  // console.log('v3->v1', compressedV3ThenV1.length, compressedV3ThenV1);

  // console.log(getCountOfStringsOfLength(testDrawingUncompressed, 4, 20));
  // console.log(getCountOfStringsOfLength(testDrawingUncompressed, 5, -1));
  // console.log(getCountOfStringsOfLength(testDrawingUncompressed, 6, -1));
  // console.log(getCountOfStringsOfLength(compressedV2, 5, -1));
  // console.log(getCountOfStringsOfLength(compressedV2, 6, -1));
  // console.log(getCountOfStringsOfLength(compressedV2, 7, -1));

  runTests();
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

/**
 * Compresses given hex string by encoding each 4 hex digits to a single char.
 *
 * Adds prefix character with the number of hex digits in the last character in
 * its last 2 bits.
 *
 * @param {string} uncompressedHexString
 */
function compressV1(uncompressedHexString) {
  if (!uncompressedHexString.length) {
    return uncompressedHexString;
  }
  if (uncompressedHexString.match(/[^0-9a-f]/)) {
    throw new Error('CompressV1 input must be a hex string.');
  }

  // Use the last 2 bits of prefix for storing the number of hex digits
  // in last character of original string.
  const prefixString = String.fromCharCode(uncompressedHexString.length % 4);

  let compressed = '';
  for (let i = 0; i < uncompressedHexString.length; i += 4) {
    const hexValue = parseInt(uncompressedHexString.substring(i, i + 4).padStart(4, '0'), 16);
    compressed += String.fromCharCode(hexValue);
  }
  compressed = prefixString + compressed;

  return compressed;
}

/** @param {string} compressedV1String */
function decompressV1(compressedV1String) {
  if (!compressedV1String.length) {
    return compressedV1String;
  }

  // Total 16 bits in each char of compressed string.
  // Use the last 2 bits of prefix for storing the number of hex digits
  // in last character of original string.
  const prefixBits = compressedV1String.charCodeAt(0) & 0b11;

  let result = '';
  for (let i = 1; i < compressedV1String.length - 1; i++) {
    result += compressedV1String[i].charCodeAt(0).toString(16).padStart(4, '0');
  }

  const lastCharCode = compressedV1String.charCodeAt(compressedV1String.length - 1);
  if (prefixBits === 0b00) {
    result += lastCharCode.toString(16).padStart(4, '0');
  } else {
    result += lastCharCode.toString(16).padStart(prefixBits, '0');
  }

  return result;
}

/**
 * Compress input doodle hex string via Run Length Encoding (RLE).
 *
 * Use {@link compressV1} to compress the result further.
 *
 * @param {string} uncompressedDoodleString
 */
function compressV2(uncompressedDoodleString) {
  if (!uncompressedDoodleString.length) {
    return uncompressedDoodleString;
  }

  // TODO: can I remove this restriction on the string?
  if (uncompressedDoodleString.match(/[^0-9ab]/)) {
    throw new Error('Doodle strings can only contain 0-9, a, b palette indices.');
  }

  const RLE_CODE = 'c';
  // Repeat count in output string starts at 5 and ends at max value.
  // If repeat count === 0, that means 5 repeats.
  // If repeat count === 1, 6 repeats.
  // If repeat count === 255, 260 repeats.
  const USE_REPEAT_AFTER = 5;

  let compressed = '';
  let i = 0;
  while (i < uncompressedDoodleString.length - 4) {
    let repeatCount = 1;
    let currentChar = uncompressedDoodleString[i];

    while (
      uncompressedDoodleString[i + repeatCount] === currentChar &&
      repeatCount < 255 + USE_REPEAT_AFTER &&
      i + repeatCount < uncompressedDoodleString.length
    ) {
      repeatCount++;
    }

    if (repeatCount >= USE_REPEAT_AFTER) {
      const adjustedRepeatCountHex = (repeatCount - USE_REPEAT_AFTER).toString(16).padStart(2, '0');
      compressed += `${RLE_CODE}${currentChar}${adjustedRepeatCountHex}`;
      i += repeatCount;
    } else if (repeatCount > 1) {
      // These two else cases can be a single else, but keeping it like this to be explicit.

      compressed += currentChar.repeat(repeatCount);
      i += repeatCount;
    } else {
      compressed += currentChar;
      i++;
    }
  }
  compressed += uncompressedDoodleString.substring(i);

  return compressed;
}

/** @param {string} compressedV2String */
function decompressV2(compressedV2String) {
  if (!compressedV2String.length) {
    return compressedV2String;
  }

  const RLE_CODE = 'c';
  const USE_REPEAT_AFTER = 5;

  let decompressed = '';
  for (let i = 0; i < compressedV2String.length; ) {
    const currentChar = compressedV2String[i];

    if (currentChar === RLE_CODE) {
      const currentFour = compressedV2String.substring(i, i + 4);
      decompressed += currentFour[1].repeat(parseInt(currentFour.substring(2, 4), 16) + USE_REPEAT_AFTER);
      i += 4;
    } else {
      decompressed += currentChar;
      i++;
    }
  }

  return decompressed;
}

/**
 * Compress doodle string using a mix of RLE and indexed lookups.
 *
 * @param {string} uncompressedDoodleString
 */
function compressV3(uncompressedDoodleString) {
  if (!uncompressedDoodleString.length) {
    return uncompressedDoodleString;
  }
  // TODO: can I remove this restriction on the string?
  if (uncompressedDoodleString.match(/[^0-9ab]/)) {
    throw new Error('Doodle strings can only contain 0-9, a, b palette indices.');
  }

  const RLE_CODE = 'c';
  // Repeat count in output string starts at 5 and ends at max value.
  // If repeat count === 0, that means 5 repeats.
  // If repeat count === 1, 6 repeats.
  // If repeat count === 255, 260 repeats.
  const USE_REPEAT_AFTER = 5;
  const LOOKUP_CODE = 'd';
  const LOOKUP_ITEM_SEP = 'e';
  const LOOKUP_SEP = 'f';

  const countsOf5LongStrings = getCountOfStringsOfLength(uncompressedDoodleString, 5, 3, -1);
  const countsOf6LongStrings = getCountOfStringsOfLength(uncompressedDoodleString, 6, 3, -1);
  const countsOf7LongStrings = getCountOfStringsOfLength(uncompressedDoodleString, 7, 3, -1);
  const countsOf8LongStrings = getCountOfStringsOfLength(uncompressedDoodleString, 8, 3, -1);

  const usedLookups = [];
  let compressed = '';
  let i = 0;
  let j = 0; // TODO: Remove after debugging
  while (i < uncompressedDoodleString.length - 4) {
    j++;
    let repeatCount = 1;
    let currentChar = uncompressedDoodleString[i];

    while (
      uncompressedDoodleString[i + repeatCount] === currentChar &&
      repeatCount < 256 + USE_REPEAT_AFTER &&
      i + repeatCount < uncompressedDoodleString.length
    ) {
      repeatCount++;
    }
    console.log('b');
    if (j > 5000) break;

    // TODO: refactor
    if (repeatCount >= USE_REPEAT_AFTER) {
      const adjustedRepeatCountHex = (repeatCount - USE_REPEAT_AFTER).toString(16).padStart(2, '0');
      compressed += `${RLE_CODE}${currentChar}${adjustedRepeatCountHex}`;
      i += repeatCount;
      continue;
    }
    if (i < uncompressedDoodleString.length - 8) {
      const substring = uncompressedDoodleString.substring(i, i + 8);
      const count = countsOf8LongStrings[substring];
      if (count) {
        let index = usedLookups.findIndex((item) => item.value === substring);
        if (index === -1) {
          usedLookups.push({ value: substring, length: 8, count: count });
          index = usedLookups.length - 1;
        }
        compressed += `${LOOKUP_CODE}${index.toString(16).padStart(3, '0')}`;

        i += 8;
        continue;
      }
    }
    if (i < uncompressedDoodleString.length - 7) {
      const substring = uncompressedDoodleString.substring(i, i + 7);
      const count = countsOf7LongStrings[substring];
      if (count) {
        let index = usedLookups.findIndex((item) => item.value === substring);
        if (index === -1) {
          usedLookups.push({ value: substring, length: 7, count: count });
          index = usedLookups.length - 1;
        }
        compressed += `${LOOKUP_CODE}${index.toString(16).padStart(3, '0')}`;

        i += 7;
        continue;
      }
    }
    if (i < uncompressedDoodleString.length - 6) {
      const substring = uncompressedDoodleString.substring(i, i + 6);
      const count = countsOf6LongStrings[substring];
      if (count) {
        let index = usedLookups.findIndex((item) => item.value === substring);
        if (index === -1) {
          usedLookups.push({ value: substring, length: 6, count: count });
          index = usedLookups.length - 1;
        }
        compressed += `${LOOKUP_CODE}${index.toString(16).padStart(3, '0')}`;

        i += 6;
        continue;
      }
    }
    if (i < uncompressedDoodleString.length - 5) {
      const substring = uncompressedDoodleString.substring(i, i + 5);
      const count = countsOf5LongStrings[substring];
      if (count) {
        let index = usedLookups.findIndex((item) => item.value === substring);
        if (index === -1) {
          usedLookups.push({ value: substring, length: 5, count: count });
          index = usedLookups.length - 1;
        }
        compressed += `${LOOKUP_CODE}${index.toString(16).padStart(3, '0')}`;

        i += 5;
        continue;
      }
    }

    // These two else cases can be a single else, but keeping it like this to be explicit.
    if (repeatCount > 1) {
      compressed += currentChar.repeat(repeatCount);
      i += repeatCount;
    } else {
      compressed += currentChar;
      i++;
    }
  }
  compressed += uncompressedDoodleString.substring(i);
  compressed = usedLookups.map((l) => l.value).join(LOOKUP_ITEM_SEP) + LOOKUP_SEP + compressed;

  return compressed;
}

/**
 * @param {string} sourceString
 * @param {number} length
 */
function getCountOfStringsOfLength(sourceString, length, minCount = 2, topN = 10) {
  // TODO: This might result in dictionaries that give you back substrings that
  // can't be used together.
  // E.g. source could be: '..01234560123456..' and you might get '012345' and
  // '123456' as top substrings.
  // But you could only utilize one of them in the actual compression.
  //
  // Maybe: utilize the entire result dictionary (don't only take topN),
  // mark the dictionary values that are actually used,
  // and only include those used ones in the "lookup header" when compressing
  // and writing results to a string.
  const map = {};
  for (let i = 0; i < sourceString.length - length; i++) {
    const substring = sourceString.substring(i, i + length);
    if (substring === substring[0].repeat(length)) {
      continue;
    }
    if (map[substring]) {
      map[substring]++;
    } else {
      map[substring] = 1;
    }
  }
  // let sortedItems = Object.entries(map)
  //   .filter((item) => item[1] > 1)
  //   .sort((a, b) => b[1] - a[1]);
  // if (topN > 0) {
  //   sortedItems = sortedItems.slice(0, topN);
  // }
  // return sortedItems;

  let filteredMap = Object.entries(map)
    .filter((item) => item[1] >= minCount)
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  return filteredMap;
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
          `hex characters from compressing multiple of 4 long '${testStr}'`,
          getHexChars(compressV1(testStr)),
          '0000' + testStr,
        );
      }
    });
    tester.assertEqual('should return empty for empty', getHexChars(compressV1('')), '');
    ['0', '1'].forEach((testStr) => {
      tester.assertEqual(
        `should add non-zero prefix for 1-long string '${testStr}'`,
        getHexChars(compressV1(testStr)),
        '0001' + testStr.padStart(4, '0'),
      );
    });
    ['00', '01', '11'].forEach((testStr) => {
      tester.assertEqual(
        `should add non-zero prefix for 2-long string '${testStr}'`,
        getHexChars(compressV1(testStr)),
        '0002' + testStr.padStart(4, '0'),
      );
    });
    ['000', '001', '010', '110', '100', '111'].forEach((testStr) => {
      tester.assertEqual(
        `should add non-zero prefix for 2-long string '${testStr}'`,
        getHexChars(compressV1(testStr)),
        '0003' + testStr.padStart(4, '0'),
      );
    });
    tester.assertEqual(
      'should add non-zero prefix for 5-long string',
      getHexChars(compressV1('1000' + '0')),
      '0001' + '1000' + '0000',
    );
    tester.assertEqual(
      'should add non-zero prefix for 5-long string',
      getHexChars(compressV1('1000' + '1')),
      '0001' + '1000' + '0001',
    );
    tester.assertEqual(
      'should add non-zero prefix for 7-long string',
      getHexChars(compressV1('1000' + '000')),
      '0003' + '1000' + '0000',
    );
    tester.assertEqual(
      'should add non-zero prefix for 7-long string',
      getHexChars(compressV1('1000' + '100')),
      '0003' + '1000' + '0100',
    );
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
    const RLE_CODE = 'c';

    // 4 chars
    tester.assertEqual('4 of the same', compressV2('1111'), '1111');
    tester.assertEqual('4 with some being same', compressV2('1123'), '1123');
    tester.assertEqual('4 different', compressV2('1234'), '1234');

    // 8 chars
    tester.assertEqual('8 of same - should use rle', compressV2('1111' + '1111'), `${RLE_CODE}103`);
    tester.assertEqual(
      '8 of two different, 4 each - should not use rle',
      compressV2('1111' + '2222'),
      '1111' + '2222',
    );
    tester.assertEqual(
      '8 of two different, 6-2 per - should use rle for first',
      compressV2('1111' + '1122'),
      `${RLE_CODE}10122`,
    );
    tester.assertEqual(
      '8 of all different - should not use rle',
      compressV2('1234' + '5678'),
      '1234' + '5678',
    );

    // 12 chars
    tester.assertEqual('12 of same - should use RLE', compressV2('1111' + '1111' + '1111'), `${RLE_CODE}107`);
    tester.assertEqual(
      '12 of 3 different, 4 each - should not use rle',
      compressV2('1111' + '2222' + '3333'),
      '1111' + '2222' + '3333',
    );
    tester.assertEqual(
      '8 chars in middle - should use RLE',
      compressV2('1111' + '2222' + '2222' + '3333'),
      '1111' + `${RLE_CODE}203` + '3333',
    );

    // 16 chars
    tester.assertEqual(
      '16 chars - 8 repeating in middle - some spill to last 4 - should use RLE for all repeated',
      compressV2('1111' + '2222' + '2222' + '2333'),
      '1111' + `${RLE_CODE}204` + '333',
    );
    tester.assertEqual(
      '16 chars - 8 repeating in middle - some spill to first 4 and last 4 - should use RLE for all repeated',
      compressV2('1112' + '2222' + '2222' + '2333'),
      '111' + `${RLE_CODE}205` + '333',
    );

    // over 259 chars
    tester.assertEqual(
      '260 chars - all repeating - should use RLE for all',
      compressV2('1'.repeat(260)),
      `${RLE_CODE}1ff`,
    );
    tester.assertEqual(
      '261 chars - all repeating - should use RLE for first 260',
      compressV2('1'.repeat(261)),
      `${RLE_CODE}1ff` + '1',
    );
    tester.assertEqual(
      '262 chars - all repeating - should use RLE for first 260',
      compressV2('1'.repeat(262)),
      `${RLE_CODE}1ff` + '11',
    );
    tester.assertEqual(
      '263 chars - all repeating - should use RLE for first 260',
      compressV2('1'.repeat(263)),
      `${RLE_CODE}1ff` + '111',
    );
    tester.assertEqual(
      '264 chars - all repeating - should use RLE for first 260',
      compressV2('1'.repeat(264)),
      `${RLE_CODE}1ff` + '1111',
    );
    tester.assertEqual(
      '265 chars - all repeating - should use two RLEs',
      compressV2('1'.repeat(265)),
      `${RLE_CODE}1ff` + `${RLE_CODE}100`,
    );

    tester.assertEqual('should return empty for empty', compressV2(''), '');
    [1, 3, 5, 13].forEach((len) => {
      tester.assertEqual(
        `should return for non-multiple of 4 length less than 4 long without using RLE (${len})`,
        compressV2('1'.repeat(len)),
        compressV2('1'.repeat(len)),
      );
    });
    [5, 13].forEach((len) => {
      tester.assertEqual(
        `should return RLE for non-multiple of 4 length over 4 (${len})`,
        compressV2('1'.repeat(len)),
        `${RLE_CODE}1${(len - 5).toString(16).padStart(2, '0')}`,
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
      '0',
      '00',
      '000',
      '0000',
      '9',
      '99',
      '999',
      '9999',
      'a',
      'aa',
      'aaa',
      'aaaa',
      '1a2b',
      '0'.repeat(8),
      '9'.repeat(8),
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
      '123444444444456',
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
function getHexChars(compressedString, commaSeparated = false) {
  return compressedString
    .split('')
    .map((c) => c.charCodeAt(0).toString(16).padStart(4, '0'))
    .join(commaSeparated ? ', ' : '');
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
