<script setup>

// shared
import { Container } from "@/shared/container";

// components
import { AccessDeniedPlug } from "~/components/plug_access_denied";
import { BreadCrumbs } from "~/components/breadcrumbs";
/*
*
    временно
*/
import { v4 as uuidv4 } from "uuid";


// PROPS
const props = defineProps({
    auth_user_profile: {
        type: Object,
        default: {}
    },
    auth_user: {
        type: Object,
        default: {}
    }
})

const accessPlug = ref(false)

const route = useRoute();
const router = useRouter();

const users = ref(null);
const user = ref(null);
const sessionUser = useUserSession().user;

// const isFlipperPrevUserBtnExist = ref(true);
// const isFlipperNextUserBtnExist = ref(true);

// ФОТ
const date = new Date();
const currentYear = ref(date.getFullYear());
const choosenFundPeriod = ref({
  periodStart: "",
  preriodEnd: "",
});
const wageFund = ref(0);
const productionFund = ref(0);
// Ставка заработной платы
// Значение тянем из БД organiztaions, where user role is MASTER
// Далее думать как сделать диверсификацию шаблонов должностей и конкретного под них рейтинга / ставки
const wageRate = ref(1264.0);
// Приколюхи на стол поидее должны быть остаточные??? или устанавливать лучше вручную? Спросить у Славы
const rest = ref(1150);
//

// Список участников
const usersInBand = ref(null);

usersInBand.value = [
  // {
  //   id: 1,
  //   uuid: uuidv4(),
  //   name: "Вячеслав",
  //   surname: "Клименко",
  //   category: "#1",
  //   hours: 62,
  //   // Вписываем вручную
  //   stakeIndex: 1.1,
  //   // stakeHoursIndex: ???
  //   // salary: ???
  //   // Вписываем вручную
  //   salary: 85900.0,
  // },
  // {
  //   id: 2,
  //   uuid: uuidv4(),
  //   name: "Денис",
  //   surname: "Байкалов",
  //   category: "#1",
  //   hours: 52,
  //   stakeIndex: 1.1,
  //   // stakeHoursIndex: ???
  //   // salary: ???
  //   // Вписываем вручную
  //   salary: 72000.0,
  // },
  // {
  //   id: 3,
  //   uuid: uuidv4(),
  //   name: "Дмитрий",
  //   surname: "Лузин",
  //   category: "#1",
  //   hours: 52,
  //   stakeIndex: 1.1,
  //   // stakeHoursIndex: ???
  //   // salary: ???
  //   // Вписываем вручную
  //   salary: 72000.0,
  // },
  // {
  //   id: 4,
  //   uuid: uuidv4(),
  //   name: "Михаил",
  //   surname: "Лялин",
  //   category: "#1",
  //   hours: 48,
  //   stakeIndex: 1.0,
  //   // stakeHoursIndex: ???
  //   // salary: ???
  //   // Вписываем вручную
  //   salary: 60600.0,
  // },
  // {
  //   id: 5,
  //   uuid: uuidv4(),
  //   name: "Александр",
  //   surname: "Власов",
  //   category: "#1",
  //   hours: 48,
  //   stakeIndex: 1.1,
  //   // stakeHoursIndex: ???
  //   // salary: ???
  //   // Вписываем вручную
  //   salary: 66900.0,
  // },
  {
    id: 6,
    uuid: uuidv4(),
    name: "Сергей",
    surname: "Филиппов",
    category: "#1",
    hours: 59,
    stakeIndex: 1.1,
    // stakeHoursIndex: ???
    // salary: ???
    // Вписываем вручную
    salary: 82100.0,
  },
  // {
  //   id: 7,
  //   uuid: uuidv4(),
  //   name: "Сергей",
  //   surname: "Майер",
  //   hours: 62,
  //   stakeIndex: 1.1,
  //   // stakeHoursIndex: ???
  //   // salary: ???
  //   // Вписываем вручную
  //   salary: 85900.0,
  //   category: "#1",
  // },
  // {
  //   id: 8,
  //   uuid: uuidv4(),
  //   name: "Максим",
  //   surname: "Плюснин",
  //   category: "#1",
  //   hours: 57,
  //   stakeIndex: 0.9,
  //   // stakeHoursIndex: ???
  //   // salary: ???
  //   // Вписываем вручную
  //   salary: 64400.0,
  // },
  // {
  //   id: 9,
  //   uuid: uuidv4(),
  //   name: "Владимир",
  //   surname: "Юров",
  //   category: "#1",
  //   hours: 69,
  //   stakeIndex: 1.1,
  //   // stakeHoursIndex: ???
  //   // salary: ???
  //   // Вписываем вручную
  //   salary: 96000.0,
  // },
  // {
  //   id: 10,
  //   uuid: uuidv4(),
  //   name: "Никита",
  //   surname: "Решетников",
  //   category: "#1",
  //   hours: 49,
  //   stakeIndex: 0.7,
  //   // stakeHoursIndex: ???
  //   // salary: ???
  //   // Вписываем вручную
  //   salary: 42900.0,
  // },
  // {
  //   id: 11,
  //   uuid: uuidv4(),
  //   name: "Вадим",
  //   surname: "Ердяков",
  //   category: "#1",
  //   hours: 21,
  //   stakeIndex: 0.6,
  //   // stakeHoursIndex: ???
  //   // salary: ???
  //   // Вписываем вручную
  //   salary: 16400.0,
  // },
  // {
  //   id: 12,
  //   uuid: uuidv4(),
  //   name: "Александр",
  //   surname: "Атрошкин",
  //   category: "#1",
  //   hours: 29,
  //   stakeIndex: 0.7,
  //   // stakeHoursIndex: ???
  //   // salary: ???
  //   // Вписываем вручную
  //   salary: 25200.0,
  // },
  // {
  //   id: 13,
  //   uuid: uuidv4(),
  //   name: "Олег",
  //   surname: "Печенкин",
  //   category: "#1",
  //   hours: 58,
  //   stakeIndex: 0.7,
  //   // stakeHoursIndex: ???
  //   // salary: ???
  //   // Вписываем вручную
  //   salary: 51800.0,
  // },
  // {
  //   id: 14,
  //   uuid: uuidv4(),
  //   name: "Алексей",
  //   surname: "Безматерных",
  //   category: "#1",
  //   hours: 36,
  //   stakeIndex: 0.7,
  //   // stakeHoursIndex: ???
  //   // salary: ???
  //   // Вписываем вручную
  //   salary: 31600.0,
  // },
  {
    id: 15,
    uuid: uuidv4(),
    name: "Виталий",
    surname: "Чебасов",
    category: "#2",
    hours: 22,
    stakeIndex: 1.0,
    // stakeHoursIndex: ???
    // salary: ???
    // Вписываем вручную
    salary: 15000.0,
  },
];

// ТМЦ
const items = ref([]);

// COMPUTED
//= computed patner
const computedPartner = computed(() => {
  return partner_list.value 
})
//= computed partner is a part of a band
const curret_partner_band_list_computed = computed(() => {

  let array = []
  
  band_list?.value?.forEach(band => {
    if(band.sharers) {
      // console.log(band.sharers)
      band?.sharers?.forEach(sharer => {
        if(sharer.userType === 'user' && sharer.userId === computedPartner.value.userId) {
          // console.log(computedPartner.value.userId)
          // console.log(sharer)
          array.push(band)
        }
      })
    }
  })

  return array
})

// ONCLICK
//= open link plug
const openLinkPlug = (text) => {
  alert(`Действия с кнопкой в разработке...`)
}


// When accessing /posts/1, route.params.id will be 1

// onMounted(async () => {
//   users.value = await getUsers()
//   // user.value = `${users.value}.${this.$route.params.users}`
//   console.log(users.value)
// })
// let btnPrev = document.querySelector('#prevUserBtn')
// console.log(btnPrev)
onMounted(async () => {

  wageFund.value = sumUserSalary() + rest.value;
  productionFund.value = sumUserProductionSalary() + rest.value;
});


/**
 * @desc Get users
 */
// async function getUsers() {
//   return await $fetch("/api/usersList/users");
// }
// async function getItems() {
//   return await $fetch("/api/warehouse/item");
// }
const { data: partner_list, pending, refresh, error } = useFetch("/api/partnerGuarded/partner", {
    lazy: false,
    transform: (partner_list) => {
      
      let partner = partner_list.filter(el => el.id === +route.params.id)
      let sharerExist = partner[0].sharers.filter(el => el.userId === props.auth_user_profile.userId && el.userType === 'user')
      
      if(sharerExist[0]) {

        return partner[0]
      } else {
        accessPlug.value = true
      }

    }
})
const { data: band_list } = useFetch("/api/band/band", {
  lazy: false,
  trasform: (band_list) => {
    // console.log(11232)
    return band_list
  }

  // const computedPartner = computed(() => {
  //  return partner_list.value 
  // })
})

// <!-- ЗП (выработка) -->
// {{ (item.hours * item.stakeIndex) * wageRate }}
const sumUserProductionSalary = () => {
  return Object.values(usersInBand.value).reduce((acc, current) => {
    if (current.category !== "#2") {
      acc += current.hours * current.stakeIndex * wageRate.value;
    }
    return acc;
  }, 0);
};

// <!-- ЗП (начисленная) -->
// {{ item.salary }}
const sumUserSalary = () => {
  return Object.values(usersInBand.value).reduce((acc, current) => {
    acc += current.salary;
    return acc;
  }, 0);
};

// <!-- НАЛОГ -->
// {{ (((item.hours * item.stakeIndex) * wageRate) - item.salary).toFixed(2) }}
// const sumCommunityTax = () => {
//   return Object.values(usersInBand.value).reduce((acc, current) => {
//     if (current.category !== "#2") {
//       acc +=
//         current.hours * current.stakeIndex * wageRate.value - current.salary;
//     }
//     return +acc.toFixed(2);
//   }, 0);
// };

// Работа с бандами
// Распустить банду
const disolveMyOrganization = (organizationID) => {
  if (organizationID) {
    alert(`Роспуск банды ${organizationID} в разработке...`);
  }
};
// Выйти из банды
const leaveCurrentBand = (organizationID) => {
  if (organizationID) {
    alert(`Выйти из банды ${organizationID} в разработке...`);
  }
};

useHead({
  title: `Партнеры`,
  meta: [
    {
      name: "description",
      content: "My Description",
    },
  ],
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

// toggle title data// toggle title data
const titles = ref([
  {
    title: "Проекты",
    name: "projects",
    guard: false,
  },
  {
    title: "Заявки",
    name: "demands",
    guard: true,
  },
  {
    title: "Банды",
    name: "organizations",
    guard: false,
  },
  {
    title: "Фонды",
    name: "funds",
    guard: true,
  },
  {
    title: "ТМЦ",
    name: "warehouse-items",
    guard: true,
  },
]);
const currentTitle = ref("projects");

// TRANSFORMERS
// const transformEndingTheWord = (length, string) => {
//   if (string === "соучастник") {
//     if (length) {
//       if (length % 10 === 4 || length % 10 === 3 || length % 10 === 2) {
//         return "соучастника";
//       } else if (
//         length % 10 === 5 ||
//         length % 10 === 6 ||
//         length % 10 === 7 ||
//         length % 10 === 8 ||
//         length % 10 === 9
//       ) {
//         return "соучастников";
//       } else if (length % 10 === 0) {
//         return "cоучастник";
//       } else {
//         return string;
//       }
//     } else {
//       return "соучастников";
//     }
//   }
// };

// CREATE
const createMyNewBand = () => {
  alert("Создание новой банды... в разработке...");
};
</script>

<template>
  <Container>

    <AccessDeniedPlug v-if="accessPlug === true"/>

    <div class="show-max-767">
      <BreadCrumbs/>
    </div>

    <!-- fetch data is error -->
    <div v-if="error">
      <p>Error Code {{ error.statusCode }}</p>
      <p>Error Message {{ error.message }}</p>
    </div>

    <!-- data is loading -->
    <div v-if="pending">
      <p>Loading...</p>
    </div>

    <!-- data is loaded -->
    <div v-else>
      <div v-if="accessPlug === false">

        <div class="avatar_container">
          <div class="avatar">
            <p>{{ computedPartner?.surname[0] }}{{ computedPartner?.name[0] }}</p>
          </div>
          <div 
            class="avatar_btn" 
            @click="$router.push('/account')"
            v-if="computedPartner.userId === sessionUser.id"
            style="display: flex; justify-content: center;"
          >
            <span style="color: var(--color-global-text_second)">В аккаунт</span>
            <span>     
              <Icon
                class="link"
                name="material-symbols-light:arrow-back-ios"
                size="24px"
                color="var(--color-global-text_second)"
              />
            </span>
          </div>
        </div>

        <div class="name_container">

          <h2 v-if="computedPartner.name || computedPartner.surname">{{ computedPartner.name }} {{ computedPartner.surname }}</h2>
        </div>

        <div class="action-container">
          <ul>
            <li v-if="computedPartner.email">Письмо</li>
            <li v-if="computedPartner.phone">Вызов</li>
            <li>Чат</li>
          </ul>
        </div>

        <div class="phone-container">

          <div v-if="computedPartner.phone">

            <div class="phone_wrapper" @click="openLinkPlug(computedPartner.phone)">
              <div class="phone_btn">
                <div class="phone_btn-icon">
                  <!-- <Icon
                    size="24px"
                    name="material-symbols-light:call"
  
                  /> -->
                  Сотовый
                </div>
                <p style="margin: 0;">
                  {{ computedPartner.phone }}
                </p>
              </div>
              <div class="phone_social-btns">
                WhatsApp
                Telegram
              </div>
            </div>

            <div class="phone_wrapper" @click="openLinkPlug(computedPartner.phone)">
              <div class="phone_btn">
                <div class="phone_btn-icon">
                  Сотовый
                </div>
                <p style="margin: 0;">
                  {{ computedPartner.phone }}
                </p>
              </div>
              <div class="phone_social-btns">
                WhatsApp
                Telegram
              </div>
            </div>
          </div>

          <div v-else class="phone_wrapper">
            Телефон не указзан
          </div>
        </div>

        <div class="email-container">

          <div v-if="computedPartner.email" >
            <div class="email_wrapper" @click="openLinkPlug(computedPartner.email)">
              <div class="email_btn">
                <div class="email_btn-icon">
                  <Icon
                    size="24px"
                    name="material-symbols-light:mail"
                    color="var(--color-global-text)"
                  />
                </div>
                <p style="margin: 0; width: fit-content;">
                  {{ computedPartner.email }}
                </p>
              </div>
            </div>
            <!-- <div class="email_wrapper">
              <div class="email_btn">
                <div class="email_btn-icon">
                  <Icon
                    size="24px"
                    name="material-symbols-light:mail"
  
                  />
                </div>
                <p style="margin: 0;">
                  {{ computedPartner.email }}
                </p>
              </div>
            </div> -->
          </div>

          <div v-else class="email_wrapper">
            Почта не указана
          </div>
        </div>
        
        <div class="band_container">

          <div v-if="!curret_partner_band_list_computed.length">
            Кооперативы не указаны
          </div>

          <div v-else>
            <div @click="openLinkPlug(computedPartner.id)" class="band_wrapper" v-for="band in curret_partner_band_list_computed">

              <!-- NAME -->
               <!-- http://localhost:3000/band/1 -->
              <div>
                {{band.name}}
              </div>
            </div>  
          </div>

        </div>



        <!-- {{ computedPartner }} -->
      </div>
  
      
    </div>


    <!-- PAGE TITLE -->
    <!-- <div class="page-title">
      <h1>
        <span style="font-weight: bold">{{ user.surname }} </span><br />
        {{ user.name }} {{ user.middleName }}
      </h1>
    </div> -->

    <!-- SHARER INFO -->
    <!-- <div v-if="user.phone !== ''" class="sharer-info_wrapper">

      <div class="item_phone">
        <nuxt-link :to="`tel:${user.phone}`">
          <Icon name="ic:round-call" size="24px" />
          <span>{{ user.phone }}</span>
        </nuxt-link>
      </div>


      <div v-if="user.email !== ''" class="item_email">
        <nuxt-link :to="`mailto:${user.email}`">
          <Icon name="ic:outline-email" size="24px" />
          <span>{{ user.email }}</span>
        </nuxt-link>
      </div>


      <div class="item_role" v-if="sessionUser.role === 'SUPER_ADMIN'">
        <span>role: {{ user.role }}</span>
      </div>


      <div v-if="sessionUser.role === 'SUPER_ADMIN'">
        <span>{{ user }}</span>
      </div>
    </div> -->

    <!-- Заголовок - Переключатель -->
    <!-- TOGGLE TITLE -->
    <!-- <div class="toggle-title">
      <div
        v-for="(title, index) in titles.filter((el) => {
          if (el.guard && +route.params.id === sessionUser.id) {
            return el;
          } else if (!el.guard) {
            return el;
          }
        })"
        class="switch-title_el"
      >
        <input
          type="radio"
          :id="`${index}_fund_hours`"
          :value="title.name"
          v-model="currentTitle"
        />
        <label :for="`${index}_fund_hours`"
          ><h2>{{ title.title }}</h2></label
        >
      </div>
    </div> -->

    <!-- Demands -->
    <!-- <div v-if="currentTitle === 'demands'">
      <div class="demands_container">
        <div>Ничего нет</div>
      </div>
    </div> -->

    <!-- Projects -->
    <!-- <div v-if="currentTitle === 'projects'">

      <div class="projects_container">
        <div>Ничего нет (в разработке...)</div>
      </div>
    </div> -->

    <!-- ORGANIZATIONS -->
    <!-- <div v-if="currentTitle === 'organizations'">
      <div v-if="computedSharerOrganizations.length">

        <div class="org_container">

          <div
            v-for="organization in computedSharerOrganizations"
            class="org_wrapper"
          >

            <div class="org_header">

              <div
                class="org_title link"
                @click="$router.push(`/organizations/${organization.id}`)"
              >
                <span style="font-weight: bold">{{ organization.title }}</span>
              </div>


              <div>

                <span
                  v-if="organization.ownerID === sessionUser.id"
                  class="link"
                  @click="disolveMyOrganization(organization.id)"
                  >Распустить</span
                >


                <span
                  v-if="
                    +route.params.id === sessionUser.id &&
                    organization.ownerID !== sessionUser.id
                  "
                  class="link"
                  @click="leaveCurrentBand(organization.id)"
                  >Выйти</span
                >
              </div>
            </div>


            <div class="org_body">

              <div class="org_info">
                <Icon
                  name="material-symbols-light:group"
                  size="32px"
                  color="var(--bs-border-color)"
                />
                <p style="margin: 0">x</p>
                <p style="margin: 0">{{ organization.sharers.length }}</p>
              </div>

              <div v-if="organization.ownerID === sessionUser.id">
                <Icon name="mdi:crown" size="24px" color="var(--bs-warning)" />
              </div>
            </div>

          </div>

          <button
            v-if="+route.params.id === sessionUser.id"
            type="button"
            class="btn btn-primary org_btn-new-band"
            style="text-align: start; padding: 1rem"
            @click.prevent="createMyNewBand()"
          >
            <p style="margin: 0" class="org_btn-title">
              <span style="font-weight: bold">Организовать</span><br />новую
              банду
            </p>
            <Icon
              name="material-symbols:add-rounded"
              size="32px"
              color="var(--bs-primary)"
            />
          </button>
        </div>
      </div>


      <div v-else style="margin-top: 1rem">
        <p>
          Пока ничего нет. Сколотите свою
          <span
            style="color: var(--bs-primary); cursor: pointer"
            @click="createMyNewBand()"
            >первую банду</span
          >.
        </p>
      </div>
    </div> -->


    <!-- <div v-if="currentTitle === 'funds'">
      <div class="funds_container">
        <router-link to="/fundsharers/1">Фонд</router-link>
        <br />
        <ul>
          фонды:
          <li>балансовая стоимость ТМЦ</li>
          <li>банды, где соучастник - creator</li>
          <li>афилирован к конкретному фонду банды по статусу</li>
          <li>свои кошельки</li>
          <li>где соучастчник в какой либо доле</li>
        </ul>
        <br />
        <div>Нет фондов</div>
      </div>
    </div> -->

    <!-- ТМЦ соучастника-->
    <!-- <div v-if="currentTitle === 'warehouse-items'">
      <div class="warehouse-items_container">
        <div v-if="items.length">
          <div v-for="(item, index) in items" :key="index">
            {{ item }}
          </div>
        </div>
        <div v-else>
          <p style="margin: 0">Ничего нет</p>
        </div>
      </div>
    </div> -->

  </Container>
</template>

<style scoped>

/*  */
.link:hover {
  color: var(--bs-primary);
  cursor: pointer;
}

/* 
 */
.avatar_container {

}

.avatar {
  margin: 16px auto 16px;
  border-radius: 50%;
  overflow: hidden;
  height: 150px;
  background: var(--color-global-text_second);
  aspect-ratio:  1;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 1px solid black; */
}

.avatar p {
  margin: 0;
  color: var(--color-btn-text);
  font-size: 3.5rem;
  font-weight: bold;
}

/* 
 */


/* 
 */
.page-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(128, 128, 128, 0.3);
  margin-top: 5rem;
}
.page-title h1 {
  margin: 0;
}
.page-title__btn-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.page-title__btn-container span:hover {
  cursor: pointer;
}
.sharer-info_wrapper {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.item_phone {
}
.item_email a,
.item_phone a {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--bs-body-color);
}
/* .item_phone a svg,
.item_email a svg {
  color: var(--bs-body-color);
} */
.item_email {
  margin-top: 1rem;
}
.item_role {
  margin-top: 1rem;
}
.item_phone a:hover,
.item_email a:hover {
  color: var(--bs-primary);
}
/* .btn__disabled {
  color: gray;
  opacity: 0.3;
} */
/* TOGGLE TITLE */
.toggle-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow-x: scroll;
  scrollbar-width: none;
  border-bottom: 1px solid var(--bs-tertiary-color);
  padding-bottom: 1rem;
}
.toggle-title::-webkit-scrollbar {
  display: none;
}
.switch-title_el input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}
.switch-title_el label h2 {
  color: var(--bs-tertiary-color);
  white-space: nowrap;
}
.switch-title_el label h2:hover {
  cursor: pointer;
}

.switch-title_el input[type="radio"]:checked + label h2 {
  color: unset;
}

/*  */
.org_container,
.warehouse-items_container,
.funds_container,
.demands_container,
.projects_container {
  margin-top: 1rem;
}

/*  */
.org_title {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.org_container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 2rem;
}
.org_wrapper {
  padding: 1rem;
  border: 1px solid var(--bs-border-color);
  border-radius: 1rem;
}
.org_wrapper:hover {
  cursor: pointer;
  background-color: var(--bs-tertiary-bg);
}
.org_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.org_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
}
.org_body {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.org_info {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.org_btn-new-band {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: start;
  padding: 1rem;
  background-color: var(--bs-primary-bg-subtle);
  color: unset;
  border: unset;
  border-radius: 16px;
}
.org_btn-new-band:hover {
  background-color: var(--bs-primary-bg-subtle);
}
.org_btn-new-band:focus {
  color: unset;
  border: unset !important;
}

@media screen and (max-width: 575px) {
  .page-title {
    margin: 0 1rem;
    border: unset;
  }
  .sharer-info_wrapper {
    margin: 0 1rem;
  }
  .toggle-title {
    margin-top: 1rem;
    /* margin: 1rem 1rem 0 1rem; */
    padding: unset !important;
    border: unset;
  }
  .switch-title_el:first-child {
    margin-left: 1rem;
  }
  .org_title {
    margin-left: 1rem;
  }
  .org_container {
    grid-template-columns: 1fr !important;
    margin-top: 1rem !important;
  }
  .org_container,
  .warehouse-items_container,
  .funds_container,
  .demands_container,
  .projects_container {
    margin: 0 1rem;
  }
}

@media screen and (min-width: 576) and (max-width: 767px) {
  .switch-title_el:first-child {
    margin-left: unset;
  }
  .toggle-title {
    padding-left: unset !important;
    /* padding-left: 0.5rem; */
    padding-right: 0.5rem;
  }
}

@media screen and (max-width: 767px) {
  .show-max-767 {
    display: none;
  }
  .page-title {
    margin-top: 4rem;
  }
  .toggle-title {
    /* padding-left: 0.5rem; */
    padding-right: 0.5rem;
  }
  .org_container {
    grid-template-columns: repeat(2, 1fr);
  }
  .org_btn-new-band {
    z-index: 100;
    position: fixed;
    background-color: var(--bs-primary) !important;
    bottom: 1.5rem;
    right: 1.5rem;
    width: 64px;
    height: 64px;
    border-radius: 100%;
    box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.2);
  }
  .org_btn-title {
    display: none;
  }
  .org_btn-new-band svg {
    color: var(--bs-body-bg) !important;
  }
  /* 
   */
  .avatar_container {
    /* background-color: red; */
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .avatar_btn {
    /* background-color: red; */
    display: flex;
    align-items: center;
  }
  .avatar_btn span:first-child{
    /* background-color: blue; */
  }
  .avatar_btn span:nth-child(2){
    /* background-color: green; */
  }
  .avatar_btn span:nth-child(2) > svg {
    /* background-color: purple; */
    transform: rotate(180deg);
  }
  .avatar_btn span:nth-child(2) svg path{

  }
  .avatar_btn:hover {
    cursor: pointer;
  }

  /* 
   */
  .name_container {
    margin: 0 auto;
    margin-top: 1rem;
    width: fit-content;
  }
  
  /* 
   */
  .action-container {
    margin: 0 auto;
  }
  .action-container ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top :1rem;
  }
  .action-container ul li {
    border-radius: 1rem;
    border: 1px solid var(--color-urgency-low-wo);
    color: var(--color-urgency-low-wo);
    /* padding: 1rem; */
    padding: 2px 12px;
  }
  .action-container ul li:hover {
    cursor: pointer;
    /* box-shadow: var(--hover-shadow); */
    background-color: var(--color-urgency-low-wo);
    color: var(--color-btn-text);
  }

  /* 
   */
  .phone-container {
    margin-top: 2rem;
    border-radius: 1rem;
    background-color: var(--color-operation-type-donation);
    margin-left: 1rem;
    margin-right: 1rem;
    padding: 1rem;
  }
  .phone-container div {
  }
  .phone_wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-global-text);
    padding-bottom: 1rem;
    padding-top: 1rem;
  }
  .phone_wrapper:first-child {
    /* margin-bottom: 1rem; */
    padding-top: unset;
  }
  .phone_wrapper:last-child {
    border-bottom: unset;
    padding-bottom: unset;
  }
  /* .phone_wrapper:not(:first-child) {
    border-top: 1px solid black;
    padding-top: 1rem;
  } */
  /* .phone_wrapper:not(first-child) {
    margin-top: 1rem;
  } */
  .phone_btn  {
    /* display: flex;
    align-items: center; */
  }
  
  .phone_btn-icon {
    font-size: .8rem;
    padding: 0;
  }
  .phone_btn {

  }
  .phone_social-btns {
    font-size: .8rem;
  }

  /* 
   */
  .email-container {
    margin-top: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    /* display: flex; */
  }
  .email-container div {
    /* display: flex;  */
    /* flex-direction: column;  */
    /* width: 100%; */
    gap: 1rem;
  }
  .email_wrapper {
    border-radius: 1rem;
    background-color: var(--color-orange-standart);
    padding: 1rem;
    /* width: 100%; */
    margin-top: 1rem;
  }
  .email_btn {
    display: flex;
    /* background-color: red; */
  }
  .email_btn-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: green; */
  }

  /* 
   */
  .band_container {
    margin-top: 1rem;
    background-color: var(--color-btn-disabled-bg);
    color: var(--color-global-text);
    margin-left: 1rem;
    margin-right: 1rem;
    padding: 1rem;
    border-radius: 1rem;
  }
  .band_wrapper {
   border-bottom: 1px solid var(--color-btn-disabled-text);
   padding-bottom: 1rem;
   padding-top: 1rem;
  }
  .band_wrapper:first-child {
    padding-top: unset;
  }
  .band_wrapper:last-child {
   border-bottom: unset;
   padding-bottom: unset;
   /* padding-bottom: 1rem;
   padding-top: 1rem; */
  }
  
}
@media screen and (min-width: 768px) and (max-width: 991px) {
  .page-title {
    margin-top: 6rem;
  }
  .org_container {
    grid-template-columns: repeat(3, 1fr);
  }

}
@media screen and (min-width: 992px) and (max-width: 1199px) {

}
@media screen and (min-width: 1200px) {

}
</style>
