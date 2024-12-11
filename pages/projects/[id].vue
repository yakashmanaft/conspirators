<script setup lang="ts">
// shared
import { AccessDeniedPlug } from "~/components/plug_access_denied";
import { Container } from "@/shared/container";
import { Section } from "~/shared/section";

//components
import { BreadCrumbs } from "~/components/breadcrumbs";
import { Button } from "~/components/button";

useHead({
  title: "Проект # ",
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
    auth_user: {
        type: Object,
        default: {}
    }
})

//
const route = useRoute();
const router = useRouter();
//
const sessionUser = useUserSession().user;
// PROJECT
const project = ref(null);
// BAND
const band = ref(null);

// тмц организации
// items.value = items.value.filter(
//   (item) =>
//     item.location === 'project' && item.locationID === project.value.id
// );

const accessPlug = ref(false)

// toggle title data
const titles = ref([
  {
    title: "План график",
    name: "schedule",
    guard: true,
  },
  {
    title: "Заявки",
    name: "demands",
    guard: true,
  },
  {
    title: "Соучастники",
    name: "sharers",
    guard: true,
  },
  {
    title: "ТМЦ",
    name: "warehouse-items",
    guard: true,
  },
  {
    title: "Балланс",
    name: "balance",
    guard: true,
  },
]);

const currentTitle = ref("schedule");

// DB SCHEDULE
const schedules = ref([
  {
    a: 1,
  },
]);

// COMPUTED
//= project
const computedProject = computed(() => {

    return project_list.value    
})
// tasks
const computedTasks = computed(() => {

    // return task_list.value
    if(task_list.value) {

      return task_list.value.filter(
        el => project_list.value ? el.projectId === project_list.value.id  : []
      ).sort((a,b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      })
    }
})

// ******* DB
// *** GET

//= project
const { data: project_list } = useFetch("/api/projectGuarded/project", {
    lazy: false,
    transform: (project_list) => {

      // return project_list.find(el => el.id === +route.params.id) 

      let project = project_list.filter(el => el.id === +route.params.id)
      let sharerExist = project[0].sharers.filter(el => el.userId === props.auth_user_profile.userId && el.userType === 'conspirator')
      
      if(sharerExist[0]) {

        return project[0]
      } else {
        accessPlug.value = true
      }
    }
})

// tasks
const { data: task_list } = useFetch("/api/taskGuarded/task", {
  lazy: false,
  transform: (task_list) => {
    return task_list
    // if(project_list.value) {

    //   return task_list.filter(
    //     el => project_list.value ? el.projectId === project_list.value.id  : []
    //   )
    // } else {
    //   return []
    // }
  }
})

// tasks ledger items
const { data: task_ledger } = useFetch("/api/taskLedgerGuarded/taskElement", {
  lazy: false,
  transform: (task_ledger) => {
    return task_ledger
  }
})


// const { data: projects } = await useFetch("/api/projects/projects", {
//   lazy: false,
// });
// DB BANDS
// const { data: bands } = await useFetch("/api/organizations/organizations", {
//   lazy: false,
// });
// DB WAREHOUSE ITEMS
// const { data: items } = await useFetch("/api/warehouse/item", {
//   laze: false,
//   transform: (items) => {
//     return items.filter(
//       (el) => el.location === "project" && el.locationID === +route.params.id
//     );
//   },
// });

// CHECK FUNC
// const isRelated = (obj) => {
//   if (sessionUser && obj) {
//     if (
//       obj.creator === sessionUser.value.id ||
//       (obj.curatorType === "user" && obj.curator === sessionUser.value.id) ||
//       (obj.partnerType === "user" && obj.partnerID === sessionUser.value.id) ||
//       (band.value &&
//         band.value.sharers.find(
//           (el) => el.userType === "user" && el.userID === sessionUser.value.id
//         ))
//     ) {
//       return true;
//     }
//     else if (
//       obj.sharers &&
//       obj.sharers.find(
//         (el) => el.sharerType === "user" && el.sharerID === sessionUser.value.id
//       )
//     ) {
//       return true;
//     }
//     else if (sessionUser.value.role === "SUPER_ADMIN") {
//       return true;
//     } else {
//       currentTitle.value = "";
//       return false;
//     }
//   }
// };

onBeforeMount(async () => {
  // PROJECTS
  // project.value = projects.value.find((item) => item.id == route.params.id);
  // BANDS
  // band.value = bands.value.find((band) => band.id === project.value.bandID);
});

onMounted(async () => {
  // CHECK if session user is not ine the band, but is a sharer of project...
  // if (
  //   band.value &&
  //   band.value.sharers.find(
  //     (el) => el.userType === "user" && el.userID === sessionUser.value.id
  //   )
  // ) {
  //   return;
  // } else {
  //   if (
  //     project.value.sharers &&
  //     project.value.sharers.find(
  //       (el) => el.sharerType === "user" && el.sharerID === sessionUser.value.id
  //     )
  //   ) {
  //     titles.value = [...titles.value].filter((el) => !(el.name === "balance"));
  //   }
  // }
});

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
  // if(lead.status) {

  //   // BLANK
  //   if(lead.status === 'blank') {
  //     color = 'var(--color-status-canceled)'
  //   }
  //   // PAUSED
  //   if(lead.status === 'paused') {
  //     // color = 'var(--color-bg-popup)'
  //     color = 'var(--color-status-canceled)'
  //   }
  //   // CANCELED
  //   if(lead.status === 'canceled') {
  //     color = 'var(--color-status-canceled)'
  //   }
  //   // PAUSED
  //   // FINISHED
  //   if(lead.status === 'finished') {
  //     color = 'var(--color-btn-text)'
  //   }
  // }

  return color
}

// HELPERS
const countWorkHoursByTask = (taskId: number, taskLedger: any) => {

  let sum:number = 0
  taskLedger?.forEach((item:any) => {
    sum += Math.abs((new Date(item.ended_at) - new Date(item.created_at)) / (1000 * 60 * 60) % 24)
  })

  return sum.toFixed(1)
}
</script>

<template>
  <Container>
    <!-- Псевдо защита... -->
    <AccessDeniedPlug v-if="accessPlug === true"/>
    <!-- {{props.auth_user_profile}} -->
    <div v-if="computedProject && !accessPlug">
      
    <!-- TITLE PAGE SECTION -->
    <div class="show-max-767" style="margin-bottom: 0.5rem;">
      <BreadCrumbs/>
      <h1 style="margin: 0;">{{computedProject?.name}} (#{{ $route.params.id  }})</h1> 
    </div>


      проект:
      {{ computedProject }}
      <p>{{ computedProject?.name }}</p>
      <br>
      Задачи ({{ computedTasks?.length }})
      <div>

        <div class="computedTask_container" v-if="task_list?.length" style="list-style: none; padding: 0;">

          <!--  -->
          <Section 
            v-for="(task, index) in computedTasks"
            :padding="true" 
            :bg="set_bgColor_by_Urgency(task)" 
            style="cursor: pointer; position: relative;"
          >
            {{  task  }}
            
            <!-- LEAD is a NEW (absolute) -->
            <div class="ticket_deadline">
              New
            </div>
            <!-- WRAPPER FOR LEAD ON PAUSE (absolute) -->
            <!-- <div v-if="item.status === 'paused'" class="rounded ticket_paused">
              <div style="color: #fff;">ПАУЗА</div>
            </div>   -->
            <div>---</div>
            <div>{{ countWorkHoursByTask(task.id, task_ledger?.filter(el => el.taskId === task.id)) }}</div> 
             <!-- (Math.abs(new Date(task_el.ended_at) - new Date(task_el.created_at)) / (1000 * 60 * 60) % 24).toFixed(1) -->

          </Section>
        </div>

        <ul v-if="task_list?.length" style="list-style: none; padding: 0;" >


          
          <li v-for="(task, index) in computedTasks" style="border-bottom: 1px solid gray;">
            <!-- {{ task }} -->
            <div style="display: flex; gap: 1rem; align-items: center;">

              <div>
                <Button type="pseudo-btn" :link="`/task/${task.id}`">{{ task.name }}</Button>
                <div>{{ task.desc }}</div>
              </div>
              <div>{{ task.created_at }}</div>
              <div>{{ task.deadline }}</div>
              <div>{{ task.ended_at }}</div>
              <div>{{ task.status }}</div>
              <div>{{ task.urgency }}</div>

              
            </div>

            <ul v-if=" task_ledger?.length" style="padding: 0;">
              <!-- task ledger el -->
              <li v-for="(task_el) in  task_ledger.filter(el => el.taskId === task.id).sort((a,b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      })" >
                <!-- {{ task_el }} -->
                <div style="display: flex; gap: 1rem; align-items: center;">
                  <div>
                    <div v-if="task_el.created_at === task_el.ended_at">Нет даты завершения</div>
                    <div v-else>
                      {{ (Math.abs(new Date(task_el.ended_at) - new Date(task_el.created_at)) / (1000 * 60 * 60) % 24).toFixed(1) }}
                    </div>
                  </div>
                  <div>{{ task_el.subject }}</div>
                  <div>taskId: {{ task_el.taskId }}</div>
                  <div>playerId: {{ task_el.playerId }}</div>
                  <div>{{ task_el.status }}</div>
                  <div>
                    <div>{{ task_el.created_at }}</div>
                    <div>{{ task_el.ended_at }}</div>
                  </div>
                </div>

              </li>
            </ul>
          </li>
        </ul>
        <div v-else>У вас нет задач по данному проекту</div>
      </div>
    </div>

    <!--  -->
    <div >
      <!-- <h1 style="margin-top: 5rem">{{ project.title }}</h1>
      <p>
        Вид работ: <span>{{ project.workType }}</span>
      </p>
      <p>
        Адрес: <span>{{ project.address }}</span>
      </p>

      <div>
        Проект:
        <p>{{ project }}</p>
      </div> -->
      <!-- Заголовок - переключатель / toggle title-->
      <!-- <div class="toggle-title">
        <div
          v-for="(title, index) in titles.filter((el) => {
            if (el.guard && isRelated(project)) {
              return el;
            } else if (!el.guard) {
              return el;
            }
          })"
          class="switch-title_el"
        >
          <input
            type="radio"
            :id="`${index}_el`"
            :value="title.name"
            v-model="currentTitle"
          />
          <label :for="`${index}_el`">
            <h2>{{ title.title }}</h2>
          </label>
        </div>
      </div> -->

      <!-- SCHEDULE -->
      <!-- <div v-if="currentTitle === 'schedule'">
        <div class="schedule_container">
          <div v-if="schedules.length">
            <div v-for="schedule in schedules">
              <div>
                Фильтры: (запланировано / в процессе / выполнено) : (банда) :
                (проект)
              </div>
              <div>
                <div>
                  Задача 1 (Захватка 1)
                  ------------------------------------------------- deadline
                </div>
                <div>Подзадача 1 ------------- deadline</div>
                <div>
                  Подзадача 2 --------------------------------------- deadline
                </div>
                <div>
                  Заявка --------------------------------------- deadline
                </div>
              </div>
            </div>
          </div>
          <div v-else>Ничего нет</div>
        </div>
      </div> -->

      <!-- DEMANDS -->
      <!-- <div v-if="currentTitle === 'demands'">
        <div class="demands_container">
          <div>Ничего нет</div>
        </div>
      </div> -->

      <!-- SHARERS -->
      <!-- <div v-if="currentTitle === 'sharers'">

        <div class="sharers_container">

          <div v-if="project.sharers">

            <div v-for="sharer in project.sharers">
              {{ sharer }}
            </div>
          </div>

          <div v-else>Ничего нет</div>
        </div>
      </div> -->

      <!-- ТМЦ на проекте -->
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

      <!-- BALANCE -->
      <!-- <div v-if="currentTitle === 'balance'">
        <div class="balance_container">
          <div>Ничего нет</div>
        </div>
      </div> -->
    </div>
  </Container>
</template>

<style scoped>
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

.schedule_container,
.demands_container,
.sharers_container,
.warehouse-items_container,
.balance_container {
  margin-top: 1rem;
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
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.computedTask_container{
  display: grid;
  gap: 1rem;
}
@media screen and (max-width: 575px) {
  .toggle-title {
    margin-top: 1rem;
    /* margin: 1rem 1rem 0 1rem; */
    padding: unset !important;
    border: unset;
  }
  .switch-title_el:first-child {
    margin-left: 1rem;
  }
  .schedule_container,
  .demands_container,
  .sharers_container,
  .warehouse-items_container,
  .balance_container {
    margin: 0 1rem;
  }
  .computedTask_container{
    grid-template-columns: 1fr;
    padding: 0 0.5rem;
    gap: 1rem;
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
  .computedTask_container{
    grid-template-columns: 1fr;
    padding: 0 1rem;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 767px) {
  .toggle-title {
    /* padding-left: 0.5rem; */
    padding-right: 0.5rem;
  }
}
@media screen and (min-width: 768px) and (max-width: 991px) {
  .computedTask_container{
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (min-width: 992px) and (max-width: 1199px) {

  .computedTask_container {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (min-width: 1200px) {

  .computedTask_container{
    grid-template-columns: repeat(5, 1fr);
  }
}

</style>
