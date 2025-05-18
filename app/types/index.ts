import type {RoutesNamesList} from '@typed-router/__routes'

export interface MenuItem {
  to: RoutesNamesList
  title: string
  auth: boolean
}
