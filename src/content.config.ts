import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { file, glob } from 'astro/loaders';
import yaml from 'js-yaml';

type Item = Record<string, unknown>;

/**
 * 配列形式の YAML を読み込み、各要素に記載順 (order) を付与する。
 * - Astro はデータストアをエントリ id 順に並べ替えて保存するため、
 *   「同じ年の中では YAML の記載順を保つ」ために記載順をデータに残す。
 * - loader の parser が投げた例外はログに出るだけでビルドは止まらないため、
 *   id の欠落・重複は problem フィールドとして埋め込み、スキーマ側でビルドエラーにする。
 */
function orderedYamlList(text: string): Item[] {
  const data = yaml.load(text);
  if (!Array.isArray(data)) {
    return [{ id: 'invalid-root', problem: 'YAML のトップレベルは配列（- id: ... のリスト）である必要があります' }];
  }
  const seen = new Set<string>();
  return data.map((raw: unknown, order): Item => {
    const item: Item = typeof raw === 'object' && raw !== null ? { ...(raw as Item) } : {};
    const id = item.id;
    if (typeof id !== 'string' || id.trim() === '') {
      return { ...item, id: `missing-id-${order + 1}`, order, problem: `${order + 1} 番目の項目に文字列の id がありません` };
    }
    if (seen.has(id)) {
      return { ...item, id: `${id}-duplicate-${order + 1}`, order, problem: `id "${id}" が重複しています` };
    }
    seen.add(id);
    return { ...item, order };
  });
}

/** parser が検出した問題。値があればスキーマ違反としてビルドを失敗させる。 */
const noProblem = z.undefined({ error: (issue) => String(issue.input) }).optional();

/** 多言語フィールド { ja, en }。両方任意だが、少なくとも一方は必須。 */
const localized = z
  .strictObject({
    ja: z.string().optional(),
    en: z.string().optional(),
  })
  .refine((v) => Boolean(v.ja?.trim() || v.en?.trim()), {
    message: 'ja か en のどちらか一方は必須です',
  });

/** 空文字または URL。 */
const urlOrEmpty = z.union([z.literal(''), z.url()]).default('');

/** YYYY-MM-DD の日付。YAML で引用符なしに書くと Date になるので文字列に戻す。 */
const isoDate = z.union([z.iso.date(), z.date().transform((d) => d.toISOString().slice(0, 10))]);

const profile = defineCollection({
  // 単一オブジェクトの YAML は glob() で 1 エントリとして読み込む（id は "profile"）。
  loader: glob({ pattern: 'profile.yaml', base: './src/data' }),
  schema: z.strictObject({
    name: localized,
    /** 専門分野。 */
    specialty: localized,
    /** 所属（役職を含む表示用の文言）。org は構造化データ（JSON-LD）に出す組織名。 */
    affiliations: z
      .array(
        z
          .strictObject({ ja: z.string().optional(), en: z.string().optional(), org: localized.optional() })
          .refine((v) => Boolean(v.ja?.trim() || v.en?.trim()), { message: 'ja か en のどちらか一方は必須です' }),
      )
      .default([]),
    /** 来歴（記載順に表示）。 */
    history: z
      .array(
        z.strictObject({
          year: z.number().int().min(1900).max(2100),
          text: localized,
        }),
      )
      .default([]),
    links: z
      .strictObject({
        researchmap: urlOrEmpty,
        scholar: urlOrEmpty,
        orcid: urlOrEmpty,
        github: urlOrEmpty,
      })
      .prefault({}),
    /** 連絡先メール（複数可）。label は所属などの区別。 */
    emails: z
      .array(
        z.strictObject({
          label: localized.optional(),
          address: z.email(),
        }),
      )
      .default([]),
    /** 特許セクションの冒頭に添える一文（出願人・掲載方針など）。 */
    patentNote: localized.optional(),
  }),
});

const publications = defineCollection({
  loader: file('./src/data/publications.yaml', { parser: orderedYamlList }),
  schema: z.strictObject({
    id: z.string(),
    /** YAML の記載順（parser が自動付与）。 */
    order: z.number().int().nonnegative(),
    problem: noProblem,
    year: z.number().int().min(1900).max(2100),
    type: z.enum(['journal', 'intl-conference', 'domestic-conference', 'preprint', 'talk', 'other']),
    title: z.strictObject({ ja: z.string().optional(), en: z.string() }),
    authors: z.array(z.string().min(1)).min(1),
    /** 英語ページ用の著者名（authors が日本語表記のときに書く）。 */
    authorsEn: z.array(z.string().min(1)).min(1).optional(),
    venue: z.strictObject({ ja: z.string().optional(), en: z.string() }),
    links: z
      .strictObject({
        doi: z.url().optional(),
        pdf: z.url().optional(),
        arxiv: z.url().optional(),
        url: z.url().optional(),
      })
      .prefault({}),
    note: localized.optional(),
  }),
});

const patents = defineCollection({
  loader: file('./src/data/patents.yaml', { parser: orderedYamlList }),
  schema: z.strictObject({
    id: z.string(),
    /** YAML の記載順（parser が自動付与）。 */
    order: z.number().int().nonnegative(),
    problem: noProblem,
    /** 並び順に使う年（通常は出願年）。 */
    year: z.number().int().min(1900).max(2100),
    status: z.enum(['granted', 'pending']).optional(),
    title: z.strictObject({ ja: z.string(), en: z.string().optional() }),
    /** 公開番号 / 登録番号。 */
    number: z.string().optional(),
    jurisdictions: z.array(z.string().min(1)).optional(),
    priorityDate: isoDate.optional(),
    filedDate: isoDate.optional(),
    publishedDate: isoDate.optional(),
    assignee: localized.optional(),
    inventors: z.array(z.string().min(1)).min(1).optional(),
    summary: localized.optional(),
    link: z.url().optional(),
  }),
});

const exhibitions = defineCollection({
  loader: file('./src/data/exhibitions.yaml', { parser: orderedYamlList }),
  schema: ({ image }) => z.strictObject({
    id: z.string(),
    /** YAML の記載順（parser が自動付与）。 */
    order: z.number().int().nonnegative(),
    problem: noProblem,
    /** 並び順に使う年（不明なら省略。省略した項目は末尾に記載順で並ぶ）。 */
    year: z.number().int().min(1900).max(2100).optional(),
    /** 展示会名。 */
    title: z.strictObject({ ja: z.string(), en: z.string().optional() }),
    venue: localized.optional(),
    /** 会期（自由記述。例: "2021年3月1日〜3月31日"）。 */
    period: localized.optional(),
    /** 担当した展示物・役割。 */
    role: localized.optional(),
    summary: localized.optional(),
    /** 展示物の画像（このファイルからの相対パス。例: ../assets/exhibitions/foo.jpg）。 */
    image: image().optional(),
    /** 画像の代替テキスト。 */
    imageAlt: localized.optional(),
    /** 画像に添えるキャプション。 */
    imageCaption: localized.optional(),
    link: z.url().optional(),
  }),
});

const awards = defineCollection({
  loader: file('./src/data/awards.yaml', { parser: orderedYamlList }),
  schema: z.strictObject({
    id: z.string(),
    /** YAML の記載順（parser が自動付与）。 */
    order: z.number().int().nonnegative(),
    problem: noProblem,
    year: z.number().int().min(1900).max(2100),
    /** 何で受賞したか（会議・コンテストなど）。見出しになる。 */
    event: z.strictObject({ ja: z.string(), en: z.string().optional() }),
    /** 賞の名称・順位。 */
    award: localized,
    /** 対象（論文・提案の題名など）。 */
    subject: localized.optional(),
    link: z.url().optional(),
  }),
});

const projects = defineCollection({
  loader: file('./src/data/projects.yaml', { parser: orderedYamlList }),
  schema: z.strictObject({
    id: z.string(),
    /** YAML の記載順（parser が自動付与）。 */
    order: z.number().int().nonnegative(),
    problem: noProblem,
    /** 並び順に使う年（参加開始年）。 */
    year: z.number().int().min(1900).max(2100),
    /** 事業の名称。 */
    title: z.strictObject({ ja: z.string(), en: z.string().optional() }),
    /** 期間（自由記述）。 */
    period: localized.optional(),
    /** 所管・委託元。 */
    funder: localized.optional(),
    /** 担当した役割。 */
    role: localized.optional(),
    summary: localized.optional(),
    links: z.array(z.strictObject({ label: localized, url: z.url() })).default([]),
  }),
});

export const collections = { profile, publications, patents, exhibitions, awards, projects };
