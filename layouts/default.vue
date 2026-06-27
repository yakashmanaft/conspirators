<template>
  <div style="height: 100vh; display: grid;">
    <!--  -->
    <AppHeader 
      :auth_user="user"
      @checkCartModalStatus="checkCartModalStatus"
    />

    <!--  -->
    <div class="body">
      <!--  -->
      <slot></slot>
    </div>

    <!--  -->
    <AppFooter />
  </div>
</template>

<script setup>


const { loggedIn, user, session, clear, fetch } = useUserSession();

const cart_is_opened = ref(false)
let scrollPosition = 0;
const checkCartModalStatus = (data) => {
  

  cart_is_opened.value = data

  if(data === true) {
    // 1. Сохраняем текущую позицию скролла
    scrollPosition = window.scrollY;

    // 2. Фиксируем body и сдвигаем его обратно на нужную позицию
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%'; // важно, чтобы не «уехала» ширина макета
  }
  else {
    document.body.style.position = 'unset';

    // На 200 px вниз
    window.scrollBy(0, scrollPosition);
  }

}

onMounted(() => {
})

</script>

<style>
  .body {
    /* background-color: red; */
  }
  .no-scroll {
    /* overflow: hidden;
    position: relative; */
  }
</style>
