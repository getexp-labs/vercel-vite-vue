<style scoped>
</style>

<template lang="pug">
img(
  draggable="false"
  :src="state.url"
  @load="onLoad")
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'

const props = defineProps({
  src: { type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Big_%26_Small_Pumkins.JPG' },
  bucket: { type: String, default: 'main' },
  width: { type: String, default: '300' },
  widthMini: { type: String, default: '50' },
  quality: { type: String, default: '8' },
  qualityMini: { type: String, default: '2' },
})
const state = reactive({
  urlKey: 'mini',
  urlMap: computed(() => {
    return {
      mini: `/api/img?url=${encodeURIComponent(props.src)}&w=${props.widthMini}&q=${props.qualityMini}`,
      maxi: `/api/img?url=${encodeURIComponent(props.src)}&w=${props.width}&q=${props.quality}`,
    }
  }),
  url: computed(() => {
    return state.urlMap[state.urlKey]
  }),
}) as any

const onLoad = (e: any) => {
  // console.log('onLoad', e)
  if (state.urlKey === 'mini') {
    state.urlKey = 'maxi'
  }
}
</script>
