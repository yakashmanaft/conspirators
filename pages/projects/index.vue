<script lang="ts" setup>
// shared
import { Container } from "@/shared/container";

// components
import { DevModePlug } from "@/components/plug_dev_mode";
import { BreadCrumbs } from "~/components/breadcrumbs";
import { Button } from "@/components/button";
import { Search } from "~/components/search";

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

  // CONST
  const searchInput = ref("")
  
  // COMPUTED
  //= projects
  const computedProjects = computed(() => {

    if(searchInput.value === "") {
      return project_list.value
    } else {
      return project_list.value.filter((item) => 
        item.name 
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(searchInput.value.toLowerCase().replace(/\s+/g, ""))
      )
    }
  }) 
  
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
        <div class="project-list_wrapper">
  
          <!-- Если ничего не найдено в поиске-->
          <div>
            <div v-if="searchInput && !computedProjects.length">
              По запросу ничего не найдено
            </div>
          </div>
  
          <!-- Список проектов -->
          <div
            v-for="(project, index) in computedProjects"
            :key="index"
            class="project-item_container"
            @click="$router.push(`/projects/${project.id}`)"
          >
            <!-- {{ project }} -->
            <div style="padding-left: 3.5rem; display: flex; flex-direction: column;">
              <p style="margin: 0;">{{ project?.name }}</p>
              <div style="display: flex; flex-direction: column;">
                <!-- <span style="font-size: .8rem; color: var(--color-global-text_second);">Заказчик: {{ translateName(project?.customer?.[0]?.userType, project?.customer?.[0]?.userId)}}</span> -->

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
          
            <!-- Symbol -->
            <div class="project-symbol_wrapper">
              <div class="project-symbol_content">{{ project?.name[0] }}</div>
            </div>  

          <!-- WRAPPER FOR LEAD ON PAUSE (absolute) -->



            <!-- <div class="project-item_left">
              <div class="project-completion">
                <span>{{ (project.completion * 100).toFixed(0) }}%</span>
              </div>
              <div class="project-header">
                <h2>{{ project.title }}</h2>
                <span class="project-address"
                  >{{ project.address }} | {{ project.workType }}</span
                >
              </div>
            </div> -->
            <!-- <div class="project-item_right">
              <span
                >Куратор:
                {{ translateCurator(project.curator, project.curatorType) }}</span
              >
              <span
                >Заказчик:
                {{ translatePartner(project.partnerID, project.partnerType) }}</span
              >
            </div> -->
          </div>
  
          <!-- Если вообще не проектов -->
          <!--  -->
          <div class="no-project_warapper" v-if="searchInput === '' && !computedProjects?.length">
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
.project-item_container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  /* margin-top: 1rem; */
  padding: .5rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in;
  position: relative;
}
.project-item_container:last-child {
  border-bottom: none;
}
.project-item_container h2 {
  margin: 0;
}

.project-item_container:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.project-symbol_wrapper {
  position: absolute;
  left: 0;
  top: 0;
  background-color: var(--color-error);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem
}
.project-symbol_content {
  color: var(--color-btn-text);
}

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
.project-list_wrapper {
  margin-top: 1.5rem;
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
@media screen and (max-width: 575px) {
  .no-project_warapper {
    margin-left: .5rem;
    margin-right: .5rem;
  }
}
@media screen and (min-width: 576px) and (max-width: 767px) {

  .no-project_warapper {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .partners-list_wrapper {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
@media screen and (max-width: 767px) {
  .project-item_container {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
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
