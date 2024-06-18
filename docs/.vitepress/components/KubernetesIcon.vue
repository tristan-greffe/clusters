<template>
  <div class="kubernetes-icon">
    <img :src="icon" :alt="label" :width="width" :height="height" />
    <span>{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
// Props
defineProps({
  icon: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  width: {
    type: Number,
    default: 20
  },
  height: {
    type: Number,
    default: 20
  }
})
</script>

<style scoped>
.kubernetes-icon {
  display: flex;
  align-items: center;
}
.kubernetes-icon img {
  margin-right: 8px;
}
</style>
