<script lang="ts" setup>

const router = useRouter();
const route = useRoute();

const { loggedIn, user, session, clear, fetch } = useUserSession();


const checkLocalStorage = () => {
  console.log("App is ready");
};

onMounted(() => {
  // checkLocalStorage()
  console.log(user.value);

  if (
    !user.value &&
    route.name !== "index" &&
    route.name !== "about" &&
    route.name !== "policy" &&
    route.name !== "contract" &&
    // 
    route.name !== "landing_crm" &&
    route.name !== "landing_offer" &&
    route.name !== "landing_unidrum"
  ) {
    router.replace("/login");
  }
  // Отключаем перезагрузку страницы при смахивании
  window.addEventListener('contextmenu', function (e) {
      e.preventDefault();
  }, false);
});

type Profile = {
  id: number,
  userId: number,
  email: string
}
const profiles = ref([])
const auth_user_profile = ref<Profile>()

onBeforeMount(async () => {
  await initUserSessionProfie()
})

// ****** FUNCs
// init session user profile
const initUserSessionProfie = async () => {
  await useProfileStore().loadData()
  profiles.value = useProfileStore().profiles
  
  if(user.value) {
    // // Тянем landing list from db
    // await useLandingStore().loadLandingData()
    // set auth user profile
    auth_user_profile.value = [...profiles.value].find(profile => profile.userId === user.value.id)
    console.log(user.value)
    console.log(auth_user_profile.value)
  } else {
    return
  }
}


// ****** WATCHERS
// session
watch(session, async () => {

  await initUserSessionProfie()
});
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage 
      :auth_user_profile="auth_user_profile"
      :auth_user="user"
    />
  </NuxtLayout>
</template>

<style>

html {
  /* width: 100vw; */
  overflow-x: hidden;
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;
}
html::-webkit-scrollbar {
  display: none;
  -webkit-appearance: none;
  width: 0 !important;
  height: 0;
  -ms-overflow-style: none; /* IE и Edge */
  scrollbar-width: none; /* Firefox */
}

/* # Тестировать docker */
/* # https://www.youtube.com/watch?v=w9Ls34MvZTs */
/* # environment settings nuxt */
/* # https://www.youtube.com/watch?v=eCKjCoWGCUA */
</style>
