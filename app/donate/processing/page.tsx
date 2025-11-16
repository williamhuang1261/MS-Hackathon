'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Loader2 } from 'lucide-react';

const PROCESSING_MESSAGES = [
    'Securing your donation...',
    'Verifying payment details...',
    'Processing transaction...',
    'Connecting to payment gateway...',
    'Finalizing your contribution...',
];

export default function ProcessingPage() {
    const router = useRouter();
    const [messageIndex, setMessageIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Rotate through processing messages
        const messageInterval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % PROCESSING_MESSAGES.length);
        }, 800);

        // Animate progress bar
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);

        // Simulate processing time (3-4 seconds)
        const processingTime = 3000 + Math.random() * 1000;
        const timer = setTimeout(() => {
            router.push('/donate/success');
        }, processingTime);

        return () => {
            clearInterval(messageInterval);
            clearInterval(progressInterval);
            clearTimeout(timer);
        };
    }, [router]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
            <div className="max-w-md w-full">
                <div className="rounded-3xl bg-card p-12 shadow-lg text-center">
                    {/* Animated Icon */}
                    <div className="mb-8 relative">
                        <div className="mx-auto h-24 w-24 relative">
                            {/* Outer spinning ring */}
                            <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-spin border-t-primary" />

                            {/* Inner pulsing circle */}
                            <div className="absolute inset-2 rounded-full bg-primary/10 animate-pulse flex items-center justify-center">
                                <Loader2 className="h-10 w-10 text-primary animate-spin" />
                            </div>
                        </div>
                    </div>

                    {/* Processing Message */}
                    <h1 className="mb-4 text-3xl font-serif">Processing Your Donation</h1>

                    <div className="mb-8 h-8">
                        <p className="text-lg text-muted-foreground animate-pulse transition-opacity duration-300">
                            {PROCESSING_MESSAGES[messageIndex]}
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{progress}%</p>
                    </div>

                    {/* Security Message */}
                    <div className="rounded-xl bg-accent/20 p-4">
                        <div className="flex items-center justify-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">
                                Secure 256-bit SSL encryption
                            </span>
                        </div>
                    </div>

                    <p className="mt-6 text-xs text-muted-foreground">
                        Please do not close this window or press the back button
                    </p>
                </div>
            </div>
        </div>
    );
}
