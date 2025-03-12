<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import VModal from '@/components/ui/VModal/VModal.vue'
import VBtn from '@/components/ui/VBtn/VBtn.vue'
import VNoteForm from '@/components/ui/VNoteForm/VNoteForm.vue'
import { useAuthStore } from '@/store/auth'
import axios from 'axios'
import VNoteCard from '@/components/ui/VNoteCard/VNoteCard.vue'
import { API_URL } from '@/config'

const authStore = useAuthStore()
const router = useRouter()
const isModalOpen = ref(false)
const notes = ref<{ id: number; title: string; content: string }[]>([])

onMounted(async () => {
  if (!authStore.user) {
    router.push('/')
    return
  }
  await fetchNotes()
})

watchEffect(() => {
  if (authStore.user !== null) {
    if (!authStore.user) {
      router.push('/')
    } else {
      fetchNotes()
    }
  }
})

const fetchNotes = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/notes`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    notes.value = data
  } catch (error) {
    console.error('Ошибка при получении заметок', error)
  }
}

const addNote = async (note: { title: string; content: string }) => {
  try {
    const { data } = await axios.post(`${API_URL}/api/notes`, note, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    notes.value.push(data)
    isModalOpen.value = false
  } catch (error) {
    console.error('Ошибка при добавлении заметки', error)
  }
}

const deleteNote = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/api/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    notes.value = notes.value.filter((note) => note.id !== id)
  } catch (error) {
    console.error('Ошибка при удалении заметки', error)
  }
}
</script>

<template>
  <div class="notes-page">
    <VBtn
      round
      class="add-note-btn"
      has-icon
      icon="/icons/+.svg"
      @click="isModalOpen = true"
      aria-label="Добавить новую заметку"
    />
    <Transition name="fade" mode="out-in">
      <div v-if="notes.length" class="notes-list">
        <VNoteCard
          v-for="note in notes"
          :key="note.id"
          :id="note.id"
          :title="note.title"
          :content="note.content"
          role="listitem"
          @delete="deleteNote"
        />
      </div>
      <p v-else class="empty-message" aria-live="polite">Нет заметок</p>
    </Transition>

    <VModal
      aria-modal="true"
      aria-labelledby="modal-title"
      :show="isModalOpen"
      title="Добавление заметки"
      @close="isModalOpen = false"
    >
      <VNoteForm @submit="addNote" />
    </VModal>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/breakpoint.scss' as *;
.notes-page {
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-note-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--green-light);
  border-radius: 50%;
  z-index: 10;
}

.notes-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;

  @media (max-width: $md2) {
    grid-template-columns: 1fr;
  }
}

.empty-message {
  margin-top: 20px;
  color: #ccc;
}
</style>
