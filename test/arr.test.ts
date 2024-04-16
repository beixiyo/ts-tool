
import type {
    FirstArr,
    PopArr,
    ReverseArr,
} from '../src'


type Arr = [string, number, boolean, { e: { f: any } }]


/** 首个元组类型 */
type First = FirstArr<Arr>  // string

/** 删除元组末尾类型 */
type Pop = PopArr<Arr>  // [string, number, boolean]

/* 元组反转 */
type Reverse = ReverseArr<Arr>  // [{ e: { f: any } }, boolean, number, string]
