<template>
  <Container>
    <!-- <DevModePlug/> -->

    <div class="show-max-767">
      <BreadCrumbs/>
      <!-- TITLE -->
      <h1>Мой аккаунт</h1>
    </div>

    <!-- data is loading -->
    <div v-if="pending">
      <p>Loading...</p>
    </div>

    <div v-else>
      <!-- MODALS -->
      <div style="display: flex; gap: 2rem">
        <!-- ADD NEW LOCATION MODAL -->
        <div>
          <!-- Button trigger modal -->
          <!-- <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#newLocationModal"
          >
            Создать location
          </button> -->

          <!-- Modal -->
          <div
            class="modal fade"
            id="newLocationModal"
            tabindex="-1"
            aria-labelledby="newLocationModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <form class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="newLocationModalLabel">
                    Новый location
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <!-- TITLE -->
                  <div class="mb-3">
                    <label for="locationTitle" class="form-label"
                      >Название (отображается в списке ТМЦ на складе)</label
                    >
                    <input
                      v-model="location.title"
                      type="text"
                      class="form-control"
                      id="locationTitle"
                      aria-describedby="nameHelp"
                    />
                  </div>
                  <!-- TYPE -->
                  <div class="mb-3">
                    <label for="locationType" class="form-label"
                      >Type ( sklad | office | repair )</label
                    >
                    <input
                      v-model="location.type"
                      type="text"
                      class="form-control"
                      id="locationType"
                      aria-describedby="nameHelp"
                    />
                  </div>
                  <!-- LOCATION OWNER ID -->
                  <div class="mb-3">
                    <label for="locationOwnerID" class="form-label"
                      >Owner ( 0 &null - не в базе | 1 & company - Камини | 2
                      &company - Банда Славы )</label
                    >
                    <input
                      v-model="location.ownerID"
                      type="number"
                      class="form-control"
                      id="locationOwnerID"
                      aria-describedby="nameHelp"
                    />
                  </div>
                  <!-- LOCATION OWNER TYPE -->
                  <div class="mb-3">
                    <label for="locationOwnerType" class="form-label"
                      >Owner ( user | company )</label
                    >
                    <input
                      v-model="location.ownerType"
                      type="number"
                      class="form-control"
                      id="locationOwnerType"
                      aria-describedby="nameHelp"
                    />
                  </div>
                  <!-- ADDRESS -->
                  <div class="mb-3">
                    <label for="locationAddress" class="form-label"
                      >Address</label
                    >
                    <input
                      v-model="location.address"
                      type="text"
                      class="form-control"
                      id="locationAddress"
                      aria-describedby="nameHelp"
                    />
                  </div>
                </div>

                <!-- MODAL FOOTER -->
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    @click="clearModalInputs(location)"
                  >
                    Отменить
                  </button>
                  <button
                    type="button"
                    id="createNewProjectBtn"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                    :disabled="createNewLocationBtnIsDisabled"
                    @click="addLocation(location)"
                  >
                    Создать
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- ADD NEW WORK TYPE MODAL -->
        <div>
          <!-- Button trigger modal -->
          <!-- <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#newWorkTypeModal"
          >
            Добавить новый вид работ
          </button> -->

          <!-- Modal -->
          <div
            class="modal fade"
            id="newWorkTypeModal"
            tabindex="-1"
            aria-labelledby="newWorkTypeModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <form class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="newWorkTypeModalLabel">
                    Новый вид работ
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">123</div>
              </form>
            </div>
          </div>
        </div>

        <!-- MANAGE MODULES -->
        <div>
          <!-- Button trigger modal -->
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#manageSubscribeModal"
          >
            Управление подпиской
          </button>
          <!-- Modal -->
          <div
            class="modal fade"
            id="manageSubscribeModal"
            tabindex="-1"
            aria-labelledby="manageSubscribeModal"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <form class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="manageSubscribeModal">
                    Управление подпиской
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">123</div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- INFO -->
      <div>
        <h2>Мои данные</h2>
        {{ $props.auth_user_profile }}
    
        {{ user_info }}
      </div>
  
      <!-- STATs -->
      <div>
        <h2>Статистика</h2>
        <p style="cursor:pointer;" @click="router.push('/wallet')">Перейти в кошелек</p>
        <div style="background-color: var(--color-btn-hover-bg); width: fit-content; width: 100px; height: 100px; display: flex; align-items: center; flex-direction: column; justify-content: center;">
          <p style="margin: 0; font-size: 2rem; font-weight: bold;">0.5</p>
          <p style="margin: 0; font-size: .8rem; text-align: center">SR</p>
        </div>
        <!-- CAP -->
        <div>
          <h3>Капитализация</h3>
          <p style="background-color: red;">График по капитализации как в бандах</p>
        </div>

        <!-- INCOME / EXPENSEs -->
        <div>
          <h3>Доходы / Расходы</h3>
          <p style="background-color: orangered;">График по доходам / расходам как в бандах</p>
          <div class="graph_container">
                <ChartTest
                  :chart_type="'area'"
                />
            </div>
        </div>

        <!-- WAREHOUSE -->
        <div>
          <h3>Склад</h3>
          <p style="background-color: blue">Здесь показываем имеющиеся в собственности предметы (например инструмент)</p>
          <ul class="warehouse-list_container" v-if="warehouse?.length">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <p>Мои / Отвечаю</p>
              <p>999 999 999.99</p>
            </div>
            <li class="warehouse-item_wrapper" style="font-weight: bold;">
              <div></div>
              <div>Наименование</div>
              <div>Кол-во</div>
              <div>Местонахождение</div>
              <div>owner</div>
              <div>responsible</div>
              <div>Цена закупа</div>
            </li>
            <li class="warehouse-item_wrapper" v-for="(item, i) in warehouse">
              <div>
                {{ i + 1 }}
              </div>
              <div>
                {{ item.title }}
              </div>
              <div>
                {{ item.qty }}
                {{ item.measure }}
              </div>
              <div>
                {{ translateCurrentLocation(item.locationId) }}
              </div>
              <div>
                {{ item.ownerType }} {{ item.ownerID }}
              </div>
              <div>
                {{ item.responsibleType }} {{ item.responsibleID }}
              </div>
              <div>
                {{ item.qty }}{{ item.measure }} * {{ item.price }} = {{ item.qty * +item.price }}
              </div>
              <!-- {{ item }} -->
            </li>
          </ul>
          <ul v-else>
            <li>Предметы не указаны</li>
          </ul>
        </div>

        <!-- My bands -->
        <div>
          <h3>Банды</h3>
          <p style="background-color: green">Отображаем банды, где участвует пользователь</p>

          <ul v-if="band.length">
            <li v-for="(band_item, j) in band">
              {{ band_item.name }} | {{ band_item?.sharers?.length }}{{ set_measure(band_item?.sharers?.length) }}  | CAP:999 999 999.99 RUB
              <div v-for="sharer in band_item?.sharers.filter(el => el.userType === 'user' && el.userId === props.auth_user_profile.userId)">{{ sharer.position }} {{ sharer.allocation }}</div>
            </li>
          </ul>
          <ul v-else>
            <li>В бандах не состоите</li>
          </ul>
        </div>
      </div>
      <!-- список locations -->
      <div style="margin-top: 2rem">
        <h3>Locations</h3>

        <table class="table" v-if="computed_locations?.length">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">title</th>
              <th scope="col">type</th>
              <th scope="col">address</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(location, index) in computed_locations">
              <td scope="col">{{ index + 1 }}</td>
              <td scope="col">{{ location.title }}</td>
              <td scope="col">{{ location.type }}</td>
              <td scope="col">{{ location.address }}</td>
            </tr>
          </tbody>
          <!-- <tbody>
            <tr v-for="(location, index) in locations" :key="index">
              <td scope="col">{{ index + 1 }}</td>
              <td scope="col">{{ location.title }}</td>
              <td scope="col">{{ location.type }}</td>
              <td scope="col">{{ location.address }}</td>
              <td scope="col">
                <span
                  class="link"
                  @click="onClickOwner(location.ownerID, location.ownerType)"
                >
                  {{ translateOwner(location.ownerID, location.ownerType) }}
                </span>
              </td>
            </tr>
          </tbody> -->
        </table>

        <ul v-else>
          <li>Места не указаны</li>
        </ul>
      </div>
      <!-- список видов работ -->
      <div style="margin-top: 2rem">
        <h3>Виды работ / прайс</h3>
        <p>Требуется понимание где их размещать. отдельную БД?</p>
      </div>
      <!-- ПО сервису стата-->
      <div v-if="
        user_info?.id === 1 &&
        user_info?.name === 'Сергей' &&
        user_info?.middleName === 'Владимирович' &&
        user_info?.surname === 'Анфалов' &&
        user_info?.phone === '+79617582573'
      ">
        <h3>Общие пказатели</h3>
        
        <ul>
          <li>
            <h4>Кредиты</h4>
            <ol>
              <li v-for="loan in loan_list">
                {{ loan.name }}
              </li>
            </ol>
          </li> 
        </ul>
      </div>


    </div>

  </Container>
</template>

<script lang="ts" setup>

// shared
import { Container } from "@/shared/container";

// components
import { BreadCrumbs } from "@/components/breadcrumbs";

// components
// import { DevModePlug } from '@/components/plug_dev_mode'
import { ChartTest } from "~/components/chart";

// utils
import { H3Error } from "h3";
import { v4 as uuidv4 } from "uuid";

useHead({
  title: "Аккаунт",
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

// PROPS
const props = defineProps({
    auth_user_profile: {
        type: Object,
        default: {}
    },
})

//
const router = useRouter();

// УПРАВЛЕНИЕ locations
// const {
//   pending,
//   error,
//   refresh,
//   data: locations,
//   status,
// } = useFetch("/api/locations/locations", {
//   laze: false,
// });

const location = ref({
  uuid: null,
  title: null,
  type: null,
  address: null,
  ownerID: null,
  ownerType: null,
});

const { users } = storeToRefs(useUsersStore());
const { loadData } = useUsersStore();
const pending = ref(true)
// const { data: organizations } = useLazyAsyncData("organizations", () =>
//   $fetch("/api/organizations/organizations")
// );
// const refreshOrganizations = () => refreshNuxtData("organizations");

// COMPUTED
const computed_locations = computed(() => {
  return locations.value?.filter(el => {
    if(el.ownerType === 'user') {
      return el.ownerID === props.auth_user_profile.userId
    }
  })
})

onMounted(async () => {
  // refresh();
  // data from store
  await loadData();

  setTimeout(() => {

    if(
      props.auth_user_profile.userId &&
      user_info.value
    ) {

      pending.value = false
    } else {
      router.push('/login')
    }
  }, 500)
  // refreshOrganizations();
});

// Добавляем новый location
// флаг disabled для кнопки submit
const createNewLocationBtnIsDisabled = ref(true);

async function addLocation(location) {
  let addedLocation = null;

  if (location.title && location.type && location.address) {
    addedLocation = await $fetch("api/locations/locations", {
      method: "POST",
      body: {
        uuid: uuidv4(),
        title: location.title,
        type: location.type,
        address: location.address,
        ownerID: location.ownerID,
        ownerType: location.ownerType,
      },
    });
  }

  // clear all inputs in modal
  clearModalInputs(location);

  // refetching
  // refresh();
}

const clearModalInputs = (location: any) => {
  location.uuid = null;
  location.title = null;
  location.type = null;
  location.address = null;
  location.ownerID = null;
  location.ownerType = null;
};

// translates
// const translateOwner = (ownerID: number, ownerType: string) => {
//   if (ownerID && ownerType && users.value && organizations.value) {
//     if (ownerType === "user") {
//       let userItem = users.value.find((item) => item.id === ownerID);
//       return `${userItem?.surname} ${userItem?.name[0]}. ${userItem?.middleName[0]}`;
//     } else if (ownerType === "company") {
//       let organizationItem = organizations.value.find(
//         (item) => item.id === ownerID
//       );
//       return organizationItem.title;
//     }
//   } else if (ownerID === 0 && !ownerType) {
//     return `Не соучастник`;
//   }
// };

// OnClick event
// const onClickOwner = (ownerID: number, ownerType: string) => {
//   if (ownerID && ownerType) {
//     if (ownerType === "user") {
//       router.push(`/partners/${ownerID}`);
//     } else if (ownerType === "company") {
//       router.push(`/organizations/${ownerID}`);
//     }
//   } else if (ownerID === 0 && !ownerType) {
//     alert("Сторонний контакт. Не является соучастником.");
//   }
// };

// HELPERS
// translateCurrentLocation
const translateCurrentLocation = (locationID: number) => {
  if(locationID && locations) {

    let location = locations.value.find(el => el.id === locationID)

    return location.title

  } else {
    return 'Не укуказано'
  }
}

// SET
//= set_measure
const set_measure = (number) => {
  console.log(number % 10)

  if(number % 10 === 1) {
    return 'участник'
  }
  else if (number % 10 >= 2 && number % 10 < 5) {
    return 'участника'
  } 
  else {
    return 'участников'
  }
}
 

// Check before submit creating new location
watch(location.value, () => {
  if (location.value.title && location.value.type && location.value.address) {
    createNewLocationBtnIsDisabled.value = false;
  } else {
    createNewLocationBtnIsDisabled.value = true;
  }
});

// DB
//
//= USER INFO
const { data: user_info } = useFetch('/api/partnerGuarded/partner', {
  lazy: false,
  transform: (user_info) => {
    return user_info.find(el => el.userId === props.auth_user_profile.userId)
  }
})
//
//= LOCATIONS
const { data: locations } = useFetch("/api/locations/locations", {
  lazy: false,
  transform: (locations) => {
    // return locations.filter(el => {
    //   if(el.ownerType === 'user') {
    //     return el.ownerID === props.auth_user_profile.userId
    //   }
    // })
    return locations
  }
})
//= WAREHOUSE
const { data: warehouse } = useFetch("/api/warehouse/item", {
  lazy: false,
  transform: (warehouse) => {
    return warehouse.filter(el => (el.ownerType === 'user' && el.ownerID === props.auth_user_profile.userId) || (el.responsibleType === 'user' && el.responsibleID === props.auth_user_profile.userId))
  }
})
//= BAND
const { data: band } = useFetch("/api/band/band", {
  lazy: false,
  transform: (band) => {

    return band.filter(item => {
      if(item.sharers && props.auth_user_profile.userId) {
        let sharers = Object.values(item.sharers)

        if(sharers.find(sharer => sharer.userType === 'user' && sharer.userId === props.auth_user_profile.userId)) {
          return item
        }
      }
    })
  }
})
//= loan
const { data: loan_list } = useFetch("/api/loan/loan", {
  lazy: false,
  transform: (loan_list) => {
    return loan_list
  }
})

</script>

<style scoped>
.link {
  cursor: pointer;
}

@media screen and (min-width: 576px) {

}
@media screen and (min-width: 576px) and (max-width: 767px) {
  .warehouse-list_container {
    /* background-color: red; */
    list-style: none;
    padding: 0;
  }
  .warehouse-item_wrapper {
    display: grid;
    grid-template-columns: 10px 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 1rem;
  }
}
@media screen and (max-width: 767px)  {
  .show-max-767 {
      display: none;
  }
}
@media screen and (min-width: 768px) and (max-width: 991px) {

}
@media screen and (min-width: 992px) and (max-width: 1199px) {

}
@media screen and (min-width: 1200px) {

}
</style>
