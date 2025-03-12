<script setup lang="ts">
import { ref } from 'vue'
import VInput from '@/components/ui/VInput/VInput.vue'
import VTextArea from '@/components/ui/VTextArea/VTextArea.vue'
import VBtn from '@/components/ui/VBtn/VBtn.vue'

const emit = defineEmits(['submit', 'close'])

const title = ref('')
const content = ref('')
const errorMessage = ref('')
const maxTitleLength = 100
const maxContentLength = 255
const successMessage = ref('')

const handleSubmit = () => {
  if (!title.value.trim() || !content.value.trim()) {
    errorMessage.value = 'Заполните все поля'
    return
  }

  emit('submit', { title: title.value, content: content.value })
  title.value = ''
  content.value = ''
  errorMessage.value = ''
  successMessage.value = 'Заметка добавлена'
  setTimeout(() => {
    emit('close')
  }, 2000)
}
</script>

<template>
  <form class="note-form" role="form" aria-labelledby="form-title" @submit.prevent="handleSubmit">
    <VInput
      v-model="title"
      type="text"
      placeholder="Введите название"
      :maxlength="maxTitleLength"
      label="Название заметки"
      aria-describedby="title-counter"
      @input="errorMessage = ''"
    />
    <div id="title-counter" class="char-count" aria-live="polite">
      {{ title.length }}/{{ maxTitleLength }}
    </div>

    <VTextArea
      label="Текст заметки"
      v-model="content"
      placeholder="Введите текст"
      :maxlength="maxContentLength"
      aria-describedby="content-counter"
      @input="errorMessage = ''"
    />
    <div id="content-counter" class="char-count" aria-live="polite">
      {{ content.length }}/{{ maxContentLength }}
    </div>

    <Transition name="fade" mode="out-in">
      <p v-if="errorMessage" role="alert" aria-live="assertive" class="error">{{ errorMessage }}</p>
    </Transition>
    <Transition name="fade" mode="out-in">
      <p v-if="successMessage" role="alert" aria-live="polite" class="success">
        {{ successMessage }}
      </p>
    </Transition>

    <div class="btn-wrapper">
      <VBtn type="submit" aria-label="Добавить заметку"> Добавить </VBtn>
    </div>
  </form>
</template>

<style scoped lang="scss">
@use '@/assets/styles/breakpoint.scss' as *;

.note-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px;

  @media (max-width: $md4) {
    padding: 0;
  }

  .char-count {
    text-align: right;
    font-size: 12px;
    color: #888;
  }
}

.error,
.success {
  padding: 8px 20px;
  border-radius: 24px;
  font-size: 14px;
  margin-top: 5px;
}

.error {
  background: rgba(255, 116, 97, 0.1);
  color: var(--red);
}

.success {
  background: rgba(97, 255, 116, 0.1);
  color: var(--green-middle);
}

.btn-wrapper {
  display: flex;
  justify-content: end;
}
</style>
