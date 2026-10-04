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
    // 日本語（既定の言語）はドメイン直下（/）、英語は /en/。
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      // /ja/ はトップへの転送ページなので除外し、/ と /en/ を hreflang 付きで出力する。
      filter: (page) => page !== `${site}/ja/`,
      i18n: {
        defaultLocale: 'ja',
        locales: { ja: 'ja-JP', en: 'en-US' },
      },
    }),
  ],
});
