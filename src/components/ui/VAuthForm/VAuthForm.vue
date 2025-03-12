<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { useAuthStore } from '../../../store/auth'
import axios from 'axios'
import { API_URL } from '@/config'
import VInput from '../VInput/VInput.vue'
import VBtn from '../VBtn/VBtn.vue'
import VLink from '../VLink/VLink.vue'

const props = defineProps<{ mode: 'login' | 'register' }>()
const emit = defineEmits(['close', 'switchMode'])

const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)

const handleSubmit = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Заполните все поля'
    return
  }

  if (props.mode === 'register' && password.value !== confirmPassword.value) {
    errorMessage.value = 'Пароли не совпадают'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    if (props.mode === 'login') {
      await authStore.login(email.value, password.value)
      emit('close')
    } else {
      await axios.post(`${API_URL}/api/reg`, {
        email: email.value,
        password: password.value,
        confirm_password: confirmPassword.value,
      })
      successMessage.value = 'Аккаунт успешно создан! Вы можете войти.'

      setTimeout(() => {
        successMessage.value = ''
        emit('switchMode')
      }, 2000)
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      errorMessage.value = error.response?.data?.message || 'Ошибка сервера'
    } else if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Неизвестная ошибка'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="auth-form" aria-labelledby="auth-title" role="form">
    <VInput
      v-model="email"
      label="Email"
      placeholder="Введите значение"
      type="text"
      aria-label="Введите значение"
    />
    <VInput
      v-model="password"
      label="Пароль"
      showToggle
      placeholder="Введите пароль"
      type="password"
      aria-label="Введите пароль"
    />

    <VInput
      v-if="mode === 'register'"
      v-model="confirmPassword"
      label="Подтвердите пароль"
      placeholder="Повторите пароль"
      type="password"
      aria-label="Введите пароль"
      showToggle
    />

    <div class="auth-form__footer">
      <p class="switch-mode text-small">
        {{ mode === 'login' ? 'У вас нет аккаунта?' : 'Уже есть аккаунт?' }}
        <VLink class="text-small-bold" @click="emit('switchMode')">{{
          mode === 'login' ? 'Зарегистрируйтесь' : 'Войти'
        }}</VLink>
      </p>
      <VBtn type="submit" :disabled="isLoading">{{
        isLoading ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'
      }}</VBtn>
    </div>

    <p v-if="errorMessage" role="alert" aria-live="assertive" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" role="alert" aria-live="polite" class="success">
      {{ successMessage }}
    </p>
  </form>
</template>

<style scoped lang="scss">
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px;

  @media (max-width: 488px) {
    padding: 20px;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;

    @media (max-width: 488px) {
      flex-direction: column-reverse;
      gap: 8px;

      :deep(.btn) {
        width: 100%;
      }
    }
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
</style>
