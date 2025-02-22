<template>

  <ul>
    <li>
      <Button type="pseudo-btn" link="/">Главная</Button>

    </li>
    <li 
      v-if="pathArr[pathArr.length - 2]"
    >
      -
    </li>
    <li
      v-if="pathArr[pathArr.length - 2]"
    >
      <Button 
        type="pseudo-btn" 
        :link="`/${compileRoute(pathArr[pathArr.length - 2])}`"
      >
        {{ translateCrumb(pathArr[pathArr.length - 2]) }}
      </Button>
    </li>
    <li
      v-if="pathArr.length === 3"
    >-</li>
    <li 
      v-if="pathArr.length === 3"
    >
      {{ translateEndPoint(pathArr[pathArr.length - 2]) }}
    </li>
  </ul>

</template>

<script lang="ts" setup>
//components
import { Button } from '@/components/button';

// navigation
const route = useRoute()
// const router = useRouter()

// PROPS
const props = defineProps({

});

// CONST
const pathArr = ref(route.path?.split('/'))

// EMITS
// = variables
// const emit = defineEmits(["changed"]);
// = emits
// const emit_object = (obj: any) => {
//   if (obj) {
//     emit("changed", obj);
//     // console.log(name)
//   }
// };

// Mounted
onMounted(() => {
});

// TRANSLATORS
//= translateCrumb
const translateCrumb = (str: string) => {
  // console.log(str)

  switch (str) {
      // TASK
      case "task":
          return 'Задачи'; 
      // PROJECTS
      case "projects":
          return 'Проекты'; 
      case "band":
        return "Кооперативы"
      // PARTNERS
      case "partners":
          return 'Контакты'
      // DEMANDS
      case "demands":
          return 'Доска'
      // MESH
      case "mesh":
          return 'Кошелек'
      // MESH
      case "fund":
          return 'Фонды'
      // default
      default:
          str
  }
}
//= translateEndPoint
const translateEndPoint = (str: string) => {
  switch (str) {
    // DEMANDS
    case "demands":
      return `Заявка #${pathArr.value[pathArr.value.length - 1] }`
    // default
    default:
      return `#${pathArr.value[pathArr.value.length - 1] }`
  }
}

// HELPERS
//= compileRoute
const compileRoute = (str: string) => {
  switch (str) {
      // TASK
      case "task":
          return 'demands'; 
      // PROJECTS
      case "projects":
          return 'projects'; 
      case "band":
        return "band"
      // PARTNERS
      case "partners":
          return 'partners'
      // DEMANDS
      case "demands":
          return 'demands'; 
      // MESH
      case "mesh":
          return 'wallet'
      // MESH
      case "fund":
          return 'fund'
      default:
          str
  }
}



// WATCHERS
// = titles
</script>

<style scoped>
ul {
  list-style: none; 
  padding: 0; 
  margin: 0; 
  display: flex; 
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem; 
  color: var(--color-global-text_second); 
  margin-top: 0.5rem;
  /* padding-bottom: 1rem; */
}
ul li:hover:not(:last-child) {
  cursor: pointer;
}

@media screen and (max-width: 575px) {

}

@media screen and (max-width: 767px) {

}
</style>
