# TS 实用泛型工具

## 安装
```bash
npm i -D @jl-org/ts-tool
```

## 目录
- [工具](#工具)
- [数组工具](#数组工具)
- [字符串工具](#字符串工具)

**全都有文档注释**

```ts
type O = {
    a: string
    b: number
    c: boolean
    d: {
        e: {
            f: any
        }
    }
}

type Arr = [string, number, boolean, { e: { f: any } }]

type NestedPromise = Promise<Promise<Promise<string>>>
```

---

### 工具
```ts
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
} from '@jl-org/ts-tool'


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
```

### 数组工具
```ts
import type {
    FirstArr,
    PopArr,
    ReverseArr,
} from '@jl-org/ts-tool'


/** 首个元组类型 */
type First = FirstArr<Arr>  // string

/** 删除元组末尾类型 */
type Pop = PopArr<Arr>  // [string, number, boolean]

/* 元组反转 */
type Reverse = ReverseArr<Arr>  // [{ e: { f: any } }, boolean, number, string]
```

### 字符串工具
```ts
import type {
    SplitStr,
    GetStrLen,
    StartsWith,
    PickStartsWith,
    QueryKV,
    CamelCase,
    ToSnake,
} from '@jl-org/ts-tool'


/** 是否以 `xx` 开头 */
type StartsWithX = StartsWith<'apple', 'a'>  // apple
/** 取出以 `xx` 开头的键值对，例如取出事件 */
type PickStartsWithX = PickStartsWith<{
    onChange: () => void
    onClick: () => void
    other: () => void
}, 'on'>

/** 把 Query 字符串，转为键值对 */
type QueryKVType = QueryKV<'name=kn&sex=f&language=ts'>

/** 蛇形转驼峰 */
type CamelCaseStr = CamelCase<'hello_world'>  // helloWorld
/** 驼峰转蛇形 */
type ToSnakeStr = ToSnake<'helloWorld'>  // hello_world

/** 获取字符串长度 */
type StrLen = GetStrLen<'hello'>  // 5

/** 字符串分割成联合类型 */
type Split = SplitStr<'abc'>  // 'a' | 'b' | 'c'
```