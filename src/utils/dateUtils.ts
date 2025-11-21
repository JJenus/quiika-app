import { formatDistanceToNow, isValid, parseISO } from 'date-fns';

/**
 * Safely formats a date string to relative time (e.g., "2 days ago")
 * Returns fallback text if date is invalid
 */
export const safeFormatDistanceToNow = (
  dateString: string | null | undefined, 
  fallback: string = 'Unknown'
): string => {
  if (!dateString) return fallback;
  
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return fallback;
    
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.warn('Invalid date format:', dateString, error);
    return fallback;
  }
};

/**
 * Safely formats a date to locale string
 */
export const safeToLocaleDateString = (
  dateString: string | null | undefined,
  fallback: string = 'Unknown'
): string => {
  if (!dateString) return fallback;
  
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return fallback;
    
    return date.toLocaleDateString();
  } catch (error) {
    console.warn('Invalid date format:', dateString, error);
    return fallback;
  }
};