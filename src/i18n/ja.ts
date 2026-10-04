// 日本語の UI 文言。データ（名前・論文など）は src/data/*.yaml 側で多言語化する。
export const ja = {
  code: 'ja',
  htmlLang: 'ja',
  ogLocale: 'ja_JP',
  meta: {
    description:
      '石井 健太（株式会社日立製作所 研究開発グループ 研究員 / 東京大学大学院 博士課程）の研究者ポートフォリオ。人流分析、交通ネットワークモデリング、行動パラメータ推定、因果推論、交通への機械学習応用に関する論文・発表、受賞、特許、参画PJ、展示を掲載。',
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
    affiliation: '所属',
    specialty: '専門分野',
    history: '来歴',
  },
  sections: {
    publications: { number: '01', title: '論文・発表' },
    awards: { number: '02', title: '受賞' },
    patents: { number: '03', title: '特許' },
    projects: { number: '04', title: '参画PJ' },
    exhibitions: { number: '05', title: '展示' },
    contact: { number: '06', title: '連絡先' },
  },
  publications: {
    filterLabel: '種別で絞り込む',
    types: {
      all: 'すべて',
      journal: '論文誌',
      'intl-conference': '国際会議',
      'domestic-conference': '国内学会',
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
    empty: '該当する項目はありません。',
  },
  patents: {
    granted: '登録',
    pending: '出願中',
    number: '公開番号',
    patentNumber: '特許番号',
    inventors: '発明者',
    link: '特許情報',
  },
  awards: {
    link: '受賞情報',
  },
  projects: {
    period: '期間',
  },
  exhibitions: {
    venue: '会場',
    period: '会期',
    role: '担当',
    link: '展示情報',
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
    top: 'ページ上部へ',
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
