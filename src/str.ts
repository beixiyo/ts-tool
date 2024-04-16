/** 字符串分割成联合类型 */
export type SplitStr<T extends string> = T extends `${infer One}${infer Rest}`
    ? One | SplitStr<Rest>
    : never

/** 获取字符串长度 */
export type GetStrLen<Str extends string, Arr extends string[] = []> =
    Str extends `${infer One}${infer Rest}`
    ? GetStrLen<Rest, [...Arr, One]>
    : Arr['length']

/** 是否以 `xx` 开头 */
export type StartsWith<
    T extends string,
    Start extends string
> = T extends
    `${Start}${string}` ? T : never

/** 
 * 取出以 `xx` 开头的键值对
 * @example
 * 取出事件
 * type Event = PickStartsWith<IEvent, 'on'>
 */
export type PickStartsWith<
    T,
    Start extends string
> = {
        [K in keyof T as K extends StartsWith<K & string, Start>
        ? K
        : never]: T[K]
    }

/**
 * =================================================================================
 */

type Split<T> = T extends `${infer Left}&${infer Right}` ? [Left, ...Split<Right>] : [T]

type TupleStrToIntersection<T> = T extends [`${infer Left}=${infer Right}`, ...infer Rest]
    ? { [key in Left]: Right } & TupleStrToIntersection<Rest>
    : unknown
/**
 * 把 Query 字符串，转为键值对
 * @example
 * type QS = QueryKV<'name=kn&sex=f&language=ts'>
 */
export type QueryKV<T extends string> = TupleStrToIntersection<Split<T>>

/**
 * =================================================================================
 */

/** 蛇形转驼峰 */
export type CamelCase<Str extends string> =
    Str extends `${infer First}_${infer Second}${infer Rest}`
    ? `${First}${Uppercase<Second>}${CamelCase<Rest>}`
    : Str

/** 26 个大写字母 */
export type UpperLetter = 'A' | 'B' | 'C'
    | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P'
    | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
/** 26 个小写字母 */
export type LowerLetter = Lowercase<UpperLetter>

type ToSnakeChar<Str extends string> =
    Str extends UpperLetter
    ? `_${Lowercase<Str>}`
    : Str

/** 驼峰转蛇形 */
export type ToSnake<Str extends string> =
    Str extends `${infer First}${infer Upper}${infer Rest}`
    ? `${ToSnakeChar<First>}${ToSnakeChar<Upper>}${ToSnake<Rest>}`
    : Str
