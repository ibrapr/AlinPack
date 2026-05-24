import type { Locale } from '@/i18n/config';

export type LocalizedString = Record<Locale, string>;
export type LocalizedStringArray = Record<Locale, string[]>;

export type MachineCategory =
  | 'filling'
  | 'sealing'
  | 'capping'
  | 'wrapping'
  | 'labeling'
  | 'line';

export type ProductGroup =
  | 'food'
  | 'cosmetics'
  | 'chemicals'
  | 'pet'
  | 'containers';

export interface Machine {
  slug: string;
  name: LocalizedString;
  category: MachineCategory;
  shortDescription: LocalizedString;
  description: LocalizedString;
  features: LocalizedStringArray;
  benefits: LocalizedStringArray;
  specs: {
    label: LocalizedString;
    value: LocalizedString;
  }[];
  compatibleProductSlugs: string[];
  faqs: {
    question: LocalizedString;
    answer: LocalizedString;
  }[];
  image?: string;
  gallery?: string[];
  /**
   * YouTube, Vimeo, or direct video URLs showing the machine in action.
   * YouTube/Vimeo links are auto-detected and rendered as embedded players;
   * other URLs (e.g. .mp4) play with the native <video> element.
   */
  videos?: string[];
  featured?: boolean;
}

export interface Product {
  slug: string;
  name: LocalizedString;
  group: ProductGroup;
  shortDescription: LocalizedString;
  description: LocalizedString;
  packagingNeeds: LocalizedStringArray;
  packagingTypes: LocalizedStringArray;
  icon?: string;
  image?: string;
}

export interface Service {
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: string;
}

export interface Client {
  name: string;
  industry: LocalizedString;
  logo?: string;
  image?: string;
}

export interface SuccessStory {
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  industry: LocalizedString;
}
