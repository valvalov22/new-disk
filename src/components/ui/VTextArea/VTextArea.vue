<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  label?: string
  placeholder?: string
  maxlength?: number
  errorMessage?: string
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

const value = ref<string>('')
const isActive = ref<boolean>(false)

const hasError = computed<boolean>(() => !!value.value && !!props.errorMessage)

const textareaRef = ref<HTMLInputElement | null>(null)

const focusTextarea = () => {
  textareaRef.value?.focus()
}
</script>

<template>
  <div class="textarea-wrapper">
    <label v-if="label" @click="focusTextarea" class="textarea-label">{{ label }}</label>
    <textarea
      ref="textareaRef"
      v-model="value"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :class="{ error: hasError }"
      class="textarea__field"
      @input="handleInput"
      @focus="isActive = true"
      @blur="isActive = false"
    />
    <div class="textarea-info">
      <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.textarea-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;

  .textarea-label {
    font-size: 14px;
    font-weight: 600;
    line-height: 156%;
    color: var(--gray);
    padding: 0 0 10px 10px;
    cursor: pointer;
  }

  textarea {
    width: 100%;
    min-height: 120px;
    padding: 22px 28px;
    font-size: 18px;
    border-radius: 36px;
    transition: border 0.3s ease-in-out;
    resize: none;
    height: 168px;

    &.error {
      border: 2px solid red;
    }

    &:focus,
    &:hover {
      border: 2px solid var(--green-light);
    }
  }

  .textarea-info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;

    .error-message {
      color: red;
    }
  }
}
</style>
