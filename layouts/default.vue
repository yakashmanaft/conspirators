<template>
  <div style="height: 100vh; display: grid;">
    <!--  -->
    <AppHeader 
      :auth_user="auth_user_profile"
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
const auth_user = ref(null)

type Profile = {
  id: number,
  userId: number
}
const profiles = ref<Profile>()
const auth_user_profile = ref<Profile>()

onBeforeMount(async () => {

})
// if(useAuthStore().user) {

//   // await useProfileStore().loadData()
//   // profiles.value = useProfileStore().profiles
//   // auth_user.value = useAuthStore().user
//   // auth_user_profile.value = [...profiles.value].find(profile => profile.userId === auth_user.value.id)
//   // console.log(auth_user_profile.value)
//   console.log(useAuthStore().user)
// }
watch(session, async () => {

  await useProfileStore().loadData()
  profiles.value = useProfileStore().profiles
  
  // console.log(user.value);
  if(user.value) {

    auth_user_profile.value = [...profiles.value].find(profile => profile.userId === user.value.id)
  } else {
    return
  }
});

</script>
