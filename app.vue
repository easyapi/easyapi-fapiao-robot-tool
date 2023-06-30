<script setup lang="ts">
const config = useRuntimeConfig()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - EasyAPI发票机器人` : 'EasyAPI发票机器人'
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
