<script setup>
//
// https://www.youtube.com/watch?v=pXBxTF_u-6c
useHead({
  title: "Register by conspirator",
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
import { Container } from "@/shared/container";

// components
import { DevModePlug } from "~/components/plug_dev_mode";

// import { userToLog } from '@/stores/auth';

// const { loggedIn, user, session, clear, fetch } = useUserSession();
// const { userToLog } = useAuthStore()
// const { userToLog } = setUserSession()

const router = useRouter();
const route = useRoute()
// import { useCurrentUserStore } from '@/stores/auth'


// const tempUser = ref({
//   email: null,
//   password: null,
// });

// const login = async () => {

//   // Данные введены
//   if (tempUser.value.email && tempUser.value.password) {

//     // Закидываем введенные данные для поиска пользователя в БД
//     await useAuthStore().signIn(tempUser.value);

//     // Если пользваотель есть в БД - редиректим
//     if (useAuthStore().loggedIn) {
//       router.push("/wallet");
//     }
//   } 
//   // Не вписан пароль
//   else if (tempUser.value.email && !tempUser.value.password) {
//     alert("Забыли про пароль");
//   } 
//   // Не вписан имейл
//   else if (!tempUser.value.email && tempUser.value.password) {
//     alert("Вы не указали email");
//   } 
//   // Ничего не вписано
//   else {
//     alert('Укажите хоть какие-то данные :) ')
//   }
// };


// const onClickRegister = () => {
//   alert("В разработке");
// };
</script>

<template>
  <Container>
      
    <!-- Ограничения для длины (логина / пароль) <= 11 символов -->
    <!-- Проверка на "уже используется" -->

    <!-- ЗАГЛУШКА "В РАЗРАБОТКЕ..." -->
    <!-- start plug code ************************** -->
    <DevModePlug
    />
    <!-- end plug code ************************** -->

  </Container>
</template>

<style scoped>

  button {
    background-color: var(--color-btn-bg);
    color: var(--color-btn-text);
    padding: 10px 24px;
    border-radius: 100px; 
    transition: all .2s ease-in
  }
  button:hover {
    /* background-color: var(--color-btn-hover-bg); */
    filter: brightness(70%)
  }
  button[disabled] {
    /* background-color: var(--color-btn-disabled-bg); */
    background-color: unset;
    color: var(--color-btn-disabled-text);
  }

</style>
