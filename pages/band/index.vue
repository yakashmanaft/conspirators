<template>
  <!-- https://www.youtube.com/watch?v=3MPlTDgQaaE -->
  <Container>

    <!-- TITLE PAGE SECTION -->
    <div class="show-max-767" style="margin-bottom: 0.5rem;">

      <BreadCrumbs/>
      <h1 style="margin: 0; font-weight: bold; font-size: 42px;">Кооперативы соучастников</h1>
    </div>
    <DevModePlug/>

  </Container>
</template>

<script setup>

// shared
import { Container } from "@/shared/container";
// components
import { DevModePlug } from '@/components/plug_dev_mode';
import { BreadCrumbs } from "~/components/breadcrumbs";
import { Button } from "@/components/button";
// utils
import { H3Error } from "h3";
import { v4 as uuidv4 } from "uuid";

// PROPS
const props = defineProps({
    auth_user_profile: {
        type: Object,
        default: {}
    },
})

const sessionUser = useUserSession().user;

const router = useRouter();

//
const today = ref(new Date());

const accessModulesArray = ref([
  {
    name: "projects",
    translate: "Проекты",
  },
  {
    name: "warehouse",
    translate: "Склад",
  },
  {
    name: "demands",
    translate: "Заявки",
  },
  // {
  //   name: "location",
  //   translate: "Места"
  // },
  {
    name: "funds",
    translate: "Фонды",
  },
  {
    name: "banks",
    translate: "Банки",
  },
  {
    name: "stock funds",
    translate: "Биржы",
  },
]);

// Шаблон нового user'a
const user = ref({
  uuid: null,
  email: null,
  password: null,
  name: null,
  middleName: null,
  surname: null,
  phone: null,
  accessModules: [],
  // groupStatus: null,
  role: "USER",
});

const company = ref({
  uuid: null,
  title: null,
  // ownerID: sessionUser.id
});

// const error = ref(null);
const editedUser = ref({
  id: 0,
  uuid: null,
  email: null,
  password: null,
  name: null,
  middleName: null,
  phone: null,
  surname: null,
  accessModules: [],
  // groupStatus: null,
  role: null,
});

//
const createCompanyBtnIsDisabled = ref(true);
const createUserBtnIsDisabled = ref(true);

// choosen title
const titles = ref([
  {
    title: "Соучастники",
    name: "sharers",
  },
  {
    title: "Банды",
    name: "organizations",
  },
]);
const currentTitle = ref("sharers");

const searchInput = ref("");
const searchOrganizationsInput = ref("");

// accessed modules
const tempModulesArray = ref([]);

onMounted(() => {
  // users.value = await getUsers()
  // refresh();
  // refreshCompanies();

  // reset inputs in modals
  // companies
  const createCompanyModalEl = document.getElementById("companyCreateModal");
  if (createCompanyModalEl) {
    createCompanyModalEl.addEventListener("hidden.bs.modal", (event) => {
      // company.value = {
      //   uuid: null,
      //   title: null
      // }
      company.value.title = null;
    });
  }
  // users
  const createUserModalEl = document.getElementById("userCreateModal");
  if (createUserModalEl) {
    createUserModalEl.addEventListener("hidden.bs.modal", (event) => {
      user.value.uuid = null;
      user.value.email = null;
      user.value.password = null;
      user.value.name = null;
      user.value.middleName = null;
      user.value.surname = null;
      user.value.phone = null;
      user.value.accessModules = [];
      // user.value.groupStatus = null;
      user.value.role = "USER";
    });
  }
});

// const refreshCompanies = () => refreshNuxtData("companies");
/**
 * @desc Get users
 */
// async function getUsers() {
//     return await $fetch('api/users')
// }
// const {
//   data: band,
// } = useFetch("/api/band/band", {
//   lazy: false,
//   transform: (band) => {

//     return band
//       .sort((x, y) => {
//         if (x.name < y.name) {
//           return -1;
//         }

//         if (x.name > y.name) {
//           return 1;
//         }
//       })
//       // .map((user) => {
//       //   return {
//       //     id: user.id,
//       //     email: user.email,
//       //     name: user.name,
//       //     middleName: user.middleName,
//       //     surname: user.surname,
//       //     phone: user.phone,
//       //     role: user.role,
//       //     accessModules: user.accessModules,
//       //     // groupStatus: user.groupStatus,
//       //     // created_at: user.created_at,
//       //     // update_at: user.update_at,
//       //   };
//       // });
//   },
// });

/**
 * @desc Get partnrs
 */
//  const {
//   pending,
//   refresh,
//   data: partners,
//   error,
// } = useFetch("api/partnerGuarded/partner", {
//   lazy: false,
//   transform: (partners) => {
//     return partners
//       .filter((partner) => {
//         // session user is a sharer

//         if(partner.sharers && partner.sharers.find((item) => item.userType === 'conspirator' && item.userId === props.auth_user_profile.userId)) {
//             return partner
//         } 

//       })
//       .sort((x, y) => {
//         if (x.surname < y.surname) {
//           return -1;
//         }

//         if (x.surname > y.surname) {
//           return 1;
//         }
//       })
//       .map((partner) => {
//         return {
//           id: partner.id,
//           email: partner.email,
//           name: partner.name,
//           middleName: partner.middleName,
//           surname: partner.surname,
//           phone: partner.phone,
//         };
//       });
//   },
// });

// const { refresh: refreshCompanies, data: companies } = await useLazyFetch(
//   "api/organizations/organizations"
// );
// const { data: companies } = useFetch("api/organizations/organizations", {
//   lazy: false,
// });
// watch(companies, (newData) => {
//   console.log(newData);
// });


// COMPUTED
//= partners
// const computedPartners = computed(() => {

//   if(searchInput.value === "") {

//     return partners.value
//   } else {
//     return partners.value.filter((partner) =>

//         partner.name
//           .toLowerCase()
//           .replace(/\s+/g, "")
//           .includes(searchInput.value.toLowerCase().replace(/\s+/g, ""))
//         ||
//         partner.surname
//           .toLowerCase()
//           .replace(/\s+/g, "")
//           .includes(searchInput.value.toLowerCase().replace(/\s+/g, ""))
//         ||  
//         // partner?.middleName
//         //   .toLowerCase()
//         //   .replace(/\s+/g, "")
//         //   .includes(searchInput.value.toLowerCase().replace(/\s+/g, ""))
//         // ||  
//         partner.phone
//           .toLowerCase()
//           .replace(/\s+/g, "")
//           .includes(searchInput.value.toLowerCase().replace(/\s+/g, ""))
//       )
//   }
// })

//=
// const computedUsers = computed(() =>
//   // {
//   searchInput.value === ""
//     ? users.value
//     : users.value.filter((user) =>
//         user.surname
//           .toLowerCase()
//           .replace(/\s+/g, "")
//           .includes(searchInput.value.toLowerCase().replace(/\s+/g, ""))
//       )
// );
// const computedOrganizations = computed(() =>
//   searchOrganizationsInput.value === ""
//     ? companies.value
//     : companies.value.filter((company) =>
//         company.title
//           .toLowerCase()
//           .replace(/\s+/g, "")
//           .includes(
//             searchOrganizationsInput.value.toLowerCase().replace(/\s+/g, "")
//           )
//       )
// );

/**
 * @desc Add user
 * @param user The user to add
 */
// async function checkAndAddUser(user) {
//   let compareUser = users.value.find(
//     (e) =>
//       e.email === user.email &&
//       // e.password === user.password &&
//       e.name === user.name &&
//       e.middleName === user.middleName &&
//       e.surname === user.surname
//     // e.phone === user.phone
//     // e.accessModules === user.accessModules && тут такто массив...
//     // e.groupStatus === user.groupStatus &&
//     // e.role === user.role
//   );
//   if (compareUser) {
//     alert("Соучастник уже есть");
//   } else {
//     let addedUser = null;

//     if (user)
//       addedUser = await $fetch("api/usersList/users", {
//         method: "POST",
//         body: {
//           uuid: uuidv4(),
//           email: user.email,
//           password: user.password,
//           name: user.name,
//           middleName: user.middleName,
//           surname: user.surname,
//           phone: user.phone,
//           accessModules: user.accessModules,
//           // groupStatus: user.groupStatus,
//           role: user.role,
//         },
//       });

//     // if (addedUser) users.value = await getUsers();
//     if (addedUser) refresh();
//     createUserBtnIsDisabled.value = true;
//   }
// }

// async function checkAndCreateCompany(company) {
//   let compareCompany = companies.value.find((e) => e.title === company.title);

//   if (compareCompany) {
//     alert("Банда с таким именем уже существует!");
//   } else {
//     let addedCompany = null;

//     let sharers = [];
//     // sharers.push({
//     //   userID: sessionUser.value.id,
//     //   userType: 'user'
//     // })

//     if (company && sessionUser)
//       addedCompany = await $fetch("api/organizations/organizations", {
//         method: "POST",
//         body: {
//           uuid: uuidv4(),
//           title: company.title,
//           ownerID: sessionUser.value.id,
//           sharers: sharers,
//         },
//       });
//     // reset company comst

//     // refresh list
//     if (addedCompany) refreshCompanies();
//     // company.value = {
//     //   uuid: null,
//     //   title: null
//     // };
//     // addedCompany = null
//     // company = null
//     // createCompanyBtnIsDisabled.value = true
//   }
// }

// router push functions

/**
 * @desc Delete users
 */
// async function deleteUser(id) {
//   let isUserReady = confirm("Точно удалить пользователя?");

//   if (isUserReady) {
//     let deletedUserOrError = null;
//     // id = 'aoaoaoao'

//     if (id)
//       deletedUserOrError = await $fetch("api/usersList/users", {
//         method: "DELETE",
//         body: {
//           id: id,
//         },
//       });

//     if (deletedUserOrError instanceof H3Error) {
//       error.value = deletedUserOrError;
//       console.log("error: ", error);
//       return;
//     }
//     // users.value = await getUsers();
//     refresh();
//   } else {
//     return;
//   }
// }

/**
 * @desc Edit user
 * @param user The user to add
 */
// async function editUser(editedUser) {
//   let user = null;

//   if (editedUser.id && editedUser.name)
//     user = await $fetch("api/usersList/users", {
//       method: "PUT",
//       body: {
//         id: editedUser.id,
//         surname: editedUser.surname,
//         name: editedUser.name,
//         middleName: editedUser.middleName,
//         phone: editedUser.phone,
//         role: editedUser.role,
//         accessModules: editedUser.accessModules,
//         // groupStatus: editedUser.groupStatus,
//       },
//     });

//   // if (user) users.value = await getUsers();
//   if (user) refresh();
// }

// TRANSLATE
// const translateModuleName = (name) => {
//   if (accessModulesArray.value) {
//     let accessModule = [...accessModulesArray.value].find(
//       (item) => item.name === name
//     );
//     return accessModule.translate;
//   } else {
//     return name;
//   }
// };

// CREATE
//= new contact
// const addNewPartner = () => {
//   alert('В разработке...')
// }

// WATHERS

// watch(company.value, () => {
//   // console.log(company.value.title);
//   if (company.value.title) {
//     createCompanyBtnIsDisabled.value = false;
//   } else {
//     createCompanyBtnIsDisabled.value = true;
//   }
// });
// watch(user.value, () => {
//   // console.log(user.value);
//   if (
//     user.value.email &&
//     user.value.password &&
//     user.value.name &&
//     // user.value.middleName &&
//     user.value.surname &&
//     user.value.phone &&
//     user.value.phone.length === 12 &&
//     // user.value.groupStatus !== null &&
//     user.value.accessModules.length > 0 &&
//     user.value.role
//   ) {
//     createUserBtnIsDisabled.value = false;
//   } else {
//     createUserBtnIsDisabled.value = true;
//   }
// });
// watch(editedUser.value, () => {
//   // let modulesArray = editedUser.value.accessModules
//   // let modulesNames = []
//   // modulesArray.forEach(item => modulesArray.push(item.name))
//   // console.log(tempModulesArray.value)
// });

useHead({
  title: "Кооперативы",
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
</script>

<style scoped>
.btn {
  border-radius: 2rem;
}
.link {
  cursor: pointer;
}
.link:hover {
  color: var(--bs-primary);
}
.link:hover span{
  color: var(--bs-primary);
}
.mt-1rem {
  margin-top: 1rem;
}

/* toggle title */
.toggle-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.switch-title_el input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}

.switch-title_el label h1 {
  color: var(--bs-tertiary-color);
}
.switch-title_el label h1:hover {
  cursor: pointer;
}

.switch-title_el input[type="radio"]:checked + label h1 {
  color: unset;
}
.add-btn_container {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.add-btn svg {
  display: none;
}

/* SEARCH */
.partners-search_wrapper {
  position: relative;
  /* align-self: flex-start;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between !important; */
}

.partners-search_wrapper input {
  padding-left: 2.2rem;
  border: unset;
  border-radius: unset;
  outline-width: 0 !important;
  outline: none !important;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  border-bottom: 1px solid var(--bs-border-color);
}

.partners-search_wrapper input::placeholder {
  color :var(--color-global-text_second);
}

.partners-search_wrapper svg {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0.5rem;
}

/* PARTNERS LIST */
.partners_container {
  margin-top: 1rem;
}
.partners-list_wrapper {
  margin-top: 1rem;
}
.list_item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin: 1rem 0; */
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.list_item:hover {
  background-color: var(--color-item-hover-bg);
  cursor: pointer;
}
.item_name {
}
.org_label {
  display: flex;
  gap: 0.3rem;
}
.org_label p {
  margin: 0;
  font-weight: bold;
}
.org_label:hover p {
  color: var(--bs-primary);
  cursor: pointer;
}
/* .org_desc {

}
.org_desc p {
  margin: 0;
} */
/* .org_label, */
.item_group {
  margin-top: 0.5rem;
  display: inline-block;
  padding: 4px 10px;
  cursor: pointer;
  border-radius: 16px;
  border: unset;
}
/* .org_label,  */
/* .item_group-w-group {
  background-color: var(--bs-primary);
  color: var(--bs-body-bg);
} */
/* .item_group-wo-group {
  background-color: var(--bs-secondary-bg);
} */
.item_icons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.item_icons button {
  background-color: unset;
  padding: unset;
  border: unset;
}
.item_icon {
  color: var(--bs-primary);
}
.item_icon:hover {
  cursor: pointer;
}
.item_icon:hover.icon_edit {
  color: var(--bs-warning);
}
.item_icon:hover.icon_delete {
  color: var(--bs-danger);
}

/* ACCESS MODULE BTNs */
.access-module_container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
}
.access-module_el label {
  text-align: center;
  width: 100%;
  padding: 4px 16px;
  background-color: var(--bs-primary-bg-subtle);
}
.access-module_el input[type="checkbox"]:checked + label {
  background-color: var(--bs-primary);
  color: var(--bs-body-bg);
}
.access-module_el label:hover {
  cursor: pointer;
}
.access-module_el input[type="checkbox"] {
  opacity: 0;
  position: fixed;
  width: 0;
}

@media screen and (max-width: 575px) {
  .item_icons {
    gap: 0.2rem;
  }
  .partners-search_wrapper {
    margin: 0.5rem;
  }
  /* .partners-search_wrapper > svg > path {
    fill: red!important;
  } */
  .toggle-title {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  .add-btn_container {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
}
@media screen and (max-width: 767px) {
  .show-max-767 {
    display: none;
  }
  .toggle-title {
    margin-top: -1rem;
  }
  .add-btn {
    z-index: 100;
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    width: 64px;
    height: 64px;
    border-radius: 100%;
    text-align: center;
    /* color: transparent; */
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.2);
  }
  .add-btn span {
    display: none;
  }
  .add-btn svg {
    display: block !important;
    color: var(--bs-body-bg) !important;
  }
  .partners-search_wrapper {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .partners-search_wrapper > input {
    background-color: var(--color-btn-disabled-bg);
    border-radius: 0.5rem;
  }
  .partners-list_wrapper {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
@media screen and (min-width: 768px) {
  .toggle-title {
    margin-top: 1rem;
  }
  .list_item {
    border: unset;
  }
}
</style>
