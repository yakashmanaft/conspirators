<template>

  <ul>
    <li>
      <Button type="pseudo-btn" link="/">Главная</Button>

    </li>
    <li>{{ route.path }}</li>
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
}
ul li:hover:not(:last-child) {
  cursor: pointer;
}

@media screen and (max-width: 575px) {

}

@media screen and (max-width: 767px) {

}
</style>
