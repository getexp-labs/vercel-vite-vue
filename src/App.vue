<template>
  <BaseImg
    src="https://www.visitbigsky.com/sites/default/files/styles/scale_1440/public/2021-04/The%20Mountain.jpg?itok=vW-O3W3X"
    quality="50" qualityMini="1" width="1200" widthMini="50" class="img-cover"/>
  <div
    class="flex flex-row flex-wrap w-full justify-center"
  >
    <img class="self-center" src="./assets/vv-logo.png" alt="">
    <div class="flex flex-row flex-wrap w-full">
      <div class="flex flex-row flex-wrap w-full justify-center">
        <h1>Apples</h1>
      </div>
      <div
        v-for="apple in apples" :key="apple.id"
        class="flex flex-row flex-wrap w-full justify-center"
        :style="{color: apple.color}"
      >
        <span>{{apple}}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import BaseImg from './components/BaseImg.vue'

const apples = ref([])
onMounted(async() => {
  const r = await fetch('/api/apples')
  const d = await r.json()
  apples.value = d
})
</script>

<style scoped>
.img-cover {
  position: fixed;
  inset: 0;
  z-index: -1;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1 {
  font-size: 50px !important;
}
</style>
