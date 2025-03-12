<script setup lang="ts"></script>

<template>
  <span class="app-link">
    <slot></slot>
  </span>
</template>

<style lang="scss" scoped>
.app-link {
  font-weight: 700;
  color: var(--green-light);
  text-decoration: none;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: var(--white);
    cursor: pointer;
  }
}
</style>
