<script lang="ts" setup>
import { Container } from "@/shared/container";

const router = useRouter();
const route = useRoute();
const currentRoute = ref("");
const hotBtnList = ref([
  {
    name: "dashboard",
    icon_name: "material-symbols-light:dashboard-outline-rounded",
    icon_clicked_name: "material-symbols-light:dashboard-rounded",
    target: "dashboard",
  },
  {
    name: "warehouse",
    icon_name: "material-symbols-light:warehouse-outline-rounded",
    icon_clicked_name: "material-symbols-light:warehouse-rounded",
    target: "warehouse",
  },
  {
    name: "calendar",
    icon_name: "material-symbols-light:calendar-month-outline",
    icon_clicked_name: "material-symbols-light:calendar-month-rounded",
    target: "calendar",
  },
  {
    name: "partners",
    icon_name: "material-symbols-light:group-outline-rounded",
    icon_clicked_name: "material-symbols-light:group-rounded",
    target: "partners",
  },
  {
    name: "wallet",
    icon_name: "material-symbols-light:account-balance-wallet-outline",
    icon_clicked_name: "material-symbols-light:account-balance-wallet",
    // target: "modal",
    target: 'wallet'
  },
]);

const clickBy = (el: any) => {
  console.log(`name: ${el.name}`);
  console.log(`target: ${el.target}`);
  if (el) {
    if (el.name === el.target) {
      router.push(`/${el.target}`);
      // router.push(`/projects/${object.locationID}`);
    } else {
        alert(`${el.name} в разработке`)
    }
  }
};

onMounted(() => {
  //   const { user } = useUserSession();
});

watch(
  () => route.path,
  (newRoute, prevRoute) => {
    currentRoute.value = newRoute.substring(1);
    // console.log(currentRoute.value);
  }
);
</script>
<template>
  <div class="footer_container" v-if="route.path !== '/login'">
    <Container>
      <!-- <div v-if="useAuthStore().user.favorite" class="footer_wrapper_loggedIn">
        {{ useAuthStore().user.favorite }} 
      </div> -->

      <!-- logged in -->
      <div class="footer_wrapper_loggedIn" v-if="useAuthStore().loggedIn">
        <Icon
          @click="clickBy(el)"
          v-for="el in hotBtnList"
          :name="
            currentRoute === el.target ? el.icon_clicked_name : el.icon_name
          "
          size="32px"
          color="var(--bs-primary)"
        />
      </div>

    </Container>
  </div>
  <!-- NO logged in -->
  <div v-if="!useAuthStore().loggedIn" style="background-color: var(--color-global-text); color: var(--color-btn-text)">
    <ul style="font-size: 0.8rem; list-style: none; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 0; padding: 1rem">
      <li style="white-space: nowrap">О нас</li>
      <li style="white-space: nowrap">Контакты</li>
      <li style="white-space: nowrap">
        <router-link to="/landing_crm">conspirators.CRM</router-link>
      </li>
      <li style="white-space: nowrap">Политика и соглашения</li>
      <li style="white-space: nowrap">Соглашение</li>
      <li style="white-space: nowrap">Оставить заявку</li>
    </ul>
  </div>
</template>

<style scoped>
.footer_container {
  position: fixed;
  bottom: 0;
  background-color: var(--bs-body-bg);
  width: 100%;
  box-shadow: -2px -2px 8px 0px rgba(0, 0, 0, 0.2);
}
.footer_wrapper_loggedIn {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: var(--bs-body-bg);
}
@media screen and (min-width: 769px) {
  .footer_wrapper_loggedIn {
    display: none;
  }
}
</style>
