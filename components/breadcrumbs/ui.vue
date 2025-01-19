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
      #{{ pathArr[pathArr.length - 1] }}
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
  // projects
  if(str === 'projects') {

    return 'Проекты'
  } 
  // task
  if(str === 'task') {
    return 'Задачи'
  }
  // demands
  if(str === 'demands') {
    return 'Заявки'
  }
  // partners 
  if(str = 'partners') {
    return 'Контакты'
  }
  // else
  else {

    return str
  }
}

// HELPERS
//= compileRoute
const compileRoute = (str: string) => {
  // task
  if(str === 'task') {
    return 'demands'
  }
  // else
  else {
    return str
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
