<script lang="ts" setup>
import { Container } from "@/shared/container";

const router = useRouter();
const route = useRoute();
const currentRoute = ref("");
// AUTH
const hotBtnList = ref([
  // {
  //   name: "dashboard",
  //   icon_name: "material-symbols-light:dashboard-outline-rounded",
  //   icon_clicked_name: "material-symbols-light:dashboard-rounded",
  //   target: "dashboard",
  // },
  {
    name: 'demands',
    icon_name: 'material-symbols-light:library-books-outline-rounded',
    icon_clicked_name: 'material-symbols-light:library-books-rounded',
    target: "demands",
  },
  {
    name: "projects",
    icon_name: 'material-symbols-light:business-center-outline-rounded',
    icon_clicked_name: 'material-symbols-light:business-center-rounded',
    target: "projects",
  },
  {
    name: "calendar",
    icon_name: "material-symbols-light:calendar-month-outline",
    icon_clicked_name: "material-symbols-light:calendar-month-rounded",
    target: "calendar",
  },
  // {
  //   name: "partners",
  //   icon_name: "material-symbols-light:group-outline-rounded",
  //   icon_clicked_name: "material-symbols-light:group-rounded",
  //   target: "partners",
  // },
  // {
  //   name: 'landing_all',
  //   icon_name: 'material-symbols-light:personal-places-outline-rounded',
  //   icon_clicked_name: 'material-symbols-light:personal-places-rounded',
  //   target: "landing_all"
  // },
  {
    name: "warehouse",
    icon_name: "material-symbols-light:warehouse-outline-rounded",
    icon_clicked_name: "material-symbols-light:warehouse-rounded",
    target: "warehouse",
  },
  {
    name: "wallet",
    icon_name: "material-symbols-light:account-balance-wallet-outline",
    icon_clicked_name: "material-symbols-light:account-balance-wallet",
    // target: "modal",
    target: 'wallet'
  },
]);
// NO AUTH
const menuList = ref([
  {
    title: 'Контакты',
    path: '/about'
  },
  {
    title: 'Услуги маркетинга',
    path: '/landing_offer'
  },
  {
    title: 'Услуги художника',
    path: '/landing_design'
  },
  {
    title: 'Разработка сайтов / приложений',
    path: '/landing_dev'
  },
  {
    title: 'Финансовая грамотность с conspirators.CRM',
    path: '/landing_crm'
  },
  // {
  //   title: 'Оставить заявку',
  //   path: 'landing_offer'
  // },
  {
    title: 'conspirators.Journal',
    path: '/journal'
  },
  {
    title: 'Маркетплейс соучастников',
    path: '/landing_stock'
  },
  {
    title: 'Политика конфиденциальности',
    path: '/policy'
  }
])

const clickBy = (el: any) => {
  // console.log(`name: ${el.name}`);
  // console.log(`target: ${el.target}`);
  if (el) {
    if (el.name === el.target) {
      router.push(`/${el.target}`);
      // router.push(`/projects/${object.locationID}`);
    } else {
        alert(`${el.name} в разработке`)
    }
  }
};

// onMounted(() => {
//   //   const { user } = useUserSession();
// });

watch(
  () => route.path,
  (newRoute, prevRoute) => {
    currentRoute.value = newRoute.substring(1);
    // console.log(currentRoute.value);
  }
);
</script>
<template>
  <!-- AUTH -->
  <div class="footer_container" v-if="useAuthStore().loggedIn && route.path !== '/login'">


      <!-- wrapper -->
      <div class="footer_wrapper_loggedIn">
        <Icon
          @click="clickBy(el)"
          v-for="el in hotBtnList"
          :name="
            currentRoute === el.target ? el.icon_clicked_name : el.icon_name
          "
          size="48px"
          color="var(--color-global-text)"
          style="cursor: pointer;"
        />
      </div>


  </div>
  <!-- NO AUTH -->
  <div class="footer_container" style="background-color: var(--color-global-text); " v-if="!useAuthStore().loggedIn" >

      <!-- wrapper -->
      <div class="footer-wrapper_wo-auth ">

        <ul>
          <li v-for="el in menuList" >
            <router-link :to="el.path">{{ el.title }}</router-link>
          </li>
          <li style="margin-top: 2rem;">
            <router-link to="/">© conspirators <span style="font-size: 0.6rem; color: unset;">2024 - 2025</span></router-link>
            <!--   {
    title: '© conspirators, 2024 - 2025',
    path: '/'
  } -->
          </li>
        </ul>
      </div>

  </div>
</template>

<style scoped>
.footer_container {
  padding-top: 2rem;
  padding-bottom: 2rem;
  width: 100%;
}
.footer_wrapper_loggedIn,
.footer-wrapper_wo-auth {
  max-width: 1399px;
  margin: 0 auto;
}
.footer_wrapper_loggedIn {
  z-index: 99;
  box-shadow: -2px -2px 8px 0px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 0;
  padding: 0.5rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: var(--bs-body-bg);
}
.footer-wrapper_wo-auth {
  width: 100%;
  /* padding: 0.5rem 2rem; */
  background-color: var(--color-global-text); 
  color: var(--color-btn-text);
}
.footer-wrapper_wo-auth ul {
  /* font-size: 0.8rem;  */
  list-style: none; 
  display: grid; 
  gap: 1rem; 
  margin: 0; 
  padding: 1rem;
}
@media screen and (max-width: 767px) {
  .footer-wrapper_wo-auth ul{
    grid-template-columns: 1fr;
  }
}
@media screen and (min-width: 768px) {
  /* With AUTH */
  .footer_wrapper_loggedIn {
    display: none;
  }
  /* NO AUTH */
  .footer-wrapper_wo-auth ul {
    padding: 1rem 2rem
  }
}
</style>
