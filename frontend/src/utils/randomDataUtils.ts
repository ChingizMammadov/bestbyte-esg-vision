/**
 * Get a random integer between min and max (inclusive)
 * @param min Minimum value
 * @param max Maximum value
 * @returns Random integer
 */
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get a random float between min and max with specified precision
 * @param min Minimum value
 * @param max Maximum value
 * @param precision Number of decimal places
 * @returns Random float
 */
export function getRandomFloat(min: number, max: number, precision: number = 2): number {
  const val = Math.random() * (max - min) + min;
  return parseFloat(val.toFixed(precision));
}

/**
 * Get a random trend term
 * @returns 'reduction' or 'increase'
 */
export function getRandomTrend(): string {
  return Math.random() > 0.5 ? 'reduction' : 'increase';
}

/**
 * Get a random color in hex format
 * @returns Random hex color
 */
export function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Get a random item from an array
 * @param array Array to pick from
 * @returns Random item
 */
export function getRandomArrayItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generate an array of dates (as strings) going back from today
 * @param count Number of dates to generate
 * @param format Format of the date (default: 'MMM D')
 * @returns Array of date strings
 */
export function getRandomDateArray(count: number, format: string = 'MMM D'): string[] {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (count - i - 1));
    // Simple formatter that only handles MMM D format
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    result.push(`${month} ${day}`);
  }
  return result;
}

/**
 * Generate a random boolean with specified probability
 * @param probability Probability of returning true (default: 0.5)
 * @returns Random boolean
 */
export function getRandomBoolean(probability: number = 0.5): boolean {
  return Math.random() < probability;
}