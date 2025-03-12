<script setup lang="ts">
defineProps<{
  imgSrc: string
}>()
</script>

<template>
  <div class="content">
    <div class="content__text">
      <h1>
        Мои
        <br />
        заметки
      </h1>
      <h3>
        Не забывай о важном, <br />
        храни его в облаке
      </h3>
    </div>
  </div>
  <div class="content__img">
    <img :src="imgSrc" alt="kanban board" role="img" aria-hidden="false" />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/breakpoint.scss' as *;
.content__img {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 10vw;
  max-width: 922px;
  width: 40%;
  height: 85%;

  @media (max-width: $md1) {
    position: absolute;
    bottom: 0;
    right: 10vw;
    height: auto;
    left: 50%;
    transform: translateX(-50%);
    align-self: center;
    width: 65%;
    max-width: 800px;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
}
.content {
  position: absolute;
  left: 10vw;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;

  @media (max-width: $md1) {
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
  }

  &__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 40px;
    max-width: 400px;

    @media (max-width: $md1) {
      margin-top: 0;
      width: 100%;
      text-align: center;
      max-width: none;
    }

    @media (max-width: $md3) {
      h1 {
        font-size: 60px;
      }
    }
  }
}
</style>
