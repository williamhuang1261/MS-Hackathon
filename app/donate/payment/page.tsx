'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Building2, Wallet } from 'lucide-react';
import PaymentForm from '@/app/components/PaymentForm';

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000];

export default function PaymentPage() {
    const router = useRouter();
    const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
    const [customAmount, setCustomAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'bank'>('card');
    const [isRecurring, setIsRecurring] = useState(false);

    const handleAmountSelect = (amount: number) => {
        setSelectedAmount(amount);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (value: string) => {
        const numValue = value.replace(/[^0-9]/g, '');
        setCustomAmount(numValue);
        if (numValue) {
            setSelectedAmount(parseInt(numValue));
        }
    };

    const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;

    return (
        <div className="min-h-screen bg-background py-16">
            <div className="container mx-auto max-w-4xl px-6">
                <div className="mb-8">
                    <button
                        onClick={() => router.back()}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        ← Back
                    </button>
                </div>

                <h1 className="mb-2 text-4xl font-serif">Complete Your Donation</h1>
                <p className="mb-12 text-lg text-muted-foreground">
                    Your support helps survivors rebuild their lives with dignity and hope.
                </p>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Payment Form */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Amount Selection */}
                        <section className="rounded-3xl bg-card p-8 shadow-lg">
                            <h2 className="mb-6 text-2xl font-serif">Select Amount</h2>

                            <div className="grid grid-cols-3 gap-3 mb-6">
                                {PRESET_AMOUNTS.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => handleAmountSelect(amount)}
                                        className={`rounded-xl border-2 py-4 text-lg font-semibold transition-all ${selectedAmount === amount && !customAmount
                                                ? 'border-primary bg-primary text-primary-foreground'
                                                : 'border-border hover:border-primary'
                                            }`}
                                    >
                                        ${amount}
                                    </button>
                                ))}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Custom Amount</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-muted-foreground">
                                        $
                                    </span>
                                    <input
                                        type="text"
                                        value={customAmount}
                                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                                        placeholder="Enter custom amount"
                                        className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 pl-8 text-lg focus:border-primary focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="recurring"
                                    checked={isRecurring}
                                    onChange={(e) => setIsRecurring(e.target.checked)}
                                    className="h-5 w-5 rounded border-border text-primary focus:ring-primary"
                                />
                                <label htmlFor="recurring" className="text-sm">
                                    Make this a monthly recurring donation
                                </label>
                            </div>
                        </section>

                        {/* Payment Method Selection */}
                        <section className="rounded-3xl bg-card p-8 shadow-lg">
                            <h2 className="mb-6 text-2xl font-serif">Payment Method</h2>

                            <div className="grid gap-3 mb-8">
                                <button
                                    onClick={() => setPaymentMethod('card')}
                                    className={`flex items-center gap-4 rounded-xl border-2 p-4 transition-all ${paymentMethod === 'card'
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border hover:border-primary'
                                        }`}
                                >
                                    <CreditCard className="h-6 w-6" />
                                    <span className="font-medium">Credit / Debit Card</span>
                                </button>

                                <button
                                    onClick={() => setPaymentMethod('paypal')}
                                    className={`flex items-center gap-4 rounded-xl border-2 p-4 transition-all ${paymentMethod === 'paypal'
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border hover:border-primary'
                                        }`}
                                >
                                    <Wallet className="h-6 w-6" />
                                    <span className="font-medium">PayPal</span>
                                </button>

                                <button
                                    onClick={() => setPaymentMethod('bank')}
                                    className={`flex items-center gap-4 rounded-xl border-2 p-4 transition-all ${paymentMethod === 'bank'
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border hover:border-primary'
                                        }`}
                                >
                                    <Building2 className="h-6 w-6" />
                                    <span className="font-medium">Bank Transfer</span>
                                </button>
                            </div>

                            {/* Payment Form */}
                            {paymentMethod === 'card' && (
                                <PaymentForm amount={finalAmount || 0} isRecurring={isRecurring} />
                            )}

                            {paymentMethod === 'paypal' && (
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground mb-4">
                                        You will be redirected to PayPal to complete your donation.
                                    </p>
                                    <button
                                        onClick={() => router.push('/donate/processing')}
                                        className="rounded-xl bg-[#0070ba] px-8 py-3 text-white font-semibold hover:bg-[#005ea6] transition-colors"
                                    >
                                        Continue to PayPal
                                    </button>
                                </div>
                            )}

                            {paymentMethod === 'bank' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Bank Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your bank name"
                                            className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Account Number</label>
                                        <input
                                            type="text"
                                            placeholder="Enter account number"
                                            className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Routing Number</label>
                                        <input
                                            type="text"
                                            placeholder="Enter routing number"
                                            className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 focus:border-primary focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <button
                                        onClick={() => router.push('/donate/processing')}
                                        disabled={!finalAmount}
                                        className="mt-4 w-full rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Complete Donation
                                    </button>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="rounded-3xl bg-card p-8 shadow-lg sticky top-8">
                            <h3 className="mb-6 text-xl font-serif">Donation Summary</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Amount:</span>
                                    <span className="text-2xl font-semibold">
                                        ${finalAmount || 0}
                                    </span>
                                </div>

                                {isRecurring && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Frequency:</span>
                                        <span className="font-medium">Monthly</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Processing Fee:</span>
                                    <span className="font-medium">$0.00</span>
                                </div>
                            </div>

                            <div className="border-t border-border pt-4 mb-6">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-lg font-medium">Total:</span>
                                    <span className="text-3xl font-bold text-primary">
                                        ${finalAmount || 0}
                                    </span>
                                </div>
                                {isRecurring && (
                                    <p className="text-xs text-muted-foreground mt-2">per month</p>
                                )}
                            </div>

                            <div className="rounded-xl bg-accent/20 p-4 text-sm">
                                <p className="font-medium mb-2">Your Impact:</p>
                                <ul className="space-y-1 text-muted-foreground">
                                    {finalAmount && finalAmount >= 1000 && (
                                        <li>• Fund a month of therapy sessions</li>
                                    )}
                                    {finalAmount && finalAmount >= 250 && (
                                        <li>• Provide emergency housing assistance</li>
                                    )}
                                    {finalAmount && finalAmount >= 100 && (
                                        <li>• Supply crisis intervention services</li>
                                    )}
                                    {finalAmount && finalAmount >= 50 && (
                                        <li>• Offer legal consultation support</li>
                                    )}
                                    {finalAmount && finalAmount >= 25 && (
                                        <li>• Provide immediate support resources</li>
                                    )}
                                </ul>
                            </div>

                            <p className="mt-6 text-xs text-muted-foreground text-center">
                                🔒 Your payment is secure and encrypted
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
