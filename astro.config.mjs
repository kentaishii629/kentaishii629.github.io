// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: <username> を GitHub のユーザー名に置き換える（リポジトリの所有者から "kentaishii629" と推定して設定済み）。
const site = 'https://kentaishii629.github.io';

export default defineConfig({
  site,
  // リポジトリ名が <username>.github.io ではない場合（例: my_portfolio）は、
  // 公開 URL が https://<username>.github.io/my_portfolio/ になるため base を設定する:
  //   base: '/my_portfolio',
  // サイト内のパスはすべて import.meta.env.BASE_URL 経由で生成しているので、これだけで動く。
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
