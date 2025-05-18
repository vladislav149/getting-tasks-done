import {doc, setDoc, getDoc, updateDoc} from 'firebase/firestore'
import type {Title, ListItemType, ListItemData} from '~/components/List/types'

const DEFAULT_LISTS: Title[] = [
  'Корзина',
  'Справочник',
  'Идеи',
  'Ожидание',
  'Календарь',
  'КНП',
  'Проекты',
  'Спринт',
  'Сделано',
  'Мусор',
]

export const useLists = () => {
  const {$db, $auth} = useNuxtApp()

  const getUserListsPath = (userId: string) => `users/${userId}/lists`

  const getLists = async (): Promise<ListItemType[]> => {
    if (!$auth.currentUser) return []

    const lists: ListItemType[] = []
    const userListsPath = getUserListsPath($auth.currentUser.uid)

    for (const title of DEFAULT_LISTS) {
      const listRef = doc($db, userListsPath, title)
      const listSnap = await getDoc(listRef)

      if (!listSnap.exists()) {
        await setDoc(listRef, {title, data: []})
        lists.push({title, data: []})
      } else {
        const listData = listSnap.data()
        lists.push({
          title,
          data: listData?.data || [],
        })
      }
    }

    return lists
  }

  const addTask = async (task: ListItemData) => {
    if (!$auth.currentUser) return

    const taskWithId = {
      ...task,
      id: crypto.randomUUID(),
    }

    const listRef = doc($db, getUserListsPath($auth.currentUser.uid), task.list)
    const listSnap = await getDoc(listRef)
    const listData = listSnap.data()?.data || []

    await updateDoc(listRef, {
      data: [...listData, taskWithId],
    })
  }

  const removeTask = async (task: ListItemData) => {
    if (!$auth.currentUser) return

    const listRef = doc($db, getUserListsPath($auth.currentUser.uid), task.list)
    const listSnap = await getDoc(listRef)
    const listData = listSnap.data()?.data || []

    await updateDoc(listRef, {
      data: listData.filter((t: ListItemData) => t.name !== task.name),
    })
  }

  const moveTask = async (oldTask: ListItemData, newTask: ListItemData) => {
    await removeTask(oldTask)
    await addTask(newTask)
  }

  const updateTask = async (task: ListItemData) => {
    if (!$auth.currentUser) return

    const listRef = doc($db, getUserListsPath($auth.currentUser.uid), task.list)
    const listSnap = await getDoc(listRef)
    const listData = listSnap.data()?.data || []

    const updatedData = listData.map((t: ListItemData) => (t.id === task.id ? task : t))

    await updateDoc(listRef, {
      data: updatedData,
    })
  }

  return {
    getLists,
    addTask,
    removeTask,
    moveTask,
    updateTask,
  }
}
