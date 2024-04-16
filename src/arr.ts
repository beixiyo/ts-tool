/** 首个元组类型 */
export type FirstArr<T> = T extends [infer F, ...any[]] ? F : T

/** 删除元组末尾类型 */
export type PopArr<T extends any[]> = T extends [...infer Rest, unknown] ? Rest : never

/* 元组反转 */
export type ReverseArr<T extends any[]> = T extends [infer F, ... infer Rest] 
    ? [...ReverseArr<Rest>, F] 
    : T