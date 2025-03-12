<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'default' | 'large'
  radius?: 'xxs' | 'xs' | 's' | 'l'
  outline?: boolean
  disabled?: boolean
  hasIcon?: boolean
  icon?: string
  round?: boolean
}

const props = defineProps<Props>()

const classes = computed(() => [
  'btn',
  `btn-${props.size}`,
  {
    'btn-outline': props.outline,
    [`btn-${props.radius}`]: props.radius,
    'btn-round': props.round,
    'btn-disabled': props.disabled,
  },
])
</script>

<template>
  <button :class="classes" :disabled="disabled">
    <template v-if="icon">
      <img :src="icon" alt="icon" />
    </template>
    <slot v-if="!round"></slot>
  </button>
</template>

<style lang="scss" scoped>
@use '../../../assets/styles/variables.scss';
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 0 20px;
  border: 4px solid transparent;
  font-weight: 500;
  font-size: 20px;
  line-height: 160%;
  border-radius: var(--rounded);
  color: var(--white);
  background-color: var(--green-light);
  transition:
    color,
    background,
    var(--transition-time) linear;

  &:hover {
    background-color: var(--green-middle);
  }

  &:active {
    background-color: var(--green-dark);
  }

  &:disabled,
  &.btn-disabled {
    background: var(--gray);
    color: var(--white);
    pointer-events: none;
  }
}

.btn-round {
  width: 56px;
  height: 56px;
  padding: 0;
  border-radius: 50%;
}

.btn-default {
  height: 112px;
}

.btn-icon {
  width: 48px;
  height: 48px;
}
</style>
