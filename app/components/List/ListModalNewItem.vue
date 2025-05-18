<script setup lang="ts">
import dayjs from 'dayjs'
import type {ListItemData, Tags, Title} from './types'

type Form = Pick<ListItemData, 'name' | 'body' | 'tag'>

const props = defineProps<{
  listItem: Title
}>()

const emit = defineEmits<{
  createTask: [task: ListItemData]
}>()

const dialog = defineModel<boolean>()

const tags: Tags[] = ['unknown', 'life', 'sport', 'work']

const form = reactive<Form>({
  name: '',
  body: '',
  tag: 'unknown',
})

function createTask() {
  emit('createTask', {
    id: crypto.randomUUID(),
    name: form.name,
    body: form.body,
    tag: form.tag,
    list: props.listItem,
    dateCreated: dayjs().format('HH:mm DD.MM.YYYY'),
    dateLastUpdated: dayjs().format('HH:mm DD.MM.YYYY'),
  })

  dialog.value = false
}
</script>

<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card
        prepend-icon="$newBox"
        title="Новая задача"
      >
        <v-card-text>
          <v-row dense>
            <v-col>
              <v-text-field
                v-model="form.name"
                autofocus
                label="Название*"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-textarea
                v-model="form.body"
                label="Описание*"
                required
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-select
                v-model="form.tag"
                :items="tags"
                label="Тэг"
                required
              ></v-select>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">*Обязательное поле</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Закрыть"
            variant="plain"
            @click="dialog = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="Сохранить"
            variant="tonal"
            @click="createTask"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
