<script lan="ts" setup>

// components
import { Button } from '@/components/button'

// shared
import { Container } from "@/shared/container";

useHead({
  title: "conspirators | Ваш crm отдел маркетинга ",
  link: [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
      integrity:
        "sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH",
      crossorigin: "anonymous",
      type: "text/css",
    },
  ],
  script: [
    {
      src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
      integrity:
        "sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz",
      crossorigin: "anonymous",
    },
  ],
});

const { users } = storeToRefs(useUsersStore());
const { loadData } = useUsersStore();
const headers = ["ID", "Name", "Email"];

const { loggedIn, user, session, clear } = useUserSession();

</script>
<template>
  <Container>


    <h1>conspirators.su</h1><span>не ссы</span>
    <h2>INDEX PAGE</h2>
    <div class="buttons-container">

      <Button type="pseudo-btn" link="/landing_crm" bg="bg-full" :disabled="false">conspirators.CRM</Button>
      <Button type="pseudo-btn" link="/landing_offer" bg="bg-stroke" :disabled="false">Ваш отдел маркетинга</Button>
      <Button type="pseudo-btn" link="/landing_design" bg="bg-stroke" :disabled="false">Дизайним</Button>
    </div>

  </Container>
</template>

<style scoped>
/* html {
    width:100vw;
    overflow-x:hidden;
} */
.buttons-container {
  display: flex; 
  gap: 1rem;
}
@media screen and (max-width: 767px) {
  .buttons-container {
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
