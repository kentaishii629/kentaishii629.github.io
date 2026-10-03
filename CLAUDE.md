# CLAUDE.md

研究者ポートフォリオサイト（Astro 7 / 静的 / GitHub Pages）。使い方は README.md を参照。

## 作業の前提

- 依存は最小限。UI/CSS フレームワーク・アイコンライブラリ・外部 API・解析タグは使わない。
- スタイルは素の CSS（`src/styles/global.css` の CSS 変数 + 各コンポーネントのスコープ付き `<style>`）。
- データは `src/data/*.yaml`。スキーマは `src/content.config.ts`（zod、`strictObject` なので未知のキーはビルドエラー）。
- UI 文言は `src/i18n/ja.ts` がマスタ。`en.ts` は同じキー構造を型で強制される。
- 変更後は `npm run check`（型）と `npm run build`（警告ゼロ）を通す。`console.log` は残さない。

## デザイン上の決まり（本人の指示）

- 名前は大きくしない（30〜40px 程度）。キャッチコピー、件数表示、リード文は置かない。
- 書体: Inter（欧文）/ Noto Sans JP（和文）/ JetBrains Mono は数字・コードのみ。日本語を等幅で組まない。
- 背景は純白ではなく紙色（ライト `#faf9f6`、ダーク `#121110`）。アクセントは青 1 色。
- Noto Sans JP の `@font-face` は `scripts/fonts.mjs` が必要な分割だけ生成する（build 前に自動実行）。
  `src/styles/fonts.generated.css` は直接編集しない。
- セクション構成: 01 研究テーマ / 02 論文 / 03 特許 / 04 展示 / 05 自己紹介 / 06 連絡先。
  id（`research` など）は両言語で共通にし、言語切替時にハッシュ位置を維持する。

## 未対応（引き継ぎ）

- 論文: Google Scholar（https://scholar.google.co.jp/citations?user=_04yi2cAAAAJ）の一覧を `publications.yaml` に反映し、【ダミー】の項目を削除する。
- 講演: 応用空間統計ワークショップ（2025-01-08、統計数理研究所、招待講演）のタイトル。
  OHOW セミナー（https://ohow.iis.u-tokyo.ac.jp/archives/2024）の正式名称と開催日。
- 展示: `exhibitions.yaml` の 2 件について展示会名・会場・会期・年を公式ページで確認し、
  デザインハブ展（https://www.designhub.jp/exhibitions/6288）の担当内容を追記する。
- 特許: 各件の登録 / 出願中（`status`）と共同発明者（`inventors`）。
- プロフィール: 連絡先メール、researchmap / ORCID の URL、`public/og.png` の差し替え。
- 公開: GitHub の Settings → Pages → Source を GitHub Actions にする。
  リポジトリ名が `my_portfolio` のまま公開するなら `astro.config.mjs` の `base: '/my_portfolio'` を有効にする。
- デザインの参考調査（本人が後で行う予定）。
