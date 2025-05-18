export type Tags = 'work' | 'life' | 'sport' | 'unknown'
export type Title =
  | 'Корзина'
  | 'Справочник'
  | 'Идеи'
  | 'Мусор'
  | 'Ожидание'
  | 'Календарь'
  | 'КНП'
  | 'Проекты'
  | 'Спринт'
  | 'Сделано'

export interface ListItemData {
  id: string
  list: Title
  name: string
  body: string
  tag: Tags
  dateCreated: string
  dateLastUpdated: string
}

export interface ListItemType {
  title: Title
  data: ListItemData[]
}
