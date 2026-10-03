import type { ja } from './ja';

/** 深い階層の readonly リテラル型を、同じキー構造の string 型へ緩める。 */
type Widen<T> = T extends string ? string : { readonly [K in keyof T]: Widen<T[K]> };

/** ja.ts をマスタとして、他言語辞書が同じキー構造を持つことを型で保証する。 */
export type Dictionary = Widen<typeof ja>;
