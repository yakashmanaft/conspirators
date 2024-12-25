<template>
  <!-- default: {{ default }}
  <br />
  currentTitle: {{ currentTitle }}
  <br /> -->
  <div class="tab_wrapper scroll-wheel-container">
    <!-- Кнопка ALL -->
    <div class="tab" v-if="props.btn_all_exist">
      <input
        type="radio"
        :id="`tab-radio_item_null`"
        v-model="currentTitle"
        :value="default"
      />
      <label :for="`tab-radio_item_null`" @click="emit_object(props.default)">
        <p>Все</p>
      </label>
    </div>

    <!-- Tabs Array -->
    <div class="tab" v-for="(tab, j) in tabs">
      <input
        type="radio"
        :id="`tab-radio_item_${j}`"
        :value="tab"
        v-model="currentTitle"
      />
      <label :for="`tab-radio_item_${j}`" @click="emit_object(tab)"
        ><p>
          {{ tab.title }}
        </p></label
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
// PROPS
const props = defineProps({
  tabs: Array,
  default: Object,
  btn_all_exist: Boolean,
  no_padding: {
    type: Boolean,
    default: false
  }
});
const currentTitle = ref(props?.default);

// EMITS
// = variables
const emit = defineEmits(["changed"]);
// = emits
const emit_object = (obj: any) => {
  if (obj) {
    emit("changed", obj);
    // console.log(name)
  }
};

// Mounted
onMounted(() => {
  // const scrollContainer = document.querySelector(".scroll-wheel-container");
  // if (scrollContainer) {
  //   scrollContainer.addEventListener("wheel", function (event) {
  //     // останавливаем поведение по умолчанию, то есть прокрутку
  //     if (event) {
  //       // console.log(event);
  //       scrollContainer.scrollLeft += event.deltaY;
  //     }
  //   });
  // }
});

// WATCHERS
// = titles
</script>

<style scoped>
.tab_wrapper {
  display: flex;
  gap: 1rem;
  overflow: scroll; 
  max-width: 100vw!important;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none; 
}
.tab_wrapper::-webkit-scrollbar {
  /* display: none; */
}
.tab input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}
.tab label p {
  border: 1px solid var(--bs-primary);
  padding: 2px 10px;
  border-radius: 2rem;
  color: var(--bs-primary);
  white-space: nowrap;
}
.tab label p {
  margin: 0;
}
.tab label p:hover {
  cursor: pointer;
}

/* .tab input[type="radio"]:checked + label h2 {
  color: unset;
} */
.tab input[type="radio"]:checked + label p {
  color: var(--bs-body-bg);
  background-color: var(--bs-primary);
}

@media screen and (max-width: 575px) {
  .tab_wrapper {
    padding-left: v-bind('props.no_padding === false ? `0.5rem` : `unset`');
    padding-right: v-bind('props.no_padding === false ? `0.5rem` : `unset`');
  }
}

@media screen and (min-width: 576px) and (max-width: 767px) {
  .tab_wrapper {
    border: unset;
    padding-bottom: unset;
    padding-left: v-bind('props.no_padding === false ? `1rem` : `unset`');
    padding-right: v-bind('props.no_padding === false ? `1rem` : `unset`');
  }

}
@media screen and (min-width: 768px) and (max-width: 991px){
}

@media screen and (min-width: 992px) and (max-width: 1199px) {

}

@media screen and (min-width: 1200px) {

}

</style>
