// Noto Sans JP の @font-face を、サイトのテキストで実際に使う分割（unicode-range）だけに絞って生成する。
// @fontsource/noto-sans-jp の <weight>.css は 1 ウェイトあたり約 120 個の @font-face を含み、
// そのままではブラウザのフォント照合が初回レイアウトのボトルネックになるため。
// 入力: src/data/*.yaml, src/i18n/*.ts のテキスト  →  出力: src/styles/fonts.generated.css
// package.json の predev / prebuild / precheck から自動で実行される。
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const FAMILY = 'noto-sans-jp';
const WEIGHTS = [400, 600];
const OUT = join(root, 'src/styles/fonts.generated.css');

/**
 * サイトで使う文字の集合を集める。
 * 400: すべてのデータと UI 文言。600（太字）: 本人名など profile.yaml に含まれる文字のみ。
 */
function collectCodePoints(weight) {
  const used = new Set();
  const addText = (text) => {
    for (const ch of text) used.add(ch.codePointAt(0));
  };
  if (weight >= 600) {
    // 太字は本人名（profile.yaml の name）にしか使わない
    const profile = readFileSync(join(root, 'src/data/profile.yaml'), 'utf8');
    addText(/^name:[\s\S]*?(?=^\S)/m.exec(profile)?.[0] ?? '');
    addText('0123456789+');
  } else {
    for (const [dir, pattern] of [['src/data', /\.ya?ml$/], ['src/i18n', /\.ts$/]]) {
      for (const file of readdirSync(join(root, dir))) {
        if (pattern.test(file)) addText(readFileSync(join(root, dir, file), 'utf8'));
      }
    }
  }
  // 常に含める範囲（テキストに無くても必要になりやすい文字）: ひらがな・カタカナ・基本的な CJK 句読点・全角英数
  const always = [
    [0x3000, 0x3003],
    [0x3005, 0x3005],
    [0x300c, 0x3011],
    [0x301c, 0x301c],
    [0x3041, 0x3096],
    [0x309b, 0x309f],
    [0x30a1, 0x30fc],
    [0xff01, 0xff5e],
    [0x2014, 0x2026],
  ];
  if (weight < 600) {
    for (const [a, b] of always) for (let cp = a; cp <= b; cp++) used.add(cp);
  }
  return used;
}

/** "U+3000-303F, U+FF01" 形式の unicode-range を [from, to] の配列にする。 */
function parseRanges(value) {
  return value.split(',').map((token) => {
    const [from, to] = token.trim().replace(/^U\+/i, '').split('-');
    const a = parseInt(from, 16);
    return [a, to ? parseInt(to, 16) : a];
  });
}

function intersects(ranges, used) {
  for (const [a, b] of ranges) {
    if (b - a > 4096) {
      for (const cp of used) if (cp >= a && cp <= b) return true;
    } else {
      for (let cp = a; cp <= b; cp++) if (used.has(cp)) return true;
    }
  }
  return false;
}

const blocks = [];
let total = 0;
for (const weight of WEIGHTS) {
  const used = collectCodePoints(weight);
  const css = readFileSync(join(root, 'node_modules/@fontsource', FAMILY, `${weight}.css`), 'utf8');
  for (const match of css.matchAll(/@font-face\s*{([^}]*)}/g)) {
    total += 1;
    const body = match[1];
    const range = /unicode-range:\s*([^;]+);/.exec(body)?.[1];
    const woff2 = /url\(([^)]*\.woff2)\)/.exec(body)?.[1]?.replace(/^['"]|['"]$/g, '');
    if (!range || !woff2 || !intersects(parseRanges(range), used)) continue;
    const file = join(root, 'node_modules/@fontsource', FAMILY, woff2);
    const url = relative(dirname(OUT), file).split('\\').join('/');
    blocks.push(
      `@font-face {\n  font-family: 'Noto Sans JP';\n  font-style: normal;\n  font-display: swap;\n  font-weight: ${weight};\n  src: url('${url}') format('woff2');\n  unicode-range: ${range.trim()};\n}`,
    );
  }
}

const header = `/* 自動生成ファイル（scripts/fonts.mjs）。直接編集しない。\n   サイトのテキストで使う Noto Sans JP の分割だけを含む: ${blocks.length} / ${total} 個の @font-face */\n`;
writeFileSync(OUT, `${header}${blocks.join('\n')}\n`);
console.log(`fonts: Noto Sans JP ${blocks.length}/${total} @font-face → ${relative(root, OUT)}`);
