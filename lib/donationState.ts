/**
 * Global donation state management
 * Simple singleton pattern for tracking total donations across the app
 */

class DonationStateManager {
  private totalAmount: number = 50000; // Set your starting amount
  private listeners: Set<(amount: number) => void> = new Set();

  getTotalAmount(): number {
    return this.totalAmount;
  }

  addDonation(amount: number): number {
    this.totalAmount += amount;
    this.notifyListeners();
    return this.totalAmount;
  }

  setTotalAmount(amount: number): void {
    this.totalAmount = amount;
    this.notifyListeners();
  }

  subscribe(listener: (amount: number) => void): () => void {
    this.listeners.add(listener);
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.totalAmount));
  }
}

// Export singleton instance
export const donationState = new DonationStateManager();

