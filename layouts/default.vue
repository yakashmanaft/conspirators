<template>
  <div style="height: 100vh; display: grid;">
    <!--  -->
    <AppHeader />

    <!--  -->
    <div>
      <!--  -->
      <slot />
    </div>

    <!--  -->
    <AppFooter />
  </div>
</template>

<script setup>
// You might choose this based on an API call or logged-in status
// const layout = "custom";
</script>
