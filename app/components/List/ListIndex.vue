<script setup lang="ts">
import type {ListItemData, ListItemType, Title} from './types'
import {useLists} from '~/services/lists'

const {getLists, addTask, removeTask, moveTask} = useLists()
const dataList = ref<ListItemType[]>([])
const isLoading = ref(false)
const firstLoading = ref(true)

const isVisibleModalNewTask = ref(false)
const activeTitle = ref<Title>('Идеи')

async function getData() {
  isLoading.value = true
  try {
    dataList.value = await getLists()
  } finally {
    isLoading.value = false
    firstLoading.value = false
  }
}

onMounted(getData)

function showModalNewTask(title: Title) {
  activeTitle.value = title
  isVisibleModalNewTask.value = true
}

async function onDrop(e: DragEvent, col: ListItemType): Promise<void> {
  const [_, listName, dropName] = e.dataTransfer!.getData('id').match(/^(\S+)\s(.+)$/)!
  if (col.title === listName) return
  const findDataArrayById = dataList.value.find(({title}) => title === listName)!
  const dataIndex = findDataArrayById.data.findIndex(({name}) => name === dropName)
  const task = findDataArrayById.data[dataIndex]!
  const newTask = {...task, list: col.title}

  isLoading.value = true
  try {
    await moveTask(task, newTask)
    col.data.push(newTask)
    findDataArrayById.data.splice(dataIndex, 1)
  } finally {
    isLoading.value = false
  }
}

const nameList = computed(() => {
  return dataList.value.reduce<Record<string, true>>((obj, current) => {
    const list = current.data.reduce<Record<string, true>>((acc, cur) => {
      return {...acc, [cur.name]: true}
    }, {})
    return {...obj, ...list}
  }, {})
})

async function createTask(task: ListItemData) {
  if (nameList.value[task.name]) return //todo show error 'such name already exists'
  isLoading.value = true
  try {
    await addTask(task)
    dataList.value.find(({title}) => title === task.list)?.data.push(task)
  } finally {
    isLoading.value = false
  }
}

async function deleteTask(task: ListItemData) {
  const list = dataList.value.find(({title}) => title === task.list)
  if (!list) return
  const index = list.data.findIndex(({name}) => name === task.name)
  if (index === -1) return
  isLoading.value = true
  try {
    await removeTask(task)
    list.data.splice(index, 1)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <VDataIterator
    :items="dataList"
    :items-per-page="9"
    class="v-data-iterator d-flex flex-column h-100"
    :loading="firstLoading"
  >
    <template #header>
      <h1 class="text-h4 font-weight-bold mb-4">GTD доска</h1>
    </template>

    <template v-slot:loader>
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
      />
    </template>

    <template #="{items}">
      <div class="cols d-flex position-relative">
        <v-overlay
          :model-value="isLoading"
          class="align-center justify-center"
          contained
        >
          <v-progress-circular
            indeterminate
            color="primary"
          />
        </v-overlay>
        <v-col
          v-for="{raw} in items"
          :key="raw.title"
          class="list-col"
          :class="{'list-col--loading': isLoading}"
          @drop="onDrop($event, raw)"
          @dragover.prevent
        >
          <ListColumn
            v-bind="raw"
            @show-modal-new-task="showModalNewTask(raw.title)"
            @delete-task="deleteTask"
            @edit="getData"
          />
        </v-col>
      </div>
      <ListModalNewItem
        v-if="isVisibleModalNewTask"
        v-model="isVisibleModalNewTask"
        :list-item="activeTitle"
        @createTask="createTask"
      />
    </template>

    <template #footer>
      <v-footer
        class="justify-space-between text-body-2 mt-4 flex-grow-0"
        color="surface-variant"
      >
        footer
      </v-footer>
    </template>
  </VDataIterator>
</template>

<style scoped lang="scss">
.v-data-iterator :deep(> div) {
  margin-bottom: auto;
}

.list-col {
  position: relative;

  &:not(:last-child) {
    &::after {
      content: '';
      position: absolute;
      width: 1px;
      height: 100%;
      background-color: black;
      right: 0;
      top: 0;
    }
  }

  &--loading {
    opacity: 0.5;
    pointer-events: none;
  }
}

.cols {
  &::after {
    position: absolute;
    content: '';
    height: 1px;
    width: 100%;
    background-color: black;
    bottom: 0;
    left: 0;
  }
}
</style>
