<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuthStore } from '@/store/auth.ts'
import VModal from '@/components/ui/VModal/VModal.vue'
import VBtn from '@/components/ui/VBtn/VBtn.vue'
import VAuthForm from '@/components/ui/VAuthForm/VAuthForm.vue'
import { useClickOutside } from '@/directives/useClickOutside'

const authStore = useAuthStore()
const isModalOpen = ref(false)
const authMode = ref<'login' | 'register'>('login')

const isDropdownOpen = ref(false)
const dropdownRef = useClickOutside(() => (isDropdownOpen.value = false))

const toggleDropdown = (event: Event) => {
  event.stopPropagation()
  isDropdownOpen.value = !isDropdownOpen.value
}

const logout = async () => {
  await authStore.logout()
  isDropdownOpen.value = false
}

const modalTitle = computed(() =>
  authMode.value === 'login' ? 'Вход в ваш аккаунт' : 'Регистрация',
)

const truncatedEmail = computed(() => {
  const email = authStore.user?.email || ''
  return email.length > 20 ? email.slice(0, 20) + '...' : email
})
</script>

<template>
  <header class="header">
    <img src="/images/logo.png" alt="Logo" />

    <template v-if="authStore.user">
      <div class="header__user">
        <span class="user-email">{{ truncatedEmail }}</span>
        <img src="/images/user.png" alt="user" @click="toggleDropdown" />

        <Transition name="fade" mode="out-in">
          <div v-if="isDropdownOpen" ref="dropdownRef" class="dropdown">
            <button @click="logout">Выйти</button>
          </div>
        </Transition>
      </div>
    </template>

    <VBtn v-else has-icon icon="/icons/login.svg" @click="isModalOpen = true">Вход</VBtn>

    <VModal v-if="isModalOpen" :show="isModalOpen" :title="modalTitle" @close="isModalOpen = false">
      <VAuthForm
        :mode="authMode"
        @switchMode="authMode = authMode === 'login' ? 'register' : 'login'"
        @close="isModalOpen = false"
      />
    </VModal>
  </header>
</template>

<style scoped lang="scss">
@use '@/assets/styles/breakpoint.scss' as *;
.header {
  padding: 53px 10px 10px 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: $md4) {
    padding: 30px 10px 10px 10px;
  }

  img {
    width: 220px;
    height: 50px;

    @media (max-width: $md2) {
      width: 154px;
      height: 36px;
    }
  }

  &__user {
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;

    img {
      width: 56px;
      height: 56px;
      cursor: pointer;
    }
  }

  .user-email {
    color: #fff;
    font-weight: bold;
    display: block;

    @media (max-width: $md2) {
      display: none;
    }
  }
}

.dropdown {
  position: absolute;
  top: 70px;
  right: 0;
  background: #162031;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  font-weight: bold;
  white-space: nowrap;
  z-index: 10;

  button {
    background: none;
    border: none;
    color: var(--green-light);
    cursor: pointer;
    font-size: 16px;
  }

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    right: 10px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #162031;
  }
}
</style>
