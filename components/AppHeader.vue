<script lang="ts" setup>

// shared
import { Container } from "@/shared/container";
// components
import { Button } from '@/components/button'
// utils
import { watch } from "vue";

// PROPS
const props = defineProps({
  auth_user_profile: {
    type: Object,
    default: {}
  },
  auth_user: {
    type: Object,
    default: {}
  },
});

const route = useRoute();
const router = useRouter();

const burgerIsOpened = ref(false);
const accountMenuIsOpened = ref(false);

// FEATURES LISTS
const featuresListAuth = ref([
  {
    path: "/calendar",
    title: "Календарь",
    auth: true,
  },
  // {
  //   path: "/charts",
  //   title: "Charts",
  //   auth: true,
  // },
  // {
  //   path: "/dashboard",
  //   title: "Доска",
  //   auth: true,
  // },
  {
    path: "/projects",
    title: "Проекты",
    auth: true,
  },
  {
    path: "/partners",
    title: "Контакты",
    auth: true,
  },
  {
    path: "/demands",
    title: "Заявки",
    auth: true,
  },
  // {
  //   path: "/warehouse",
  //   title: "ТМЦ",
  //   auth: true,
  // },
  // {
  //   path: "/bonds",
  //   title: "Бонды",
  //   auth: true,
  // },
  // {
  //   path: "/about",
  //   title: "О сервисе",
  //   auth: true,
  // },
]);

// const featuresListNoAuth = ref([
//   {
//     path: "/about",
//     title: "Контакты",
//     auth: false,
//   },
//   {
//     path: "/policy",
//     title: "Политика конфиденциальности",
//     auth: false,
//   },
//   // {
//   //   path: "/contract",
//   //   title: "Соглашение",
//   //   auth: false,
//   // },
// ]);
// NO AUTH
const featuresListNoAuth = ref([
  {
    title: 'Услуги маркетинга',
    path: '/landing_offer'
  },
  {
    title: 'conspirators.CRM',
    path: 'landing_crm'
  },
  // {
  //   title: 'Политика конфиденциальности',
  //   path: '/policy'
  // },
  {
    title: 'Оставить заявку',
    path: 'landing_offer'
  },
  {
    title: 'Контакты',
    path: '/about'
  },
])

//
onMounted(async () => {

});

const logout = () => {
  router.replace("/login");
  closeBurgerMenu();
  accountMenuIsOpened.value = false;
  useAuthStore().clear();
};

// const onClickRegister = () => {
//   alert("В разработке");
// };

const closeBurgerMenu = () => {
  if (burgerIsOpened.value) {
    setTimeout(((burgerIsOpened.value = false), 2000));
  } else if (accountMenuIsOpened.value) {
    accountMenuIsOpened.value = false;
  } else {
    return;
  }
};

// display link to modules if has access
// const userAccesedLink = (moduleName) => {
//   let userModulesArray = [];
//   if (useAuthStore().user) {
//     useAuthStore().user.accessModules.forEach((item) =>
//       userModulesArray.push(item.name)
//     );

//     return userModulesArray.includes(moduleName);
//   }
//   // return useAuthStore().user.id === 2
// };

const toggleAccountMenu = () => {
  accountMenuIsOpened.value = !accountMenuIsOpened.value;
};

// translaters
const translateRoutePath = (path: string) => {
  // INDEX, LOGIN, REGISTER
  if (path === "/" || path === "/login") {
    return;
  }
  // ABOUT, POLICY, CONTRACT, SETTINGS, DASHBOARD
  else if (path === "/about") {
    return "О сервисе";
  } else if (path === "/policy") {
    return "Политика";
  } else if (path === "/contract") {
    return "Соглашение";
  } else if (path === "/account") {
    return "Настройки";
  } 
  // DASHBOARD
  else if (path === "/dashboard") {
    return "Доска";
  } else if (path === "/calendar") {
    return 'Календарь'
  }
  // WALLET
  else if (path === "/wallet") {
    return "Мой кошелек"
  }
  // PROJECTS
  else if (path === "/projects") {
    return "Проекты";
  } else if (path.includes("/projects/")) {
    let startIndex = path.lastIndexOf("/");
    let id = path.substr(startIndex + 1);
    return `Проект #${id}`;
  }
  // PARTNERS
  else if (path === "/partners") {
    return "Соучастники";
  } else if (path.includes("/partners/")) {
    let startIndex = path.lastIndexOf("/");
    let id = path.substr(startIndex + 1);
    return `Cоучастник #${id}`;
  }
  // DEMANDS
  else if (path === "/demands") {
    return "Заявки";
  } else if (path.includes("/demands/")) {
    let startIndex = path.lastIndexOf("/");
    let id = path.substr(startIndex + 1);
    return `Заявка #${id}`;
  }
  // BANKS
  else if (path === "/banks") {
    return "Банки"
  } else if (path.includes("/banks/")) {
    let startIndex = path.lastIndexOf("/");
    let id = path.substr(startIndex + 1);
    return `Банк #${id}`;
  }
  // WAREHOUSE
  else if (path === "/warehouse") {
    return "ТМЦ";
  } else if (path.includes("/warehouse/")) {
    let startIndex = path.lastIndexOf("/");
    let id = path.substr(startIndex + 1);
    return `ТМЦ #${id}`;
  }
  // COMPANIES
  else if (path === "/organizations") {
    return "Банды";
  } else if (path.includes("/organizations/")) {
    let startIndex = path.lastIndexOf("/");
    let id = path.substr(startIndex + 1);
    return `Банда #${id}`;
  }
  // LOCATIONS
  else if (path.includes("/locations/")) {
    let startIndex = path.lastIndexOf("/");
    let id = path.substr(startIndex + 1);
    return `Локация #${id}`;
  }
  // LANDING CRM
  else if (path = '/landing_crm') {
    return 'conspirators.CRM'
  }
  // ELSE
  else {
    return path;
  }
};

// WATCHERS
watch(burgerIsOpened, () => {
  // console.log(`burgerIsOpened: ${burgerIsOpened.value}`);
  if (burgerIsOpened.value) {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("links_container")) {
        burgerIsOpened.value = false;
      }
    });
  }
});
watch(accountMenuIsOpened, () => {
  // if (accountMenuIsOpened.value) {
  //   document.addEventListener("click", (e) => {
  //     console.log(e.target.parent);
  //   });
  // }
  if (accountMenuIsOpened.value) {
    document.addEventListener("click", (e) => {
      if (
        e.target.parentNode.classList &&
        (e.target.parentNode.classList.contains("user_info") ||
          e.target.parentNode.classList.contains("user_name") ||
          e.target.parentNode.classList.contains("account-menu_list") ||
          e.target.parentNode.classList.contains("account-menu_user") ||
          e.target.parentNode.classList.contains("account-user_icon") ||
          e.target.parentNode.classList.contains("account-menu") ||
          e.target.parentNode.classList.contains("user_icon"))
      ) {
        // console.log(e.target.parentNode.classList);
      } else {
        accountMenuIsOpened.value = false;
      }
    });
  }
});

// Следим за роутами
const prevPage = ref(null);
watch(
  () => route.path,
  (newRoute, prevRoute: any) => {
    prevPage.value = prevRoute;
    console.log(route);
  }
);
</script>

<template>
  <div class="header-container" v-if="route.path !== '/login' && route.path !== '/register'">

    <div class="header-wrapper">
      <div class="nav-block_left">
        <!-- Back BTN -->
        <div
          class="back-btn"
          v-if="
            prevPage !== null && route.path !== '/' && route.path !== '/login'
          "
          @click="router.go(-1)"
        >
          <Icon
            class="link"
            name="material-symbols-light:arrow-back-ios"
            size="24px"
            color="var(--color-global-text_second)"
          />
        </div>
        <!-- </div> -->
        <!-- LOGO -->
        <router-link
          v-if="useAuthStore().loggedIn !== true"
          to="/"
          class="header-logo"
          @click="closeBurgerMenu"
        >
          <span>conspirators.su</span>
        </router-link>
      </div>

      <!--  -->
      <h1 v-if="useAuthStore().loggedIn === true" class="current-route_container">
        {{ translateRoutePath(route.path) }}
      </h1>

      <!-- LIST of links -->
      <div
        class="links_container"
        :class="burgerIsOpened ? 'opacity-1-767' : 'opacity-0-767'"
      >
        <div class="links_wrapper">
          <!-- Auth -->
          <ul
            class="header-features__list"
            v-if="useAuthStore().loggedIn === true"
          >
            <!-- .current-feature -->
            <!-- :class="{'current-feature': route.path === '/dashboard'}" -->
            <li
              v-for="(item, index) in featuresListAuth"
              @click="closeBurgerMenu"
            >
              <router-link
                :to="`${item.path}`"
                :class="{
                  'current-feature':
                    route.path === item.path &&
                    route.path.includes('partners'),
                }"
                >{{ item.title }}</router-link
              >
            </li>

            <!-- WALLET -->
            <li @click="closeBurgerMenu">
              <router-link to="/wallet">Кошелек</router-link>
            </li>

            <!-- HELP -->
            <li @click="closeBurgerMenu">
              <Button type="pseudo-btn" link="/help" :disabled="false" >Помощь</Button>
            </li>

            <!-- <li v-if="userAccesedLink('banks')" @click="closeBurgerMenu">
              <router-link to="/banks">Банк</router-link>
            </li> -->

            <!-- ТМЦ -->
            <li @click="closeBurgerMenu">
              <router-link to="/about"></router-link>
            </li>
          </ul>

          <!-- !Auth -->
          <ul
            class="header-features__list"
            v-if="useAuthStore().loggedIn === false"
          >
            <li
              v-for="(item, index) in featuresListNoAuth"
              @click="closeBurgerMenu"
            >
              <router-link :to="`${item.path}`">{{ item.title }}</router-link>
            </li>
          </ul>

          <!-- LOGIN -->
          <div class="login_wrapper">
            <!-- to login page if !loggin -->

            <Button 
              v-if="!useAuthStore().loggedIn && route.name !== 'login' && route.name === 'landing_crm'" 
              class="account-btn"
              @click="closeBurgerMenu"
              type="pseudo-btn" 
              link="/login"
              bg="bg-stroke"
              :disabled="false"

            >Войти</Button>

            <!-- IF LOGGED IN -->
            <div v-if="useAuthStore().loggedIn" class="account-container">
              <!-- ACCOUNT -->
              <div class="account-menu">
                <div class="account-user_icon" @click="toggleAccountMenu">
                  <Icon
                    name="material-symbols-light:account-circle"
                    size="42px"
                    color="var(--color-global-text_second)"
                    class="user_icon"
                  />
                  <!-- <div class="account-user_info"><p>Анфалов С.В.</p></div> -->
                </div>
                <div
                  class="account-menu_list"
                  :class="
                    accountMenuIsOpened ? 'display-block' : 'display-none'
                  "
                >
                  <!-- ПОльзвоательские кнопки -->
                  <div class="account-menu_user">
                    <div class="user_info">
                      <router-link
                        :to="`/partners/${useAuthStore().user.id}`"
                        @click="closeBurgerMenu"
                      >
                        <span style="font-weight: bold">{{
                          useAuthStore().user.surname
                        }}</span>
                        <div class="user_name">
                          <span>{{ useAuthStore().user.name }}</span>

                          <span>{{ useAuthStore().user.middleName }}</span>
                        </div>
                      </router-link>
                    </div>
                    
                    <div class="user_list">

                      <!-- settings -->
                      <Button 
                        @click="closeBurgerMenu" 
                        type="pseudo-btn" 
                        link="/account" 
                        :disabled="false"
                      >
                        <span 
                          style="font-size: 2rem; font-weight: bold;"
                        >
                          {{ props?.auth_user.login }}
                        </span></Button>

                    </div>

                    <!-- <div class="line"></div> -->

                    <!--  -->
                    <div class="user_logout">
                      <span @click="logout()" style="color: var(--bs-danger)">Выйти</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- </div> -->
          </div>
        </div>
      </div>

      <!-- BURGER -->
      <label class="burger">
        <input type="checkbox" v-model="burgerIsOpened" />
        <span class="menu">
          <span class="hamburger"></span>
        </span>
      </label>
    </div>

  </div>
</template>

<style scoped>
/* a,
a:visited {
  color: var(--bs-primary);
} */
.header-container{
  position: fixed;
  top: 0;
  width: 100%;
  /* background-color: var(--bs-primary-bg-subtle);  */
  box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.2);
  background-color: white;
  z-index: 99;
}

.header-wrapper {
  max-width: 1399px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 1rem 0; */
  /* gap: 1rem; */
}
/* .burger {
  display: none;
} */
/* .header-shared {
  display: flex;
  align-items: center;
  gap: 1rem;
} */
.nav-block_left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.back-btn {
  cursor: pointer;
  /* z-index: 100; */
}
.header-logo {
  text-decoration: none;
  margin-right: 1rem;
}
.links_container {
  /* flex: 1; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-features__list {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  padding: 0;
  margin: 0;
}
.router-link-exact-active {
  /* color: #fff!important; */
  /* background-color: green; */
  /* box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.2); */
  /* padding: 0.3rem; */
  /* padding-top: 1rem; */
  /* border-top-right-radius: 16px; */
  font-weight: bold;
}
/* .header-features__list li {
  background-color: gray;
} */
.header-features__list li a {
  text-decoration: none;
}
.user_list a,
.account-menu_user .user_info a {
  background-color: unset !important;
  color: var(--bs-primary) !important;
}
.user_list a {
  padding: unset !important;
  padding-left: -1rem !important;
}
.account-menu_user .user_name {
  display: flex;
  gap: 0.3rem;
}
@media screen and (max-width: 575px) {
  .header_wrapper {
    padding: 0;
    margin: 0;
  }
}
@media screen and (max-width: 767px) and (max-height: 540px) {
  /* .header-wrapper {
    padding-left: unset !important;
  } */
  .header-logo {
    /* background-color: red; */
  }
  .header-logo span {
    background-color: #fff;
    /* padding: 1rem 15rem 0.8rem 0; */
  }

  .links_wrapper {
    overflow: scroll;
    padding-top: 8rem;
    padding-bottom: 2rem;
  }
  .account-user_icon {
    display: none;
  }
  .account-menu {
    /* margin-left: 1rem; */
    padding-left: 32px;
  }
}

@media screen and (max-width: 767px) {
  .account-user_icon {
    display: none;
  }
  .header-wrapper {
    /* padding: 0 1rem; */
    padding-left: 1rem;
  }
  .login_contaner {
    display: none;
  }
  .current-route_container {
    position: relative;
    margin: 0;
    font-size: 1rem;
    /* font-weight: normal; */
    /* margin-left: 0.3rem; */
    flex: 1;
    /* text-align: center; */
  }
  /* .current-route_container:before {
    content: "";
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    left: -0.4rem;
    width: 1px;
    height: 80%;
    background-color: var(--bs-primary);
  } */
  .links_container {
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    /* display: flex !important; */
    transition: opacity 0.3s ease-in;
  }
  .links_wrapper {
    background-color: #fff;
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    /* overflow: scroll; */
    /* padding-top: 5rem; */
    /* gap: 10rem; */
    /* margin-left: 30%; */
  }
  .links_container .header-features__list,
  .links_container .login_wrapper .account-container {
    flex-direction: column;
    width: 100%;
  }

  .header-features__list,
  .account-menu_list {
    align-items: flex-start;
  }

  /* .header-features__list {

  } */

  .router-link-exact-active {
    /* color: #fff!important; */
    /* background-color: green; */
    position: relative;
    padding-left: 1rem;
    margin-left: -1rem;
    /* padding: 0.3rem!important; */
  }

  .account-menu {
    padding-left: 0.5rem;
  }

  .account-menu_user .user_list a.router-link-exact-active {
    color: #fff !important;
    background-color: green !important;
    padding-left: 1rem !important;
    margin-left: -1rem;
    padding: 0.3rem !important;
  }

  .login_wrapper {
    /* position: absolute; */
    /* order: -1; */
    top: 10rem;
    left: 0;
    /* transform: translateX(-50%); */
    position: unset;
    order: -1;
  }
  .account-btn {
    margin-left: 1rem;
  }
  .account-container {
    flex-direction: row !important;
  }
  .account-menu {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .account-menu_list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .account-menu {
    margin-left: 1rem;
  }
  .header-features__list li {
    /* margin-top: 1rem; */
    padding-left: 1.5rem;
  }
  .header-features__list {
    margin-top: 1.5rem;
  }
  .account-menu_user {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .account-menu_user .user_info {
    order: -1;
  }
  .account-menu_user .user_list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .user_logout {
    order: -1;
  }

  .line {
    width: 100%;
    height: 1px;
    background-color: black;
  }

  /* Технические стили max-width: 575px*/
  .opacity-0-767 {
    display: none;
    opacity: 0;
  }

  .opacity-1-767 {
    display: block;
    opacity: 1;
  }
}

@media screen and (min-width: 768px) {
  .header-wrapper {
    padding: 1rem;
  }
  .current-route_container {
    display: none;
  }
  .burger {
    display: none;
  }
  .links_container {
    width: 100%;
  }
  .links_wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .account-menu {
    position: relative;
  }
  .account-menu_list {
    position: absolute;
    top: 2rem;
    right: 0;
    background-color: #fff;
    /* transition: all 0.3s ease-in; */
    /* border: 1px solid black; */
  }
  .account-menu_user {
    /* padding: 1rem; */
    /* width: 300px; */
    box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.2);
    /* align-items: flex-end !important; */
    padding: 1rem 10px;
    border-radius: 16px;
  }
  .account-menu_user .user_info {
    display: flex;
    flex-direction: column;
    /* align-items: flex-end; */
  }

  .account-menu_user .user_list {
    margin-top: 0.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .user_logout {
    margin-top: 1rem;
    /* cursor: pointer; */
  }
  .user_logout span {
    cursor: pointer;
  }

  /* Технические  */
  .display-none {
    display: none;
    /* opacity: 0; */
  }

  .display-block {
    display: block;
    /* opacity: 1; */
  }
}

.user-login__container {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.account-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.account-container a {
  text-decoration: none;
}
.account-container p {
  margin: 0;
}
.account-user_icon {
  /* display: flex; */
  /* align-items: center; */
  cursor: pointer;
}

/* .account-btn {
  text-decoration: none;
  cursor: pointer;
} */
.header-logo {
  /* z-index: 100; */
}
/* .burger пока что это label */
.burger {
  width: 3rem;
  height: 3rem;
  /* background: black; */
}
label .menu {
  /* position: relative; */
  /* right: 80px;
  top: -100px; */
  z-index: 100;
  width: 30px;
  height: 30px;
  /* background: black; */
  background: #fff;
  border-radius: 50% 50% 50% 50%;
  -webkit-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  box-shadow: 0 0 0 0 #fff, 0 0 0 0 #fff;
  cursor: pointer;
}

label .hamburger {
  position: absolute;
  /* top: 135px; */
  top: 50%;
  right: 1rem;
  /* left: 50px; */
  width: 32px;
  height: 2px;
  background: var(--color-global-text);
  display: block;
  -webkit-transform-origin: center;
  transform-origin: center;
  -webkit-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
}

label .hamburger:after,
label .hamburger:before {
  -webkit-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  background: var(--color-global-text);
}

label .hamburger:before {
  top: -10px;
}

label .hamburger:after {
  bottom: -10px;
}

label input {
  width: 32px;
  height: 32px;
  display: none;
}

label input:checked + .menu .hamburger {
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  background-color: #fff;
}

label input:checked + .menu .hamburger:after {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  bottom: 0;
  background-color: #fff;
}

label input:checked + .menu .hamburger:before {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  top: 0;
  background-color: #fff;
}

label input:checked + .menu + ul {
  opacity: 1;
}

label a {
  margin-bottom: 1em;
  display: block;
  color: var(--bs-primary);
  text-decoration: none;
}
</style>
