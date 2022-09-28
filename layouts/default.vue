<template>
  <div class="body">
    <Toolbar />
    <div class="body-content w-full flex">
      <Menu />
      <NuxtChild />
    </div>
  </div>
</template>
<style>
.body-content {
  height: calc(100vh - 68px);
}
</style>
