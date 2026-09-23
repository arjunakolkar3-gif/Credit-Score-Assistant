/**
 * Currency and numerical formatting utilities
 */
import { formatCurrency, formatPercentage } from './calculations';

export const formatINR = (amount: number, includeDecimals = false): string => {
  return formatCurrency(amount, includeDecimals);
};

export { formatCurrency, formatPercentage };
