import { store } from "voby"

export function typedStore<T>(initialValue: T): T {
  return store(initialValue)
}
