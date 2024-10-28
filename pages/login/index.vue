<script setup>
//
// https://www.youtube.com/watch?v=pXBxTF_u-6c
useHead({
  title: "Login in conspirator",
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
// shared
// import { Container } from "@/shared/container";
import { Section } from "@/shared/section"

// components
import { Button } from "@/components/button"

// import { userToLog } from '@/stores/auth';

const { loggedIn, user, session, clear, fetch } = useUserSession();
// const { userToLog } = useAuthStore()
// const { userToLog } = setUserSession()

const router = useRouter();
// import { useCurrentUserStore } from '@/stores/auth'


const tempUser = ref({
  login: null,
  password: null,
});

const loginFunc = async () => {

  // Данные введены
  if (tempUser.value.login && tempUser.value.password) {

    // Закидываем введенные данные для поиска пользователя в БД
    await useAuthStore().signIn(tempUser.value);

    // Если пользваотель есть в БД - редиректим
    if (useAuthStore().loggedIn) {
      router.push("/wallet");
    }
  } 
  // Не вписан пароль
  else if (tempUser.value.login && !tempUser.value.password) {
    alert("Забыли про пароль");
  } 
  // Не вписан имейл
  else if (!tempUser.value.login && tempUser.value.password) {
    alert("Вы не указали логин");
  } 
  // Ничего не вписано
  else {
    alert('Укажите хоть какие-то данные :) ')
  }
};


const onClickRegister = () => {
  alert("В разработке");
};
</script>

<template>
  <div       
    style="
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    ">

    <Section>
<form         
  style="
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
  ">
  <!-- TITLE -->
  <h1>Вход</h1>

  <!-- LOGIN -->
  <input 
    v-model="tempUser.login" 
    id="login_login"
    type="text" 
    class="form-control"
    placeholder="enter login"
    autocomplete="username"
  />
  <!-- PASSWORD -->
  <input
    v-model="tempUser.password"
    id="login_password" 
    type="password"
    class="form-control"
    placeholder="enter password"
    autocomplete="current-password"
  />

  <!-- SUBMIT BTNs -->
  <div style="width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 2rem; margin-top: 1rem;">
    <!-- login -->
    <Button @click.prevent="loginFunc" type="original-btn" link="" bg="bg-full" :disabled="false">Войти</Button>

    <!-- register -->
    <Button type="pseudo-btn" link="/register" bg="bg-stroke" :disabled="false">Создать аккаунт</Button>

  </div>
  </form>

    </Section>
    <router-link to="/">На главную</router-link>
  </div>
</template>

<style scoped>



  @media screen and (max-width: 767px) {


  }
</style>
