import { ja } from './ja';
import { en } from './en';
import type { Dictionary } from './types';

export type Lang = 'ja' | 'en';

export const LANGS = ['ja', 'en'] as const satisfies readonly Lang[];

const dictionaries: Record<Lang, Dictionary> = { ja, en };

/** 指定言語の UI 文言辞書を返す。 */
export function t(lang: Lang): Dictionary {
  return dictionaries[lang];
}

/** 反対側の言語を返す。 */
export function otherLang(lang: Lang): Lang {
  return lang === 'ja' ? 'en' : 'ja';
}

/** データの多言語フィールド { ja?, en? }。 */
export interface Localized {
  ja?: string | undefined;
  en?: string | undefined;
}

/**
 * 多言語フィールドから表示用文字列を取り出す。
 * 指定言語が空（未定義・空文字）なら、もう一方の言語で代替する。
 */
export function pick(value: Localized | undefined, lang: Lang): string {
  if (!value) return '';
  const primary = value[lang]?.trim();
  if (primary) return primary;
  return value[otherLang(lang)]?.trim() ?? '';
}

/** 表示文字列が代替言語によるものかどうか（lang 属性の付与に使う）。 */
export function pickedLang(value: Localized | undefined, lang: Lang): Lang {
  if (!value) return lang;
  return value[lang]?.trim() ? lang : otherLang(lang);
}

function normalizeName(s: string): string {
  return s
    .toLowerCase()
    .replace(/[　\s]+/g, ' ')
    .replace(/\s*,\s*/g, ', ')
    .replace(/\.\s*/g, '. ')
    .trim();
}

/**
 * 本人名の表記ゆれ集合を生成する。
 * 例: { ja: '石井 健太', en: 'Kenta Ishii' } →
 *   '石井 健太', '石井健太', 'kenta ishii', 'ishii kenta', 'ishii, kenta', 'k. ishii', 'ishii k.', 'ishii, k.'
 */
export function selfNameVariants(name: Localized): Set<string> {
  const variants = new Set<string>();
  const jaName = name.ja?.trim();
  if (jaName) {
    variants.add(normalizeName(jaName));
    variants.add(normalizeName(jaName.replace(/[　\s]+/g, '')));
  }
  const enName = name.en?.trim();
  if (enName) {
    const parts = enName.split(/\s+/);
    variants.add(normalizeName(enName));
    if (parts.length >= 2) {
      const given = parts.slice(0, -1).join(' ');
      const family = parts[parts.length - 1] ?? '';
      const initials = parts
        .slice(0, -1)
        .map((p) => `${p.charAt(0)}.`)
        .join(' ');
      for (const v of [
        `${family} ${given}`,
        `${family}, ${given}`,
        `${initials} ${family}`,
        `${family} ${initials}`,
        `${family}, ${initials}`,
      ]) {
        variants.add(normalizeName(v));
      }
    }
  }
  return variants;
}

/** 著者名文字列が本人名のいずれかの表記と一致するか。 */
export function isSelf(author: string, variants: Set<string>): boolean {
  return variants.has(normalizeName(author));
}
