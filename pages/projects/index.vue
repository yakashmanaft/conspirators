<script lang="ts" setup>
// shared
import { Container } from "@/shared/container";

// components
import { DevModePlug } from "@/components/plug_dev_mode";
import { BreadCrumbs } from "~/components/breadcrumbs";
import { Button } from "@/components/button";
import { Search } from "~/components/search";
import { Chip } from "@/components/chip";

// utils
import { H3Error } from "h3";
import { v4 as uuidv4 } from "uuid";
import { translateName, translateExecutorsName, translateCustomersName }  from '@/utils/translators'

useHead({
  title: "Мои проекты",
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


  
  const projects:any[] = []
  
  // tmp project item
  const project = ref({
    id: null,
    name: null,
    prtnerId: null,
    sharers: null
    // uuid: null,
    // title: null,
    // address: null,
    // bandID: null,
    // partnerID: null,
    // partnerType: null,
    // creator: null,
    // curator: null,
    // curatorType: null,
    // workType: null,
    // completion: 0,
    // sharers: null,
    // stages: null
  });

  // project status
  const project_status = ref([
      {
        id: 1,
        name: 'waiting',
        title: 'Ожидание'
      },
      {
        id: 2,
        name: 'works',
        title: 'В работе'
      },
      {
        id: 3,
        name: 'agreement',
        title: 'Согласование'
      },
      {
        id: 4,
        name: 'cancelled',
        title: 'Отменен'
      },
      {
        id: 5,
        name: 'paused',
        title: 'Пауза'
      },
      {
        id: 6,
        name: 'finished',
        title: 'Завершен'
      }
  ])
  const current_status_to_show = ref({
    id: 0,
    name: 'all',
    translate: 'Все'
  })

  // CONST
  const searchInput = ref("")
  
  // COMPUTED
  //= projects
  const computedProjects = computed(() => {

    if(searchInput.value === "") {
      if(current_status_to_show.value.name === 'all') {
        return project_list.value
      } else {
        return project_list.value?.filter(el => el.status === current_status_to_show.value.name)
      }
    } else {
      if(current_status_to_show.value.name === 'all') {
        return project_list.value?.filter((item) => 
          item.name 
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(searchInput.value.toLowerCase().replace(/\s+/g, ""))
        )
      } else {
        return project_list.value?.filter((item) => 
          item.name 
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(searchInput.value.toLowerCase().replace(/\s+/g, "")) && item.status === current_status_to_show.value.name
        )
      }
    }
  }) 

  // CHANGED
  const change_status_to_show = (obj: any) => {
    current_status_to_show.value = obj
  }
  
  // ******* DB *******
  //= project_list
  const { pending, error, data: project_list } = useFetch("/api/projectGuarded/project", {
    lazy: false,
    transform: (project_list) => {
      // session user is a sharer
      return project_list.filter((el) => {
        if(
          (el.sharers && el.sharers.find((item) => item.userType === 'user' && item.userId === props.auth_user_profile.userId)) ||
          (el.customer && el.customer.find((item) => item.userType === 'user' && item.userId === props.auth_user_profile.userId)) ||
          (el.executor && el.executor.find((item) => item.userType === 'user' && item.userId === props.auth_user_profile.userId))
        ) {
          return el
        }
      })
    }
    // transform: (landing_list) => {
    //     return landing_list.filter((el) => {
    //         if(el.sharers && el.sharers.find((item) => item.userType === 'conspirator' && item.userId === props.auth_user_profile.userId)) {
    //             return el
    //         }
    //     })
  })
  // const {
  //   pending,
  //   error,
  //   refresh,
  //   data: projects,
  //   status,
  // } = useFetch("api/projects/projects", {
  //   lazy: false,
  //   transform: (projects) => {
  //     return projects.filter((el) => {
  //       // CREATOR
  //       if (el.creator === user.value.id) {
  //         return el;
  //       }
  //       // PARTNER
  //       else if (el.partnerType === 'user' && el.partnerID === user.value.id) {
  //         return el
  //       }
  //       // SHARER in project
  //       else if (el.sharers && el.sharers.find((item) => item.sharerType === 'user' && item.sharerID === user.value.id)) {
  //         return el
  //       }
  //       // SHARER in band (by bandID in project)
  //       else if (isRelated(el)){
  //         return el
  //       }
  //     });
  //   },
  // });
  // const { users } = storeToRefs(useUsersStore());
// const { loadData } = useUsersStore();
// const { user } = useUserSession();

// const { data: organizations } = useLazyAsyncData("organizations", () =>
//   $fetch("api/organizations/organizations")
// );
// const refreshOrganizations = () => refreshNuxtData("organizations");

onMounted(async () => {
  // refresh();
  // await refreshOrganizations();
  // await loadData();
  await useBandStore().loadBandData()
  await usePartnerStore().loadPartnerData()
});

// CHECK
// const isRelated = (obj) => {
//   if(obj.bandID) {
    
//     if(organizations.value) {
      
//       let band = organizations.value.find(band => band.id === obj.bandID)
      
//       if(band && band.sharers.find(el => el.userType === 'user' && el.userID === user.value.id)) {
//         return true
//       } else {
//         return false
//       }

//     }
//   }
// }

// FUNc
//= searchInputChanged
const searchInputChanged = (str: string) => {
  searchInput.value = str
}

//= color status in project item
const set_status_color = (status_name: string) => {
  if(status_name === 'waiting') {
    return 'background-color: var(--color-urgency-middle-10)'
  }
  else if (status_name === 'works') {
    return 'background-color: var(--color-urgency-low-10);'
  }
  else if (status_name === 'agreement') {
    return 'background-color: var(--color-btn-hover-bg)'
  }
  else if (status_name === 'canceled') {
    return ''
  }
  else if (status_name === 'paused') {
    return 'background-color: var(--color-urgency-middle);'
  }
  else if (status_name === 'finished') {
    return 'background-color: var(--color-global-text); color: var(--color-global-baackground_light);'
  }
  else {
    return 'background-color: red'
  }
}

//= translate item status
const translate_item_status = (status: string) => {

  return project_status.value?.find(el => el.name === status)?.title
} 

// ***************** ON ClICK ***************
// const projectSymbolOnClick = (symbol) => {
//   searchInputChanged(symbol)
// }


// *********** ДОБАВЛЯЕМ New Project newProjectModal ***********
// флаг disabled для кнопки submit
// const createNewProjectBtnIsDisabled = ref(true);

// async function addProject(project: any) {
//   let addedProject = null;

//   if (
//     project.title &&
//     project.address &&
//     project.partnerID &&
//     project.partnerType &&
//     project.creator &&
//     project.curator &&
//     project.workType
//     project.completion
//   ) {
//     addedProject = await $fetch("api/projects/projects", {
//       method: "POST",
//       body: {
//         uuid: uuidv4(),
//         title: project.title,
//         address: project.address,
//         partnerID: project.partnerID,
//         partnerType: project.partnerType,
//         creator: project.creator,
//         curator: project.curator,
//         workType: project.workType,
//         completion: project.completion,
//       },
//     });


//     clearModalInputs(project);

//     refresh();
//   }
// }

//
// const clearModalInputs = (project: any) => {
//   project.uuid = null;
//   project.title = null;
//   project.address = null;
//   project.partnerID = null;
//   project.partnerType = null;
//   project.creator = null;
//   project.curator = null;
//   project.workType = null;
//   project.completion = 0;
// };

// TRANSLATE



// const translateCurator = (curatorID: number, curatorType: string) => {
//   if (curatorID && curatorType) {
//     if (curatorType === "user") {
//       let curator = [...users.value].find((user) => user.id === curatorID);
//       return `${curator?.surname} ${curator?.name[0]}. ${curator?.middleName[0]}`;
//     } else if (curatorType === "company") {
//       if (organizations.value) {
//         let curator = [...organizations.value].find(
//           (company) => company.id === curatorID
//         );
//         return `${curator?.title}`;
//       }
//     }
//   }
// };

// const translatePartner = (partnerID, partnerType) => {
//   if (partnerID) {
//     if (partnerType === "user") {
//       let userItem = users.value.find((item) => item.id === partnerID);
//       return `${userItem?.surname} ${userItem?.name[0]}. ${userItem?.middleName[0]}.`;
//     } else if (partnerType === "company" && organizations.value) {
//       let organizationItem = organizations.value.find(
//         (item) => item.id === partnerID
//       );
//       return `${organizationItem.title}`;
//     }
//   }
// };

// WATCHERS
//= searchInput
// watch(searchInput, () => {
//   console.log(searchInput.value)
// })

// Check before submit creating new project
// watch(project.value, () => {
//   if (
//     project.value.title &&
//     project.value.address &&
//     project.value.partnerID &&
//     project.value.partnerType &&
//     project.value.creator &&
//     project.value.curator &&
//     project.value.workType
//     project.value.completion
//   ) {
//     createNewProjectBtnIsDisabled.value = false;
//   } else {
//     createNewProjectBtnIsDisabled.value = true;
//   }
// });

// CREATE
//= new project
const addNewProject = () => {
  alert('В разработке...')
}
</script>
<template>
  <Container>


    <!-- <DevModePlug/> -->
     
    <!-- TITLE PAGE SECTION -->
    <div class="show-max-767" style="margin-bottom: 0.5rem;">

      <BreadCrumbs/>
      <h1 style="margin: 0; font-weight: bold; font-size: 42px;">Проекты</h1>
    </div>

    <div v-if="pending">
      <p>Loading...</p>
    </div>

    <div v-else>

      <!-- fetch data is error -->
      <!-- <div v-if="error">
        <p>Error Code {{ error.statusCode }}</p>
        <p>Error Message {{ error.message }}</p>
      </div> -->
  
      <!-- ADD NEW PROJECT MODAL -->
      <!-- Button trigger modal -->
      <!-- <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#newProjectModal"
      >
        Создать
      </button> -->
  
      <!-- Modal -->
      <!-- <div
        class="modal fade"
        id="newProjectModal"
        tabindex="-1"
        aria-labelledby="newProjectModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <form class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="newProjectModalLabel">
                Новый проект
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
  
              <div class="mb-3">
                <label for="projectTitle" class="form-label"
                  >Название проекта</label
                >
                <input
                  v-model="project.title"
                  type="text"
                  class="form-control"
                  id="projectTitle"
                  aria-describedby="nameHelp"
                />
              </div>
  
              <div class="mb-3">
                <label for="projectAddress" class="form-label">Address</label>
                <input
                  v-model="project.address"
                  type="text"
                  class="form-control"
                  id="projectAddress"
                  aria-describedby="nameHelp"
                />
              </div>
  
              <div class="mb-3">
                <label for="projectPartnerType" class="form-label"
                  >Partner Type (user | company)</label
                >
                <input
                  v-model="project.partnerType"
                  type="text"
                  class="form-control"
                  id="projectPartnerType"
                  aria-describedby="nameHelp"
                />
              </div>
  
              <div class="mb-3">
                <label for="projectPartnerID" class="form-label">PartnerID</label>
                <input
                  v-model="project.partnerID"
                  type="number"
                  class="form-control"
                  id="projectPartnerID"
                  aria-describedby="nameHelp"
                />
              </div>
  
              <div class="mb-3">
                <label for="projectCreator" class="form-label">Creator</label>
                <input
                  v-model="project.creator"
                  type="number"
                  class="form-control"
                  id="projectCreator"
                  aria-describedby="nameHelp"
                />
              </div>
  
              <div class="mb-3">
                <label for="projectCurator" class="form-label"
                  >Curator (user id)</label
                >
                <input
                  v-model="project.curator"
                  type="number"
                  class="form-control"
                  id="projectCurator"
                  aria-describedby="nameHelp"
                />
              </div>
  
              <div class="mb-3">
                <label for="projectWorkType" class="form-label">Work Type</label>
                <input
                  v-model="project.workType"
                  type="string"
                  class="form-control"
                  id="projectWorkType"
                  aria-describedby="nameHelp"
                />
              </div>
  
              <div class="mb-3">
                <label for="projectCompletion" class="form-label"
                  >Completion</label
                >
                <input
                  v-model="project.completion"
                  type="number"
                  class="form-control"
                  id="projectCompletion"
                  aria-describedby="nameHelp"
                />
              </div>
            </div>
  
  
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="clearModalInputs(project)"
              >
                Отменить
              </button>
              <button
                type="button"
                id="createNewProjectBtn"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                :disabled="createNewProjectBtnIsDisabled"
                @click="addProject(project)"
              >
                Создать
              </button>
            </div>
          </form>
        </div>
      </div> -->
  
  
  
      <!--  -->
      <div class="project_container">
        <!-- status bar -->
        <Chip
          id="project_status_chip_block"
          :tabs="project_status"
          :default="current_status_to_show"
          :btn_all_exist="true"
          @changed="change_status_to_show"
          style="margin-bottom: 2rem;"
        />
        <!-- {{ current_status_to_show }} -->
        <!-- SEARCH SECTION -->
        <div v-if="project_list?.length">
          <Search
            @searchInputChanged="searchInputChanged"
            :string="`${searchInput}`"
          >
            <!-- <input
              type="text"
              class="form-control"
              placeholder="Поиск"
              v-model="searchInput"
              style="padding-left: 2.2rem"
            /> -->
          </Search>
        </div>
        <!-- list-->
        <div class="project-list_container">
  
          <!-- Если ничего не найдено в поиске-->
          <div class="no-search-item_wrapper" v-if="searchInput && !computedProjects?.length">
            <p>
              По запросу ничего не найдено
            </p>
          </div>

          <!-- Список проектов -->
          <div 
            v-for="(project, index) in computedProjects"
            :key="index"
            class="project-item_wrapper"
            @click="$router.push(`/projects/${project.id}`)"
          >
              <p style="margin: 0;" class="truncate">{{ project?.name }}</p>
              <p 
                class="project-item_status" 
                v-if="current_status_to_show.name === 'all'"
                style="margin: 0;"
                :style="set_status_color(project?.status)"
              >
                {{ translate_item_status(project.status) }}
              </p>
              <div style="display: flex; flex-direction: column;">

                <p class="project-item_customers_wrapper">
                  <span>Заказчик: </span>
                  <span class="project-item_customers_list" v-if="translateCustomersName(project?.customer).length">
                    <span v-for="customer in translateCustomersName(project?.customer)">
                      {{ customer }}
                    </span>
                  </span>
                  <span v-else>Нет</span>
                </p>
                <p class="project-item_executors_wrapper">
                  <span>Исполнитель: </span>
                  <span class="project-item_executors_list" v-if="translateExecutorsName(project?.executor).length">
                    <span v-for="executor in translateExecutorsName(project?.executor)">
                       {{ executor }}
                    </span>
                  </span>
                  <span v-else>Нет</span>
                </p>
              </div>
          </div>
  
          <!-- Если вообще не проектов -->
          <!--  -->
          <div class="no-project_wrapper" v-if="searchInput === '' && !computedProjects?.length">
            <p>У вас нет проектов...</p>
            <Button type="pseudo-btn" bg="bg-full" link="" @click="addNewProject">Создать</Button>
          </div>
        </div>
      </div>
    </div>


  </Container>
</template>

<style scoped>
/* .projects_container {
  margin-top: 2rem;
} */
/* .project-item_container {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.2s ease-in;
  position: relative;
} */
/* .project-item_container:last-child {
  border-bottom: none;
} */
/* .project-item_container h2 {
  margin: 0;
} */

/* .project-item_container:hover {
  background-color: rgba(0, 0, 0, 0.05);
} */

/* .project-symbol_wrapper {
  position: absolute;
  left: 0;
  top: 0;
  background-color: var(--color-error);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem
} */
/* .project-symbol_content {
  color: var(--color-btn-text);
} */

.project-item_left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.project-item_right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.project-item_right span,
.project-address {
  color: rgba(0, 0, 0, 0.6);
}

.project-completion {
  min-width: 3rem;
  min-height: 3rem;
  background-color: #b1e3c1;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.project_container {
  margin-top: 1rem;
}
.project-list_container {
  margin-top: 1.5rem;
}
.project-item_wrapper:nth-child(even) {
  background-color: var(--color-global-baackground_light);
}
.project-item_executors_wrapper,
.project-item_customers_wrapper {
  font-size: .8rem;
  margin: 0;
}
.project-item_executors_wrapper span,
.project-item_customers_wrapper span {
  color: var(--color-global-text_second); 
}
.project-item_executors_list span
.project-item_customers_list span {
  margin-left: .2rem;
}

@media (max-width: 319px) {
  .no-project_wrapper {
    margin-left: .5rem;
    margin-right: .5rem;
  }
  .no-search-item_wrapper {
    /* margin-left: 1rem;
    margin-right: 1rem; */
    text-align: center;
  }
  .project-item_wrapper {
    position: relative;
    padding: 0 .5rem;
    margin-top: 1rem;
  }
  .project-item_wrapper:first-child {
    margin-top: unset;
  }
  .project-item_status {
    margin: 0!important;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: .5rem;
    /* background-color: var(--color-global-text_second); */
    font-size: .9rem;
    padding: 0 .25rem;
  }
  .truncate {
    white-space: nowrap;      /* Запрещаем переносы */
    overflow: hidden;         /* Скрываем всё, что не поместилось */
    text-overflow: ellipsis;  /* Добавляем многоточие */
    width: 200px;           /* Фиксированная ширина */
  }

}
@media (min-width: 320px) and (max-width: 574px) {
  .no-project_wrapper {
    margin-left: .5rem;
    margin-right: .5rem;
  }
  .no-search-item_wrapper {
    /* margin-left: 1rem;
    margin-right: 1rem; */
    text-align: center;
  }
  .project-item_wrapper {
    position: relative;
    padding: .25rem 1rem;
    margin-top: 1rem;
  }
  .project-item_wrapper:first-child {
    margin-top: unset;
  }
  .project-item_status {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1rem;
    background-color: var(--color-global-text_second);
    font-size: .9rem;
    padding: 0 .25rem;
  }
  .truncate {
    white-space: nowrap;      /* Запрещаем переносы */
    overflow: hidden;         /* Скрываем всё, что не поместилось */
    text-overflow: ellipsis;  /* Добавляем многоточие */
    width: 250px;           /* Фиксированная ширина */
  }
}
@media screen and (min-width: 575px) and (max-width: 767px) {

  .no-project_wrapper {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .project-list_container {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
@media screen and (max-width: 767px) {
  /* .project-item_container {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  } */
  .project-item_right {
    align-items: unset;
  }

  .project-header {
    align-self: flex-start;
  }
  .show-max-767 {
    display: none;
  }
}
</style>
