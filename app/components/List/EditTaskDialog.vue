<script setup lang="ts">
import type {ListItemData, Tags} from './types'
import {useLists} from '~/services/lists'
import dayjs from 'dayjs'

const props = defineProps<{
  item: ListItemData
}>()

const modelValue = defineModel<boolean>()
const {updateTask} = useLists()

const emit = defineEmits<{
  save: [item: ListItemData]
}>()

const tags: Tags[] = ['unknown', 'life', 'sport', 'work']

const form = ref({
  name: props.item.name,
  body: props.item.body,
  tag: props.item.tag,
})

const loading = ref(false)

function closeDialog() {
  modelValue.value = false
}

async function handleSave() {
  try {
    loading.value = true
    const updatedTask = {
      ...props.item,
      ...form.value,
      dateLastUpdated: dayjs().format('HH:mm DD.MM.YYYY'),
    }
    await updateTask(updatedTask)
    emit('save', updatedTask)
    closeDialog()
  } catch (error) {
    console.error('Error updating task:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-dialog
    v-model="modelValue"
    max-width="500"
  >
    <v-card title="Редактирование задачи">
      <template #append>
        <v-btn
          icon="$close"
          variant="text"
          @click="closeDialog"
        />
      </template>

      <v-card-text>
        <v-text-field
          v-model="form.name"
          label="Название"
          variant="outlined"
        />
        <v-textarea
          v-model="form.body"
          label="Описание"
          variant="outlined"
        />
        <v-select
          v-model="form.tag"
          :items="tags"
          label="Тэг"
          variant="outlined"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text="Сохранить"
          variant="tonal"
          :loading="loading"
          :disabled="loading"
          @click="handleSave"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
