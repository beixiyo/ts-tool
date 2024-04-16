import type {
    SplitStr,
    GetStrLen,
    StartsWith,
    PickStartsWith,
    QueryKV,
    CamelCase,
    ToSnake,
} from '../src'


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