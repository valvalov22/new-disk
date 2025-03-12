<script setup lang="ts">
import { onMounted } from 'vue'
import VHeader from '@/components/VHeader.vue'
import NotesView from '@/views/NotesView.vue'

import { useAuthStore } from '@/store/auth'
import MainView from '@/views/MainView.vue'

const authStore = useAuthStore()

onMounted(() => {
  if (authStore.token) authStore.fetchUser()
})
</script>

<template>
  <VHeader />
  <MainView v-if="!authStore.token" imgSrc="/images/kanban.png" />
  <NotesView v-else />
</template>

<style scoped lang="scss"></style>
