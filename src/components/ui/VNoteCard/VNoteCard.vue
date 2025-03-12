<script setup lang="ts">
interface Props {
  id: number
  title: string
  content: string
}

defineProps<Props>()
const emit = defineEmits(['delete'])

const handleDelete = (id: number) => {
  emit('delete', id)
}
</script>

<template>
  <div class="note">
    <div class="note-header">
      <span class="note-title">{{ title }}</span>
    </div>
    <div class="note-separator"></div>
    <div class="note-card">
      <div class="note-content">
        <p>{{ content }}</p>
      </div>
      <button class="delete-button" @click="handleDelete(id)">
        <img src="/icons/x.svg" alt="cross icon" />
        <span>Удалить</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.note {
  max-width: 507px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
}
.note-header {
  font-weight: bold;
  font-size: 16px;
  padding: 20px 28px;
  height: 72px;
  background: var(--green-light);
  clip-path: polygon(93.5% 0, 100% 40%, 100% 100%, 0 100%, 0 0);
  position: relative;
  z-index: 2;
  border-top-left-radius: 12px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    background-color: var(--green-middle);
    border-bottom-left-radius: 12px;
  }
}

.note-separator {
  padding: 0;
  height: 1px;
  background: var(--green-middle);
  width: 100%;
  position: relative;
  z-index: 3;
}

.note-card {
  position: relative;
  background: var(--green-light);
  color: white;
  border-radius: 12px;
  width: 100%;
  font-family: sans-serif;
  overflow: hidden;
  margin-top: -10px;
  padding-top: 20px;
  z-index: 1;
}

.note-content {
  font-size: 14px;
  line-height: 1.4;
  padding: 20px 28px;
  margin-bottom: 20px;
}

.delete-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;

  img {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }

  &:hover {
    text-decoration: underline;
  }
}
</style>
