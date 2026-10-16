import {
  AboutPillar,
  AiCapability,
  ChatMessage,
  ContactChannel,
  FaqItem,
  NavLink,
  ProcessStep,
  ProjectItem,
  SectorItem,
  ServiceGroup,
  ServiceItem,
} from '../../shared/models/site.models';
import { QuoteTemplate } from '../../shared/utils/whatsapp';

export type Lang = 'es' | 'en' | 'pt';

export interface LangOption {
  code: Lang;
  /** Language name in its own language, as shown in the switcher. */
  label: string;
  /** Flag shown next to the language. */
  flag: 'co' | 'us' | 'br';
}

export const LANGS: LangOption[] = [
  { code: 'es', label: 'Español', flag: 'co' },
  { code: 'en', label: 'English', flag: 'us' },
  { code: 'pt', label: 'Português', flag: 'br' },
];

export type ServicePageKey = 'pos' | 'bot' | 'ia';

export interface QuizOption {
  value: string;
  label: string;
  icon: string;
}

export interface ServicePage {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  highlight: string;
  body: string;
  benefits: { icon: string; title: string; description: string }[];
  idealFor: string[];
  faq: FaqItem[];
  whatsappMessage: string;
}

export interface AppCopy {
  title: string;
  nav: NavLink[];
  header: {
    quote: string;
    openMenu: string;
    language: string;
    theme: string;
  };
  whatsapp: {
    href: string;
    phone: string;
  };
  floating: {
    label: string;
    aria: string;
  };
  announcement: {
    badge: string;
    text: string;
    cta: string;
    href: string;
    close: string;
  };
  mobileBar: {
    quote: string;
    ask: string;
  };
  quiz: {
    eyebrow: string;
    title: string;
    intro: string;
    step: string;
    back: string;
    restart: string;
    questions: { question: string; options: QuizOption[] }[];
    resultTitle: string;
    resultBody: string;
    recommended: string;
    cta: string;
    /** WhatsApp summary; {business}, {goal}, {timeline} and {solutions} are replaced. */
    message: string;
  };
  calculator: {
    eyebrow: string;
    title: string;
    intro: string;
    messages: string;
    receipts: string;
    perDay: string;
    resultLabel: string;
    hoursUnit: string;
    days: string;
    note: string;
    cta: string;
    /** {messages} and {receipts} are replaced. */
    message: string;
  };
  servicePages: {
    details: string;
    benefitsTitle: string;
    idealTitle: string;
    projectTitle: string;
    faqTitle: string;
    ask: string;
    pages: Record<ServicePageKey, ServicePage>;
  };
  chat: {
    nudge: string;
    nudgeClose: string;
    open: string;
    close: string;
    title: string;
    status: string;
    greeting: string;
    suggestions: string[];
    placeholder: string;
    send: string;
    handoff: string;
    /** WhatsApp message for the handoff; {query} is the visitor's first question. */
    handoffMessage: string;
    handoffWithQuery: string;
    error: string;
    rateLimited: string;
  };
  hero: {
    badge: string;
    title: string;
    highlight: string;
    body: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: string[];
    chat: {
      name: string;
      status: string;
      messages: ChatMessage[];
      notificationTitle: string;
      notificationBody: string;
    };
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    idealFor: string;
    cta: string;
    popular: string;
    groups: Record<'all' | ServiceGroup, string>;
    unsureTitle: string;
    unsureBody: string;
    unsureCta: string;
    unsureHref: string;
    items: ServiceItem[];
  };
  sectors: {
    eyebrow: string;
    title: string;
    intro: string;
    cta: string;
    /** WhatsApp message; {sector} is replaced with the card title. */
    message: string;
    items: SectorItem[];
  };
  ia: {
    eyebrow: string;
    title: string;
    intro: string;
    discoveryBody: string;
    discoveryCta: string;
    discoveryHref: string;
    items: AiCapability[];
    tryNow: string;
    demoBusiness: string;
    demos: { label: string; icon: string; messages: ChatMessage[] }[];
  };
  process: {
    eyebrow: string;
    title: string;
    intro: string;
    cta: string;
    steps: ProcessStep[];
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    stack: string;
    pillars: AboutPillar[];
  };
  projects: {
    eyebrow: string;
    title: string;
    note: string;
    includes: string;
    spec: string;
    live: string;
    clientBadge: string;
    productBadge: string;
    offerBadge: string;
    items: ProjectItem[];
  };
  faq: {
    eyebrow: string;
    title: string;
    intro: string;
    cta: string;
    href: string;
    items: FaqItem[];
    askAiTitle: string;
    askAiBody: string;
    askAiCta: string;
  };
  finalCta: {
    title: string;
    highlight: string;
    body: string;
    secondary: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    formTitle: string;
    formIntro: string;
    name: string;
    namePlaceholder: string;
    company: string;
    companyPlaceholder: string;
    optional: string;
    solution: string;
    description: string;
    descriptionPlaceholder: string;
    submit: string;
    reassurance: string;
    success: string;
    message: QuoteTemplate;
    channels: ContactChannel[];
    solutions: { value: string; label: string }[];
  };
  footer: {
    blurb: string;
    explore: string;
    solutions: string;
    contact: string;
    rights: string;
    proposal: string;
  };
}
