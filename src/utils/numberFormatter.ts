import currency from "currency.js";

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

/**
 * Converts a decimal amount to integer representation (e.g., 9.34 => 934)
 * Useful for storing monetary values without floating point precision issues.
 * @param decimal - The decimal number to convert.
 * @returns The integer representation (multiplied by 100).
 */
export const decimalToInteger = (decimal: number): number => {
	return currency(decimal, { precision: 2 }).multiply(100).value;
};

/**
 * Converts an integer amount back to decimal representation (e.g., 934 => 9.34)
 * @param integer - The integer to convert.
 * @returns The decimal representation (divided by 100).
 */
export const integerToDecimal = (integer: number): number => {
	return currency(integer, { precision: 2 }).divide(100).value;
};

/**
 * Formats a currency amount from integer representation to a display string.
 * @param amount - The amount in integer representation (e.g., 934 for $9.34).
 * @param currencyCode - The currency code (default: 'USD').
 * @returns Formatted currency string.
 */
export const formatCurrency = (
	amount: number,
	currencyCode: string = "NGN",
	toDecimal = false
): string => {
	const decimalAmount = toDecimal ? integerToDecimal(amount) : amount;

	return currency(decimalAmount, {
		symbol: getCurrencySymbol(currencyCode),
		precision: 2,
		separator: ",",
		decimal: ".",
		pattern: getCurrencyPattern(currencyCode),
	}).format();
};

/**
 * Parses a currency string into integer representation.
 * @param currencyString - The currency string to parse (e.g., "$9.34").
 * @returns The amount in integer representation (e.g., 934).
 */
export const parseCurrencyToInteger = (currencyString: string): number => {
	const decimalValue = currency(currencyString, {
		precision: 2,
		separator: ",",
		decimal: ".",
		symbol: "",
	}).value;

	return decimalToInteger(decimalValue);
};

/**
 * Safely adds two monetary values in integer representation.
 * @param a - First amount in integer representation.
 * @param b - Second amount in integer representation.
 * @returns Sum in integer representation.
 */
export const addCurrency = (a: number, b: number): number => {
	const result = currency(integerToDecimal(a)).add(integerToDecimal(b));
	return decimalToInteger(result.value);
};

/**
 * Safely subtracts two monetary values in integer representation.
 * @param a - First amount in integer representation.
 * @param b - Second amount in integer representation.
 * @returns Difference in integer representation.
 */
export const subtractCurrency = (a: number, b: number): number => {
	const result = currency(integerToDecimal(a)).subtract(integerToDecimal(b));
	return decimalToInteger(result.value);
};

/**
 * Safely multiplies a monetary value by a factor.
 * @param amount - Amount in integer representation.
 * @param factor - Multiplication factor.
 * @returns Product in integer representation.
 */
export const multiplyCurrency = (amount: number, factor: number): number => {
	const result = currency(integerToDecimal(amount)).multiply(factor);
	return decimalToInteger(result.value);
};

/**
 * Safely divides a monetary value by a divisor.
 * @param amount - Amount in integer representation.
 * @param divisor - Division divisor.
 * @returns Quotient in integer representation.
 */
export const divideCurrency = (amount: number, divisor: number): number => {
	const result = currency(integerToDecimal(amount)).divide(divisor);
	return decimalToInteger(result.value);
};

/**
 * Compares two monetary values in integer representation.
 * @param a - First amount in integer representation.
 * @param b - Second amount in integer representation.
 * @returns Negative if a < b, positive if a > b, zero if equal.
 */
export const compareCurrency = (a: number, b: number): number => {
	return currency(integerToDecimal(a)).subtract(integerToDecimal(b)).value;
};

/**
 * Gets currency symbol for a given currency code.
 * @param currencyCode - ISO currency code.
 * @returns Currency symbol.
 */
export const getCurrencySymbol = (currencyCode: string): string => {
	const symbols: Record<string, string> = {
		USD: "$",
		EUR: "€",
		GBP: "£",
		JPY: "¥",
		CAD: "C$",
		AUD: "A$",
		CHF: "CHF",
		CNY: "¥",
		INR: "₹",
		NGN: "₦",
	};
	return symbols[currencyCode.toUpperCase()] || currencyCode;
};

/**
 * Gets currency pattern for formatting.
 * @param currencyCode - ISO currency code.
 * @returns Format pattern.
 */
export const getCurrencyPattern = (currencyCode: string): string => {
	// Default pattern: symbol before amount
	// return '%s%v';
	return "!#";
};

/**
 * Validates if a number is a valid monetary amount.
 * @param amount - The amount to validate.
 * @returns True if valid.
 */
export const isValidMonetaryAmount = (amount: number): boolean => {
	return !isNaN(amount) && isFinite(amount) && amount >= 0;
};
