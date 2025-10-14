/**
 * Formats a number into a string with commas for thousand separators.
 * It handles up to 2 decimal places.
 * @param num - The number to format.
 * @returns The formatted number string.
 */
export const formatNumberWithCommas = (num: number): string => {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

/**
 * Parses a comma-formatted number string into a number.
 * @param str - The string to parse.
 * @returns The parsed number, defaulting to 0 for invalid input.
 */
export const parseNumberWithCommas = (str: string): number => {
  const sanitizedString = str.replace(/,/g, "");
  const number = parseFloat(sanitizedString);
  return isNaN(number) ? 0 : number;
};
