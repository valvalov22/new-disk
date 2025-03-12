<script setup lang="ts">
import { ref } from 'vue'
import VInput from '../VInput/VInput.vue'
import VTextArea from '../VTextArea/VTextArea.vue'
import VBtn from '../VBtn/VBtn.vue'

const emit = defineEmits(['submit', 'close'])

const title = ref('')
const content = ref('')
const maxTitleLength = 100
const maxContentLength = 500

const handleSubmit = () => {
  if (!title.value.trim() || !content.value.trim()) return
  emit('submit', { title: title.value, content: content.value })
  title.value = ''
  content.value = ''
  emit('close')
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
    ></VTextArea>
    <div id="content-counter" class="char-count" aria-live="polite">
      {{ content.length }}/{{ maxContentLength }}
    </div>

    <div class="btn-wrapper">
      <VBtn type="submit" aria-label="Добавить заметку"> Добавить </VBtn>
    </div>
  </form>
</template>

<style scoped lang="scss">
.note-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px;

  @media (max-width: 488px) {
    padding: 0;
  }

  h2 {
    text-align: center;
  }

  .char-count {
    text-align: right;
    font-size: 12px;
    color: #888;
  }
}

.btn-wrapper {
  display: flex;
  justify-content: end;
}
</style>
