import type { Dictionary } from './types';

// English UI strings. Must mirror the keys of ja.ts (enforced by the Dictionary type).
export const en: Dictionary = {
  code: 'en',
  htmlLang: 'en',
  ogLocale: 'en_US',
  meta: {
    description:
      'Research portfolio of Kenta Ishii, Senior Researcher at Hitachi, Ltd. and Ph.D. student at The University of Tokyo: pedestrian flow analysis, transportation network modeling, behavioral parameter estimation, causal inference, and machine learning for transportation. Publications, talks, awards, patents, projects, and exhibitions.',
  },
  skipToContent: 'Skip to content',
  langSwitch: {
    current: 'EN',
    other: 'JA',
    switchLabel: 'JA: 日本語に切り替える',
    navLabel: 'Language',
    currentLabel: 'Current language: English',
  },
  hero: {
    scrollHint: 'Contents',
    affiliation: 'Affiliation',
    specialty: 'Field',
    history: 'Background',
  },
  sections: {
    publications: { number: '01', title: 'Publications & Talks' },
    awards: { number: '02', title: 'Awards' },
    patents: { number: '03', title: 'Patents' },
    projects: { number: '04', title: 'Projects' },
    exhibitions: { number: '05', title: 'Exhibitions' },
    contact: { number: '06', title: 'Contact' },
  },
  publications: {
    filterLabel: 'Filter by type',
    types: {
      all: 'All',
      journal: 'Journal',
      'intl-conference': 'International conference',
      'domestic-conference': 'Domestic conference',
      preprint: 'Preprint',
      talk: 'Talks',
      other: 'Other',
    },
    links: {
      doi: 'DOI',
      pdf: 'PDF',
      arxiv: 'arXiv',
      url: 'Web page',
    },
    empty: 'No publications in this category.',
  },
  patents: {
    granted: 'Granted',
    pending: 'Pending',
    number: 'Publication No.',
    inventors: 'Inventors',
    link: 'Patent record',
  },
  awards: {
    link: 'Award page',
  },
  projects: {
    period: 'Period',
    funder: 'Funded by',
    role: 'Role',
  },
  exhibitions: {
    venue: 'Venue',
    period: 'Dates',
    role: 'Role',
    link: 'Exhibition page',
  },
  contact: {
    email: 'Email',
    links: {
      researchmap: 'researchmap',
      scholar: 'Google Scholar',
      orcid: 'ORCID',
      github: 'GitHub',
    },
    emailAt: '[at]',
  },
  footer: {
    rights: 'All rights reserved.',
    top: 'Back to top',
  },
  redirect: {
    title: 'Choose language / 言語を選択',
    description: 'Research portfolio of Kenta Ishii. Redirecting to the Japanese or English page.',
    noscript: 'JavaScript is disabled, so automatic language detection is unavailable. Please use the links below.',
    choose: 'Please choose a language.',
    ja: '日本語',
    en: 'English',
  },
};
