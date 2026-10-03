import type { Dictionary } from './types';

// English UI strings. Must mirror the keys of ja.ts (enforced by the Dictionary type).
export const en: Dictionary = {
  code: 'en',
  htmlLang: 'en',
  ogLocale: 'en_US',
  meta: {
    description:
      'Research portfolio of Kenta Ishii, Ph.D. candidate at The University of Tokyo: pedestrian flow analysis, transportation network modeling, behavioral parameter estimation, causal inference, and machine learning for transportation. Publications and patents.',
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
  },
  sections: {
    research: { number: '01', title: 'Research' },
    publications: { number: '02', title: 'Publications' },
    patents: { number: '03', title: 'Patents' },
    about: { number: '04', title: 'About' },
    contact: { number: '05', title: 'Contact' },
  },
  publications: {
    filterLabel: 'Filter by type',
    types: {
      all: 'All',
      journal: 'Journal',
      conference: 'Conference',
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
    jurisdictions: 'Jurisdictions',
    priorityDate: 'Priority date',
    filedDate: 'Filing date',
    publishedDate: 'Publication date',
    assignee: 'Assignee',
    inventors: 'Inventors',
    link: 'Patent record',
  },
  about: {
    affiliation: 'Affiliation',
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
