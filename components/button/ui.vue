<template>
  <!-- 
    type: 
      1/ original-btn
      2/ pseudo-btn

    link:
      everything in route, not external
    
    bg:
      1/ bg-full
      2/ bg-stroke

    width:
      100px/rem/em/etc...

    disabled 
      1/ true
      2/ false

    wing
      1/ true
      2/ false  
  -->
      <div @click.prevent="counter">
        <!-- original-btn -->
        <button v-if="props.type === 'original-btn'" :class="props?.bg" :disabled="props?.disabled" style="white-space: nowrap;">
          <slot></slot>
        </button>

        <!-- pseudo-btn -->
        <nuxt-link v-if="props.type === 'pseudo-btn'" :to="props?.link" :class="props?.bg" style="white-space: nowrap;">
          <slot></slot>
        </nuxt-link>
      </div>
</template>

<script lang="ts" setup>

const route = useRoute()

// PROPS
const props = defineProps({
  type: String,
  link: String,
  bg: String,
  width: {
    type: String,
    default: 'unset'
  } ,
  disabled: Boolean
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

// FUNC
const counter = () => {
  console.log(`${props.type} clicked on ${route.path} page`)
  console.log(props.link)
}

// WATCHERS
// = titles
</script>

<style scoped>

button, .bg-full {
  background-color: var(--color-btn-bg);
  color: var(--color-btn-text);
  padding: 10px 24px;
  border-radius: 100px; 
  transition: all .2s ease-in;
  width: v-bind('props.width');
}

button[disabled] {
  /* background-color: var(--color-btn-disabled-bg); */
  background-color: unset;
  color: var(--color-btn-disabled-text);
}
button:hover {
  /* background-color: var(--color-btn-hover-bg); */
  filter: brightness(70%)
}
.bg-stroke {
  border-radius: 100px; 
  padding: 10px 24px;
  border: 1px solid var(--color-btn-wo-bg);
}

a:hover {
  cursor: pointer;
}


@media screen and (max-width: 575px) {

}

@media screen and (max-width: 767px) {

}
</style>
