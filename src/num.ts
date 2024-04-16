type MuiltpleOf4L1<T extends number> = `${T}` extends '0' | '4' | '8' ? T : never

type MuiltpleOf4L2<T extends number> = `${T}` extends
`${2 | 4 | 6 | 8}${0 | 4 | 8}`
| `${1 | 3 | 5 | 7 | 9}${2 | 6}`
? T
: never

type MuiltpleOf4L3<T extends number> = `${T}` extends
`${number}${0 | 2 | 4 | 6 | 8}${0 | 4 | 8}`
| `${number}${1 | 3 | 5 | 7 | 9}${2 | 6}`
? T
: never

/** 4 的倍数 */
export type MuiltpleOf4<T extends number> = MuiltpleOf4L1<T> | MuiltpleOf4L2<T> | MuiltpleOf4L3<T>
