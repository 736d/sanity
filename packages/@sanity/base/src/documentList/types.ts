interface DocumentValue {
  _id: string
  _type: string
  _rev: string
  _createdAt: string
  _updatedAt: string
  [key: string]: any
}

export interface InitialState {
  isLoaded: false
  isLoading: false
  data: null
  error: null
}

export interface LoadingState {
  isLoaded: false
  isLoading: true
  data: null
  error: null
}

export interface LoadedState {
  isLoaded: true
  isLoading: false
  data: DocumentValue[]
  error: null
}

export interface FailedState {
  isLoaded: true
  isLoading: false
  data: null
  error: Error
}

export type State = InitialState | LoadingState | LoadedState | FailedState
