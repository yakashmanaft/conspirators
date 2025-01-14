<script setup lang="ts">
// shared
import { AccessDeniedPlug } from "~/components/plug_access_denied";
import { Container } from "@/shared/container";
import { Section } from "~/shared/section";
import { InfoPopup } from "~/shared/popup";

//components
import { BreadCrumbs } from "~/components/breadcrumbs";
import { Button } from "~/components/button";
import { Chip } from "~/components/chip";

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
// POPUP
const popup_opened = ref(false)

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

// CHIP
const currentChip = ref({
  name: 'all',
  title: 'Все'
})

const chips = [
  {
      name: 'all',
      title: 'Все'
  },
  {
      name: 'waiting',
      title: 'Ожидание'
  },
  {
      name: 'works',
      title: 'В процессе'
  },  
  {
      name: 'agreement',
      title: 'Согласование'
  },
  {
      name: 'finished',
      title: 'Завершенные'
  },
  {
      name: 'canceled',
      title: 'Отменено'
  },
  {
      name: 'paused',
      title: 'Пауза'
  },  
]
//
const chips_accomplishment = ref([
  {
      name: 'waiting',
      title: 'Ожидание'
  },
  {
      name: 'agreement',
      title: 'Согласование'
  },
  {
      name: 'finished',
      title: 'Завершенные'
  },
  {
      name: 'paused',
      title: 'Пауза'
  },  
  {
      name: 'canceled',
      title: 'Отменено'
  },
])
//
const currentAccomplishmentChip = ref({
  name: 'waiting',
  title: 'Ожидание'
})

// COUNT Accomplishments by current chip
const countAccomplishment = ref(0)

// Accomplishments Ended Date Array
const accomplishmentsEndedDateArray = ref([])

// EVENT CLICKERS
//= change demands chip
const changeChip = (obj: any) => {
    currentChip.value = obj
}
//= change accomplishment chip
const changeAccomplishmentChip = (obj: any) => {
  currentAccomplishmentChip.value = obj
}

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
      }).filter(task => {
        return currentChip.value.name !== 'all' ? task.status === currentChip.value.name : task
      })
    }
})

// accomplishment
const computedAccomplishments = computed(() => {
  if(task_ledger.value) {
    return task_ledger.value.filter(el => {
      if(el.taskId === current_task.value.id && currentAccomplishmentChip.value.name === el.status) {
        return el
      }
      // if(el.taskId === current_task.value.id) {
      // }
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
    task_ledger.filter(item => item.taskId === current_task.value.id)
    return task_ledger.sort((a,b) => {
        return new Date(b.created_at) - new Date(a.created_at);
        // return b.created_at - a.created_at
      })
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
  countAccomplishment.value = computedAccomplishments.value?.length
});

//= set accomplishments Ended Date Array
const accomplishmentsEndedDateArrayFunc = () => {
  let arr = []

  computedAccomplishments.value?.forEach(item => {
    arr.push(item.ended_at.slice(0,10))
  })

  return [...new Set(arr)]
}

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
    // PAUSED
    // FINISHED
    if(lead.status === 'finished') {
      color = 'var(--color-btn-text)'
    }
  }

  return color
}

// CLIKCER
//= choose current task
const current_task = ref({
  id: null,
  name: '',
  desc: '',
  status: ''
})
const chooseCurrentLanding = (task: any) => {
  current_task.value.id = task.id
  current_task.value.name = task.name
  current_task.value.desc = task.desc
  current_task.value.status = task.status
  popup_opened.value = true
}
//= change status
const changeCurrentTaskStatus= (currentTask: any) => {
  console.log(currentTask)
  alert('В разработке...')
}
const changeCurrentTaskElStatus = (task_el: any) => {
  console.log(task_el)
  alert('В разработке...')
}
//= add ledger task
const addCurrentTaskEl = (currentTask: any) => {
  // Здесь добавляем в task ledger элемент для current task id
  alert('В разработке')
  console.log(currentTask)
}

// HELPERS
//== count finished task in accomplishment
const countFinishedAccomplishmentTask = (taskLedger: any) => {

  let endedSum:number = 0;

  taskLedger?.forEach((item:any) => {

    if(item?.status === 'finished') {

      endedSum += Math.abs((new Date(item.ended_at) - new Date(item.created_at)) / (1000 * 60 * 60) % 24)
    }    
  })

  return endedSum.toFixed(1)
}
// all task in accomplishment
const countAccomplishmentTask = (taskLedger: any) => {
  let sum:number = 0

  taskLedger?.forEach((item:any) => {
    sum += Math.abs((new Date(item.ended_at) - new Date(item.created_at)) / (1000 * 60 * 60) % 24)
  })

 return sum.toFixed(1)
}
// current accomplishment 
const countCurrentAccomplishment = () => {

  let sum:number = 0

  computedAccomplishments.value?.forEach((item:any) => {
    sum += Math.abs((new Date(item.ended_at) - new Date(item.created_at)) / (1000 * 60 * 60) % 24)
  })

  return `Всего ${sum.toFixed(1)} часа работы`
}

// SET
//== accomplishment label by task
const setTaskAccomplishmentLabel = (finished: any, sum: any) => {
  if(finished < sum) {

    return `Долг`
  } else if (finished == sum) {
    return `Готово`
  }
}
//== readingg hours
// const setReadingTime = (subject: string, data: string) => {
  
//   let date = new Date(data)

//   if( subject === 'date'){
    
//     return `${date.getDate()}-${date.getMonth() + 1 }-${date.getFullYear()}`
//   } else {

//     return date
//   } 
// }


//= closePopup
const closePopup = () => {
  popup_opened.value = false
  current_task.value = {
    id: null,
    name: '',
    desc: '',
    status: ''
  }
  currentAccomplishmentChip.value = {
    name: 'waiting',
    title: 'Ожидание'
  }
}
//= cut task desc
const cutTaskDesc = (str: string, maxLength: number) => {
  if(str.length > maxLength) {
    str = str.substring(0, maxLength - 3)
    return `${str}...`
  } else {

    return str
  }
}

// WATHCERS
  //= popup_opened
  watch(popup_opened, () => {
      let body = document.getElementsByTagName('body')[0]
      if(popup_opened.value) {

          body.style.margin = '0'
          body.style.height = '100%'
          body.style.overflow = 'hidden'

          // set count accomplishment 
          countAccomplishment.value = computedAccomplishments.value?.length

          // set accomplishments Ended Date Array
          accomplishmentsEndedDateArray.value = accomplishmentsEndedDateArrayFunc()

      } else {
          body.style.margin = 'unset'
          body.style.height = 'unset'
          body.style.overflow = 'unset'
      }
  })
  //= countAccomplishment.value = computedAccomplishments.value?.length
  watch(currentAccomplishmentChip, () => {
    // set count accomplishment 
    countAccomplishment.value = computedAccomplishments.value?.length
    // set accomplishments Ended Date Array
    accomplishmentsEndedDateArray.value = accomplishmentsEndedDateArrayFunc()
  })

</script>

<template>
  <!-- POPUP -->
   <InfoPopup
      v-if="popup_opened"
      id="popup-info_ledger_tasks" 
      popup_title="Выполнение" 
      @emitClosePopup="closePopup"
      >
      <!-- {{current_task}} -->

      <!-- SLOT -->
      <!-- POPUP HEADER -->
      <!-- <header style="margin-top: 1rem;">
          

      </header> -->

      <!-- POPUP CONTENT -->
      <section style="margin-top: 1rem; margin-bottom: 5rem;">

        <!-- LENGTH > 0 -->
        <div v-if="task_ledger?.filter(el => el.taskId === current_task.id).length">
          <!-- chips -->
          <Chip
            :tabs="chips_accomplishment"
            :no_padding="true"
            :default="currentAccomplishmentChip"
            :btn_all_exist="false" 
            @changed="changeAccomplishmentChip"
          />

          <!-- COUNT   -->
          <div style="margin-top: 1rem; display: flex; flex-direction: column;">
            <div>{{ countAccomplishment }} в листе</div>
            <div v-if="computedAccomplishments?.length">{{ countCurrentAccomplishment() }}</div>
          </div>
          <!-- accomplishment list -->
          <div v-if="computedAccomplishments?.length">
            <ul v-for="endedDate in accomplishmentsEndedDateArray" class="task_ledger_container" style="list-style: none; padding: 0;">
              <li>
                <p style="margin-bottom: 1rem; font-size: 1.2rem; text-align: center;">{{ endedDate }}</p>
                <ul style="padding: 0; list-style: none">
                  <li v-for="task_el in computedAccomplishments.filter(item => item.ended_at.slice(0,10) === endedDate)" class="task_ledger_el">
                    <!-- PERIOD -->
                    <div>
                      <p style="margin: 0;">
                        <!-- {{ setReadingTime('date', task_el.created_at) }} -->
                        <span style="font-size: 0.7rem">
                          Начало: {{ task_el.created_at }}
                          Завершение: {{ task_el.ended_at }}
                        </span>
                      </p>
                    </div>
                    <!-- INFO -->
                    <div class="ledger_el_info">
                    {{ task_el.subject }}
                    </div>
                    <!-- FOOTER -->
                    <div class="leder_el_footer" style="display: flex; gap: 1rem;">
                      <!-- STATUS -->
                      <div class="ledger_el_status" @click="changeCurrentTaskElStatus(task_el)">
                        {{ task_el.status }}
                      </div>
                      <!-- COUNT -->
                      <div class="ledger_el_count">
                        <!-- false | -- -->
                        <div v-if="task_el.created_at === task_el.ended_at">
                          --
                        </div>
                        <!-- true | +12-->
                        <div v-else>
                          +{{ (Math.abs(new Date(task_el.ended_at) - new Date(task_el.created_at)) / (1000 * 60 * 60) % 24).toFixed(1) }}
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <ul v-else style="list-style: none; padding: unset; margin-top: 1rem;">
            <li>Ничего нет</li>
          </ul>
        </div>
         <!-- LENGTH === 0 -->
        <div v-else>
          <p>Еще ничего не сделали...</p>
        </div>
      </section>

      <!-- POPUP FOOTER -->
      <footer v-if="current_task?.status !== 'finished'" style="background-color: var(--color-btn-text); position: absolute; bottom: 0; left: 0;width: 100%; padding: 1rem; border-top: 1px solid var(--color-btn-hover-bg)">

        <Button type="original-btn" bg="bg-full" width="100%" @click="addCurrentTaskEl(current_task)">Добавить выполнение</Button>

      </footer>
    </InfoPopup>

  <!-- CONTAINER -->
  <Container>
    <!-- Псевдо защита... -->
    <AccessDeniedPlug v-if="accessPlug === true"/>
    <!-- {{props.auth_user_profile}} -->
    <div v-if="computedProject && !accessPlug">
        
      <!-- TITLE PAGE SECTION -->
      <div class="title-section_container">
        <div class="show-max-767" style="margin-bottom: 0.5rem;">
          <BreadCrumbs/>
          <h1 style="margin: 0;">{{computedProject?.name}} (#{{ $route.params.id  }})</h1> 
        </div>

      </div>

      <!-- ABOUT SECTION-->
      <div class="about-section_container">
        <h3># часов</h3>
        <p>Закрытые часы 3/5</p>
        {{ computedProject }}

      </div>

      <!-- TASKs SECTION -->
      <div class="task-section_container">

        <h2>Задачи ({{ computedTasks?.length }})</h2>
        <!-- CHIP -->
        <Chip
          v-if="task_list?.length"
          :tabs="chips"
          :default="currentChip" 
          :btn_all_exist="false" 
          @changed="changeChip"
          style="margin-top: 1rem; width: 100%;"
        />

        <div v-if="task_list?.length" style="list-style: none; padding: 0;">

          <!-- TASK -->
          <div v-if="computedTasks?.length" class="computedTask_container">

            <Section 
              v-for="(task, index) in computedTasks"
              :padding="true" 
              :bg="set_bgColor_by_Urgency(task)" 
              :fDirection="`column`"
              :fGap="'1rem'"
              style="cursor: pointer; position: relative; flex-direction: row"
              @click.stop="chooseCurrentLanding(task)"
            >
              <!-- {{  task  }} -->
  
              <!-- task name -->
              <div class="ticketEl_content">
                <h3>О чЁм</h3>
                <p>{{ task.name }}</p>
              </div>
              <!-- task desc -->
              <div class="ticketEl_content">
                <h3>ТЗ:</h3>
                <p>{{ cutTaskDesc(task.desc, 40) }}</p>
              </div>
              <!-- task count work hours -->
                <div>
                  <div>---</div>
                  <div style="display: flex; align-items: center; justify-content: space-between">
                    <div>{{ countFinishedAccomplishmentTask(task_ledger?.filter(el => el.taskId === task.id)) }} / {{ countAccomplishmentTask(task_ledger?.filter(el => el.taskId === task.id)) }}</div> 
                    <div 
                      :style="
                        setTaskAccomplishmentLabel( 
                          countFinishedAccomplishmentTask(task_ledger?.filter(el => el.taskId === task.id)),
                          countAccomplishmentTask(task_ledger?.filter(el => el.taskId === task.id))) === 'Долг' ? `color: var(--color-global-text)` : `color: var(--color-urgency-low-wo)`
                      ">
                        {{
                          setTaskAccomplishmentLabel(
                            countFinishedAccomplishmentTask(task_ledger?.filter(el => el.taskId === task.id)),
                            countAccomplishmentTask(task_ledger?.filter(el => el.taskId === task.id))
                          )
                        }} |
                        {{ task?.urgency }} |
                        {{ task?.status }}
                      </div>
                  </div>
                </div>
              
              <!--  -->
              <!-- TASK have deadline (absolute) -->
              <div v-if="task.deadline > task.created_at" class="ticket_deadline">
                deadline: {{ task.deadline }}
              </div>
              <!-- WRAPPER FOR LEAD ON PAUSE (absolute) -->
              <div v-if="task.status === 'paused'" class="rounded ticket_paused">
                <div style="color: #fff;">ПАУЗА</div>
              </div>  
              <!-- WRAPPER FOR FINISHED????????-->
  
  
  
  
            </Section>
          </div>
          <div v-else class="computedTask_container">
           Нет задач по фильтру
          </div>
        </div>

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
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.ticketEl_content h3 {
  font-size: 0.6rem;
}


.ticketEl_content h3, 
.ticketEl_content p {
  margin: 0;
}

.computedTask_container{
  margin-top: 1rem;
  display: grid;
  gap: 1rem;
}


/*  */
.task_ledger_container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}
.task_ledger_el {
  /* background-color: red;s */
  position: relative;
}
.ledger_el_counter {
  /* background-color: green; */
  display: flex;
  align-items: center;
}
.ledger_el_count {
  /* background-color: var(--color-global-text);
  color: var(--color-btn-text); */
  /* height: 50px;
  width: 50px; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.ledger_el_period {
  display: flex;
  flex-direction: column;
  /* background-color: red; */
  padding-left: 0.5rem;
}
.ledger_el_period div p {
  margin: 0;
  font-size: 1rem;
}
.ledger_el_info {
  /* background-color: blue */
  /* margin-top: 0.5rem; */
}
.ledger_el_status {
  /* position: absolute;
  top: 0.5rem;
  right: 0; */
  display: inline-block;
  background-color: var(--color-btn-wo-bg);
  font-size: 0.7rem;
  padding: 10px 24px;
  transition: all .2s ease-in;
}
.ledger_el_status:hover {
  background-color: var(--color-bg-popup);
  cursor: pointer;
}

.popup_current_task_status {
  background-color: var(--color-btn-wo-bg); font-size: 0.7rem;
  padding: 10px 24px;
  transition: all .2s ease-in;
}
.popup_current_task_status:hover {
  background-color: var(--color-bg-popup);
  cursor: pointer;
}

ul > .task_ledger_el {
  margin-top: 0.5rem;
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
    /* margin-left: 0.5rem;
    margin-right: 0.5rem; */
  }
  .title-section_container,
  .about-section_container{
    margin: 0 0.5rem;
  }
  .leder_el_footer {
    margin-top: 0.5rem;
  }
}
@media screen and (min-width: 576px) and (max-width: 767px) {
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
    margin-top: 1rem;
    /* margin-left: 1rem;
    margin-right: 1rem; */
    grid-template-columns: repeat(2, 1fr);
  }
  .title-section_container,
  .about-section_container {
    margin: 0 0.5rem;
  }
  .leder_el_footer {
    margin-top: 0.5rem;
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
  .leder_el_footer {
    margin-top: 0.5rem;
  }
}
@media screen and (min-width: 992px) and (max-width: 1199px) {

  .computedTask_container {
    grid-template-columns: repeat(4, 1fr);
  }
  .leder_el_footer {
    margin-top: 0.5rem;
  }
}

@media screen and (min-width: 1200px) {

  .computedTask_container{
    grid-template-columns: repeat(5, 1fr);
  }
  .leder_el_footer {
    margin-top: 0.5rem;
  }
}

</style>
