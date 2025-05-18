<script setup lang="ts">
import type {ListItemData, ListItemType} from './types'

const props = defineProps<ListItemType>()

const isVisibleModalTask = ref(false)
const activeItem = ref<ListItemData | null>(null)

const emit = defineEmits<{
  showModalNewTask: []
  deleteTask: [item: ListItemData]
  edit: []
}>()

function onDragStart(e: DragEvent, item: ListItemData) {
  e.dataTransfer!.dropEffect = 'move'
  e.dataTransfer!.effectAllowed = 'move'
  e.dataTransfer!.setData('id', `${item.list} ${item.name}`)
}

function showModalNewTask() {
  emit('showModalNewTask')
}

function showModalTask(item: ListItemData) {
  activeItem.value = item
  isVisibleModalTask.value = true
}

function handleDelete(item: ListItemData) {
  emit('deleteTask', item)
}

function handleEdit() {
  emit('edit')
}
</script>

<template>
  <div>
    <div class="title d-flex align-center">
      <h2>
        {{ props.title }}
      </h2>
      <v-btn
        class="title-add"
        icon="$add"
        variant="text"
        @click="showModalNewTask"
      />
    </div>
    <ListItem
      v-for="item in props.data"
      :key="item.dateCreated"
      v-bind="item"
      draggable="true"
      @dragstart="onDragStart($event, item)"
      @dragover.prevent
      @click="showModalTask(item)"
    />
    <ListItemTask
      v-if="activeItem && isVisibleModalTask"
      v-model="isVisibleModalTask"
      :item="activeItem"
      @delete="handleDelete"
      @edit="handleEdit"
    />
  </div>
</template>

<style scoped lang="scss">
.title {
  position: relative;
  height: 48px;
  margin-bottom: 12px;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: black;
    left: 0;
    bottom: 0;
  }

  &:hover .title-add {
    display: block;
  }
}

.title-add {
  display: none;
}
</style>
