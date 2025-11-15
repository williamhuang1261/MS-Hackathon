/**
 * Collective Lotus State Manager - Tracks shared lotus growth
 */

export interface DonationRecord {
  amount: number;
  email: string;
  timestamp: number;
}

export interface CollectiveState {
  currentStage: number;  // 0-9
  totalFlowers: number;  // How many complete flowers
  donations: DonationRecord[];
}

export class CollectiveStateManager {
  private storageKey = 'shield-of-athena-lotus-collective';
  private state: CollectiveState;
  private listeners: Array<(state: CollectiveState) => void> = [];

  constructor() {
    this.state = this.loadState();
  }

  private loadState(): CollectiveState {
    if (typeof window === 'undefined') {
      return { currentStage: 0, totalFlowers: 0, donations: [] };
    }

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load state:', e);
    }

    return {
      currentStage: 0,
      totalFlowers: 0,
      donations: []
    };
  }

  private saveState(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  }

  getCurrentStage(): number {
    return this.state.currentStage;
  }

  getTotalFlowers(): number {
    return this.state.totalFlowers;
  }

  getDonationCount(): number {
    return this.state.donations.length;
  }

  getTotalDonationAmount(): number {
    return this.state.donations.reduce((sum, d) => sum + d.amount, 0);
  }

  addDonation(amount: number, email: string): boolean {
    const donation: DonationRecord = {
      amount,
      email,
      timestamp: Date.now()
    };

    this.state.donations.push(donation);
    this.state.currentStage++;

    // Flower completion
    if (this.state.currentStage >= 10) {
      this.state.currentStage = 0;
      this.state.totalFlowers++;
    }

    this.saveState();
    this.notifyListeners();

    return this.state.currentStage === 0; // Returns true if flower completed
  }

  getState(): CollectiveState {
    return { ...this.state };
  }

  addListener(callback: (state: CollectiveState) => void): void {
    this.listeners.push(callback);
  }

  removeListener(callback: (state: CollectiveState) => void): void {
    this.listeners = this.listeners.filter(cb => cb !== callback);
  }

  private notifyListeners(): void {
    this.listeners.forEach(callback => callback(this.getState()));
  }

  // For testing/demo
  reset(): void {
    this.state = {
      currentStage: 0,
      totalFlowers: 0,
      donations: []
    };
    this.saveState();
    this.notifyListeners();
  }
}

// Singleton instance
let instance: CollectiveStateManager | null = null;

export function getCollectiveStateManager(): CollectiveStateManager {
  if (!instance) {
    instance = new CollectiveStateManager();
  }
  return instance;
}

