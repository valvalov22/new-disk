<script setup lang="ts">
import { defineProps, defineEmits, watch, ref, onMounted, onBeforeUnmount } from 'vue'
import VBtn from '@/components/ui/VBtn/VBtn.vue'

interface Props {
  show: boolean
  title: string
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])

const modalRef = ref<HTMLElement | null>(null)
let lastFocusedElement: HTMLElement | null = null

const closeModal = () => {
  emit('close')
  if (lastFocusedElement) {
    lastFocusedElement.focus()
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeModal()
}

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      lastFocusedElement = document.activeElement as HTMLElement
      modalRef.value?.focus()
      document.addEventListener('keydown', handleKeydown)
    } else {
      document.removeEventListener('keydown', handleKeydown)
    }
  },
)

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="modal-overlay"
      @click.self="closeModal"
      role="dialog"
      :aria-labelledby="'modal-title'"
      aria-modal="true"
    >
      <div ref="modalRef" class="modal-container" tabindex="-1">
        <div class="modal-header">
          <h2 id="modal-title">{{ title }}</h2>
          <VBtn
            class="close-button"
            round
            hasIcon
            icon="/icons/x.svg"
            @click="closeModal"
            aria-label="Закрыть модальное окно"
          ></VBtn>
        </div>
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/animation.scss';
@use '@/assets/styles/breakpoint.scss' as *;
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  animation: fade-in 0.3s forwards;
}

.modal-container {
  background: var(--dark-middle);
  color: #fff;
  padding: 24px;
  border-radius: 40px;
  width: 780px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transform: scale(0.9);
  animation: scale-in 0.3s forwards;

  @media (max-width: $md2) {
    width: 90%;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 80px 40px 0 40px;
  position: relative;

  @media (max-width: $md4) {
    padding: 0;
  }
}

.close-button {
  border: none;
  color: #fff;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
}

.modal-content {
  margin-top: 16px;
}
</style>
