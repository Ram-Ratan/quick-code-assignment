/**
 * Checks the number padding consistency in a collection of numeric strings.
 *
 * @param intStrs - An iterable collection of strings containing only digits
 * @returns
 * - Returns 0 for invalid input.
 * - Returns -1 if any string contains invalid characters
 * - Returns the consistent padding length if all numbers have same padding
 * - Returns 1 if collection contains any single digit number (1-9)
 * - Returns negative of minimum length if padding is inconsistent
 *
 * @example
 * ```ts
 * checkNumberPadding(['1', '2', '3']) // returns 1
 * checkNumberPadding(['01', '02', '03']) // returns 2
 * checkNumberPadding(['1', '02', '003']) // returns -1
 * checkNumberPadding(['abc']) // returns -1
 * checkNumberPadding([]) // returns 0
 * ```
 */
export function checkNumberPadding(input: Iterable<string>): number {
  if (!input) {
    return 0;
  }
  const intStrs = Array.from(input);
  if (intStrs.length === 0) {
    return 0;
  }

  let minLength = Infinity;
  let maxLength = -Infinity;
  let hasLeadingZeros = false;
  let hasSingleDigit = false;
  let observedPaddingLength = new Set<number>();

  for (const str of intStrs) {
    if (!/^\d+$/.test(str)) return -1;
    const numLength = str.length;
    minLength = Math.min(minLength, numLength);
    maxLength = Math.max(maxLength, numLength);

    if (/^0\d+/.test(str)) {
      hasLeadingZeros = true;
      observedPaddingLength.add(numLength);
    }
    let temp = parseInt(str, 10);
    if (temp >= 1 && temp <= 9) {
      hasSingleDigit = true;
    }
  }

  if (hasLeadingZeros) {
    return observedPaddingLength.size === 1 ? minLength : -1;
  }

  if (hasSingleDigit) {
    return 1;
  }

  return minLength === maxLength ? minLength : -minLength;
}
const testCases: any = [
  // types is defined as any to test our function with any kind of input
  ["001", "002"],
  ["001", "002", "9999"],
  ["1", "2", "999"],
  ["999", "999"],
  ["99", "999", "9999"],
  ["01", "002"],
  [],
  null,
  undefined,
  "1234",
  1234,
];

for (const testCase of testCases) {
  console.log(checkNumberPadding(testCase));
}
