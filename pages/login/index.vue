<script setup>
//
// https://www.youtube.com/watch?v=pXBxTF_u-6c
useHead({
  title: "Login",
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
import { Container } from "@/shared/container";
import { onBeforeMount } from "vue";

// import { userToLog } from '@/stores/auth';

const { loggedIn, user, session, clear, fetch } = useUserSession();
// const { userToLog } = useAuthStore()
// const { userToLog } = setUserSession()

const router = useRouter();
// import { useCurrentUserStore } from '@/stores/auth'

// if (user.value) {
//   router.push("/");
// }
const tempUser = ref({
  email: "",
  password: "",
});

const login = async () => {

  // Данные введены
  if (tempUser.value.email && tempUser.value.password) {

    // Закидываем введенные данные для поиска пользователя в БД
    await useAuthStore().signIn(tempUser.value);

    // Если пользваотель есть в БД - редиректим
    if (useAuthStore().loggedIn) {
      // router.push("/dashboard");
      // router.push("/calendar");
      router.push("/wallet")
    }
  } 
  // Не вписан пароль
  else if (tempUser.value.email && !tempUser.value.password) {
    alert("Забыли про пароль");
  } 
  // Не вписан имейл
  else if (!tempUser.value.email && tempUser.value.password) {
    alert("Вы не указали email");
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
  <Container>
    <div
      style="
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      "
    >
      <h1 style="margin-top: 5rem">Вход</h1>

      <!-- <button @click="onClickRegister">Зарегистрироваться</button> -->

      <form
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        "
      >
        <label for="login_email">Введите имейл

          <input id="login_email" v-model="tempUser.email" type="text" autocomplete/>
        </label>
        <label for="login_password">Введите пароль

          <input id="login_password" v-model="tempUser.password" type="password" autocomplete/>
        </label>
        <button @click="login">Войти</button>
      </form>
      <br />


    </div>
  </Container>
</template>

<style scoped></style>
