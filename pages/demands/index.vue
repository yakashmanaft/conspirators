<script setup lang="ts">

// shared
import { Container } from "@/shared/container";
import { Section } from '@/shared/section'
import { SectionColored } from "@/shared/section_colored";

// components
// import { DevModePlug } from "~/components/plug_dev_mode";
import { Button } from '~/components/button'
import { Chip } from "~/components/chip";
import { BreadCrumbs } from "~/components/breadcrumbs";

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
// const currentDemandFilterType = ref("all");
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

//= PAGE SECTION CHIPs
//== chips
const page_section_chips = ref([
  {
    id: 'section-chip-1',
    name: "task",
    title: "Задачи",
  },
  {
    id: 'section-chip-2',
    name: "lead",
    title: "Лиды с огорода",
  },
  {
    id: 'section-chip-3',
    name: "stats",
    title: "Статистика",
  }
])
//== current  section chip
const current_section_chip = ref({
    id: 'section-chip-1',
    name: "task",
    title: "Задачи",
})

//CHIPS LEADs
const chips_lead = [
  {
    id: 'chip-lead-1',
    name: 'lead',
    title: 'Новые'
  },
  {
    id: 'chip-lead-2',
    name: 'project',
    title: 'В проекте'
  },
  {
    id: 'chip-lead-3',
    name: 'blank',
    title: 'Пустышки'
  }
]
const currentChipLead = ref({
  id: 'chip-lead-1',
    name: 'lead',
    title: 'Новые'
  })
// CHIPS TASKs
// const chips_status = [
//   {
//       name: 'all',
//       title: 'Все',
//       id: 'chip-status-1'
//   },
//   {
//       name: 'waiting',
//       title: 'Ожидание',
//       id: 'chip-status-2'
//   },
//   {
//       name: 'works',
//       title: 'В процессе',
//       id: 'chip-status-3'
//   },  
//   {
//       name: 'agreement',
//       title: 'Согласование',
//       id: 'chip-status-4'
//   },
//   {
//       name: 'finished',
//       title: 'Завершенные',
//       id: 'chip-status-5'
//   },
//   {
//       name: 'canceled',
//       title: 'Отменено',
//       id: 'chip-status-6',
//   },
//   {
//       name: 'paused',
//       title: 'Пауза',
//       id: 'chip-status-7',
//   },  
// ]
// const currentChip = ref({
//   name: 'all',
//       title: 'Все',
//       id: 'chip-status-1'
// })

//= current task status chip
const current_task_status_chip = ref('all')

// EVENT CLICKERS
//= change lead chip
const changeChipLead = (obj: any) => {
  currentChipLead.value = obj
}
//= change demands chip
// const changeChip = (obj: any) => {
//     currentChip.value = obj
// }
//= change current section chip
const changeCurrentSectionChip = (obj: any) => {
  current_section_chip.value = obj
}


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
//= TASK
//== task
const computedTask = computed(() => {
  // project_list
  // task_list
  // if(project_list.value) {
  //   let merged = task_list.value?.reduce((arr: {}[], task) => {

  //     project_list.value?.forEach(item => {
  //       if(item.id === task.projectId && (current_task_status_chip.value === task.status || current_task_status_chip.value === 'all')) {
  //         arr.push({
  //           id: task.id,
  //           created_at: task.created_at,
  //           project_id: task.projectId,
  //           task_name: item.name,
  //           status: task.status,
  //           urgency: task.urgency,
  //           deadline: task.deadline,
  //           desc: task.desc
  //         })
  //       }
  //     })

  //     return arr.reverse()
  //   }, [])

  //   return merged
  // } else {
  //   return null
  // }
  return task_list?.value?.filter(el => {
    if(current_task_status_chip.value === el.status) {
      return el
    } else if (current_task_status_chip.value === 'all') {
      return el
    }
  })
})
//== status chips
const computed_task_status_chip = computed(() => {
  if(task_list.value) {
    let result = ['all', ...new Set([...task_list.value.map((obj: any) => {
      return obj.status
    })])]
    return result.map(el => {
      return {
        name: el
      }
    })
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
const translateProjectID = (projectID: number, arr: []) => {

  let currentProjecObj = arr.find(el => el.id === projectID)

  return currentProjecObj?.name
}

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

// ADD /  CREATE
//= add task
const addTask = () => {
  alert('Добавление задачи... в разработке...')
}

// SET
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
      color = 'var(--color-status-paused)'
    }
    // CANCELED
    if(lead.status === 'canceled') {
      color = 'var(--color-status-canceled)'
    }
    // PAUSED
    // FINISHED
    if(lead.status === 'finished') {
      color = 'var(--color-status-finished)'
    }
  }

  return color
}
//= change period
const change_period = () => {
  alert('Смена  периода... в разработке...')
}

// HELPERS
//= cut task desc
// const cutTaskDesc = (str: string, maxLength: number) => {
//   if(str.length > maxLength) {
//     str = str.substring(0, maxLength - 3)
//     return `${str}...`
//   } else {

//     return str
//   }
// }

// COUNT
//= countTaskByHours
const countTaskByHours = () => {

  // let sum:number = 0;

  //accomplishment_list
  //computedTask
  const sum = accomplishment_list?.value?.reduce((acc, el) => {
    
    computedTask.value?.forEach(item => {
      if(el.taskId === item.id) {
        acc += (new Date(el.ended_at) - new Date(el.created_at)) / (1000 * 60 * 60) % 24
      }
    })

    return acc
    
  }, 0)

  return sum?.toFixed(2)
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
            if(el.sharers && el.sharers.find((item) => item.userType === 'user' && item.userId === props.auth_user_profile.userId)) {
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
            if(el.sharers && el.sharers.find((item) => item.userType === 'user' && item.userId === props.auth_user_profile.userId)) {
                return el
            }
        })
    }
})
//= tasks
const { data: task_list } = useFetch("/api/taskGuarded/task", {
  lazy: false,
  transform: (task_list) => {
    
    if(project_list.value) {
      let merged = task_list.reduce((arr: {}[], task) => {
        
        project_list.value?.forEach(item => {
          
          if(item.id === task.projectId) {
            arr.push({
              id: task.id,
              created_at: task.created_at,
              project_id: task.projectId,
              task_name: item.name,
              status: task.status,
              urgency: task.urgency,
              deadline: task.deadline,
              desc: task.desc
            })
          }
        })
        return arr.reverse()
      }, [])

      return merged
    }

    return task_list
  }
})
//= accomplishment 
const { data: accomplishment_list } = useFetch("/api/taskLedgerGuarded/taskElement", {
  lazy: false,
  transform: (accomplishment_list) => {
    return accomplishment_list
  }
})


</script>
<template>
  <Container>

    <!-- <DevModePlug/> -->

    <div class="show-max-767">
      <!-- BREAD CRUMBS -->
      <BreadCrumbs/>
      <!-- TITLE -->
      <h1 style="margin: 0; font-weight: bold; font-size: 42px;">Доска</h1>
    </div>

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

    
    <!-- PAGE SECTION CHIPs -->
    <Chip
      :btn_all_exist="false"
      :tabs="page_section_chips"
      :default="current_section_chip"
      @changed="changeCurrentSectionChip"
      style="margin-top: 1.5rem;"
    />
    <!-- {{ current_section_chip }} -->

    <!-- PERIOD -->
    <div class="period_wrapper">
      
      <p class="period_title">Период:</p>

      <p class="period_date" style="width: fit-content;">

        <span class="period_date_from" @click="change_period()">01.01.2025</span>
        <span class="period_date_separator">-</span>
        <span class="period_date_to" @click="change_period()">Сегодня</span>
      </p>

      <div 
        v-if="current_section_chip.name === 'lead'"
        style="background-color: var(--color-btn-hover-bg); border-radius: 100%; display: flex; align-items: center; justify-self: center; width: 24px; height: 24px; margin-left: auto"
        @click.stop="$router.push('/landing_all')"
      >
        <Icon 
          name="material-symbols-light:garden-cart-outline-rounded"
          size="24px"
          color="var(--color-btn-bg)"
        />
      </div>
    </div>
    
    <div style="margin-top: 1.5rem;">

      <!-- LEAD SECTION -->
      <div v-if="current_section_chip.name === 'lead'">
  
        <!-- header of section -->
        <!-- <div class="link_garden_container">
          <h2>Заявки с огорода</h2>
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
        </div> -->

        <!-- К огороду -->
        <!-- <div class="link_garden_container">
          <p @click.stop="$router.push('/landing_all')" style="margin: 0;">Перейти в огород</p>
        </div> -->

        <!-- CHIP -->
        <!-- lead by status -->
        <div class="lead_status_chip_container">
          <h3
            v-for="el in chips_lead"
            :class="currentChipLead.name === el.name ? 'status_chip_active' : ''"
          >
            <span @click.stop="currentChipLead = el">{{ el.name }}</span>
          </h3>
        </div>
  
        <!-- LEAD LIST -->
        <div id="lead-block" class="computedLead_container" v-if="computedLead?.filter(item => item.status === currentChipLead.name).length">
          <!-- :bg="'var(--color-urgency-low)'" -->
          <Section 
            :padding="true" 
            :bg="set_bgColor_by_Urgency(item)" 
            :fDirection="`column`"
            :fAlignItems="`flex-start`"
            v-for="item in computedLead.filter(item => item.status === currentChipLead.name)" 
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

            <!-- FOOTER -->
            <div>

              <p style="margin: 0; font-size: 0.8rem;">{{ item.status }}</p>
            </div>

            <!-- COUNT -->
            <div>
              123
            </div>
          </Section>
        </div>
        <!-- no lead with status PROJECT -->
        <div class="no-computed-lead_wrapper" v-else-if="computedLead?.filter(item => item.status === 'project').length == 0 && currentChipLead.name === 'project'">
          Заявки не стали проектами...
        </div>
        <!-- no lead with status LEAD -->
        <div class="no-computed-lead_wrapper" v-else-if="computedLead?.filter(item => item.status === 'blank').length == 0 && currentChipLead.name === 'blank'">
          Грац! У вас нет пустышек
        </div>
        <!-- ELSE -->
        <div class="no-computed-lead_wrapper" v-else>Ваш огород еще не дал плоды...</div>
      </div>
  
      <!-- TASKS SECTION -->
      <div v-if="current_section_chip.name === 'task'">
      
        <!-- haeder of the section -->
        <!-- <div class="link_garden_container">
            <h2>Задачи</h2>
            <Button type="pseudo-btn" link="" @click="addNewTask()">Добавить</Button>
        </div> -->

        <!-- TASK LENGTH -->
        <div v-if="computedTask?.length">
          <!-- CHIP -->
          <!-- task by status -->
          <div class="task_status_chip_container">
            <h3 
              v-for="el in computed_task_status_chip"
              :class="current_task_status_chip === el.name ? 'status_chip_active' : ''"
            >
              <span @click="current_task_status_chip = el.name">{{ el.name }}</span>
            </h3>
          </div>

          <!-- COUNT by task status-->
          <div  class="count-task_container">
  
            <!-- Кол-во задач -->
            <p>Кол-во задач: {{ computedTask?.length }}</p>
  
            <!-- наработанные часы -->
            <p>Итого: {{countTaskByHours()}} часа работы</p>
  
            <!-- Кнопка добавить задачу -->
            <div 
              v-if="current_task_status_chip !== 'finished'"
              @click="addTask"
              style="background-color: var(--color-btn-hover-bg); border-radius: 100%; cursor: pointer;"
            >
               <Icon name="material-symbols-light:add-2-rounded" size="24px"/>
            </div>
          </div>
  
          <!--  -->
          <div class="computedTask_container">
    
            <SectionColored
              v-for="item in computedTask" 
              :current_task="item"
              :name="item.task_name"
              :padding="true"
              :fDirection="`column`"
              :fGap="'1rem'"
              style="cursor: pointer; position: relative;"
              :taskArray="accomplishment_list?.filter(el => el.taskId === item.id)"
              @click="$router.push(`task/${item.id}`)"
            />
    
            <!-- ADD NEW TASK ITEM -->
            <!-- <Section
              :padding="true"
              bg="#fff"
              :fDirection="`column`"
              style="cursor: pointer; position: relative;"
              @click="addNewTask()"
            >
              <Icon
                  class="icon"
                  name="material-symbols-light:add-2-rounded"
                  size="48px"
                  color="var(--color-global-text_second)"
                  style="margin: auto;"
              />
            </Section> -->
          </div>
        </div>
        <!-- NO TASK -->
        <div class="no-task_wrapper" style="display: flex; align-items: center; gap: .5rem;" v-else>
          <p style="margin: 0;">Что-то у вас нет задач в периоде...</p>
          <div               
            @click="addTask"
            style="background-color: var(--color-btn-hover-bg); border-radius: 100%; cursor: pointer; width: 25px; height: 25px; display: flex; align-items :center; justify-content: center;">
            <Icon name="material-symbols-light:add-2-rounded" size="24px"/>
          </div>
        </div>
  
      </div>
  
      <!-- STATS SECTION -->
      <div v-if="current_section_chip.name === 'stats'">
        <!-- <h2>Статистика</h2> -->
        <div class="stats_section" style="display: flex; gap: 1rem; margin-top: 1rem;">

          <!--  -->
          <Section
            :fJustifyContent="'flex-start'"
            :fAlignItems="'flex-start'"
          >
            
            <p style="margin: 0;">Какие-то графики...</p>
          </Section>

          <!--  -->
          <Section
            :fJustifyContent="'center'"
            :fAlignItems="'center'"
          >
            
            <p style="margin: 0;">Какие-то диаграмы...</p>
          </Section>
        </div>
      </div>
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
/* .link_garden_container p{

  background-color: var(--color-btn-hover-bg);
  color: var(--color-btn-bg);
  width: fit-content;
  padding: 4px 8px;
  font-size: .8rem;
  border-radius: 1rem;
} */
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
  margin-top: 1rem;
  padding-bottom: 2rem;
  overflow: scroll; 
  max-width: 100vw!important;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none; 
}
.computedLead_container:-webkit-scrollbar {
  display: none;
}

.computedTask_container {
  margin-top: 1rem;
  display: grid;
  column-gap: 1rem;
  row-gap: 1.5rem;
}

.no-computed-lead_wrapper {
  margin-bottom: 2rem;
  margin-top: .5rem;
}

.no-task_wrapper {
  margin-top: 1rem;
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
  border-top-left-radius: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.ticket_canceled,
.ticket_paused {
  position: absolute; 
  top: 0; 
  left: 0;
  backdrop-filter: blur(2px);
  width: 100%; 
  height: 100%; 
  display: flex; 
  align-items: center; 
  justify-content: center;
}
.ticket_paused {
  background-color: var(--color-status-paused); 
}
.ticket_canceled {
  background-color: var(--color-status-canceled); 
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

/* PERIOD */
.period_wrapper {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: .5rem;
}
.period_title {
  margin: 0;
}
.period_date {
  margin: 0;
  display: flex;
  align-items: center;
  gap: .5rem;
}
.period_title,
.period_date_from,
.period_date_separator,
.period_date_to {
  color: var(--color-global-text_second);
}

.period_date_from,
.period_date_to {
  cursor: pointer; 
  font-size: .8rem;
  margin: 0;
  background-color: var(--color-btn-hover-bg);
  border-radius: 1rem;
  padding: 2px 8px;
  color: var(--color-btn-bg)
}
.period_date_from {
  margin: 0;
}
.period_date_separator {
  margin: 0;
}
.period_date_to {
  margin: 0;
}

/* TASK STATUS CHIP */
.task_status_chip_container,
.lead_status_chip_container {
  display: flex; 
  gap: 1rem; 
  align-items: center;
  /* justify-content: flex-start; */
  overflow-x: scroll;
  max-width: calc(100vw - 1rem)!important;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none; 
  padding-bottom: .5rem;
  border-bottom: 1px solid var(--color-btn-disabled-bg)
}
.task_status_chip_container::-webkit-scrollbar,
.lead_status_chip_container::-webkit-scrollbar {
  display: none;
}
.task_status_chip_container h3,
.lead_status_chip_container h3 {
  font-size: 1rem;
  font-weight: normal;
  position: relative;
}
.task_status_chip_container h3 span,
.lead_status_chip_container h3 span {
  cursor: pointer;
}
.task_status_chip_container h3:after,
.lead_status_chip_container h3:after {

}
.status_chip_active:after {
  content: '';
  position: absolute;
  bottom: -1rem;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--color-wallet-fund-available-wo);
}
.status_chip_active span {
    color: var(--color-wallet-fund-available-wo);
}

/* COUNT TASK BY STATUS */
.count-task_container {
  display: flex;
  align-items: center;
  gap: .5rem;
  font-size: .8rem;
}
.count-task_container p {
  margin: 0;
  padding: 4px 8px;
  color: var(--color-global-text_second);
}

@media screen and (max-width: 575px) {
  /* .filter-types_wrapper,
  .demands_wrapper {
    padding: 0 0.5rem;
  } */
  /* .link_garden_container {
    margin: 1rem .5rem 0 .5rem;
  } */
  /* PERIOD */
  .period_wrapper {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  /* DEMANDS SECTION */
  .demands_wrapper {
    grid-template-columns: 1fr;
  }
  /* STATS SECTION */
  .stats_section {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .no-task_wrapper,
  .no-computed-lead_wrapper,
  .computedLead_container  {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .computedTask_container{
    grid-template-columns: 1fr;
    padding: 0 1rem;
    gap: 1rem;
  }
  .show-max-767 {
    display: none;
  }

  /* TASK && LEAD STATUS CHHIP */
  .task_status_chip_container,
  .lead_status_chip_container {
    max-width: calc(100vw)!important;
    margin: 0 1rem;
    margin-top: 1rem;
  }

  /* COUNT TASK BY STATUS */
  .count-task_container {
    margin: 1rem 1rem 0 1rem;
  }
}
@media screen and (min-width: 576px) and (max-width: 767px){
  .show-max-767 {
    display: none;
  }
  /* .link_garden_container {
    margin: 1rem 1rem 0 1rem;
  } */
  /* PERIOD */
  .period_wrapper {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .no-task_wrapper,
  .no-computed-lead_wrapper  {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .computedLead_container  {
    padding-left: 1rem;
    padding-right: 0.5rem;
  }
  .computedTask_container{
    grid-template-columns: 1fr;
    padding: 0 1rem;
    grid-template-columns: repeat(2, 1fr);
  }
  /* DEMANDS */
  .demands_wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
  /* STATS SECTION */
  .stats_section {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  /* TASK && LEAD STATUS CHHIP */
  .task_status_chip_container,
  .lead_status_chip_container {
    max-width: calc(100vw)!important;
    margin: 0 1rem;
    margin-top: 1rem;
  }

  /* COUNT TASK BY STATUS */
  .count-task_container {
    margin: 1rem 1rem 0 1rem;
  }
} 

@media screen and (min-width: 768px) and (max-width: 991px) {
  /* .link_garden_container {
    margin-top: 1rem;
  } */
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
    margin-top: 1.5rem;
    grid-template-columns: repeat(3, 1fr);
  }

  /* TASK && LEAD STATUS CHHIP */
  .task_status_chip_container,
  .lead_status_chip_container {
    margin-top: 1rem;
  }

  /* COUNT TASK BY STATUS */
  .count-task_container {
    margin: 1rem 0 0 0;
  }
}
@media screen and (min-width: 992px) and (max-width: 1199px) {
  /* .link_garden_container {
    margin-top: 1rem;
  } */
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
    margin-top: 1.5rem;
    grid-template-columns: repeat(4, 1fr);
  }
  /* TASK && LEAD  STATUS CHHIP */
  .task_status_chip_container,
  .lead_status_chip_container {
    margin-top: 1rem;
  }
  /* COUNT TASK BY STATUS */
  .count-task_container {
    margin: 1rem 0 0 0;
  }
}
@media screen and (min-width: 1200px) {
  /* .link_garden_container {
    margin-top: 1rem;
  } */
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
    margin-top: 1.5rem;
    grid-template-columns: repeat(5, 1fr);
  }
  /* TASK && LEAD STATUS CHIP */
  .task_status_chip_container,
  .lead_status_chip_container {
    margin-top: 1rem;
  }
  /* COUNT TASK BY STATUS */
  .count-task_container {
    margin: 1rem 0 0 0;
  }
}
</style>
