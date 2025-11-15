/**
 * Utility Functions
 * Reusable helper functions for the donation platform
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { DONOR_LEVELS, IMPACT_COST_PER_NIGHT } from './constants';

/**
 * Calculates the donor level based on total donation amount
 * @param amount - Total donation amount
 * @returns Donor level name
 */
export function getDonorLevel(amount: number): string {
  const level = DONOR_LEVELS.find(
    (level) => amount >= level.minAmount && amount <= level.maxAmount
  );
  return level?.name || 'Shelter Guardian';
}

/**
 * Calculates the next donor level based on current amount
 * @param amount - Current donation amount
 * @returns Next level name and required amount, or null if at max level
 */
export function getNextDonorLevel(amount: number): { level: string; amount: number } | null {
  const currentLevelIndex = DONOR_LEVELS.findIndex(
    (level) => amount >= level.minAmount && amount <= level.maxAmount
  );
  
  if (currentLevelIndex === -1 || currentLevelIndex === DONOR_LEVELS.length - 1) {
    return null;
  }
  
  const nextLevel = DONOR_LEVELS[currentLevelIndex + 1];
  return {
    level: nextLevel.name,
    amount: nextLevel.minAmount,
  };
}

/**
 * Calculates impact description based on donation amount
 * @param amount - Donation amount
 * @returns Array of impact items
 */
export function getImpactItems(amount: number): string[] {
  const items: string[] = [];
  
  if (amount >= 35) items.push('1 night of shelter');
  if (amount >= 20) {
    items.push('1 warm meal');
    items.push('1 emergency support kit');
  }
  if (amount >= 50) items.push('1 therapy session');
  if (amount >= 100) items.push('Full day of support for mother & child');
  if (amount >= 250) items.push('One week of stability and safety');
  
  return items.length > 0 ? items : ['Emergency support contribution'];
}

/**
 * Calculates impact message for notification banner
 * @param amount - Donation amount
 * @returns Impact description string
 */
export function calculateImpact(amount: number): string {
  const nights = Math.floor(amount / IMPACT_COST_PER_NIGHT);
  
  if (nights === 0) return 'provided emergency supplies';
  if (nights === 1) return 'sheltered 1 woman for the night';
  if (nights === 2) return 'sheltered 2 women for the night';
  if (nights <= 4) return `provided ${nights} safe nights of shelter`;
  if (nights <= 7) return `sheltered a mother and child for ${Math.floor(nights / 2)} nights`;
  if (nights <= 14) return 'provided a full week of safety for a family';
  if (nights <= 30) return 'provided 2 weeks of shelter and support';
  
  const weeks = Math.floor(nights / 7);
  return `provided ${weeks} weeks of safety for a family`;
}

/**
 * Generates a realistic donation amount within a range
 * @param min - Minimum amount
 * @param max - Maximum amount
 * @returns Rounded donation amount
 */
export function getRandomAmount(min: number, max: number): number {
  const amount = Math.floor(Math.random() * (max - min + 1)) + min;
  
  if (amount < 100) {
    return Math.round(amount / 5) * 5;
  } else if (amount < 500) {
    return Math.round(amount / 25) * 25;
  } else if (amount < 2000) {
    return Math.round(amount / 50) * 50;
  } else {
    return Math.round(amount / 100) * 100;
  }
}

/**
 * Formats currency amount
 * @param amount - Amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString()}`;
}

/**
 * Safely retrieves item from localStorage
 * @param key - Storage key
 * @returns Stored value or null
 */
export function getStorageItem(key: string): string | null {
  if (typeof window === 'undefined') return null;
  
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
}

/**
 * Safely sets item in localStorage
 * @param key - Storage key
 * @param value - Value to store
 */
export function setStorageItem(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
}

/**
 * Tailwind-compatible className merger
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

