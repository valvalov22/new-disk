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
    <div class="content__img">
      <img :src="imgSrc" alt="kanban board" role="img" aria-hidden="false" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  column-gap: 225px;

  @media (max-width: 1366px) {
    column-gap: 50px;
  }

  &__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 40px;
    max-width: 400px;

    @media (max-width: 768px) {
      margin-top: 0;
      width: 100%;
      text-align: center;
      max-width: none;
    }

    @media (max-width: 500px) {
      h1 {
        font-size: 60px;
      }
    }
  }

  &__img {
    display: flex;
    justify-content: center;
    position: relative;
    bottom: 0;
    max-width: 922px;
    height: 967px;

    @media (max-width: 768px) {
      position: absolute;
      bottom: 0;
      height: auto;
      left: 50%;
      transform: translateX(-50%);
    }

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
    text-align: center;
    justify-content: center;
    padding: 5% 10%;
  }

  .content__img {
    align-self: center;
    width: 80%;
    max-width: 800px;
  }
}
</style>
