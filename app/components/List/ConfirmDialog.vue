<script setup lang="ts">
const props = defineProps<{
  title: string
  message: string
}>()

const dialog = defineModel<boolean>()

const emit = defineEmits<{
  confirm: []
}>()

function closeDialog() {
  dialog.value = false
}

function handleConfirm() {
  emit('confirm')
  closeDialog()
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    max-width="400"
  >
    <v-card>
      <v-card-title>{{ props.title }}</v-card-title>
      <v-card-text>
        {{ props.message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text="Отмена"
          @click="closeDialog"
        />
        <v-btn
          color="error"
          text="Удалить"
          @click="handleConfirm"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
