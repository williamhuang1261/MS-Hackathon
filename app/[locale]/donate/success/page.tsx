'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Download, Mail, Calendar, CreditCard, Heart, Share2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DonationDetails {
    amount: number;
    isRecurring: boolean;
    cardLast4: string;
    email: string;
    transactionId: string;
    date: string;
}

export default function SuccessPage() {
    const router = useRouter();
    const [details, setDetails] = useState<DonationDetails | null>(null);
    const [showShareOptions, setShowShareOptions] = useState(false);

    useEffect(() => {
        // Trigger confetti animation
        const duration = 3000;
        const end = Date.now() + duration;

        const colors = ['#8B5CF6', '#A78BFA', '#C4B5FD'];

        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors,
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();

        // Load donation details from session storage
        const storedDetails = sessionStorage.getItem('donationDetails');
        if (storedDetails) {
            setDetails(JSON.parse(storedDetails));
        } else {
            // Fallback if no details found
            router.push('/donate');
        }
    }, [router]);

    const handleDownloadReceipt = () => {
        if (!details) return;

        const receiptContent = `
DONATION RECEIPT
================

Transaction ID: ${details.transactionId}
Date: ${new Date(details.date).toLocaleDateString()}
Amount: $${details.amount}
${details.isRecurring ? 'Frequency: Monthly Recurring' : 'Type: One-time'}
Payment Method: Card ending in ${details.cardLast4}
Email: ${details.email}

Thank you for your generous support!
Your donation is tax-deductible.
Tax ID: 12-3456789

Hearts United Support Services
www.heartsunited.org
support@heartsunited.org
    `.trim();

        const blob = new Blob([receiptContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `donation-receipt-${details.transactionId}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleShare = (platform: string) => {
        const message = `I just donated to Hearts United Support Services to help survivors of domestic violence. Join me in making a difference! 💜`;
        const url = 'https://heartsunited.org/donate';

        const shareUrls: Record<string, string> = {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        };

        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
    };

    if (!details) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-16">
            <div className="container mx-auto max-w-4xl px-6">
                {/* Success Header */}
                <div className="text-center mb-12">
                    <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center animate-scale-in">
                        <CheckCircle2 className="h-16 w-16 text-primary" />
                    </div>

                    <h1 className="mb-4 text-4xl font-serif md:text-5xl">
                        Thank You for Your Generosity! 💜
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Your donation of <span className="font-bold text-primary">${details.amount}</span>
                        {details.isRecurring && ' per month'} will help survivors rebuild their lives with dignity and hope.
                    </p>
                </div>

                {/* Receipt Card */}
                <div className="rounded-3xl bg-card p-8 shadow-lg mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-serif">Donation Receipt</h2>
                        <button
                            onClick={handleDownloadReceipt}
                            className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
                        >
                            <Download className="h-4 w-4" />
                            Download
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between py-3 border-b border-border">
                            <span className="text-muted-foreground">Transaction ID:</span>
                            <span className="font-mono font-medium">{details.transactionId}</span>
                        </div>

                        <div className="flex justify-between py-3 border-b border-border">
                            <span className="text-muted-foreground">Date:</span>
                            <span className="font-medium">{new Date(details.date).toLocaleDateString()}</span>
                        </div>

                        <div className="flex justify-between py-3 border-b border-border">
                            <span className="text-muted-foreground">Amount:</span>
                            <span className="text-2xl font-bold text-primary">${details.amount}</span>
                        </div>

                        {details.isRecurring && (
                            <div className="flex justify-between py-3 border-b border-border">
                                <span className="text-muted-foreground">Frequency:</span>
                                <span className="font-medium flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Monthly Recurring
                                </span>
                            </div>
                        )}

                        <div className="flex justify-between py-3 border-b border-border">
                            <span className="text-muted-foreground">Payment Method:</span>
                            <span className="font-medium flex items-center gap-2">
                                <CreditCard className="h-4 w-4" />
                                •••• {details.cardLast4}
                            </span>
                        </div>

                        <div className="flex justify-between py-3 border-b border-border">
                            <span className="text-muted-foreground">Email:</span>
                            <span className="font-medium">{details.email}</span>
                        </div>
                    </div>

                    <div className="mt-6 rounded-xl bg-accent/20 p-4">
                        <div className="flex items-start gap-3">
                            <Mail className="h-5 w-5 text-primary mt-0.5" />
                            <div className="text-sm">
                                <p className="font-medium mb-1">Receipt Sent</p>
                                <p className="text-muted-foreground">
                                    A detailed receipt has been sent to {details.email}. Please keep it for your tax records.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Impact Message */}
                <div className="rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 p-8 mb-8">
                    <div className="flex items-start gap-4">
                        <Heart className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-2xl font-serif mb-3">Your Impact</h3>
                            <p className="text-muted-foreground mb-4">
                                Your generous donation will directly support:
                            </p>
                            <ul className="space-y-2">
                                {details.amount >= 1000 && (
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <span>A full month of professional therapy sessions for a survivor</span>
                                    </li>
                                )}
                                {details.amount >= 250 && (
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <span>Emergency housing assistance to help someone escape danger</span>
                                    </li>
                                )}
                                {details.amount >= 100 && (
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <span>24/7 crisis intervention and support services</span>
                                    </li>
                                )}
                                {details.amount >= 50 && (
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                        <span>Legal consultation and advocacy support</span>
                                    </li>
                                )}
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Essential resources for rebuilding lives with dignity</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Share Section */}
                <div className="rounded-3xl bg-card p-8 shadow-lg mb-8">
                    <h3 className="text-xl font-serif mb-4">Inspire Others</h3>
                    <p className="text-muted-foreground mb-6">
                        Share your support and inspire others to join the cause
                    </p>

                    <button
                        onClick={() => setShowShareOptions(!showShareOptions)}
                        className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                        <Share2 className="h-5 w-5" />
                        Share Your Impact
                    </button>

                    {showShareOptions && (
                        <div className="mt-4 flex gap-3 animate-fade-in">
                            <button
                                onClick={() => handleShare('twitter')}
                                className="flex-1 rounded-xl border-2 border-border px-4 py-3 font-medium hover:border-primary hover:bg-primary/5 transition-colors"
                            >
                                Twitter
                            </button>
                            <button
                                onClick={() => handleShare('facebook')}
                                className="flex-1 rounded-xl border-2 border-border px-4 py-3 font-medium hover:border-primary hover:bg-primary/5 transition-colors"
                            >
                                Facebook
                            </button>
                            <button
                                onClick={() => handleShare('linkedin')}
                                className="flex-1 rounded-xl border-2 border-border px-4 py-3 font-medium hover:border-primary hover:bg-primary/5 transition-colors"
                            >
                                LinkedIn
                            </button>
                        </div>
                    )}
                </div>

                {/* Next Steps */}
                <div className="rounded-3xl bg-card p-8 shadow-lg">
                    <h3 className="text-xl font-serif mb-6">What's Next?</h3>

                    <div className="space-y-4">
                        <button
                            onClick={() => router.push('/')}
                            className="w-full rounded-xl border-2 border-border px-6 py-4 text-left hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-between group"
                        >
                            <div>
                                <p className="font-semibold mb-1">Return to Homepage</p>
                                <p className="text-sm text-muted-foreground">
                                    Learn more about our programs and impact
                                </p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </button>

                        <button
                            onClick={() => router.push('/donate/payment')}
                            className="w-full rounded-xl border-2 border-border px-6 py-4 text-left hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-between group"
                        >
                            <div>
                                <p className="font-semibold mb-1">Make Another Donation</p>
                                <p className="text-sm text-muted-foreground">
                                    Double your impact today
                                </p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </button>

                        {!details.isRecurring && (
                            <button
                                onClick={() => router.push('/donate/payment')}
                                className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-4 text-left text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-between group"
                            >
                                <div>
                                    <p className="font-semibold mb-1">Set Up Monthly Giving</p>
                                    <p className="text-sm opacity-90">
                                        Provide consistent support to survivors in need
                                    </p>
                                </div>
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        )}
                    </div>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-8">
                    Questions? Contact us at{' '}
                    <a href="mailto:donations@heartsunited.org" className="text-primary hover:underline">
                        donations@heartsunited.org
                    </a>
                </p>
            </div>
        </div>
    );
}
