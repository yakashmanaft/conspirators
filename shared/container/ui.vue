<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped>
.container {
  max-width: 1399px;
  margin: 0 auto;
  margin-bottom: 10rem;
}
@media screen and (max-width: 767px) {
  .container {
    padding: 0;
    padding-top: 5rem;
    margin: 0;
    margin-bottom: 5rem;
  }
}
@media screen and (min-width: 768px) {
  .container {
    margin-top: 6rem;
  }
}
</style>

<!-- https://github.com/vadimkaKharitonenko/severyanochka/tree/master -->
