<script setup lang="ts">
// shared
import { Container } from "@/shared/container";
import { Section } from "~/shared/section";
import { SectionColored } from "~/shared/section_colored";
import { InfoPopup } from "~/shared/popup";

//components
import { BreadCrumbs } from "~/components/breadcrumbs";
import { Button } from "~/components/button";
import { Chip } from "~/components/chip";
import { AccessDeniedPlug } from "~/components/plug_access_denied";

import { calc_working_hours } from '~/helpers/calc_working_hours'

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
// CURRENT PROJECT STATUS
const project_status = ref('Уточняю...')


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
      title: 'Все',
      id: 'chips_status_1'
})

const chips = [
  {
      name: 'all',
      title: 'Все',
      id: 'chips_status_1'
  },
  {
      name: 'waiting',
      title: 'Ожидание',
      id: 'chips_status_2'
  },
  {
      name: 'works',
      title: 'В процессе',
      id: 'chips_status_3'
  },  
  {
      name: 'agreement',
      title: 'Согласование',
      id: 'chips_status_4'
  },
  {
      name: 'finished',
      title: 'Завершенные',
      id: 'chips_status_5'
  },
  {
      name: 'canceled',
      title: 'Отменено',
      id: 'chips_status_6'
  },
  {
      name: 'paused',
      title: 'Пауза',
      id: 'chips_status_7'
  },  
]
//
const chips_accomplishment = ref([
  {
    id: 'chips_accomplishment_1',
    name: 'all',
    title: 'Все',
  },
  {
    id: 'chips_accomplishment_2',
      name: 'waiting',
      title: 'Ожидание'
  },
  {
    id: 'chips_accomplishment_3',
      name: 'agreement',
      title: 'Согласование'
  },
  {
    id: 'chips_accomplishment_4',
      name: 'finished',
      title: 'Завершенные'
  },
  {
    id: 'chips_accomplishment_5',
      name: 'paused',
      title: 'Пауза'
  },  
  {
    id: 'chips_accomplishment_6',
    name: 'canceled',
    title: 'Отменено'
  },
])
//
const currentAccomplishmentChip = ref({
  // name: 'waiting',
  // title: 'Ожидание'
  id: 'chips_accomplishment_1',
    name: 'all',
    title: 'Все',
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
      else if (el.taskId === current_task.value.id && currentAccomplishmentChip.value.name === 'all') {
        return el
      }
      // if(el.taskId === current_task.value.id) {
      // }
    })
  }
})


// HELPERS
//= set color by project status
const setColorByProjectStatus = () => {
  if(project_status.value === 'Еcть вопросы...') {
    return `background-color: var(--color-status-canceled);`
  } 
  else if (project_status.value === 'Проект завершен') {
    return `background-color: var(--color-status-finished); color: var(--color-urgency-low)`
  }  
  else {
    return `background-color: var(--color-status-canceled);`
  }
}

//= countPaidedTaskByHours
const countPaidedTaskByHours = () => {
  let endedSum:number = 0;
  let paided:number = 0;

  let task_list_filtred = []
  //task_list
  task_list?.value?.forEach(task => {

    if(task.projectId === computedProject?.value?.id) {
      
      task_list_filtred?.push(...task_ledger?.value?.filter(task_el => task_el.taskId === task.id))

      // ENDED SUM
      endedSum = task_list_filtred?.reduce((acc, list_el) => {
        acc += (new Date(list_el.ended_at) - new Date(list_el.created_at)) / (1000 * 60 * 60) % 24

        return acc
      }, 0)

      // PAIDED SUM
      paided = task_list_filtred?.reduce((acc, list_el) => {

        if(list_el.status === 'finished') {

          acc += (new Date(list_el.ended_at) - new Date(list_el.created_at)) / (1000 * 60 * 60) % 24
        }

        return acc
      }, 0)
    }
  })

  // return `${paided.toFixed(2)} из ${endedSum.toFixed(2)} (-${(endedSum - paided).toFixed(2)})`
  return `${paided.toFixed(2)} из ${endedSum.toFixed(2)} (${(paided - endedSum).toFixed(2)})`
}
//= countPaidedaccomplishmentByHours
const countPaidedaccomplishmentByHours = () => {
  let endedSum:number = 0;
  let paided:number = 0;

  //computedAccomplishments
  endedSum = task_ledger?.value?.filter(el => el.taskId === current_task.value.id).reduce((acc, el) => {

    acc += (new Date(el.ended_at) - new Date(el.created_at)) / (1000 * 60 * 60) % 24

    return acc
  }, 0)
  paided = task_ledger?.value?.filter(el => el.taskId === current_task.value.id && el.status === 'finished').reduce((acc, el) => {

    acc += (new Date(el.ended_at) - new Date(el.created_at)) / (1000 * 60 * 60) % 24

    return acc
  }, 0)

  return `${paided.toFixed(2)} из ${endedSum.toFixed(2)} (-${(endedSum - paided).toFixed(2)})`
}

// ******* DB
// *** GET

//= project
const { data: project_list } = useFetch("/api/projectGuarded/project", {
    lazy: false,
    transform: (project_list) => {

      // return project_list.find(el => el.id === +route.params.id) 

      let project = project_list.filter(el => el.id === +route.params.id)
      let sharerExist = project[0].sharers.filter(el => el.userId === props.auth_user_profile.userId && el.userType === 'user')
      
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
    // CANCELED
    if(lead.status === 'canceled') {
      color = 'var(--color-status-canceled)'
    }
    // PAUSED
    // FINISHED
    else if(lead.status === 'finished') {
      color = 'var(--color-status-finished)'
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
  alert('Измение статуса выполнения: в разработке...')
}
//= add ledger task
const addCurrentTaskEl = (currentTask: any) => {
  // Здесь добавляем в task ledger элемент для current task id
  alert('В разработке')
  console.log(currentTask)
}
//= add New Task
const addNewTask = () => {
  alert('В разработке...')
}

// HELPERS
//
//= count finished task in accomplishment
const countFinishedAccomplishmentTask = (taskLedger: any) => {

  let endedSum:number = 0;

  taskLedger?.forEach((item:any) => {

    if(item?.status === 'finished') {

      endedSum += Math.abs((new Date(item.ended_at) - new Date(item.created_at)) / (1000 * 60 * 60) % 24)
    }    
  })

  return endedSum.toFixed(2)
}
//
//= all task in accomplishment
const countAccomplishmentTask = (taskLedger: any) => {
  let sum:number = 0

  taskLedger?.forEach((item:any) => {
    sum += Math.abs((new Date(item.ended_at) - new Date(item.created_at)) / (1000 * 60 * 60) % 24)
  })

 return sum.toFixed(2)
}
//
//= current accomplishment 
const countCurrentAccomplishment = () => {

  let sum:number = 0

  computedAccomplishments.value?.forEach((item:any) => {
    sum += Math.abs((new Date(item.ended_at) - new Date(item.created_at)) / (1000 * 60 * 60) % 24)
  })

  return `Итого: ${sum.toFixed(2)} часа работы`
}
//
// //= slice string
// const slice = () => {

// }


// SET
//== accomplishment label by task
const setTaskAccomplishmentLabel = (finished: any, sum: any) => {
  if(finished < sum) {

    return `Долг`
  } else if (finished == sum) {
    return `Оплачено`
  }
}
//= set color by status 
const set_bgColor_by_status = (status: string) => {
  // status finished
  if (status === 'finished') {
    return `color: var(--color-urgency-low-wo); background-color: unset`
  } 
  // status waiting
  else if (status === 'waiting') {
    return `color: var(--color-urgency-middle); background-color: unset`
  }
  // status agreement
  else if (status === "agreement") {
    return `color: var(--color-urgency-middle); background-color: unset;`
  }
  // status paused
  else if (status === 'paused') {
    return `background-color: var(--color-status-paused); `
  }
  //else
  else {
    return 
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
    // name: 'waiting',
    // title: 'Ожидание'
    id: `${currentAccomplishmentChip.value?.id}`,
    name: 'all',
    title: 'Все'
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
          // body.style.overflow = 'hidden'

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

  watch(computedTasks, () => {
    if(computedTasks?.value?.find(el => el.status !== 'finished')) {
      project_status.value = 'Еcть вопросы...'
    } else {
      project_status.value = 'Проект завершен'
    }
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
          <!--  -->
          <div style="margin-left: 1rem; margin-right: 1rem;">
            Paided: {{countPaidedaccomplishmentByHours()}}
          </div>
          <!-- chips -->
          <Chip
            :tabs="chips_accomplishment"
            :no_padding="true"
            :default="currentAccomplishmentChip"
            :btn_all_exist="false" 
            @changed="changeAccomplishmentChip"
            style="margin-top: 1rem; padding-left: 1rem; padding-right: 1rem;"
          />

          <!-- COUNT   -->
          <div v-if="computedAccomplishments?.length" style="margin-left: 1rem; margin-right: 1rem; margin-top: 1rem; display: flex; gap: 1rem;">
            <div style="padding: 4px 8px; border-radius: 1rem; background-color: var(--color-btn-hover-bg); width: fit-content; font-size: 0.8rem;">Выполнений: {{ countAccomplishment }}</div>
            <div style="padding: 4px 8px; border-radius: 1rem; background-color: var(--color-btn-hover-bg); width: fit-content; font-size: 0.8rem;" v-if="computedAccomplishments?.length">{{ countCurrentAccomplishment() }}</div>
          </div>

          <!-- accomplishment list -->
          <div v-if="computedAccomplishments?.length">

            <!-- UL1 -->
            <ul v-for="endedDate in accomplishmentsEndedDateArray" class="task_ledger_container" style="list-style: none; padding: 0;">
              <!-- LI1 -->
              <li>
                <p style="margin-bottom: 1rem; font-size: .8rem; text-align: center; color: var(--color-global-text)">{{ endedDate }}</p>
                
                <!-- UL2 -->
                <ul style="padding: 0; list-style: none">

                  <!-- LI2 -->
                  
                  <li v-for="task_el in computedAccomplishments.filter(item => item.ended_at.slice(0,10) === endedDate)" class="task_ledger_el">
                    <div 
                      :fJustifyContent="'flex-start'" 
                      :fDirection="'column'"
                    >
                      <!-- HEADER -->
                      <p 
                        style="font-size: 0.8rem; margin: 0;"
                      >
                        <!-- PERIOD -->
                        <span 
                          style="color: var(--color-btn-disabled-text);"
                        >
                          {{ task_el?.created_at.slice(11, 16)}}
                          - 
                          {{ task_el.ended_at.slice(11,16) }}
                        </span> 
                        <!-- COUNT HOURS -->
                        <span
                          style="color: var(--color-btn-disabled-text);"
                        >
                          {{ calc_working_hours(task_el.created_at, task_el.ended_at) }}
                        </span>
                      </p>

                      <!-- CONTENT -->
                      <div class="ledger_el_info">
                      {{ task_el.subject }}
                      </div>

                      <!-- FOOTER -->
                      <div class="leder_el_footer">

                        <!-- STATUS -->
                        <div class="ledger_el_status" :style="set_bgColor_by_status(task_el.status)" @click="changeCurrentTaskElStatus(task_el)">
                          {{ task_el.status }}
                        </div>
                      </div>
                    </div>


                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <ul v-else style="list-style: none; padding: unset; margin-top: 1rem; margin-left: 1rem; ">
            <li>Ничего нет</li>
          </ul>
        </div>
         <!-- LENGTH === 0 -->
        <div v-else>
          <p style="margin-left: 1rem; margin-right: 1rem;">Еще ничего не сделали...</p>
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
        </div>
        <h1 style="margin: 0; font-weight: bold; font-size: 42px;">{{computedProject?.name}}</h1> 

      </div>

      <!-- GENERAL INFO -->
      <div class="general-secction_container">
        <p>Статус: <span style="font-size: .8rem; padding: 4px 8px; border-radius: 1rem;" :style="setColorByProjectStatus()">{{project_status}}</span></p>
        <!-- <p style="margin: 0;">Уделено часов</p> -->
      </div>

      <!-- ABOUT SECTION-->
      <div class="about-section_container">
        <h3>Статистика</h3>
        <p>Выручка:
          <ul>
            <li>Ставка: почасовая (####,## RUB / час)</li>
            <li>Закрытые часы #.## / #.##</li>
            <li>Итого: ## ###,## RUB</li>
          </ul>
        </p>
        <p>Затраты:
          <ul>
            <li>Налог(Ставка: ##,##%): ###,## RUB</li>
            <li>Производство: # ###,## RUB</li>
            <li>Итого: # ###,## RUB</li>
          </ul>
        </p>
        <p>Маржа с проекта: ## ###,## RUB</p>
        <p>{{ computedProject }}</p>
      </div>

      <!-- TASKs SECTION -->
      <div class="task-section_container">

        <div class="header-section_container">

          <h2>Задачи</h2>
          <Button type="pseudo-btn" link="" @click="addNewTask()">Добавить</Button>
        </div>
        <!--  -->
        <div>
          Paided: {{countPaidedTaskByHours()}}
          <br>
          <div v-for="(task, j) in task_list?.filter(el => computedProject ? el.projectId === computedProject.id : [])">
            {{ j + 1 }}. - {{ task.name }}
            <div v-for="(task_el, i) in task_ledger?.filter(el => el.taskId === task.id)">
              {{j + 1}}.{{i + 1}}. - {{ task_el.subject }}
            </div>
          </div>
        </div>
        <!-- CHIP -->
        <Chip
          v-if="task_list?.length"
          :tabs="chips"
          :default="currentChip" 
          :btn_all_exist="false" 
          @changed="changeChip"
          style="margin-top: 1rem; width: 100%;"
        />

        <div class="count_task" v-if="computedTasks?.length ">{{ computedTasks?.length }} в листе</div>

        <div v-if="task_list?.length" style="list-style: none; padding: 0;">

          <!-- TASK -->
          <div v-if="computedTasks?.length" class="computedTask_container">

            <SectionColored               
              v-for="(task, index) in computedTasks"
              :current_task="task"
              :name="task.name"
              :padding="true" 
              :fDirection="`column`"
              :fGap="'1rem'"
              style="cursor: pointer; position: relative; flex-direction: row"
              :taskArray="task_ledger?.filter(el => el.taskId === task.id)"
              :totalTaskHours="countAccomplishmentTask(task_ledger?.filter(el => el.taskId === task.id))"
              @click.stop="chooseCurrentLanding(task)"
            >
              <div 
                :style="
                  setTaskAccomplishmentLabel( 
                    countFinishedAccomplishmentTask(task_ledger?.filter(el => el.taskId === task.id)),
                    countAccomplishmentTask(task_ledger?.filter(el => el.taskId === task.id))
                  ) === 'Долг' ? `color: var(--color-global-text)` : `color: var(--color-urgency-low-wo)`
              ">
                {{
                  setTaskAccomplishmentLabel(
                    countFinishedAccomplishmentTask(task_ledger?.filter(el => el.taskId === task.id)),
                    countAccomplishmentTask(task_ledger?.filter(el => el.taskId === task.id))
                  ) 
                }}
              </div>
            </SectionColored>

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
    <br>
    <br>
    <br>
    <br>  
    <br>
    <br>
    <br>  
    <br>
    <br>
    <br>  
    <br>
    <br>
    <br>
    <br>  
    <br>
    <br>  
    <br>
  </Container>
</template>

<style scoped>
.header-section_container {
  display: flex; 
  align-items: center; 
  gap: 1rem;
}
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

.ticket_paused,
.ticket_canceled {
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

.ticketEl_content-status {
  font-size: 0.8em;
} 

.computedTask_container{
  margin-top: 1rem;
  display: grid;
  column-gap: 1rem;
  row-gap: 1.5rem;
}

.count_task {
  margin-top: 1rem!important;
}

/*  */
.task_ledger_container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}
.task_ledger_el {
  position: relative;
  margin-left: 1rem;
  margin-right: 1rem;
}
.ledger_el_counter {
  display: flex;
  align-items: center;
}
/* .ledger_el_count {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-btn-disabled-text);
  font-size: 0.8rem;
} */
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
  color: var(--color-btn-text);
  background-color: var(--color-btn-wo-bg);
  font-size: 0.8rem;
  /* padding: 2px 8px; */
  transition: all .2s ease-in;
  border-radius: 1rem;
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
  padding: .5rem 1rem;
  /* padding-bottom: 1rem; */
  border: .5px solid var(--color-btn-hover-bg);
  border-radius: 1rem;
  /* border-bottom: .5px solid var(--color-btn-hover-bg); */
  margin-top: 1rem;
}
ul > .task_ledger_el:last-child {
  /* border: unset; */
}

.leder_el_footer {
  /* margin-top: 0.5rem; */
}

@media screen and (max-width: 575px) {
  .show-max-767 {
    display: none;
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
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  .general-secction_container,
  .title-section_container,
  .about-section_container{
    margin: 0 1rem;
  }
  /* .leder_el_header {
    margin-top: 0.5rem;
  } */
  .count_task {
    margin: 0 1rem;
  }
}
@media screen and (min-width: 576px) and (max-width: 767px) {
  .show-max-767 {
    display: none;
  }
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
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    grid-template-columns: repeat(2, 1fr);
  }
  .title-section_container,
  .general-secction_container,
  .about-section_container {
    margin: 0 1rem;
  }
  /* .leder_el_header {
    margin-top: 0.5rem;
  } */
  .count_task {
    margin: 0 1.5rem;
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
    margin-left: .5rem;
    margin-right: .5rem;
  }
  /* .leder_el_header {
    margin-top: 0.5rem;
  } */
  .count_task {
    margin: 0 0.5rem;
  }
}
@media screen and (min-width: 992px) and (max-width: 1199px) {

  .computedTask_container {
    grid-template-columns: repeat(4, 1fr);
    margin-left: .5rem;
    margin-right: .5rem;
  }
  /* .leder_el_header {
    margin-top: 0.5rem;
  } */
  .count_task {
    margin: 0 0.5rem;
  }
}

@media screen and (min-width: 1200px) {

  .computedTask_container{
    grid-template-columns: repeat(5, 1fr);
    margin-left: .5rem;
    margin-right: .5rem;
  }
  /* .leder_el_header {
    margin-top: 0.5rem;
  } */
  .count_task {
    margin: 0 0.5rem;
  }
}

</style>
