import type {
    DeepReadonly,
    DeepPartial,
    DeepRequired,
    RemoveReadonly,

    UnPacked,
    Optional,
    PartRequired,

    Getters,
    Setters,
    GetterAndSetters,

    PickReadonlyKeys,
    PickPropType,
    PickProps,
} from '../src'


type O = {
    a: string
    b: number
    c: boolean
    d: {
        e: {
            f: any
        }
    },
    fn: (a: string, b: number) => boolean
    fn2: Function
    fn3: VoidFunction
}

type Arr = [string, number, boolean, { e: { f: any } }]
type NestedPromise = Promise<Promise<Promise<string>>>


/* 部分可选 */
type PartialO = Optional<O, 'a'>
/* 部分必填 */
type RequiredO = PartRequired<O, 'a'>

/** 深度只读 */
type DeepReadonlyO = DeepReadonly<O>
/** 去除 readonly */
type RemoveReadonlyO = RemoveReadonly<DeepReadonlyO>

/** 深度可选 */
type DeepPartialO = DeepPartial<O>
/** 深度必选 */
type DeepRequiredO = DeepRequired<O>

/** ======================================================== */

/** 究极解包，支持获取`数组 | 函数返回值 | Promise<Promise<...>>` 里的类型 */
type GetArrType = UnPacked<Arr>  // string | number | boolean | { e: { f: any } }
type GetPromiseType = UnPacked<NestedPromise>  // string
type GetFuncType = UnPacked<() => string>  // string

/** ======================================================== */

/**
 * 下面就是类型体操范畴了
 */

/** Getters */
type GenGetters = Getters<O>
/** Setters */
type GenSetters = Setters<O>
/** GetterAndSetters */
type GenGetterAndSetters = GetterAndSetters<O>

/** 取出只读的键 */
type PickReadonlyKeysO = PickReadonlyKeys<Readonly<O>>  // "a" | "b" | "c" | "d"

/** 取出结构体某个类型 */
type PickPropTypeO = PickPropType<O, 'd.e'>  // { f: any }

/** 获取对象的所有属性，排除函数 */
type PickAllPropO = PickProps<O>