import type { Lang } from '../i18n/utils';

/** 末尾スラッシュ付きの base パス（例: "/" または "/my_portfolio/"）。 */
export const BASE: string = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

/** base を考慮したサイト内パス。 */
export function withBase(path: string): string {
  return `${BASE}${path.replace(/^\/+/, '')}`;
}

/** 言語トップのサイト内パス（末尾スラッシュ付き）。 */
export function localePath(lang: Lang): string {
  return withBase(`${lang}/`);
}

/** 絶対 URL（site 設定が必須）。 */
export function absoluteUrl(path: string, site: URL | undefined): string {
  if (!site) return path;
  return new URL(path, site).toString();
}

/** セクションの id と表示順。両言語で同じ id を使い、言語切替時にハッシュ位置を維持する。 */
export const SECTION_IDS = ['publications', 'awards', 'patents', 'projects', 'exhibitions', 'contact'] as const;
export type SectionId = (typeof SECTION_IDS)[number];
