<template>
  <div class="body">
    <Header />
    <div class="body-content w-full flex">
      <Menu />
      <div class="body-content-items">
        <BreadCrumb />
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
.body-content {
  height: calc(100vh - 68px);
}

.body-content-items {
  width: calc(100vw - 250px);
}
</style>
