'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Lock } from 'lucide-react';

interface PaymentFormProps {
    amount: number;
    isRecurring: boolean;
}

export default function PaymentForm({ amount, isRecurring }: PaymentFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isProcessing, setIsProcessing] = useState(false);

    const formatCardNumber = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        const groups = numbers.match(/.{1,4}/g);
        return groups ? groups.join(' ') : numbers;
    };

    const formatExpiryDate = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length >= 2) {
            return numbers.slice(0, 2) + '/' + numbers.slice(2, 4);
        }
        return numbers;
    };

    const handleInputChange = (field: string, value: string) => {
        let formattedValue = value;

        if (field === 'cardNumber') {
            formattedValue = formatCardNumber(value);
            if (formattedValue.replace(/\s/g, '').length > 16) return;
        } else if (field === 'expiryDate') {
            formattedValue = formatExpiryDate(value);
            if (formattedValue.length > 5) return;
        } else if (field === 'cvv') {
            formattedValue = value.replace(/\D/g, '');
            if (formattedValue.length > 3) return;
        } else if (field === 'zipCode') {
            formattedValue = value.replace(/\D/g, '');
            if (formattedValue.length > 5) return;
        }

        setFormData({ ...formData, [field]: formattedValue });
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
            newErrors.cardNumber = 'Please enter a valid 16-digit card number';
        }

        if (!formData.cardName || formData.cardName.length < 3) {
            newErrors.cardName = 'Please enter the cardholder name';
        }

        if (!formData.expiryDate || formData.expiryDate.length !== 5) {
            newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
        } else {
            const [month, year] = formData.expiryDate.split('/').map(Number);
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() % 100;
            const currentMonth = currentDate.getMonth() + 1;

            if (month < 1 || month > 12) {
                newErrors.expiryDate = 'Invalid month';
            } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
                newErrors.expiryDate = 'Card has expired';
            }
        }

        if (!formData.cvv || formData.cvv.length !== 3) {
            newErrors.cvv = 'Please enter a valid 3-digit CVV';
        }

        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.address || formData.address.length < 5) {
            newErrors.address = 'Please enter your billing address';
        }

        if (!formData.city || formData.city.length < 2) {
            newErrors.city = 'Please enter your city';
        }

        if (!formData.state || formData.state.length < 2) {
            newErrors.state = 'Please enter your state';
        }

        if (!formData.zipCode || formData.zipCode.length !== 5) {
            newErrors.zipCode = 'Please enter a valid 5-digit ZIP code';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsProcessing(true);

        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Store donation details for the success page
        sessionStorage.setItem(
            'donationDetails',
            JSON.stringify({
                amount,
                isRecurring,
                cardLast4: formData.cardNumber.slice(-4),
                email: formData.email,
                transactionId: 'TXN' + Date.now(),
                date: new Date().toISOString(),
            })
        );

        router.push('/donate/processing');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Card Information */}
            <div>
                <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Card Information
                </h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Card Number</label>
                        <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                            placeholder="1234 5678 9012 3456"
                            className={`w-full rounded-xl border-2 ${errors.cardNumber ? 'border-destructive' : 'border-border'
                                } bg-background px-4 py-3 focus:border-primary focus:outline-none transition-colors`}
                        />
                        {errors.cardNumber && (
                            <p className="mt-1 text-sm text-destructive">{errors.cardNumber}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                        <input
                            type="text"
                            value={formData.cardName}
                            onChange={(e) => handleInputChange('cardName', e.target.value)}
                            placeholder="John Doe"
                            className={`w-full rounded-xl border-2 ${errors.cardName ? 'border-destructive' : 'border-border'
                                } bg-background px-4 py-3 focus:border-primary focus:outline-none transition-colors`}
                        />
                        {errors.cardName && (
                            <p className="mt-1 text-sm text-destructive">{errors.cardName}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Expiry Date</label>
                            <input
                                type="text"
                                value={formData.expiryDate}
                                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                                placeholder="MM/YY"
                                className={`w-full rounded-xl border-2 ${errors.expiryDate ? 'border-destructive' : 'border-border'
                                    } bg-background px-4 py-3 focus:border-primary focus:outline-none transition-colors`}
                            />
                            {errors.expiryDate && (
                                <p className="mt-1 text-sm text-destructive">{errors.expiryDate}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">CVV</label>
                            <input
                                type="text"
                                value={formData.cvv}
                                onChange={(e) => handleInputChange('cvv', e.target.value)}
                                placeholder="123"
                                className={`w-full rounded-xl border-2 ${errors.cvv ? 'border-destructive' : 'border-border'
                                    } bg-background px-4 py-3 focus:border-primary focus:outline-none transition-colors`}
                            />
                            {errors.cvv && <p className="mt-1 text-sm text-destructive">{errors.cvv}</p>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div>
                <h3 className="mb-4 text-lg font-semibold">Contact Information</h3>
                <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        className={`w-full rounded-xl border-2 ${errors.email ? 'border-destructive' : 'border-border'
                            } bg-background px-4 py-3 focus:border-primary focus:outline-none transition-colors`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
                    <p className="mt-1 text-xs text-muted-foreground">
                        Receipt will be sent to this email
                    </p>
                </div>
            </div>

            {/* Billing Address */}
            <div>
                <h3 className="mb-4 text-lg font-semibold">Billing Address</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Street Address</label>
                        <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            placeholder="123 Main Street"
                            className={`w-full rounded-xl border-2 ${errors.address ? 'border-destructive' : 'border-border'
                                } bg-background px-4 py-3 focus:border-primary focus:outline-none transition-colors`}
                        />
                        {errors.address && (
                            <p className="mt-1 text-sm text-destructive">{errors.address}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">City</label>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                                placeholder="New York"
                                className={`w-full rounded-xl border-2 ${errors.city ? 'border-destructive' : 'border-border'
                                    } bg-background px-4 py-3 focus:border-primary focus:outline-none transition-colors`}
                            />
                            {errors.city && <p className="mt-1 text-sm text-destructive">{errors.city}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">State</label>
                            <input
                                type="text"
                                value={formData.state}
                                onChange={(e) => handleInputChange('state', e.target.value)}
                                placeholder="NY"
                                className={`w-full rounded-xl border-2 ${errors.state ? 'border-destructive' : 'border-border'
                                    } bg-background px-4 py-3 focus:border-primary focus:outline-none transition-colors`}
                            />
                            {errors.state && <p className="mt-1 text-sm text-destructive">{errors.state}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">ZIP Code</label>
                        <input
                            type="text"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                            placeholder="10001"
                            className={`w-full rounded-xl border-2 ${errors.zipCode ? 'border-destructive' : 'border-border'
                                } bg-background px-4 py-3 focus:border-primary focus:outline-none transition-colors`}
                        />
                        {errors.zipCode && (
                            <p className="mt-1 text-sm text-destructive">{errors.zipCode}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={!amount || isProcessing}
                className="w-full rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
                {isProcessing ? (
                    <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                        Processing...
                    </>
                ) : (
                    <>
                        <Lock className="h-5 w-5" />
                        Donate ${amount}
                        {isRecurring && '/month'}
                    </>
                )}
            </button>

            <p className="text-center text-xs text-muted-foreground">
                By completing this donation, you agree to our terms of service and privacy policy.
            </p>
        </form>
    );
}
