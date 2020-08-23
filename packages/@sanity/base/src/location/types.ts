export interface Location {
  origin: string
  path: string
  query: Record<string, any>
  search: string
}

export interface LocationInterface extends Location {
  pushState: (loc: Partial<Location>) => void
}
