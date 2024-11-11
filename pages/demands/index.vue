<script setup lang="ts">

// shared
import { Container } from "@/shared/container";
import { Section } from '@/shared/section'

// components
// import { DevModePlug } from "~/components/plug_dev_mode";
import { Button } from '~/components/button'

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
            from_id: lead.landingId,
            from_name: item.name,
            status: lead.status,
            urgency: lead.urgency,
            name: lead.name,
            email: lead.email,
            mobile: lead.mobile
          })
        }
      })

      return arr.reverse()
    }, [])

    return merged    
  } else {
    return null
  }
})
//= task
const computedTask = computed(() => {
  // project_list
  // task_list
  if(project_list.value) {
    let merged = task_list.value?.reduce((arr: {}[], task) => {

      project_list.value?.forEach(item => {
        if(item.id === task.projectId) {
          arr.push({
            id: task.id,
            created_at: task.created_at,
            // project_id: task.projectId,
            project_name: item.name,
            status: task.status,
            urgency: task.urgency,
            deadline: task.deadline,
            // desc: task.desc
          })
        }
      })

      return arr.reverse()
    }, [])

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

  const scrollContainer = document.getElementById("lead-block");

  scrollContainer?.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
  });
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
  if(lead.urgency) {

    // LOW
    if(lead.urgency === 'low') {
      color = `var(--color-urgency-low)`
    } 
    // MIDDLE
    else if (lead.urgency === 'middle') {
      color = `var(--color-urgency-middle)`
    }
    // HIGH
    else if (lead.urgency === 'high') {
      color = `var(--color-urgency-high)`
    }
    else {
      // color = null
    }
  }
  // ****** STATUS 
  if(lead.status) {

    // BLANK
    if(lead.status === 'blank') {
      color = 'var(--color-status-canceled)'
    }
    // PAUSED
    if(lead.status === 'paused') {
      // color = 'var(--color-bg-popup)'
      color = 'var(--color-status-canceled)'
    }
    // CANCELED
    if(lead.status === 'canceled') {
      color = 'var(--color-status-canceled)'
    }
    // PAUSED
    // FINISHED
    if(lead.status === 'finished') {
      color = 'var(--color-btn-text)'
    }
  }

  return color
}


// ADD/CREATE
//= task
const addNewTask = () => {
  alert('В разработке...')
}


// ******* DB
// *** GET
//= landing
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
//= leads
const { data: lead_list } = useFetch("/api/leadGuarded/lead", {
  lazy: false,
  transform: (lead_list) => {
    return lead_list
  }
})
//= projects
const { data: project_list } = useFetch("/api/projectGuarded/project", {
    lazy: false,
    transform: (project_list) => {
        return project_list.filter((el) => {
            // session user is a sharer
            if(el.sharers && el.sharers.find((item) => item.userType === 'conspirator' && item.userId === props.auth_user_profile.userId)) {
                return el
            }
        })
    }
})
//= tasks
const { data: task_list } = useFetch("/api/taskGuarded/task", {
  lazy: false,
  transform: (task_list) => {
    return task_list
  }
})


</script>
<template>
  <Container>

    <!-- <DevModePlug/> -->

    <h1 class="show-max-767">Доска дел</h1>

    <!-- <p>{{ props?.auth_user_profile }}</p> -->
    <!-- Фильтры -->
    <!-- <div v-if="demandFilterTypes.length">
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
    </div> -->

    
    
    
    
    <!-- LEAD SECTION -->
    <div style="margin-top: 1rem;">

      <!-- header of section -->
      <div class="header-section_container">
        <h2>Лиды</h2>
        <div style="display: flex; align-items: center;">
            <Button type="pseudo-btn" :link="`landing_all`">К огороду</Button>
            <div>
            <Icon
                class="link"
                name="material-symbols-light:arrow-back-ios"
                size="24px"
                color="var(--color-global-text_second)"
                style="transform: rotate(-180deg)"
            />
            </div>
        </div>
      </div>

      <!--  -->
      <ul style="list-style: none; padding: unset; display: flex; gap: 1rem;">
        <li>lead</li>
        <li>blank</li>
      </ul>

       <!--  -->
        <div id="lead-block" class="computedLead_container" v-if="computedLead?.length">
          <!-- :bg="'var(--color-urgency-low)'" -->
        <Section 
          :padding="true" 
          :bg="set_bgColor_by_Urgency(item)" 
          v-for="item in computedLead" 
          @click="$router.push(`demands/${item.id}`)"
          style="cursor: pointer; position: relative;"
        >
          <!-- LEAD is a NEW (absolute) -->
          <div v-if="item.status === 'lead'" class="ticket_new">
            New
          </div>

          <!-- WRAPPER FOR LEAD ON PAUSE (absolute) -->
          <div v-if="item.status === 'paused'" class="rounded ticket_paused">
            <div style="color: #fff;">ПАУЗА</div>
          </div>  

          <!-- CREATED DATE -->
          <div>
            <p style="margin: 0; white-space: nowrap; font-size: 0.8rem;">{{ item.created_at }}</p>
          </div>

          <!-- FROM  -->
          <div>
            <span style="white-space: nowrap;">Грядка: {{ item.from_name }}</span>
          </div>
          <p style="margin: 0; font-size: 0.8rem;">{{ item.status }}</p>

        </Section>
        </div>
        <!--  -->
        <div style="margin-bottom: 2rem;" v-else>Ваш огород еще не дал плоды...</div>
    </div>

    <!-- TASKS SECTION -->
     <div>
      
      <!-- haeder of the section -->
      <div class="header-section_container">
         <h2>Задачи</h2>
         <Button type="pseudo-btn" link="" @click="addNewTask()">Добавить</Button>
      </div>

      <!-- cheap filters of the section -->
       <ul style="list-style: none; padding: unset; display: flex; gap: 1rem;">
         <li>waiting</li>
         <li>works</li>
         <li>canceled</li>
         <li>paused</li>
         <li>finished</li>
       </ul>

       <!--  -->
      <div class="computedTask_container" v-if="computedTask?.length">

        <Section
         :padding="true" 
         :bg="set_bgColor_by_Urgency(item)" 
         v-for="item in computedTask" 
         @click="$router.push(`task/${item.id}`)"
         style="cursor: pointer; position: relative;"
        >
          <!-- LEAD is a NEW (absolute) -->
          <div v-if="item.deadline" class="ticket_deadline">
            deadline: {{ item.deadline }}
          </div>
          <!-- WRAPPER FOR LEAD ON PAUSE (absolute) -->
          <div v-if="item.status === 'paused'" class="rounded ticket_paused">
            <div style="color: #fff;">ПАУЗА</div>
          </div>  
         <!-- CREATED DATE -->
         <div>
           <p style="margin: 0; white-space: nowrap; font-size: 0.8rem;">{{ item.created_at }}</p>
         </div>

         <!-- FROM  -->
         <div>
           <span>Проект: {{ item.project_name }}</span>
         </div>
         <p style="margin: 0; font-size: 0.8rem;">{{ item.status }}</p>
        </Section>
      </div>
      <div v-else>Что-то у вас нет задач...</div>
       <!--  -->
   

     </div>


    <!-- <br>
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
    </div> -->
  </Container>
</template>

<style scoped>
.header-section_container {
  display: flex; 
  align-items: center; 
  justify-content: space-between;
}
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
  display: flex;
  gap: 1rem;
  padding-bottom: 2rem;
  overflow: scroll; 
  max-width: 100vw!important;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none; 
}
.computedLead_container:-webkit-scrollbar {
  display: none;
}

.computedTask_container{
  display: grid;
  gap: 1rem;
}

/* TICKETS */
.ticket_new {
  position: absolute; 
  top: 0; 
  left: 0; 
  font-weight: bold; 
  background-color: black; 
  color: var(--color-btn-text); 
  font-size: 1rem;
  border-top-left-radius: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.ticket_paused {
  position: absolute; 
  top: 0; 
  left: 0; 
  background-color: var(--color-paused-wrapper-bg); 
  width: 100%; 
  height: 100%; 
  display: flex; 
  align-items: center; 
  justify-content: center;
}
.ticket_deadline {
  position: absolute; 
  top: 0; 
  left: 0; 
  width: 100%;
  /* font-weight: bold;  */
  background-color: black; 
  color: var(--color-btn-text); 
  font-size: 0.6rem;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

@media screen and (max-width: 575px) {
  /* .filter-types_wrapper,
  .demands_wrapper {
    padding: 0 0.5rem;
  } */
  .header-section_container {
    margin: 0 .5rem;
  }
  .demands_wrapper {
    grid-template-columns: 1fr;
  }
  .computedLead_container  {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .computedTask_container{
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
  .header-section_container {
    margin: 0 1rem;
  }
  .computedLead_container  {
    padding-left: 1rem;
    padding-right: 0.5rem;
  }
  .computedTask_container{
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
  .demands_wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
  .computedTask_container{
    grid-template-columns: repeat(2, 1fr);
  }
} 

@media screen and (min-width: 768px) and (max-width: 991px) {
  .demands_wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
  .computedLead_container  {
    margin-left: -1rem;
    margin-right: -1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .computedTask_container{
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (min-width: 992px) and (max-width: 1199px) {
  .demands_wrapper {
    grid-template-columns: repeat(4, 1fr);
  }
  .computedLead_container  {
    margin-left: -1rem;
    margin-right: -1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .computedTask_container {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media screen and (min-width: 1200px) {
  .demands_wrapper {
    grid-template-columns: repeat(5, 1fr);
  }
  .computedLead_container  {
    margin-left: -1rem;
    margin-right: -2rem;
    padding-left: 1rem;
    padding-right: 2rem;
  }
  .computedTask_container{
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
