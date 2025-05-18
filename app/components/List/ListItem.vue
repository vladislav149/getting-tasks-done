<script setup lang="ts">
import type {ListItemData} from './types'

const props = defineProps<ListItemData>()
const chipColor = computed(() => {
  if (props.tag === 'work') return 'deep-orange-darken-3'
  if (props.tag === 'sport') return 'light-blue-darken-4'
  if (props.tag === 'life') return 'green-darken-4'
  return 'blue-grey'
})
</script>

<template>
  <VCard
    class="card"
    :title="props.name"
    :text="props.body"
    hover
  >
    <template #subtitle>
      <VChip
        density="comfortable"
        size="small"
        :color="chipColor"
      >
        {{ props.tag }}
      </VChip>
    </template>
    <VCardActions>
      <p class="w-100 text-caption text-lg-right">{{ props.dateLastUpdated }}</p>
    </VCardActions>
  </VCard>
</template>

<style scoped lang="scss">
.card {
  &:not(:last-child) {
    margin-bottom: 12px;
  }

  &:deep(.v-card-text) {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    padding-bottom: 0;
    height: 60px;
  }
}
</style>
