<script setup lang="ts">

// shared
import { Container } from "@/shared/container";
import { Section } from '@/shared/section'

// components
// import { DevModePlug } from "~/components/plug_dev_mode";

// utils
import { onBeforeMount } from "vue";

useHead({
  title: "Заявки",
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

const demandStatusTypes = ref([
  {
    type: "research",
    title: "Проработка",
  },
  {
    type: "research",
    title: "Проработка",
  },
  {
    type: "picking",
    title: "Комлектация",
  },
  {
    type: "delivery",
    title: "Поставка",
  },
  {
    type: "completed",
    title: "Исполнено",
  },
]);
const demands = ref([]);

// Категории ТМЦ (пока хардкорно)
const warehouseCategories = ref([
  {
    type: "all",
    name: "Все",
  },
  {
    type: "tools",
    name: "Инструмент",
  },
  {
    type: "stuff",
    name: "Материалы",
  },
  {
    type: "consumables",
    name: "Расходники",
  },
  {
    type: "technic",
    name: "Техника",
  },
  {
    type: "office equipment",
    name: "Оргтехника",
  },
]);

// demand filter types
const currentDemandFilterType = ref("all");
const demandFilterTypes = ref([
  {
    name: "all",
    title: "Все",
  },
  {
    name: "author",
    title: "Я автор",
  },
  {
    name: "contractor",
    title: "Я исполнитель",
  },
]);

// Фильтры
const computedDemands = computed(() => {
  if (demands.value.length) {
    if (currentDemandFilterType.value === "all") {
      let filteredDemands = [...demands.value].filter((demand) => {
        return demand ? demand.creatorID === useAuthStore().user.id || demand.responserID === useAuthStore().user.id : []
      })
      return filteredDemands;
    } else if (currentDemandFilterType.value === "author") {
      let filteredDemands = demands.value.filter(
        (demand) => demand.creatorID === useAuthStore().user.id
      );
      return filteredDemands;
    } else if (currentDemandFilterType.value === "contractor") {
      let filteredDemands = demands.value.filter(
        (demand) => demand.responserID === useAuthStore().user.id
      );
      return filteredDemands;
    } else {
      alert("Вы пытаетесь воспользоваться несуществуюющим фильтром :)");
    }
  }
  // else {
  //   return `А ничего нет...`;
  // }
  // if(demands.value.length) {
  //   return demands.value
  // }
  // else {
  //   return 'А ничего нет...'
  // }
});

// COMPUTED
//= lead
const computedLead = computed(() => {
  // landing_list
  // lead_list
  if(landing_list.value) {

    let merged = lead_list.value?.reduce((arr: {}[], lead) => {

      landing_list.value?.forEach(item => {
        if(item.id === lead.landingId) {
          arr.push({
            id: lead.id,
            created_at: lead.created_at,
            lead_from_id: lead.landingId,
            lead_from_name: item.name,
            lead_status: lead.status,
            lead_urgency: lead.urgency,
            lead_name: lead.name,
            lead_email: lead.email,
            lead_mobile: lead.mobile
          })
        }
      })

      return arr.reverse()
    }, [])

    // console.log(landing_list.value)
    // console.log(lead_list.value)
    // return lead_list.value
    return merged    
  } else {
    return null
  }
})

const users = ref(null);
// const userCreatorData = ref(null)

onBeforeMount(async () => {
  // demands.value = await getDemands();

  // BD
  // async function getDemands() {
  //   return await $fetch("/api/demands/demand");
  // }
});

// const { data: projects } = useLazyAsyncData("projects", () =>
//   $fetch("api/projects/projects")
// );
// const { data: locations } = useLazyAsyncData("locations", () =>
//   $fetch("api/locations/locations")
// );

onMounted(async () => {
  users.value = await getUsers();
  refreshProjects();
  refreshLocations();
});

/**
 * @desc Get users
 */
async function getUsers() {
  return await $fetch("api/usersList/users");
}
const refreshProjects = () => refreshNuxtData("projects");
const refreshLocations = () => refreshNuxtData("locations");

// Переводчики
const translateDemandUsers = (userID) => {
  if (users.value) {
    let demandUserName;
    users.value.forEach((item) => {
      if (item.id === userID) {
        demandUserName = `${item?.surname} ${item?.name[0]}. ${item.middleName[0]}.`;
      }
    });
    return demandUserName;
  }
};

const translateStatus = (status) => {
  if (demands.value) {
    let translatedString;
    demandStatusTypes.value.forEach((item) => {
      if (item.type === status) {
        translatedString = item.title;
      }
    });

    return translatedString;
  }
};

const translateLocation = (id: any, location: string) => {
  if (location && id) {
    // PROJECT
    if (location === "project") {
      if (projects.value) {
        let project = projects.value.find((project) => project.id === +id);
        return `${project.title}`;
        // return project
      }
    }
    // SKLAD (locations)
    else if (location === "sklad") {
      if (locations.value) {
        let locationItem = locations.value.find(
          (locationItem) => locationItem.id == id
        );
        return `${locationItem.title}`;
      }
    }
    // OFFICE (locations)
    else if (location === "office") {
      if (locations.value) {
        let locationItem = locations.value.find(
          (locationItem) => locationItem.id == id
        );
        return `${locationItem.title}`;
      }
    }
    //   // ELSE location
    //   else {
    //     return alert(
    //       "demands page index.vue error - strange object.location in translateLocation function"
    //     );
    //   }
    // } else {
    //   alert("demands page index.vue translateLocation function error");
  }
  return location;
};

const translateType = (type: string) => {
  let category = warehouseCategories.value.find((el) => el.type === type);
  if (type && category) {
    return category.name;
  }
};

// Раскраски
//= location
const locationColorized = (location: string) => {
  if (location) {
    return `location_${location}`;
  }
};
//= lead from
// const set_lead_from_bgColor = (lead: any) => {
//   let color;

//   if(lead.lead_status === 'paused') {
//     color = `unset`
//   } else {
//     color = `var(--color-btn-text)`
//   }

//   return color
// }

//= urgency
const set_bgColor_by_Urgency = (lead: any) => {

  let color;

  // ****** URGENCY ******
  if(lead.lead_urgency) {

    // LOW
    if(lead.lead_urgency === 'low') {
      color = `var(--color-urgency-low)`
    } 
    // MIDDLE
    else if (lead.lead_urgency === 'middle') {
      color = `var(--color-urgency-middle)`
    }
    // HIGH
    else if (lead.lead_urgency === 'high') {
      color = `var(--color-urgency-high)`
    }
    else {
      // color = null
    }
  }
  // ****** STATUS 
  if(lead.lead_status) {

    // BLANK
    if(lead.lead_status === 'blank') {
      color = 'var(--color-status-canceled)'
    }
    // PAUSED
    if(lead.lead_status === 'paused') {
      // color = 'var(--color-bg-popup)'
      color = 'var(--color-status-canceled)'
    }
    // CANCELED
    if(lead.lead_status === 'canceled') {
      color = 'var(--color-status-canceled)'
    }
    // PAUSED
    // FINISHED
    if(lead.lead_status === 'finished') {
      color = 'var(--color-btn-text)'
    }
  }

  return color
}



// ******* DB
// *** GET
// landing
const { data: landing_list } = useFetch("/api/landingGuarded/landing", {
    lazy: false,
    transform: (landing_list) => {
        return landing_list.filter((el) => {
            // session user is a sharer
            if(el.sharers && el.sharers.find((item) => item.userType === 'conspirator' && item.userId === props.auth_user_profile.userId)) {
                return el
            }
        })
    }
})
// leads
const { data: lead_list } = useFetch("/api/leadGuarded/lead", {
  lazy: false,
  transform: (lead_list) => {
    return lead_list
  }
})


</script>
<template>
  <Container>

    <!-- <DevModePlug/> -->

    <h1 class="show-max-767">Заявки</h1>
    <p>{{ props?.auth_user_profile }}</p>
    <!-- Фильтры -->
    <div v-if="demandFilterTypes.length">
      <fieldset id="demand-filter-types" class="filter-types_wrapper">
        <div
          class="filter-types_el"
          v-for="(element, index) in demandFilterTypes"
          :key="index"
        >
          <input
            type="radio"
            :id="element.name"
            name="demand-filter-types"
            v-model="currentDemandFilterType"
            :value="element.name"
          />
          <label :for="element.name">{{ element.title }}</label>
        </div>
      </fieldset>
    </div>

    <!--  -->
    <ul>
      <li>lead</li>
      <li>blank</li>
      <li>works</li>
      <li>canceled</li>
      <li>paused</li>
      <li>finished</li>
    </ul>




    <!-- DEMANDS LIST -->
    <div>
       <h3>Demands by landings</h3>
       {{ computedLead?.length }}

       <!--  -->
       <div class="computedLead_container" v-if="computedLead?.length">
         <!-- :bg="'var(--color-urgency-low)'" -->
        <Section 
          :padding="true" 
          :bg="set_bgColor_by_Urgency(item)" 
          v-for="item in computedLead" 
          @click="$router.push(`demands/${item.id}`)"
          style="cursor: pointer; position: relative;"
        >
          <!-- LEAD is a NEW (absolute) -->
          <div v-if="item.lead_status === 'lead'" style="position: absolute; top: 0; left: 0; font-weight: bold; background-color: black; color: var(--color-btn-text); font-size: 1rem;">
            New
          </div>

          <!-- WRAPPER FOR LEAD ON PAUSE (absolute) -->
          <div v-if="item.lead_status === 'paused'" style="position: absolute; top: 0; left: 0; background-color: var(--color-paused-wrapper-bg); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;" class="rounded">
            <div style="color: #fff;">ПАУЗА</div>
          </div>  

          <!-- CREATED DATE -->
          <div>
            <p style="margin: 0; white-space: nowrap; font-size: 0.8rem;">{{ item.created_at }}</p>
          </div>

          <!-- FROM  -->
          <div>
            <span>Грядка: {{ item.lead_from_name }}</span>
          </div>
          <p style="margin: 0; font-size: 0.8rem;">{{ item.lead_status }}</p>

        </Section>
       </div>
       <!--  -->
       <div v-else>Нет лидов...</div>
    </div>



    <br>
    <br>
    <br>
    <span>Demands in buildres:</span>
    <div class="demands_wrapper" v-if="computedDemands">
      <div
        class="demands_item"
        v-for="(demand, index) in computedDemands"
        :key="index"
        @click="$router.push(`demands/${demand.id}`)"
      >
        <h2>{{ translateType(demand.type) }}</h2>
        <p>
          Статус: {{ translateStatus(demand.status) }}
          <span v-if="demand.status === 'delivery'">{{
            demand.deliveryDate
          }}</span>
        </p>
        <div>
          <p v-if="demand.deadline">Deadline: {{ demand.deadline }}</p>
          <span
            class="location"
            :class="locationColorized(demand.locationType)"
            >{{
              translateLocation(demand.locationID, demand.locationType)
            }}</span
          >
        </div>
      </div>
    </div>
    <div v-else style="margin: 0; padding: 1rem">
      <p>А ничего нет...</p>
    </div>
  </Container>
</template>

<style scoped>
.demands_wrapper {
  display: grid;
  gap: 1rem;
  margin: 1rem auto;
}
.demands_item {
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 1rem;
  padding: 1rem;
  transition: all 0.2s ease-in;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
}
.demands_item:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.05);
}
.demands_item h2,
.demands_item p {
  margin: 0;
}
.demands_item div {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}
.location {
  padding: 4px 10px;
  border-radius: 16px;
  white-space: nowrap;
}
.location:hover {
  cursor: pointer;
}
.location_project {
  color: var(--bs-success);
  border: none;
  background-color: var(--bs-success-bg-subtle);
}
.location_sklad,
.location_office {
  /* color: white; */
  border: none;
  background-color: var(--bs-primary-bg-subtle);
}
.filter-types_wrapper {
  width: 100%;
  overflow-x: auto;
  display: flex;
  gap: 0.2rem;
  align-items: center;
  scrollbar-width: none;
}
.filter-types_wrapper::-webkit-scrollbar {
  display: none;
}
.filter-types_el {
  white-space: nowrap;
  position: relative;
}
.filter-types_el label {
  cursor: pointer;
  border-radius: 16px;
  transition: all 0.15s ease-in;
  padding: 4px 10px;
}
.filter-types_el label:hover {
  background-color: var(--bs-secondary-bg);
}
.filter-types_el input[type="radio"] {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  opacity: 0;
}

.filter-types_el input[type="radio"]:checked + label {
  color: var(--bs-body-bg);
  background-color: var(--bs-body-color);
  border: unset;
  /* border-bottom-left-radius: unset;
  border-bottom-right-radius: unset; */
}

/* computedLead */
.computedLead_container {
  display: grid;
  gap: 1rem;
}

@media screen and (max-width: 575px) {
  /* .filter-types_wrapper,
  .demands_wrapper {
    padding: 0 0.5rem;
  } */
  .demands_wrapper {
    grid-template-columns: 1fr;
  }
  .computedLead_container {
    grid-template-columns: 1fr;
    padding: 0 0.5rem;
    gap: 1rem;
  }
  .show-max-767 {
    display: none;
  }
}
@media screen and (min-width: 576px) and (max-width: 767px){
  .show-max-767 {
    display: none;
  }
  .computedLead_container {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
}
@media screen and (min-width: 576px) and (max-width: 767px) {
  .demands_wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
  .computedLead_container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .demands_wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
  .computedLead_container {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (min-width: 992px) and (max-width: 1199px) {
  .demands_wrapper {
    grid-template-columns: repeat(4, 1fr);
  }
  .computedLead_container {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media screen and (min-width: 1200px) {
  .demands_wrapper {
    grid-template-columns: repeat(5, 1fr);
  }
  .computedLead_container {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
