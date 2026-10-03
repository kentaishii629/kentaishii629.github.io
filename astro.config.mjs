// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// リポジトリ名は kentaishii629.github.io。公開 URL はドメイン直下（https://kentaishii629.github.io/）なので base は不要。
const site = 'https://kentaishii629.github.io';

export default defineConfig({
  site,
  // リポジトリ名を <username>.github.io 以外に変える場合は、公開 URL が https://<username>.github.io/<repo>/ に
  // なるため base: '/<repo>' を設定する（サイト内のパスはすべて import.meta.env.BASE_URL 経由なので、これだけで動く）。
  output: 'static',
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    routing: {
      prefixDefaultLocale: true,
      // "/" は src/pages/index.astro で navigator.language に基づいて振り分けるため、自動リダイレクトは無効にする。
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      // "/" は言語振り分け用ページなので除外し、/ja/ と /en/ を hreflang 付きで出力する。
      filter: (page) => page !== `${site}/`,
      i18n: {
        defaultLocale: 'ja',
        locales: { ja: 'ja-JP', en: 'en-US' },
      },
    }),
  ],
});
