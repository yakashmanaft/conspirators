<template>
  <div style="height: 100vh; display: grid;">
    <!--  -->
    <AppHeader 
      :auth_user="user"
    />

    <!--  -->
    <div>
      <!--  -->
      <slot></slot>
    </div>

    <!--  -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">


const { loggedIn, user, session, clear, fetch } = useUserSession();

</script>
