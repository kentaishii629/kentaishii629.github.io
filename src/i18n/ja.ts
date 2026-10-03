// 日本語の UI 文言。データ（名前・論文など）は src/data/*.yaml 側で多言語化する。
export const ja = {
  code: 'ja',
  htmlLang: 'ja',
  ogLocale: 'ja_JP',
  meta: {
    description:
      '石井 健太（東京大学大学院 博士課程）の研究者ポートフォリオ。人流分析、交通ネットワークモデリング、行動パラメータ推定、因果推論、交通への機械学習応用に関する研究・論文・特許を掲載。',
  },
  skipToContent: '本文へスキップ',
  langSwitch: {
    current: 'JA',
    other: 'EN',
    switchLabel: 'EN: Switch to English',
    navLabel: '言語',
    currentLabel: '現在の言語: 日本語',
  },
  hero: {
    scrollHint: '目次',
  },
  sections: {
    research: { number: '01', title: '研究テーマ' },
    publications: { number: '02', title: '論文' },
    patents: { number: '03', title: '特許' },
    about: { number: '04', title: '自己紹介' },
    contact: { number: '05', title: '連絡先' },
  },
  publications: {
    filterLabel: '種別で絞り込む',
    types: {
      all: 'すべて',
      journal: '論文誌',
      conference: '国際会議・学会',
      preprint: 'プレプリント',
      talk: '講演',
      other: 'その他',
    },
    links: {
      doi: 'DOI',
      pdf: 'PDF',
      arxiv: 'arXiv',
      url: 'ウェブページ',
    },
    empty: '該当する論文はありません。',
  },
  patents: {
    filed: '出願',
    granted: '登録',
    pending: '出願中',
    number: '公開番号',
    jurisdictions: '出願国',
    priorityDate: '優先日',
    filedDate: '出願日',
    publishedDate: '公開日',
    assignee: '出願人',
    inventors: '発明者',
    link: '特許情報',
    summaryLabel: '件数',
  },
  about: {
    affiliation: '所属',
  },
  contact: {
    lead: '研究に関するご連絡は下記までお願いします。',
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
  },
  redirect: {
    title: '言語を選択 / Choose language',
    description: '石井 健太の研究者ポートフォリオ。日本語または英語のページへ移動します。',
    noscript: 'JavaScript が無効のため自動で振り分けできません。以下のリンクからお進みください。',
    choose: '言語を選択してください。',
    ja: '日本語',
    en: 'English',
  },
} as const;
