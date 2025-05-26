// --- Benchmark code for getCountOfStringsOfLengthAndMinCount (Map vs Object) ---

function allCharsSame(substring) {
  if (substring.length === 1) return true;

  const firstChar = substring[0];
  for (let i = 1; i < substring.length; i++) {
    if (substring[i] !== firstChar) {
      return false;
    }
  }

  return true;
}

/**
 * @param {string} sourceString
 * @param {number} length
 * @param {number} minCount
 */
function getCountOfStringsOfLengthAndMinCountMap(sourceString, length, minCount = 2) {
  /** @type {Map<string, number>} */
  const map = new Map();
  for (let i = 0; i <= sourceString.length - length; i++) {
    const substring = sourceString.substring(i, i + length);
    if (allCharsSame(substring)) {
      continue;
    }
    map.set(substring, (map.get(substring) ?? 0) + 1);
  }

  /** @type {Map<string, number>} */
  const filteredMap = new Map();
  for (const [key, value] of map) {
    if (value >= minCount) {
      filteredMap.set(key, value);
    }
  }
  return filteredMap;
}

/**
 * @param {string} sourceString
 * @param {number} length
 * @param {number} minCount
 */
function getCountOfStringsOfLengthAndMinCountMapWithNumbers(sourceString, length, minCount = 2) {
  /** @type {Map<number, number>} */
  const map = new Map();
  for (let i = 0; i <= sourceString.length - length; i++) {
    const substring = sourceString.substring(i, i + length);
    if (allCharsSame(substring)) {
      continue;
    }
    const hexValue = parseInt(substring, 16);
    map.set(hexValue, (map.get(hexValue) ?? 0) + 1);
  }

  /** @type {Map<number, number>} */
  const filteredMap = new Map();
  for (const [key, value] of map) {
    if (value >= minCount) {
      filteredMap.set(key, value);
    }
  }
  return filteredMap;
}

/**
 * @param {string} sourceString
 * @param {number} length
 */
function getCountOfStringsOfLengthAndMinCountObj(sourceString, length, minCount = 2) {
  const map = {};
  for (let i = 0; i < sourceString.length - length; i++) {
    const substring = sourceString.substring(i, i + length);
    // if (substring === substring[0].repeat(length)) {
    //   continue;
    // }
    if (allCharsSame(substring)) {
      continue;
    }
    if (map[substring]) {
      map[substring]++;
    } else {
      map[substring] = 1;
    }
  }
  let filteredMap = Object.entries(map)
    .filter((item) => item[1] >= minCount)
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  return filteredMap;
}

/**
 * @param {string} sourceString
 * @param {number} length
 */
function getCountOfStringsOfLengthAndMinCountObjectUsingNumber(sourceString, length, minCount = 2) {
  const map = {};
  for (let i = 0; i < sourceString.length - length; i++) {
    // TODO: next benchmark - don't create substring, use indices in allCharsSame
    const substring = sourceString.substring(i, i + length);
    if (allCharsSame(substring)) {
      continue;
    }
    const hexValue = parseInt(substring, 16);
    if (map[hexValue]) {
      map[hexValue]++;
    } else {
      map[hexValue] = 1;
    }
  }
  let filteredMap = Object.entries(map)
    .filter((item) => item[1] >= minCount)
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  return filteredMap;
}

/**
 * Generates a random hex string of given length (0-9, a-f).
 * @param {number} len
 */
function randomHexString(len) {
  const chars = '0123456789abcdef';
  let out = '';
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

function nonRandomHexString() {
  const substrings = ['12345678', '87654321'];
  let out = '';
  for (let i = 0; i < 4096; i += 8) {
    out += substrings[Math.floor(Math.random() * substrings.length)];
  }
  return out;
}

/**
 * Runs a benchmark for a function, repeating it several times and reporting average time.
 * @param {Function} fn - function to benchmark
 * @param {string} label - label for output
 * @param {string} sourceString
 * @param {number[]} lengths
 * @param {number} minCount
 * @param {number} iterations
 */
function benchmark(fn, label, sourceString, lengths, minCount, iterations = 10) {
  for (const length of lengths) {
    let total = 0;
    let resultCount = 0;
    for (let i = 0; i < iterations; i++) {
      const t0 = performance.now();
      const result = fn(sourceString, length, minCount);
      const t1 = performance.now();
      total += t1 - t0;
      // For Map, use .size; for Object, use Object.keys().length
      resultCount = typeof result.size === 'number' ? result.size : Object.keys(result).length;
    }
    const avg = total / iterations;
    console.log(
      `${label} | length=${length}, minCount=${minCount} | avg time: ${avg.toFixed(
        2,
      )}ms | found: ${resultCount}`,
    );
  }
}

// Example usage: call this after both implementations are defined
(function runBenchmarks() {
  const randomSourceString = randomHexString(4096);
  const nonRandomSourceString = nonRandomHexString();
  const lengths = [5, 6, 7, 8];
  const minCount = 3;
  const iterations = 200;

  // Warm up
  getCountOfStringsOfLengthAndMinCountMap(randomSourceString, 5, minCount);
  getCountOfStringsOfLengthAndMinCountMapWithNumbers(randomSourceString, 5, minCount);
  getCountOfStringsOfLengthAndMinCountObj(randomSourceString, 5, minCount);
  getCountOfStringsOfLengthAndMinCountObjectUsingNumber(randomSourceString, 5, minCount);

  getCountOfStringsOfLengthAndMinCountMap(nonRandomSourceString, 5, minCount);
  getCountOfStringsOfLengthAndMinCountMapWithNumbers(nonRandomSourceString, 5, minCount);
  getCountOfStringsOfLengthAndMinCountObj(nonRandomSourceString, 5, minCount);
  getCountOfStringsOfLengthAndMinCountObjectUsingNumber(nonRandomSourceString, 5, minCount);

  console.log('--- Benchmarking getCountOfStringsOfLengthAndMinCountMap (Map) ---');
  benchmark(
    getCountOfStringsOfLengthAndMinCountMap,
    'Map',
    randomSourceString,
    lengths,
    minCount,
    iterations,
  );

  console.log('--- Benchmarking getCountOfStringsOfLengthAndMinCountMapWithNumbers (Map with Numbers) ---');
  benchmark(
    getCountOfStringsOfLengthAndMinCountMapWithNumbers,
    'Map with Numbers',
    randomSourceString,
    lengths,
    minCount,
    iterations,
  );

  console.log('--- Benchmarking getCountOfStringsOfLengthAndMinCountObj (Object) ---');
  benchmark(
    getCountOfStringsOfLengthAndMinCountObj,
    'Object',
    randomSourceString,
    lengths,
    minCount,
    iterations,
  );

  console.log(
    '--- Benchmarking getCountOfStringsOfLengthAndMinCountObjectUsingNumber (Object with Numbers) ---',
  );
  benchmark(
    getCountOfStringsOfLengthAndMinCountObjectUsingNumber,
    'Object with Numbers',
    randomSourceString,
    lengths,
    minCount,
    iterations,
  );

  // Non Random
  console.log();

  console.log('--- Benchmarking getCountOfStringsOfLengthAndMinCountMap (Map) on non-random string ---');
  benchmark(
    getCountOfStringsOfLengthAndMinCountMap,
    'Map',
    nonRandomSourceString,
    lengths,
    minCount,
    iterations,
  );

  console.log(
    '--- Benchmarking getCountOfStringsOfLengthAndMinCountMapWithNumbers (Map with Numbers) on non-random string ---',
  );
  benchmark(
    getCountOfStringsOfLengthAndMinCountMapWithNumbers,
    'Map with Numbers',
    nonRandomSourceString,
    lengths,
    minCount,
    iterations,
  );

  console.log('--- Benchmarking getCountOfStringsOfLengthAndMinCountObj (Object) on non-random string ---');
  benchmark(
    getCountOfStringsOfLengthAndMinCountObj,
    'Object',
    nonRandomSourceString,
    lengths,
    minCount,
    iterations,
  );

  console.log(
    '--- Benchmarking getCountOfStringsOfLengthAndMinCountObjectUsingNumber (Object with Numbers) on non-random string ---',
  );
  benchmark(
    getCountOfStringsOfLengthAndMinCountObjectUsingNumber,
    'Object with Numbers',
    nonRandomSourceString,
    lengths,
    minCount,
    iterations,
  );
})();
