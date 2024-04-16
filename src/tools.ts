export type StrAndNum = string | number
/** 所有键值对 */
export type AllRecord = Record<keyof any, any>
/** 所有函数 */
export type AllFn = (...args: any[]) => any
/** 所有类构造器 */
export type AllClass = abstract new (...args: any[]) => any

/**
 * =================================================================================
 */

/** 深度只读 */
export type DeepReadonly<T extends AllRecord> = {
    readonly [K in keyof T]: DeepReadonly<T[K]>
}

/** 深度可选 */
export type DeepPartial<T extends AllRecord> = {
    [K in keyof T]?: DeepPartial<T[K]>
}

/** 深度必选 */
export type DeepRequired<T extends AllRecord> = {
    [K in keyof T]-?: DeepRequired<T[K]>
}

/** 去除 readonly */
export type RemoveReadonly<T extends AllRecord> = {
    -readonly [K in keyof T]: T[K]
}

/**
 * =================================================================================
 */

/* 获取最深层次的 Promise 类型 */
type PromiseType<T> = T extends Promise<infer E> ? PromiseType<E> : T

/** 究极解包，支持获取`数组 | 函数返回值 | Promise<Promise<...>>` 里的类型 */
export type UnPacked<T> =
    T extends (infer E)[] ? E :
    T extends (...args: any[]) => infer R ? R :
    T extends Promise<infer E> ? PromiseType<E> :
    never

/** 首个函数参数 */
export type FirstArg<T extends AllFn> = Parameters<T>[0]


/* 部分可选 */
export type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>

/* 部分必填 */
export type PartRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>

/**
 * =================================================================================
 */

export type Getters<T> = {
    [K in keyof T as `get${Capitalize<K & string>}`]: () => unknown
}
export type Setters<T> = {
    [K in keyof T as `set${Capitalize<K & string>}`]: (val: T[K]) => void
}

/** GetterAndSetters */
export type GetterAndSetters<T> = Getters<T> & Setters<T>

/**
 * =================================================================================
 */

export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false

/** 取出只读的键 */
export type PickReadonlyKeys<
    T,
    U extends Readonly<T> = Readonly<T>,
    K extends keyof T = keyof T
> = K extends keyof T
    ? Equal<Pick<T, K>, Pick<U, K>> extends true ? K : never
    : never

/** 
 * 取出结构体某个类型
 * @example PickPropType<ITarget, 'a.b.c'>
 */
export type PickPropType<T, Path extends string> = string extends Path
    ? unknown
    : Path extends keyof T
    ? T[Path]
    : Path extends `${infer K}.${infer R}`
    ? K extends keyof T
    ? PickPropType<T[K], R>
    : unknown : unknown

