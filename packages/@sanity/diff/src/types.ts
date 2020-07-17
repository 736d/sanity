export type Maybe<T> = T | null | undefined

export type Diff = StringDiff | NumberDiff | BooleanDiff | ObjectDiff | ArrayDiff | TypeChangeDiff
export type ValueType = 'array' | 'boolean' | 'null' | 'number' | 'object' | 'string' | 'undefined'

export type KeySegment = {_key: string}
export type PathSegment = string | number | KeySegment
export type Path = PathSegment[]

interface BaseDiff {
  type: 'array' | 'boolean' | 'null' | 'number' | 'object' | 'string' | 'typeChange'
  fromValue: unknown
  toValue: unknown
  path: Path
  isChanged: boolean
}

export interface StringDiffSegment {
  type: 'unchanged' | 'removed' | 'added'
  text: string
}

export type StringDiff = BaseDiff & {
  type: 'string'
  fromValue: Maybe<string>
  toValue: Maybe<string>
  segments: StringDiffSegment[]
}

export type NumberDiff = BaseDiff & {
  type: 'number'
  fromValue: Maybe<number>
  toValue: Maybe<number>
}

export type BooleanDiff = BaseDiff & {
  type: 'boolean'
  fromValue: Maybe<boolean>
  toValue: Maybe<boolean>
}

export type ObjectDiff<T extends object = object> = BaseDiff & {
  type: 'object'
  fromValue: Maybe<T>
  toValue: Maybe<T>
  fields: {[fieldName: string]: Diff}
}

export type ArrayDiff<T = unknown> = BaseDiff & {
  type: 'array'
  fromValue: Maybe<T[]>
  toValue: Maybe<T[]>
  changes: ArrayDiffOperation[]
}

export type TypeChangeDiff = BaseDiff & {
  type: 'typeChange'
  fromType: ValueType
  toType: ValueType
}

export interface KeyedSanityObject {
  [key: string]: unknown
  _key: string
}

export type SanityObject = KeyedSanityObject | Record<string, unknown>

interface BaseAddOperation {
  op: 'add'
  index: number
  path: Path
  toValue: unknown
}

export type AddBeforeOperation = BaseAddOperation & {
  before: KeySegment | number
}

export type AddAfterOperation = BaseAddOperation & {
  after: KeySegment | number
}

export type MoveOperation = {
  op: 'move'
  path: Path
  fromIndex: number
  toIndex: number
  diff?: Diff
}

export type RemoveOperation = {
  op: 'remove'
  path: Path
  index: number
  fromValue: unknown
}

export type ChangeOperation = {
  op: 'change'
  path: Path
  index: number
  diff?: Diff
}

export type ArrayDiffOperation =
  | AddBeforeOperation
  | AddAfterOperation
  | MoveOperation
  | RemoveOperation
  | ChangeOperation
