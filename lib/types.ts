import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

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

export interface EmergencyContact {
  label: string;
  number: string;
  href: string;
}

export interface EmergencyBannerProps {
  isSticky?: boolean;
  isDismissible?: boolean;
  showLanguageNote?: boolean;
  contacts: EmergencyContact[];
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
}

export interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange?: (languageCode: string) => void;
  languages: Language[];
}

export interface CTAButton {
  text: string;
  href: string;
  variant: 'default' | 'destructive' | 'secondary' | 'outline';
  external?: boolean;
}

export interface TrustIndicator {
  stat: string;
  label: string;
  icon?: LucideIcon;
}

export interface HeroSectionProps {
  headline: string;
  subheadline: string;
  ctaButtons: CTAButton[];
  trustIndicators: TrustIndicator[];
  backgroundImage?: string;
}

export interface NavLink {
  label: string;
  href: string;
  dropdown?: Array<{ label: string; href: string }>;
}

export interface HeaderProps {
  navLinks: NavLink[];
  logoSrc?: string;
  logoText?: string;
  logoTagline?: string;
}

export type StatIcon = 'users' | 'home' | 'globe' | 'calendar' | 'building' | 'clock'

export interface Stat {
  value: string | number;
  label: string;
  icon: StatIcon;
  suffix?: string;
  isString?: boolean;
}

export interface QuickStatsProps {
  stats: Stat[];
  animateOnView?: boolean;
}

export interface Service {
  title: string;
  subtitle?: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  ctaText: string;
  ctaHref: string;
}

export interface ServicesOverviewProps {
  services: Service[];
  heading?: string;
  subheading?: string;
}

export interface Event {
  title: string;
  date: Date;
  time?: string;
  location?: string;
  description: string;
  ticketPrice?: number;
  ticketCurrency?: string;
  ticketLink?: string;
  sponsorshipEmail?: string;
  sponsorshipPhone?: string;
  image?: string;
  features?: string[];
}

export interface UpcomingEventsProps {
  primaryEvent: Event;
  secondaryEvents?: Event[];
  showSponsorship?: boolean;
}

export interface DonationOption {
  title: string;
  description: string;
  icon: LucideIcon;
  ctaText: string;
  ctaHref: string;
  external?: boolean;
  badge?: string;
}

export interface DonationCTAProps {
  heading?: string;
  subheading?: string;
  donationOptions: DonationOption[];
  showImpactStatement?: boolean;
  showFundraisingGoal?: boolean;
  currentFunds?: number;
  goalFunds?: number;
}

export interface Testimonial {
  quote: string;
  attribution: string;
  context?: string;
  language?: string;
  image?: string;
}

export interface ImpactStoriesProps {
  testimonials: Testimonial[];
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface OfficeInfo {
  name: string;
  address: string[];
  phone: string;
  email?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: LucideIcon;
}

export interface FooterProps {
  columns: FooterColumn[];
  offices: OfficeInfo[];
  socialLinks: SocialLink[];
  emergencyNumbers: EmergencyContact[];
  copyrightYear?: number;
}

