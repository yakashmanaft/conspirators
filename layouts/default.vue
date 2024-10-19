<template>
  <div style="height: 100vh; display: grid;">
    <!--  -->
    <AppHeader 
      :auth_user_profile="auth_user_profile"
      :auth_user="user"
    />

    <!--  -->
    <div>
      <!--  -->
      <slot />
    </div>

    <!--  -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// You might choose this based on an API call or logged-in status
// const layout = "custom";

const route = useRoute()

const { loggedIn, user, session, clear, fetch } = useUserSession();

type Profile = {
  id: number,
  userId: number,
  email: string
}
const profiles = ref([])
const auth_user_profile = ref<Profile>()

onBeforeMount(async () => {
  // await useProfileStore().loadData()
  // profiles.value = useProfileStore().profiles
  
  // if(user.value) {
    
  //   auth_user_profile.value = [...profiles.value].find((profile) => {
  //     if(profile.userId === user.value.id) {
  //       return {
  //         id: profile.id,
  //         userId: profile.userId,
  //         email:  user.value.email
  //       }
  //     }
  //   })
    
  //   // console.log(auth_user_profile.value)
  //   // console.log(user.value);

  // } else {
  //   return
  // }
  await initUserSessionProfie()
})

// ****** FUNCs
// init session user profile
const initUserSessionProfie = async () => {
  await useProfileStore().loadData()
  profiles.value = useProfileStore().profiles
  
  if(user.value) {
    
    auth_user_profile.value = [...profiles.value].find(profile => profile.userId === user.value.id)
    console.log(user.value)
    console.log(auth_user_profile.value)
  } else {
    return
  }
}



watch(session, async () => {
  // await useProfileStore().loadData()
  // profiles.value = useProfileStore().profiles
  
  // if(user.value) {
    
  //   auth_user_profile.value = [...profiles.value].find((profile) => {
  //     if(profile.userId === user.value.id) {
  //       return {
  //         id: profile.id,
  //         userId: profile.userId,
  //         email:  user.value.email
  //       }
  //     }
  //   })
    
  //   // console.log(auth_user_profile.value)
  //   // console.log(user.value);

  // } else {
  //   return
  // } 
  await initUserSessionProfie()
});

</script>
