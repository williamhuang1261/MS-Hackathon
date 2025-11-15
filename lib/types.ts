/**
 * TypeScript Type Definitions
 * Centralized type definitions for the donation platform
 */

export type DonationType = 'one-time' | 'monthly';

export interface DonationTier {
  amount: number;
  label: string;
  description: string;
}

export interface DonorLevel {
  name: string;
  minAmount: number;
  maxAmount: number;
  emoji: string;
  level: number;
}

export interface DonorBadgeProps {
  level: string;
  amount: number;
}

export interface ImpactStory {
  title: string;
  content: string[];
}

export interface SurvivorStory {
  text: string;
  name: string;
}

export interface NotificationDonation {
  emoji: string;
  level: string;
  amount: number;
  impact: string;
}

