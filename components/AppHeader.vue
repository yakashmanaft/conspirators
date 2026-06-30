<script lang="ts" setup>

// shared
import { Container } from "@/shared/container";
// components
import { Button } from '@/components/button'
// utils
import { watch } from "vue";
// store
import { useCart } from "@/stores/cart";

// PROPS
const props = defineProps({
    auth_user: {
      type: Object,
      default: {}
    },
});

const route = useRoute();
const router = useRouter();

const burgerIsOpened = ref(false);
const accountMenuIsOpened = ref(false);
const cartMenuIsOpened = ref(false)

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
    path: "/landing_all",
    title: 'Сад',
    auth: true
  },
  {
    path: "/projects",
    title: "Проекты",
    auth: true,
  },
  {
    path: "/band",
    title: "Банды",
    auth: true
  },
  {
    path: "/partners",
    title: "Контакты",
    auth: true,
  },
  {
    path: "/demands",
    title: "Доска",
    auth: true,
  },
  {
    path: "/warehouse",
    title: "ТМЦ",
    auth: true,
  },
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
    title: 'Каталог',
    path: '/landing_stock'
  },
  // {
  //   title: 'Услуги маркетинга',
  //   path: '/landing_offer'
  // },
  // {
  //   title: 'Дизайним',
  //   path: '/landing_design'
  // },
  // {
  //   title: 'Разработка',
  //   path: '/landing_dev'
  // },
  // {
  //   title: 'CRM',
  //   path: '/landing_crm'
  // },
  {
    title: 'Журнал',
    path: '/journal'
  },
  // {
  //   title: 'Политика конфиденциальности',
  //   path: '/policy'
  // },
  // {
  //   title: 'Оставить заявку',
  //   path: 'landing_offer'
  // },
  // {
  //   title: 'Контакты',
  //   path: '/about'
  // },
])


// Cart list item
const cart = useCart()
const cart_product_list_items = ref([
  {
    //id
    item_id: 1,
    //title
    item_name: 'Тумба с раковиной',
    item_text: 'Фасады из натурального камня. Металлический каркас. Крепление к стене в комплекте',
    item_imgUrl: 'https://cs2.livemaster.ru/storage/8d/69/a9072f1f95998b3f40e6555d8av3--dlya-doma-i-interera-rakovina-iz-naturalnogo-kamnya.jpg',
    //qty
    item_qty: 1,
    //price
    item_price: 29990.00,
    item_currency: 'RUB',
    item_promo: '2706Промо2026'
  },
  {
    item_id: 2,
    item_name: 'Тумба со встроенной раковиной',
    item_text: 'Фасады из натурального камня. Металлический каркас. Крепление к стене в комплекте',
    item_imgUrl: 'https://cs2.livemaster.ru/storage/8d/69/a9072f1f95998b3f40e6555d8av3--dlya-doma-i-interera-rakovina-iz-naturalnogo-kamnya.jpg',
    item_qty: 1,
    item_price: 39990.00,
    item_currency: 'RUB'
  },
  {
    item_id: 3,
    item_name: 'Тумба с раковиной',
    item_text: 'Фасады из натурального камня. Металлический каркас. Крепление к стене в комплекте',
    item_imgUrl: 'https://cs2.livemaster.ru/storage/8d/69/a9072f1f95998b3f40e6555d8av3--dlya-doma-i-interera-rakovina-iz-naturalnogo-kamnya.jpg',
    item_qty: 1,
    item_price: 29990.00,
    item_currency: 'RUB'
  },
  {
    item_id: 4,
    item_name: 'Тумба со встроенной раковиной',
    item_text: 'Фасады из натурального камня. Металлический каркас. Крепление к стене в комплекте',
    item_imgUrl: 'https://cs2.livemaster.ru/storage/8d/69/a9072f1f95998b3f40e6555d8av3--dlya-doma-i-interera-rakovina-iz-naturalnogo-kamnya.jpg',
    item_qty: 1,
    item_price: 39990.00,
    item_currency: 'RUB'
  },
  {
    item_id: 5,
    item_name: 'Тумба с раковиной',
    item_text: 'Фасады из натурального камня. Металлический каркас. Крепление к стене в комплекте',
    item_imgUrl: 'https://cs2.livemaster.ru/storage/8d/69/a9072f1f95998b3f40e6555d8av3--dlya-doma-i-interera-rakovina-iz-naturalnogo-kamnya.jpg',
    item_qty: 1,
    item_price: 29990.00,
    item_currency: 'RUB'
  },
  {
    item_id: 6,
    item_name: 'Тумба со встроенной раковиной',
    item_text: 'Фасады из натурального камня. Металлический каркас. Крепление к стене в комплекте',
    item_imgUrl: 'https://cs2.livemaster.ru/storage/8d/69/a9072f1f95998b3f40e6555d8av3--dlya-doma-i-interera-rakovina-iz-naturalnogo-kamnya.jpg',
    item_qty: 1,
    item_price: 39990.00,
    item_currency: 'RUB'
  },
  {
    item_id: 7,
    item_name: 'Тумба с раковиной',
    item_text: 'Фасады из натурального камня. Металлический каркас. Крепление к стене в комплекте',
    item_imgUrl: 'https://cs2.livemaster.ru/storage/8d/69/a9072f1f95998b3f40e6555d8av3--dlya-doma-i-interera-rakovina-iz-naturalnogo-kamnya.jpg',
    item_qty: 1,
    item_price: 29990.00,
    item_currency: 'RUB'
  },
  {
    item_id: 8,
    item_name: 'Тумба со встроенной раковиной',
    item_text: 'Фасады из натурального камня. Металлический каркас. Крепление к стене в комплекте',
    item_imgUrl: 'https://cs2.livemaster.ru/storage/8d/69/a9072f1f95998b3f40e6555d8av3--dlya-doma-i-interera-rakovina-iz-naturalnogo-kamnya.jpg',
    item_qty: 1,
    item_price: 39990.00,
    item_currency: 'RUB'
  }
])
const cart_service_list_items = ref([
  {
    item_id: 1,
    item_name: 'Установка тумбы',
    item_text: 'Проведение монтажных работы',
    item_qty: 1,
    item_pice: 29990.00,
    item_curerncy: 'RUB'
  },
  {
    item_id: 2,
    item_name: 'Демонтажные работы',
    item_text: 'Снимаем староеы',
    item_qty: 1,
    item_pice: 39990.00,
    item_curerncy: 'RUB'
  },
  {
    item_id: 3,
    item_name: 'Вывоз мусора',
    item_text: 'Прибираемся посел работы',
    item_qty: 1,
    item_pice: 39990.00,
    item_curerncy: 'RUB'
  },
  {
    item_id: 4,
    item_name: 'Вывоз мусора',
    item_text: 'Прибираемся посел работы',
    item_qty: 1,
    item_pice: 39990.00,
    item_curerncy: 'RUB'
  },
  {
    item_id: 5,
    item_name: 'Вывоз мусора',
    item_text: 'Прибираемся посел работы',
    item_qty: 1,
    item_pice: 39990.00,
    item_curerncy: 'RUB'
  }
])
const cart_task_list_items = ref([
  {
    //id
    id: 1,
    //title
    name: 'Запрос заказной позиции',
    desc: 'Полка для хранения с крючками Тезза Лава',
    //qty
    qty: 1,
    //price
    price: 29990.00,
    currency: 'RUB',
    // item_promo: '2706Промо2026'
  },
  {
    id: 2,
    name: 'Установка тумбы',
    desc: 'Проведение монтажных работы',
    qty: 1,
    pice: 29990.00,
    curerncy: 'RUB'
  },
])
const conspirator_family_ticket = ref({
  user_id: useUserSession().user,
  user_type: 'guest',
  user_discount: 0.00,
  conspirators_coin: 0.00
})
const item_product_delivery = ref({
    type: 'самовывоз', //доставка
    address: ''
})
const emit = defineEmits(['checkCartModalStatus'])
//
onMounted(async () => {
  // emit('update:emitedCartMenuStatus', cartMenuIsOpened.value)
emit('checkCartModalStatus', false)
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
    // return "Настройки";
    return 'Аккаунт'
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
  // JOURNAL
  else if (path === "/journal") {
    return "Бортовой журнал";
  } else if (path.includes("/journal/")) {
    let startIndex = path.lastIndexOf("/");
    let id = path.substr(startIndex + 1);
    return `Статья #${id}`;
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
    return "Контакты";
  } else if (path.includes("/partners/")) {
    let startIndex = path.lastIndexOf("/");
    let id = path.substr(startIndex + 1);
    return `Контакт`;
  }
  // BAND
  else if (path === "/band")  {
    return "Кооперативы"
  } else if (path.includes("/band/")) {
    let startIndex = path.lastIndexOf("/");
    let id = path.substr(startIndex + 1);
    return `Кооператив`;
  }
  // DEMANDS
  else if (path === "/demands") {
    return "Доска";
  } else if (path.includes("/demands/")) {
    let startIndex = path.lastIndexOf("/");
    let id = path.substr(startIndex + 1);
    return `Заявка #${id}`;
  }
  // TASKS
  else if (path.includes("/task/")) {
    let startIndex = path.lastIndexOf("/");
    let id = path.substr(startIndex + 1);
    return `Задача #${id}`;
  }
  // MESHки
  else if (path.includes('/mesh/')) {
    let startIndex = path.lastIndexOf("/");
    let id = path.substr(startIndex + 1);
    return `Мешок #${id}`;
  }
  // CRYPTO MESHки
  else if (path.includes('/crypto/')) {
    let startIndex = path.lastIndexOf("/");
    let id = path.substr(startIndex + 1);
    return `Мешок в крипте #${id}`;
  }
  // КРЕДИТЫ
  else if (path.includes('/loan/')) {
    let startIndex = path.lastIndexOf("/");
    let id = path.substr(startIndex + 1);
    return `Кредит #${id}`;
  }
  // FUNDS
  else if (path.includes('/fund/')) {
    let startIndex = path.lastIndexOf("/");
    let id = path.substr(startIndex + 1);
    return `Фонд соучастников #${id}`;
  }
  // BANKS
  // else if (path === "/banks") {
  //   return "Банки"
  // } else if (path.includes("/banks/")) {
  //   let startIndex = path.lastIndexOf("/");
  //   let id = path.substr(startIndex + 1);
  //   return `Банк #${id}`;
  // }
  // BROKERAGE
  else if (path === "/brokerage") {
    return "Брокерские счета"
  } else if (path.includes("/brokerage/")) {
    let startIndex = path.lastIndexOf("/");
    let id = path.substr(startIndex + 1);
    return `Брокерский счет`;
  }
  // BROKERAGE
  else if (path === "/cfa") {
    return "Цифровые активы"
  } else if (path.includes("/cfa/")) {
    let startIndex = path.lastIndexOf("/");
    let id = path.substr(startIndex + 1);
    return `Цифровые активы`;
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
  // LANDINGs
  //= LANDING CRM
  else if (path === '/landing_crm') {
    return 'conspirators.CRM'
  }
  //= LANDING DESIGN
  else if (path === '/landing_design') {
    return 'Подельники дизайна'
  }
  //= LANDING ALL
  else if (path === '/landing_all') {
    return 'Мой сад'
  }
  //= LANDING OFFER
  else if (path === '/landing_offer') {
    return 'Ваш отдел маркетинга'
  }
  //= whitepaper
  else if (path === '/whitepaper') {
    return 'Whitepaper'
  }
  // ELSE
  else {
    return path;
  }
};


// 
const toggleCartMenu = () => {
  cartMenuIsOpened.value = !cartMenuIsOpened.value
}
// Заголовок подраздела (товары, услуги, заявки) в корзине
const current_cart_subtitle = ref('products')

// WATCHERS
watch(burgerIsOpened, () => {
  // console.log(`burgerIsOpened: ${burgerIsOpened.value}`);
  let body = document.getElementsByTagName('body')[0]
  if (burgerIsOpened.value) {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("links_container")) {
        burgerIsOpened.value = false;
      }
    });
    body.style.position = 'fixed';
  } else {
    body.style.position = 'unset'
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

watch(cartMenuIsOpened, () => {
  emit('checkCartModalStatus', cartMenuIsOpened.value)
  if(cartMenuIsOpened.value) {
    // emit('update:emitedCartMenuStatus', cartMenuIsOpened.value)
    document.addEventListener("click", (e) => {
      
      if(e.target.classList && e.target.classList.contains('cart__opened')) {
        cartMenuIsOpened.value = false
        
      }

    })
  }
})

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
  <div class="header-container" style="z-index: 100;" v-if="route.path !== '/login' && route.path !== '/register'">

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
            size="32px"
            color="var(--color-global-text_second)"
          />
        </div>
        <!-- </div> -->
        <!-- LOGO -->
        <div class="logo_wrapper" style="margin-right: 1.5rem;">
          <p style="margin: 0; width: fit-content; cursor: pointer;" @click="router.push('/'); burgerIsOpened = false">cnsprtrs<span>®</span></p>
        </div>
        <!-- <router-link
          v-if="useAuthStore().loggedIn !== true"
          to="/"
          class="header-logo"
          @click="closeBurgerMenu"
        >
          <span>conspirators.su</span>
        </router-link> -->
      </div>

      <!--  -->
      <h1 v-if="useAuthStore().loggedIn === true" class="current-route_container">
        {{ translateRoutePath(route.path) }}
      </h1>
      <h1 v-else-if="route.path.includes('/journal')" class="current-route_container">{{ translateRoutePath(route.path) }}</h1>
      <!-- LIST of links -->
      <div
      class="links_container"
      :class="burgerIsOpened ? 'opacity-1-767' : 'opacity-0-767'"
      >
        <div class="links_wrapper" style="position: relative;">
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
            <!-- <li @click="closeBurgerMenu">
              <Button type="pseudo-btn" link="/help" :disabled="false" >Помощь</Button>
            </li> -->

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

          <!-- !Auth -->
          <span class="copyright_wrapper"><router-link to="/" @click="closeBurgerMenu">© conspirators <span style="color: unset; font-weight: normal;font-size: 0.6rem;">2024-2026</span></router-link></span>

          <!-- LOGIN -->
          <div class="login_wrapper">
            <!-- to login page if !loggin -->

            <Button 
              v-if="!useAuthStore().loggedIn && route.name !== 'login'" 
              class="account-btn"
              @click="closeBurgerMenu"
              type="pseudo-btn" 
              link="/login"
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
                          <Icon
                            class="link"
                            name="material-symbols-light:arrow-back-ios"
                            size="32px"
                            color="var(--color-global-text_second)"
                            style="transform: rotate(180deg)"
                          />
                        </span></Button>

                    </div>

                    <!-- <div class="line"></div> -->

                    <!--  -->
                    <!-- HELP BTN -->
                    <div>
                      <Button 
                        type="pseudo-btn" 
                        link="/help" 
                        :disabled="false" 
                        @click="closeBurgerMenu"
                      >
                        Помощь
                      </Button>
                    </div>
                    <!-- LOGOUT BTN -->
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

      <!-- CART -->
      <div class="cart" @click.stop="toggleCartMenu()">
          <!-- <input id='cart_menu_btn' type="checkbox" v-model="cartMenuIsOpened" /> -->
          <label for="cart_menu_btn">
            <div class="cart_icon">
              <Icon size="32px" name="hugeicons:shopping-basket-01" color="var(--color-global-text_second)"/>
            </div>
            <div class="cart_count">
              99+
            </div>
          </label>


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

  <!-- CART MODAL -->
  <div v-if="cartMenuIsOpened" class="cart_container" :class="cartMenuIsOpened ? 'cart__opened' : 'cart_closed'">

    <div class="cart_wrapper">

      <div class="cart_header">
        <p>Корзина</p>
        <div>
          <!-- <p style="cursor: pointer;">Избранное</p> -->
          <p style="cursor: pointer;" @click.stop="cartMenuIsOpened = false">Закрыть</p>
        </div>
      </div>

      <div class="cart_main no-scrollbar">
        
        <!-- <div style="background-color: var(--color-wallet-fund-debt); grid-column: span 3">
          <input type="checkbox">
          Выбрать все / Удалить выбранное
        </div> -->

        <div class="cart_item">

          <div style="display: flex;align-items: center; justify-content: space-between;">
            <h2 style="line-height: 2rem; font-size: 1rem; margin: 0; margin-left: 1rem;font-weight: normal;">
              <span
                  @click.stop="current_cart_subtitle = 'products'"
                  style="cursor: pointer;text-transform: uppercase;"
                  :style="
                  current_cart_subtitle === 'products' 
                  ? 'border-bottom: 1px solid var(--color-global-text); padding-bottom: .25rem;'
                  : 'color: var(--color-global-text_second); font-weight: normal;'
              ">
                Товары ({{ cart.items?.length }})
              </span>
              <span
                  @click.stop="current_cart_subtitle = 'services'"
                  style="cursor: pointer; text-transform: uppercase;margin-left: .5rem;"
                  :style="
                  current_cart_subtitle === 'services' 
                  ? 'border-bottom: 1px solid var(--color-global-text); padding-bottom: .25rem;'
                  : 'color: var(--color-global-text_second); font-weight: normal;'
              ">
                Услуги ({{ cart_service_list_items?.length }})
              </span>
              <span
                  @click.stop="current_cart_subtitle = 'tasks'"
                  style="cursor: pointer; text-transform: uppercase;margin-left: .5rem;"
                  :style="
                  current_cart_subtitle === 'tasks' 
                  ? 'border-bottom: 1px solid var(--color-global-text); padding-bottom: .25rem;'
                  : 'color: var(--color-global-text_second); font-weight: normal;'
              ">
                Задачи ({{ cart_task_list_items?.length }})
              </span>
            </h2>
            <p 
              class="clear-cart_btn"
              v-if="cart.items.length" 
              style="margin: 0;"
              @click.stop="cart.clearCart()"
            >Очистить корзину</p>
          </div>
          <!-- CART PRODUCTS LIST -->
          <div>
            <!-- {{ useCartStore }} -->
          </div>

          <!-- PRODUCTS LIST -->
          <div v-if="current_cart_subtitle === 'products'" class="cart_product_section">
            <!-- <p>Товары</p> -->
            <ul class="cart_product_item_container">

              <!-- ТОВАР / ITEM -->
              <li 
                class="cart_product_item_wrapper"
                v-for="item in cart.items"
              >
                <!-- img -->
                <div class="product-item_img">
                  <img :src="`${item.imgUrl}`" :alt="item.title"
                >
                </div>

                <!--  -->
                <div style="display: flex; align-items: center; justify-content: space-between; flex: 1 auto;">
                  <div 
                    class="cart-product-info_wrapper"
                    @click.stop="$router.push(`/product/${item.id}`), cartMenuIsOpened = false"
                    >
                    <p class="cart-product-info_title">
                      {{ item.title }}
                    </p>
                    <p class="cart-product-info_article">Артикул: {{ item.article }}</p>
                    <p>{{ item.max_qty }}</p>
                    <div class="cart-product-info_count" style="display: flex; align-items: center; gap: .5rem;">
                      <div class="count_btn" style="background-color: var(--color-global-text); width: 2rem; height: 2rem;" @click.stop="cart.updateQuantity(item.id, -1)">
                        -
                      </div>
                      <div>{{ item.qty }}</div>
                      <div 
                        class="count_btn" 
                      style="background-color: var(--color-global-text); width: 2rem; height: 2rem;"
                      @click.stop="cart.updateQuantity(item.id, 1)"
                      >
                        +
                      </div>
                    </div>
                  </div>

                  <div style="width: fit-content; display: flex; flex-direction: column; align-items: center; text-align: center; width: 200px;">
                    <!-- <div>
                      <p style="margin: 0;">{{ item.item_promo }}</p>
                    </div> -->
                    <div>
                      <p style="margin: 0;">
                        <!-- <span v-if="item.item_promo" style="text-decoration: line-through;">
                          999.90RUB
                        </span> -->
                        <span style="font-weight: bold;">
                          {{ item.qty * item.price }}{{ item.currency }}
                        </span>
                      </p>
                    </div>
                    <div v-if="!conspirator_family_ticket.user_id" class="cart-price-benefits_item">
                      <p @click.stop="$router.push(`/whitepaper`), cartMenuIsOpened = false" style="margin: 0;">Выгоднее с конспираторами </p>
                    </div>
                  </div>
                </div>
                <!-- {{ item }} -->
              </li>

              <li v-if="!cart.items.length" class="cart_product_item_container_empty"><p>В корзине пусто. <span @click.stop="cartMenuIsOpened = false">Перейти в каталог</span></p></li>


              <!-- <li class="cart_product_item_wrapper" v-for="item in cart_product_list_items" :key="item.item_id">
                <div class="product-item_img">
                  <img :src="`${item.item_imgUrl}`" :alt="item.item_name"
                >
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between; flex: 1 auto;">
                  <div class="cart-product-info_wrapper">
                    <p class="cart-product-info_title" @click.stop="$router.push(`/product/12`), cartMenuIsOpened = false">{{ item.item_name }}</p>
                    <p class="cart-product-info_article">Артикул:{{ item.item_id }}</p>
                    <p class="cart-product-info_count">-1+</p>
                  </div>
                  <div style="width: fit-content; display: flex; flex-direction: column; align-items: center; text-align: center; width: 200px;">
                    <div>
                      <p style="margin: 0;">{{ item.item_promo }}</p>
                    </div>
                    <div>
                      <p style="margin: 0;">
                        <span v-if="item.item_promo" style="text-decoration: line-through;">
                          999.90RUB
                        </span>
                        <span style="font-weight: bold;">
                          {{ item.item_qty * item.item_price }}{{ item.item_currency }}
                        </span>
                      </p>
                    </div>
                    <div v-if="!item.item_promo && !conspirator_family_ticket.user_id" class="cart-price-benefits_item">
                      <p @click.stop="$router.push(`/whitepaper`), cartMenuIsOpened = false" style="margin: 0;">Выгоднее с конспираторами </p>
                    </div>
                  </div>
                </div>
              </li> -->
              <li style="background-color: var(--color-wallet-fund-debt);">
                <p>Недоступно для заказа</p>
                <ul>
                  <li class="cart_product_unavailable">
                    Товар 123
                  </li>
                </ul>
              </li>
            </ul>


          </div>

          <!-- CART SERVICES LIST  -->
          <div v-else-if="current_cart_subtitle === 'services'" class="cart_service_section">
            <p style="background-color: red;">Услуги</p>
            <ul class="cart_service_item_container">
              <li class="cart_service_item" v-for="i in cart_service_list_items" :key="i.item_id">
                {{i}}
              </li>
            </ul>
          </div>

          <!-- CART DEMANDS / TASK LIST -->
          <div v-else-if="current_cart_subtitle === 'tasks'" class="cart_service_section">
            <p style="background-color: red;">Заявки</p>
            <ul class="cart_service_item_container">
              <li class="cart_service_item" v-for="i in cart_task_list_items" :key="i.id">
                {{i}}
              </li>
            </ul>
          </div>
        </div>
        <div class="cart_total_container">
          
          <div>
            {{ conspirator_family_ticket  }}
            <br>
            <br>
            <div style="background-color: var(--color-urgency-middle);">
              <input type="radio">
              Доставка / 
              <input type="radio">
              Самовывоз
            </div>
            {{ item_product_delivery }}
            <br>
            <p>Доступные способы и время доставки можно выбрать при оформлении заказа</p>
          </div>
          <div>
            <p>Ваша корзина</p>
            <ul>
              <li>Товары (2) 1784.90RUB</li>
              <li>Скидка (Подробнее) - 725.87RUB</li>
            </ul>
            <ul>
              <li>Услуги (2) 1784.90RUB</li>
              <li>Скидка (Подробнее) - 725.87RUB</li>
            </ul>
            <ul>
              <li>Конспираторов скидка (Подробнее) - 999.99RUB(10%)</li>
              <li>Конспираторам начислится - 0.01МОНЕТ</li>
            </ul>

            <!-- Подключение к оплате МОНЕТами -->
            <div style="margin-top: 1rem; border-radius: 1rem; background: var(--color-global-baackground_light); padding: .5rem 1rem;">
              <p style="margin: 0; text-align: right;">
                <span>-999.99МОНЕТ</span> /
                <span>{{ (0.8645 * -999.99).toFixed(2) }}RUB</span>
              </p>
              <p style="margin: 0; font-size: .8rem; text-align: right;">
                <span style="color: var(--color-global-text_second)">0.8645</span>
                <span style="color: var(--color-global-text_second)">МОНЕТ/RUB</span>
              </p>
            </div>

            <!-- Итого -->
            <div style="margin-top: 1rem;">
              <p style="margin: 0; text-align: right;">
                <span>К оплате:</span> 
                <span> 9000.00RUB</span>
              </p>
              <p style="margin: 0; text-align: right;">
                <span>В том мчисле ндс: 2222.22RUB</span>
              </p>
            </div>

            <!-- Кнопки действий -->
            <Button
              style="margin-top: 1rem;"
              type="original-btn"
              bg="bg-full"
              width="100%"
            >Перейти к оформлению</Button>
            <Button
              style="margin-top: 1rem;"
              type="original-btn"
              bg="bg-full"
              width="100%"
            >К оплате</Button>
            <Button
              style="margin-top: 1rem;"
              type="original-btn"
              bg="bg-full"
              width="100%"
            >Запросить / Выставить счет</Button>
            <!-- <div class="baner_wrapper" style="margin-top: 1rem;">
              <p style="margin: 0;">О конспираторах</p>
              <p style="margin: 0;">
                <span>0.8645</span><br>
                <span>МОНЕТ/RUB</span>
              </p>
            </div> -->
          </div>
        </div>
        
      </div>

      <!-- <div class="cart_footer">
        footer
      </div> -->
    </div>
  </div>
</template>

<style scoped>
/* a,
a:visited {
  color: var(--bs-primary);
} */
.header-container {
  position: fixed;
  top: 0;
  width: 100%;
  /* background-color: var(--bs-primary-bg-subtle);  */
  /* box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.2); */
  background-color: white;
  z-index: 99;
}

.header-wrapper {
  max-width: 1399px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  /* padding: 1rem 0; */
  /* gap: 1rem; */
  min-height: 3rem;
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
.copyright_wrapper {
  position: absolute; 
  bottom: 2rem; 
  left: 1.5rem;
}
/* cart */
.cart {
  /* background-color: red; */
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  /* position: relative; */
}
.cart > input {
  display: none;
}
.cart > label {
  cursor: pointer;
}
.cart > label > .cart_icon {
}
.cart > label > .cart_count {
  position: absolute;
  bottom: 1rem;
  right: 1.5rem;
  background-color: var(--color-global-text);
  color: var(--color-global-baackground_light);
  width: 1.5rem;
  height: 1.5rem;
  font-size: .6rem;
  text-align: center;
  line-height: 1.5rem;
  border-radius: 1rem;
}
.cart_container {
  /* display: none; */

  position: fixed;
  z-index: 100!important;
  top: 0;
  left: 0;
  width: 100%;
  /* height: 100vh; */
  
  /* overflow-y: scroll; */
}
.cart__opened {
  opacity: 1;
  transition: all .3s ease-in;
  z-index: 99;
  /* overflow-y: scroll; */
  /* background-color: var(--color-global-baackground_light); */
}
.cart > .cart_closed {
  opacity: 0;
  transition: all .3s ease-in-out;
  z-index: -1;
  display: none;
}
.cart > .cart_closed > .cart_wrapper {
  display: none
}
.cart_wrapper {
  /* display: none; */
  width: 70%;
  height: 100vh;
  /* background-color: var(--color-global-baackground_light); */
  /* position: relative; */
  background-color: var(--color-global-baackground_light);
}
.cart_header {
  /* background-color: red; */
  
}
.cart_header > p {
  font-size: 1.5rem;
  font-weight: bold;

}
.cart_main {

}
/* .cart_footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: var(--color-global-text_second);
} */
@media (max-width: 319px) {
  .header_wrapper {
    padding: 0;
    margin: 0;
  }
  .logo_wrapper {
    display: none;
  }
  .cart > label > .cart_count {
    bottom: .5rem;
    right: 4rem;
  }
}
@media (min-width: 320px) and (max-width: 574px) {
  .header_wrapper {
    padding: 0;
    margin: 0;
  }
  .logo_wrapper {
    display: none;
  }
  .cart > label > .cart_count {
    bottom: .5rem;
    right: 4rem;
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
@media screen and (min-width: 768px) {
  .copyright_wrapper {
    display: none
  }
  .cart {
    margin-left: 1rem;
  }
}
@media screen and (min-width: 575px) and (max-width: 767px) {
  .logo_wrapper {
    display: none;
  }
  .cart > label > .cart_count {
    bottom: .5rem;
    right: 4rem;
  }
}
@media screen and (max-width: 767px) {
  .account-user_icon {
    display: none;
  }
  .header-wrapper {
    /* padding: 0 1rem; */
    padding-left: 1rem;
    justify-content: flex-end;
  }
  .nav-block_left {
    flex: 1;
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
    background: var(--color-bg-popup);
    backdrop-filter: blur(2px);
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
    margin-left: 1.5rem;
    margin-bottom: 2rem;
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
    margin-top: 1rem;
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
    z-index: -1;
  }

  .opacity-1-767 {
    display: block;
    opacity: 1;
    z-index: 99;
  }
}

@media (min-width: 768px) and (max-width: 991px) {

}
@media (min-width: 992px) and (max-width: 1199px) {

  .cart_wrapper {
    /* display: none; */
    width: 85%;
    /* height: 100vh; */
    /* background-color: var(--color-global-baackground_light); */
    /* position: relative; */
  }
  .cart_wrapper .cart_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .5rem;
    position: relative;
  }
  .cart_wrapper .cart_header p{
    margin-top: 1rem;
    display: inline-block;
    background-color: var(--color-urgency-middle);
  }

  /*  */
  .cart_wrapper .cart_main {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }

  .cart_item {
    display: grid;
    grid-template-columns: 1fr;
    background-color: var(--color-wallet-fund-invested-wo);
  }
  /*  */
  .cart_wrapper .cart_main .cart_product_section {
    gap: 1rem;
  }
  .cart_wrapper .cart_main .cart_product_section .cart_product_item_wrapper {
    background-color: var(--color-global-text_second);
    border: 1px solid black;
  }
  /*  */
  .cart_wrapper .cart_main .cart_total_container {
    background-color: var(--color-btn-disabled-bg);
    position: absolute;
    right: 0;
    width: 35%;
  }

}
@media (min-width: 1200px) and (max-width: 1399px) {
  .cart > label > .cart_count {
    right: 1.75rem;
  }
  .cart__opened {
    /* z-index: 1001; */
    background-color: var(--color-bg-popup);
    opacity: 1;
    transition: all .3s ease-in;
    /* z-index: 100; */
  }
  .cart_container {
    /* display: none; */
    /* position: absolute;  */

    /* backdrop-filter: blur(2px); */
  }
  .cart_total_container {
    /* background-color: blue!important; */
    height: 45rem!important;
    overflow: scroll;
  }
  .cart_wrapper .cart_main .cart_total_container {
    top: 4.25rem!important;
  }
  .cart_product_section,
  .cart_service_section {
    margin-top: 1.75rem;
  }
  .clear-cart_btn:hover{
    cursor: pointer;
    color: var(--color-wallet-fund-invested);
  }
  .cart_product_item_container {
    list-style: none;
    padding: 0;
    padding-left: 1rem;
  }
  .cart_product_item_container_empty p span:hover{
    cursor: pointer;
    color: var(--color-wallet-fund-invested);
  }
  .cart_product_item_wrapper {
    display: flex;
    gap: 1rem;
    align-items: center;  
    margin-top: 1.5rem;
    /* border-radius: 1rem; */
    overflow: hidden;
    height: 150px;
  }
  .cart_product_item_wrapper:first-child {
    margin: 0;
  }
  .cart_product_item_wrapper:hover {
    background-color: var(--color-btn-hover-bg);
    /* cursor: pointer; */
  }
  .product-item_img {
    max-width: 150px!important;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .product-item_img img {
    width: 100%;
    height: auto;
    object-fit: cover; 
    /* Заполняет контейнер, обрезая края */
    /* object-fit: contain; */
    /* object-fit: contain; — поместить целиком без обрезки */
    object-position: center; /* Позиционирование внутри контейнера */
  }

  /* 
   */
  /* cart product item info */
  .cart-product-info_wrapper {
    /* background-color: var(--color-wallet-fund-invested-wo); */
    /* background-color: red; */
    /* flex: 1 auto; */
  }
  .cart-product-info_wrapper p {
    margin: 0;
  }
  .cart-product-info_title {
    cursor: pointer;
  }
  .cart-product-info_title:hover {
    text-decoration: underline;
  }
  .cart-product-info_article {
    color: var(--color-global-text_second);
  }
  .cart-product-info_count {
    margin-top: 1rem!important;
    /* background-color: red; */
    width: fit-content;
  }
  .cart-product-info_count  .count_btn {
    color: var(--color-global-baackground_light);
    display: flex;
    align-items: center;
    justify-content: center;
  }
   .cart-product-info_count  .count_btn:hover {
    cursor: pointer;
  }

  .cart-price-benefits_item {
    /* background-color: red; */
    font-size: .9rem;
  }
  .cart-price-benefits_item p:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  /* 
   */
   /* cart total */
  .cart_total_container {
    border-radius: 1.75rem;
  }
  /* .cart_total_container .baner_wrapper {
    background-color: var(--color-global-baackground_light);
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  } */
}
@media (min-width: 1400px) {
  .cart > label {
    display: flex;
    align-items: center;
    gap: .25rem;
  }
  .cart > label > .cart_count {
    color: var(--color-global-text);
    position: unset;
    background-color: unset;
    font-size: 1rem;
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
  z-index: 100;
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

@media (max-width: 319px) {
   .cart_main {
    height: 100%;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: 1fr;
    padding-bottom: 35rem;
   }
}

@media (min-width: 320px) and (max-width: 574px) {
   .cart_main {
    height: 100%;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: 1fr;
    padding-bottom: 30rem;
   }
}

@media (min-width: 575px) and (max-width: 767px) {
   .cart_main {
    height: 100%;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: 1fr;
    padding-bottom: 30rem;
   }
}

@media (max-width: 767px) {
  .cart__opened {
    height: 100vh;
  }
  .cart_wrapper {
    margin: 0 auto;
    overflow: hidden;
    width: 100%;
    position: relative;
  }
   .cart_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
   }
   .cart_header p {
    margin: 0;
   }
   .cart_header div {
    display: flex;
    align-items: center;
    gap: 1rem;
   }
   .cart_header div p {
    margin: 0;
   }
   .cart_main {
    height: 100%;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: 1fr;
   }
   .cart_product_unavailable {

   }
  .cart_wrapper .cart_main .cart_total_container {
    background-color: var(--color-btn-disabled-bg);
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    /* top: 5.25rem; */
    right: 2rem;
    padding: 1rem;
  }
}

@media screen and (min-width: 767px) {
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

@media (min-width: 768px) and (max-width: 991px) {
  /*  */
  .header-features__list > li {
    font-size: .9rem;
    text-align: center;
  }
  /*  */
  .cart__opened {
    height: 100vh;
  }
  .cart_wrapper {
      margin: 0 auto;
      overflow: hidden;
      width: 100%;
      position: relative;
   }
   .cart_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
   }
   .cart_header p {
    margin: 0;
   }
   .cart_header div {
    display: flex;
    align-items: center;
    gap: 1rem;
   }
   .cart_header div p {
    margin: 0;
   }
   .cart_main {
    height: 100%;
    overflow-y: scroll;
    padding-bottom: 10rem;
    display: grid;
    grid-template-columns: 3fr 2fr;
   }
   .cart_product_unavailable {

   }
  .cart_wrapper .cart_main .cart_total_container {
    background-color: var(--color-btn-disabled-bg);
    position: absolute;
    right: 0;
    width: 35%;
    top: 5.25rem;
    right: 2rem;
    padding: 1rem;
  }
}

@media screen and (min-width: 992px) and (max-width: 1199px) {
  .cart__opened {
    height: 100vh;
  }
  .cart_wrapper {
    margin: 0 auto;
    overflow: hidden;
    width: 90%;
    position: relative;
  }
   .cart_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
   }
   .cart_header p {
    margin: 0;
   }
   .cart_header div {
    display: flex;
    align-items: center;
    gap: 1rem;
   }
   .cart_header div p {
    margin: 0;
   }
   .cart_main {
    height: 100%;
    overflow-y: scroll;
    /* background-color :red; */
    padding-bottom: 10rem;
    display: grid;
    grid-template-columns: 3fr 2fr;
    /* position: relative; */
   }
   .cart_product_unavailable {

   }
  .cart_wrapper .cart_main .cart_total_container {
    background-color: var(--color-btn-disabled-bg);
    position: absolute;
    right: 0;
    width: 35%;
    top: 5.25rem;
    right: 2rem;
    padding: 1rem;
  }
}

@media screen and (min-width: 1200px) {
  /* .logo_wrapper {
    display: none;
  } */
  .cart__opened {
    height: 100vh;
  }
  .cart_wrapper {
      margin: 0 auto;
      margin-top: 1rem;
      /* overflow: hidden;s */
      min-width: 992px;
      max-width: 1399px;
      height: 95vh;
      position: relative;
   }
   .cart_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
   }
   .cart_header p {
    margin: 0;
   }
   .cart_header div {
    display: flex;
    align-items: center;
    gap: 1rem;
   }
   .cart_header div p {
    margin: 0;
   }
   .cart_main {
    height: 90%;
    padding-bottom: 10rem;
    overflow-y: auto;
    display: grid;
    grid-template-columns: 3fr 2fr;
   }
   .cart_product_unavailable {

   }
  .cart_wrapper .cart_main .cart_total_container {
    background-color: var(--color-btn-disabled-bg);
    position: absolute;
    right: 0;
    width: 35%;
    top: 5.25rem;
    right: 2rem;
    padding: 1rem;
  }
}

/* Для Chrome, Safari, Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  /* Для Firefox */
  scrollbar-width: none;

  /* Для IE и Edge */
  -ms-overflow-style: none;
}
</style>
