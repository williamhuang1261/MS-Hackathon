import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import EmergencyBanner from '@/app/components/EmergencyBanner'
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import NotificationBanner from '@/app/components/NotificationBanner'
import {
    EMERGENCY_CONTACTS,
    FOOTER_COLUMNS,
    NAV_LINKS,
    OFFICE_LOCATIONS,
    SOCIAL_LINKS,
} from '@/lib/constants'

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages({ locale });

    return (
        <NextIntlClientProvider messages={messages}>
            <EmergencyBanner contacts={EMERGENCY_CONTACTS} showLanguageNote isSticky isDismissible />
            <Header navLinks={NAV_LINKS} logoText="Shield of Athena" logoTagline="Family Services" />
            <NotificationBanner />
            {children}
            <Footer
                columns={FOOTER_COLUMNS}
                offices={OFFICE_LOCATIONS}
                socialLinks={SOCIAL_LINKS}
                emergencyNumbers={EMERGENCY_CONTACTS}
            />
        </NextIntlClientProvider>
    );
}
