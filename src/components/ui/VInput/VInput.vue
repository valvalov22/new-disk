<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  type?: 'text' | 'password'
  maxLength?: number
  errorMessage?: string
  showToggle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  maxLength: 100,
  errorMessage: '',
  showToggle: false,
  count: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const isPasswordVisible = ref(false)
const inputType = computed(() => (isPasswordVisible.value ? 'text' : props.type))

const inputRef = ref<HTMLInputElement | null>(null)

const focusInput = () => {
  inputRef.value?.focus()
}
</script>

<template>
  <div class="input" :class="{ 'app-input--error': errorMessage }">
    <label v-if="label" class="input__label" @click="focusInput"> {{ label }} * </label>
    <input
      ref="inputRef"
      v-model="inputValue"
      :type="inputType"
      :placeholder="placeholder"
      :maxlength="maxLength"
      class="input__field"
    />
    <span v-if="showToggle" class="input__toggle" @click="isPasswordVisible = !isPasswordVisible">
      <Transition name="fade" mode="out-in">
        <img v-if="!isPasswordVisible" src="/icons/eye.svg" alt="Show password" />
        <img v-else src="/icons/eye-crossed.svg" alt="Hide password" />
      </Transition>
    </span>
    <p v-if="errorMessage" class="input__error">{{ errorMessage }}</p>
  </div>
</template>

<style lang="scss" scoped>
.input {
  position: relative;
  width: 100%;

  &__label {
    display: block;
    padding: 0 0 10px 10px;
    font-size: 14px;
    font-weight: 600;
    line-height: 156%;
    cursor: pointer;
    color: var(--gray);
  }

  &__field {
    width: 100%;
    padding: 22px 28px;
    font-size: 18px;
    border-radius: 36px;
    border: 2px solid transparent;
    outline: none;
    background: white;
    transition: border 0.3s ease-in-out;

    &:hover,
    &:focus {
      border-color: var(--green-light);
    }
  }

  &__toggle {
    width: 18px;
    height: 16px;
    position: absolute;
    right: 20px;
    top: 66%;
    transform: translateY(-50%);
    cursor: pointer;
    user-select: none;
  }

  &__counter {
    position: absolute;
    right: 10px;
    bottom: -20px;
    font-size: 14px;
    color: #aaa;
  }

  &__error {
    margin-top: 5px;
    font-size: 14px;
    color: red;
  }

  &--error &__field {
    border-color: red;
  }
}
</style>
