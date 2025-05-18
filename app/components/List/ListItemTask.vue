<script setup lang="ts">
import type {ListItemData} from './types'
import ConfirmDialog from './ConfirmDialog.vue'
import EditTaskDialog from './EditTaskDialog.vue'

const props = defineProps<{
  item: ListItemData
}>()

const dialog = defineModel<boolean>()
const confirmDialog = ref(false)
const editDialog = ref(false)

const emit = defineEmits<{
  delete: [item: ListItemData]
  edit: [item: ListItemData]
}>()

function closeDialog() {
  dialog.value = false
}

function showConfirmDialog() {
  confirmDialog.value = true
}

function handleDelete() {
  emit('delete', props.item)
  closeDialog()
}

function handleEdit(item: ListItemData) {
  emit('edit', item)
  closeDialog()
}

const tagColors = {
  unknown: 'grey',
  life: 'green',
  sport: 'blue',
  work: 'orange',
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
  >
    <v-card>
      <template #title>
        <div class="d-flex align-center flex-wrap">
          <span class="text-wrap mr-2 text-h5">{{ props.item.name }}</span>
          <v-chip
            :color="tagColors[props.item.tag]"
            size="small"
          >
            {{ props.item.tag }}
          </v-chip>
        </div>
      </template>

      <template #append>
        <v-btn
          icon="$close"
          variant="text"
          @click="closeDialog"
        />
      </template>

      <v-card-text>
        {{ props.item.body }}
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="error"
          text="Удалить"
          variant="tonal"
          @click="showConfirmDialog"
        />
        <v-spacer />
        <v-btn
          color="primary"
          text="Редактировать"
          variant="tonal"
          @click="editDialog = true"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>

  <ConfirmDialog
    v-model="confirmDialog"
    title="Подтверждение удаления"
    :message="`Вы уверены, что хотите удалить задачу '${props.item.name}'?`"
    @confirm="handleDelete"
  />

  <EditTaskDialog
    v-model="editDialog"
    :item="props.item"
    @save="handleEdit"
  />
</template>
