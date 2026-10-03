# 研究者ポートフォリオサイト

Astro で構築した静的な個人ポートフォリオサイト。日英 2 言語（`/ja/`, `/en/`）に対応し、GitHub Pages で公開する。

- データ（プロフィール・論文・特許・展示）は `src/data/*.yaml` に書く。スキーマ違反があるとビルドが失敗する。
- UI の文言は `src/i18n/ja.ts` / `src/i18n/en.ts` にある。
- 書体は Inter（欧文）/ Noto Sans JP（和文）/ JetBrains Mono（数字・コードのみ）。
- 外部サービスや解析タグは使わず、フォントも自己ホストしている（`@fontsource`）。

## ローカルで起動する

`npm run dev` / `build` / `check` の前には `scripts/fonts.mjs` が自動で走り、サイトのテキストで使う Noto Sans JP の分割だけを `src/styles/fonts.generated.css` に書き出す（YAML や文言を変えても自動で追従する）。

Node.js 22.12 以上が必要。

```bash
npm install
npm run dev        # http://localhost:4321/
```

```bash
npm run build      # dist/ に静的ファイルを出力
npm run preview    # ビルド結果を確認
npm run check      # 型チェック（astro check）
```

## データを追加する

### 論文（`src/data/publications.yaml`）

1 件追加する例。配列の末尾に追記すればよく、表示は年の降順に自動で並ぶ（同じ年の中は記載順）。

```yaml
- id: ishii-2026-journal        # 一意な ID
  year: 2026
  type: journal                 # journal | conference | preprint | talk | other
  title:
    ja: 論文タイトル（任意）
    en: Paper Title             # en は必須
  authors: [Kenta Ishii, Taro Yamada]   # 本人名は自動で太字になる
  venue:
    ja: 掲載誌名（任意）
    en: Journal Name, Vol. 1, pp. 1-10
  links:                        # すべて任意（doi / pdf / arxiv / url）
    doi: https://doi.org/10.0000/example
  note: { ja: 論文賞, en: Best Paper Award }   # 任意
```

### 特許（`src/data/patents.yaml`）

`year`（通常は出願年）の降順に並ぶ。`title.ja` と `year` 以外はすべて任意。

```yaml
- id: jp2026000001a
  year: 2026                    # 並び順に使う年（出願年）
  status: pending               # granted | pending（不明なら省略）
  title:
    ja: 発明の名称              # ja は必須
    en: Title of Invention
  number: JP2026000001A         # 公開番号 / 登録番号
  jurisdictions: [JP, US]
  priorityDate: "2026-01-10"    # 日付は "YYYY-MM-DD"
  filedDate: "2026-01-10"
  publishedDate: "2027-07-20"
  assignee: { ja: 株式会社〇〇, en: "Example Corp." }
  summary: { ja: 発明の概要, en: Short description }
  inventors: [石井 健太, 山田 太郎]   # 本人名は自動で太字になる
  link: https://patents.google.com/patent/JP2026000001A
```

セクション冒頭の一文は `profile.yaml` の `patentNote`（任意）に書く。

### 展示（`src/data/exhibitions.yaml`）

`year` の降順に並ぶ（`year` を省略した項目は末尾に記載順）。`title.ja` 以外は任意。

```yaml
- id: exhibition-2026
  year: 2026
  title: { ja: 展示会名, en: Exhibition Title }
  venue: { ja: 会場名, en: Venue }
  period: { ja: 2026年4月1日〜4月30日, en: "April 1-30, 2026" }
  role: { ja: 「作品名」担当, en: "In charge of \"Work Title\"" }
  summary: { ja: 展示の概要, en: Short description }
  link: https://example.com/exhibition
```

### プロフィール（`src/data/profile.yaml`）

名前・肩書き・所属・研究テーマ・リンク・メールアドレス・特許の注記（`patentNote`）を書く。多言語フィールドは `{ ja, en }` 形式で、片方が空ならもう片方で代替表示される。

本人名の太字判定には `name` の `ja` / `en` が使われる（`Kenta Ishii`, `Ishii, K.`, `K. Ishii` などの表記ゆれにも対応）。

## GitHub Pages で公開する

1. `astro.config.mjs` の `site` を `https://<username>.github.io` に合わせる。
   リポジトリ名が `<username>.github.io` でない場合は、同ファイルのコメントに従って `base` も設定する。
2. GitHub のリポジトリで **Settings → Pages → Build and deployment → Source** を **GitHub Actions** にする。
3. `main` ブランチに push すると `.github/workflows/deploy.yml` がビルドとデプロイを行う。
   初回は Pages の Source を設定するまで deploy ジョブが失敗する。

`public/og.png`（SNS 共有画像、1200x630）はプレースホルダなので差し替える。

## ディレクトリ構成

```
scripts/fonts.mjs    # 使う分割だけの Noto Sans JP @font-face を生成（build 前に自動実行）
src/
  data/            # profile.yaml / publications.yaml / patents.yaml / exhibitions.yaml
  content.config.ts  # コレクション定義と zod スキーマ
  i18n/            # UI 文言（ja.ts / en.ts）とユーティリティ
  components/      # Header / Hero / Section / 各リスト / About / Contact / Footer / Portfolio
  layouts/         # Base.astro（head・OGP・hreflang・JSON-LD・フォント）
  pages/           # index.astro（言語振り分け）/ ja/ / en/
  styles/          # global.css（デザイントークン・リセット）/ fonts.generated.css（自動生成）
public/            # favicon.svg / og.png
.github/workflows/deploy.yml
```
